"""Depth-geometry ambiguity of the optical potential, computed with FRESCO.

Potential A is a reference; potential B has its real depth multiplied by FAC, and its real
radius r_v and diffuseness a_v are re-scanned so that B reproduces the elastic angular
distribution of A as well as possible (chi2 with 10% errors, 5 deg to THMAX_FIT in 5 deg steps).
B refits real r_v, a_v and the imaginary depth W (Nelder-Mead); imaginary geometry and
spin-orbit are identical in A and B.

Systems:
  a58ni : alpha + 58Ni, 40 MeV, illustrative strongly absorbing Woods-Saxon (not fitted).
          This is the Igo (1959) regime.
  n208pb: n + 208Pb, 20 MeV, KD02 (fresco skill omp.py). Weak absorption: control case.

usage: python3 run_igo_ambiguity.py [a58ni|n208pb] [FAC] [THMAX_FIT]
Writes igo_ambiguity_<system>_x<FAC>.npz for make_igo_ambiguity.py.
"""
import os, sys, subprocess, tempfile, numpy as np

FRESCO = os.path.expanduser("~/bin/fresco")

SYSTEMS = {
    "a58ni": dict(title="alpha+58Ni 40 MeV, illustrative WS", proj=("alpha", 4.0026, 2),
                  targ=("58Ni", 57.9353, 28), at=58.0, elab=40.0, jtmax=60,
                  V=100.0, RV=1.25, AV=0.60, W=20.0, RW=1.25, AW=0.60, wd=None, so=None),
    "n208pb": dict(title="n+208Pb 20 MeV, KD02", proj=("n", 1.0087, 0),
                   targ=("208Pb", 207.977, 82), at=208.0, elab=20.0, jtmax=40, jp=0.5,
                   V=41.487249, RV=1.235478, AV=0.646870, W=1.185839, RW=1.235478, AW=0.646870,
                   wd=(6.614490, 1.248489, 0.510155),
                   so=(5.904668, 1.076202, 0.590000, -0.078430)),
}


def deck(S, v, rv, av, hcm=0.05, rmatch=25.0, jtmax=None):
    pn, pm, pz = S["proj"]; tn, tm, tz = S["targ"]
    lines = [f" &POT kp=1 type=0 ap=0.000 at={S['at']} rc=1.3 /",
             f" &POT kp=1 type=1 p1={v} p2={rv} p3={av} p4={S['W']} p5={S['RW']} p6={S['AW']} /"]
    if S["wd"]:
        wd, rd, ad = S["wd"]
        lines.append(f" &POT kp=1 type=2 p4={wd} p5={rd} p6={ad} /")
    if S["so"]:
        vso, rso, aso, wso = S["so"]
        lines.append(f" &POT kp=1 type=3 p1={vso} p2={rso} p3={aso} p4={wso} p5={rso} p6={aso} /")
    pots = "\n".join(lines)
    return f"""{S['title']}
NAMELIST
 &FRESCO hcm={hcm} rmatch={rmatch} jtmin=0.0 jtmax={jtmax or S['jtmax']} absend=-1
     thmin=1.00 thmax=180.00 thinc=1.00 chans=1 smats=2 xstabl=1
     elab(1)={S['elab']} /
 &PARTITION namep='{pn}' massp={pm} zp={pz} namet='{tn}' masst={tm} zt={tz} qval=0.0 nex=1 /
 &STATES jp={S.get('jp', 0.0)} bandp=1 ep=0.0 cpot=1 jt=0.0 bandt=1 et=0.0 /
 &partition /
{pots}
 &pot /
 &overlap /
 &coupling /
"""


def run(S, v, rv, av, **kw):
    """Return (theta, dsigma/dOmega [mb/sr], sigma_R [mb]) from one FRESCO run."""
    with tempfile.TemporaryDirectory() as d:
        out = subprocess.run([FRESCO], input=deck(S, v, rv, av, **kw), capture_output=True,
                             text=True, cwd=d, check=True).stdout
        rows = []
        for line in open(os.path.join(d, "fort.16")):
            p = line.split()
            if len(p) >= 2 and p[0][0] not in "@#&":
                try:
                    rows.append((float(p[0]), float(p[1])))
                except ValueError:
                    pass
    sigR = next(float(l.split("=")[1].split()[0]) for l in out.splitlines()
                if "CUMULATIVE REACTION" in l)
    a = np.array(rows)
    return a[:, 0], a[:, 1], sigR


def ws(v, R, a, r):
    return -v / (1 + np.exp((r - R) / a))


def fit_B(S, VB, sA, mask, x0):
    """Refit real r_v, a_v and imaginary depth W at fixed real depth VB (Nelder-Mead)."""
    def chi2(x):
        rv, av, W = x
        if av < 0.3 or W < 1.0:
            return 1e6
        _, sB, _ = run(dict(S, W=W), VB, rv, av)
        return np.sum(((sB[mask] - sA[mask]) / (0.1 * sA[mask])) ** 2)
    r = minimize(chi2, x0, method="Nelder-Mead", options=dict(xatol=1e-4, fatol=1e-3, maxiter=800))
    return r.x, r.fun


if __name__ == "__main__":
    from scipy.optimize import minimize
    key = sys.argv[1] if len(sys.argv) > 1 else "a58ni"
    fac = float(sys.argv[2]) if len(sys.argv) > 2 else 1.5
    thfit = float(sys.argv[3]) if len(sys.argv) > 3 else 90.0
    S = SYSTEMS[key]; A13 = S["at"] ** (1 / 3)
    V, RV, AV = S["V"], S["RV"], S["AV"]
    th, sA, sigRA = run(S, V, RV, AV)
    _, s2, sigR2 = run(S, V, RV, AV, hcm=0.03, rmatch=30.0, jtmax=S["jtmax"] + 10)
    print(f"[{key}] A: sigma_R = {sigRA:.3f} mb; finer grid (hcm 0.03, rmatch 30, jtmax+10) {sigR2:.3f} mb;"
          f" max rel diff dsigma {np.max(np.abs(s2 / sA - 1)):.1e}")
    mask = (th >= 5) & (th <= thfit) & (np.abs(th % 5) < 1e-6)
    full = (th >= 5) & (th <= 175) & (np.abs(th % 5) < 1e-6)
    VB = fac * V
    r_igo = RV + AV * np.log(V / VB) / A13          # V exp(R/a) fixed, a fixed: starting point
    (rB, aB, WB), chi2 = fit_B(S, VB, sA, mask, [r_igo, AV, S["W"]])
    SB = dict(S, W=WB)
    _, sB, sigRB = run(SB, VB, rB, aB)
    _, sBf, _ = run(SB, VB, rB, aB, hcm=0.03, rmatch=30.0, jtmax=S["jtmax"] + 10)
    chi2_full = np.sum(((sB[full] - sA[full]) / (0.1 * sA[full])) ** 2)
    print(f"[{key}] B: V = {VB:.2f} MeV, r_v = {rB:.4f} fm, a_v = {aB:.4f} fm, W = {WB:.3f} MeV;"
          f" chi2/N = {chi2 / mask.sum():.3f} on 5-{thfit:.0f} deg (N = {mask.sum()}),"
          f" {chi2_full / full.sum():.3f} on 5-175 deg; sigma_R = {sigRB:.3f} mb;"
          f" B finer-grid max rel diff {np.max(np.abs(sBf / sB - 1)):.1e}")
    r = np.linspace(0, 12, 601)
    uA, uB = ws(V, RV * A13, AV, r), ws(VB, rB * A13, aB, r)
    wA, wB = ws(S["W"], S["RW"] * A13, S["AW"], r), ws(WB, S["RW"] * A13, S["AW"], r)
    d = uA - uB
    idx = np.where(np.sign(d[1:]) != np.sign(d[:-1]))[0]
    cross = r[idx[-1]] if len(idx) else np.nan  # outermost crossing, if any
    for rr in (2, 4, 5, 6, 7, 8, 9):
        k = np.argmin(np.abs(r - rr)); print(f"    r = {rr} fm: U_B/U_A = {uB[k] / uA[k]:.3f}")
    JA = 4 * np.pi * np.trapezoid(-uA * r**2, r) / S["at"]
    JB = 4 * np.pi * np.trapezoid(-uB * r**2, r) / S["at"]
    print(f"[{key}] real parts cross at r = {cross:.2f} fm (R_A = {RV * A13:.2f} fm);"
          f" J_R/A: {JA:.0f} vs {JB:.0f} MeV fm^3")
    np.savez(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          f"igo_ambiguity_{key}_x{fac:g}.npz"),
             th=th, sA=sA, sB=sB, r=r, uA=uA, uB=uB, wA=wA, wB=wB, VA=V, VB=VB, rA=RV, aA=AV,
             rB=rB, aB=aB, WA=S["W"], WB=WB, chi2N=chi2 / mask.sum(), chi2N_full=chi2_full / full.sum(),
             sigRA=sigRA, sigRB=sigRB, RA=RV * A13, cross=cross, JA=JA, JB=JB,
             title=S["title"], thfit=thfit)
