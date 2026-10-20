#!/usr/bin/env python3
"""
DREB 2026, slide 3: 48Ca(d,p)49Ca(g.s.) at E_d = 10 MeV, finite-range ADWA, two global
nucleon potentials (KD02 and CH89), same everything else.

Entrance channel: Johnson-Soper adiabatic potential, U_n + U_p for 48Ca at E_d/2 = 5 MeV
(deuteron spin-orbit dropped). Exit channel: p + 49Ca at E_p = E_d + Q = 12.92 MeV.
Overlaps: deuteron from a Gaussian n-p well, 49Ca g.s. as 2p3/2 neutron in a WS well
(r0 = 1.25, a = 0.65, Vso = 6 MeV), depths fitted to the binding energies.
Post form, with the full complex remnant (core-core = p + 48Ca at the exit energy).
CH89 at 5 MeV is outside its fitted range (10-65 MeV): extrapolation, stated on the slide.

Writes dp48ca_curves.npz: theta_cm and dsigma/dOmega (mb/sr, S = 1) for each potential.
Usage: python run_dp48ca.py  (needs fresco on PATH and the fresco skill's omp.py)
"""
import os, subprocess, tempfile, re
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OMP = os.path.expanduser("~/.claude/skills/fresco/scripts/omp.py")
ED, Q = 10.0, 5.1462 - 2.2246   # Sn(49Ca) - B(d), MeV
EP = ED + Q


def pot(code, proj, target, e, kp):
    out = subprocess.run(["python3", OMP, "--code", code, "--proj", proj, "--target", target,
                          "--energy", f"{e}", "--kp", str(kp)], capture_output=True, text=True, check=True).stdout
    return [l for l in out.splitlines() if l.strip().startswith("&POT")]


def adiabatic(code):
    """U_n + U_p at E_d/2: type=0 from the proton (Coulomb), central terms of both, no spin-orbit."""
    n, p = pot(code, "n", "48Ca", ED / 2, 1), pot(code, "p", "48Ca", ED / 2, 1)
    keep = lambda lines: [l for l in lines if re.search(r"type=[12] ", l)]
    return [p[0]] + keep(n) + keep(p)


def deck(code):
    lines = [f"48Ca(d,p)49Ca gs, Ed={ED} MeV, ADWA with {code}", "NAMELIST",
             f" &FRESCO hcm=0.05 rmatch=30 rintp=0.2 hnl=0.1 rnl=6.0 centre=0.0",
             "   jtmin=0 jtmax=30 absend=-1 thmin=0 thmax=180 thinc=1",
             f"   iter=1 nnu=36 chans=1 xstabl=1 elab={ED} /",
             " &PARTITION namep='d' massp=2.0141 zp=1 namet='48Ca' masst=47.9525 zt=20 nex=1 /",
             " &STATES jp=1.0 bandp=1 ep=0 cpot=1 jt=0.0 bandt=1 et=0 /",
             f" &PARTITION namep='p' massp=1.00728 zp=1 namet='49Ca' masst=48.9557 zt=20 qval={Q:.4f} nex=1 /",
             " &STATES jp=0.5 bandp=1 ep=0 cpot=2 jt=1.5 bandt=-1 et=0 /",
             " &partition /"]
    lines += adiabatic(code)
    lines += pot(code, "p", "49Ca", EP, 2)
    lines += [" &POT kp=3 type=0 ap=0 at=1 rc=1.0 /",          # n-p Gaussian, R = r0
              " &POT kp=3 type=1 shape=2 p1=72.15 p2=0 p3=1.484 /",
              " &POT kp=4 type=0 ap=0 at=48 rc=1.25 /",         # n + 48Ca binding well
              " &POT kp=4 type=1 p1=50.0 p2=1.25 p3=0.65 /",
              " &POT kp=4 type=3 p1=6.0 p2=1.25 p3=0.65 /"]
    lines += [l.replace("kp=1", "kp=5") for l in pot(code, "p", "48Ca", EP, 1)]   # remnant core-core
    lines += [" &pot /",
              " &OVERLAP kn1=1 ic1=1 ic2=2 in=1 kind=0 nn=1 l=0 sn=0.5 j=0.5 kbpot=3 be=2.2246 isc=1 /",
              " &OVERLAP kn1=2 ic1=2 ic2=1 in=2 kind=3 nn=2 l=1 sn=0.5 ia=1 ib=1 j=1.5 kbpot=4 be=5.1462 isc=1 /",
              " &overlap /",
              " &COUPLING icto=-2 icfrom=1 kind=7 ip1=0 ip2=-1 ip3=5 /",
              " &CFP in=1 ib=1 ia=1 kn=1 a=1.0 /",
              " &CFP in=2 ib=1 ia=1 kn=2 a=1.0 /",
              " &CFP /", " &coupling /"]
    return "\n".join(lines) + "\n"


def run(code):
    with tempfile.TemporaryDirectory() as d:
        open(os.path.join(d, "in"), "w").write(deck(code))
        with open(os.path.join(d, "in")) as fin, open(os.path.join(d, "out"), "w") as fout:
            subprocess.run(["fresco"], stdin=fin, stdout=fout, cwd=d, check=True)
        out = open(os.path.join(d, "out")).read()
        # fort.202: the (d,p) angular distribution, theta_cm vs mb/sr
        rows = [l.split() for l in open(os.path.join(d, "fort.202")) if l.strip() and l.split()[0][0] in "0123456789."]
        a = np.array([[float(r[0]), float(r[1])] for r in rows])
        bes = re.findall(r"BE\s*=\s*([-\d.]+)", out)
        return a, out


if __name__ == "__main__":
    res = {}
    for code in ("kd02", "ch89"):
        a, out = run(code)
        res[code] = a
        m = re.findall(r"Cumulative outgoing cross sections in partition 2 :\s*([\d.E+-]+)", out)
        print(f"{code}: sigma(d,p) = {m[-1] if m else '?'} mb; peak {a[:,1].max():.3f} mb/sr at {a[a[:,1].argmax(),0]:.0f} deg")
        open(os.path.join(HERE, f"dp48ca_{code}.out"), "w").write(out)
    np.savez(os.path.join(HERE, "dp48ca_curves.npz"), theta=res["kd02"][:, 0],
             kd02=res["kd02"][:, 1], ch89=res["ch89"][:, 1])
