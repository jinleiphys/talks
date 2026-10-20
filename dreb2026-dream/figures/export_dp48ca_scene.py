#!/usr/bin/env python3
"""Real radial quantities for the slide-3 three.js scene, exported to dp48ca_scene.json (fm, MeV).
- nucleus: shape of the KD02 real potential for d+48Ca at E_d/2 (n and p radii equal), R and a
- W_kd, W_ch: imaginary part of the Johnson-Soper adiabatic potential U_n + U_p at 5 MeV
- u2p: 2p3/2 neutron bound state in the binding well of run_dp48ca.py (r0 1.25, a 0.65, Vso 6),
  depth fitted to Sn = 5.1462 MeV, normalized int u^2 dr = 1
- prof_kd, prof_ch: -d sigma/d cutc from scan_dp48ca_cutc.py (radial contribution, mb/fm)
- transmission T(b) = exp(-(2/hbar v) int W dz) on a straight line (eikonal, no Coulomb), for the
  deuteron beam drawn in the scene"""
import json, os, re, sys
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import run_dp48ca as R

A13 = 48 ** (1 / 3)
r = np.arange(0.0, 16.0001, 0.05)

def central(code):
    V = np.zeros_like(r); W = np.zeros_like(r)
    for l in R.adiabatic(code)[1:]:
        p = {k: float(v) for k, v in re.findall(r"(p\d)=([-\d.]+)", l)}
        if "type=1" in l:
            V += p["p1"] / (1 + np.exp((r - p["p2"] * A13) / p["p3"]))
            W += p.get("p4", 0) / (1 + np.exp((r - p.get("p5", 1) * A13) / p.get("p6", 1)))
        if "type=2" in l:
            x = np.exp((r - p["p5"] * A13) / p["p6"]); W += 4 * p["p4"] * x / (1 + x) ** 2
    return V, W

Vkd, Wkd = central("kd02"); Vch, Wch = central("ch89")
kdp = {k: float(v) for k, v in re.findall(r"(p\d)=([-\d.]+)", [l for l in R.adiabatic("kd02") if "type=1" in l][0])}
R_nuc, a_nuc = kdp["p2"] * A13, kdp["p3"]

# bound state: Numerov, l = 1, j = 3/2 (l.s = 1/2), Thomas spin-orbit with (hbar/m_pi c)^2 = 2 fm^2
hb2m = 20.736 * (1 + 1 / 48)            # hbar^2/(2 mu), mu = m_n*48/49
Rb, ab = 1.25 * A13, 0.65
def V_of(V0, rr):
    f = 1 / (1 + np.exp((rr - Rb) / ab)); df = -f * (1 - f) / ab
    return -V0 * f + 6.0 * 2.0 * (1 / np.maximum(rr, 1e-6)) * df * 0.5
def shoot(V0, E=-5.1462, h=0.01, rmax=30.0):
    rr = np.arange(h, rmax, h); k = (E - V_of(V0, rr)) / hb2m - 2 / rr ** 2
    u = np.zeros_like(rr); u[0], u[1] = h ** 2, (2 * h) ** 2
    for i in range(1, len(rr) - 1):
        u[i + 1] = (2 * u[i] * (1 - 5 * h * h * k[i] / 12) - u[i - 1] * (1 + h * h * k[i - 1] / 12)) / (1 + h * h * k[i + 1] / 12)
    return rr, u
def nodes(u, rr): return int(np.sum(np.diff(np.sign(u[rr < 12])) != 0))
def tail(V0):
    rr, u = shoot(V0, rmax=16.0); return u[-1] / np.max(np.abs(u)), nodes(u, rr)
grid = np.arange(35.0, 65.0, 0.5); vals = [tail(v) for v in grid]
k = next(i for i in range(len(grid) - 1) if vals[i][1] <= 1 and np.sign(vals[i][0]) != np.sign(vals[i + 1][0]))
lo, hi = grid[k], grid[k + 1]
for _ in range(60):
    mid = 0.5 * (lo + hi)
    if np.sign(tail(mid)[0]) == np.sign(tail(lo)[0]): lo = mid
    else: hi = mid
V0 = 0.5 * (lo + hi); rr, u = shoot(V0, rmax=16.0)
u[rr > 14] = 0  # drop the divergent end of the outward solution
u = u / np.sqrt(np.trapezoid(u ** 2, rr)); u *= np.sign(u[np.searchsorted(rr, 8.0)])
u2p = np.interp(r, rr, u)
print(f"bound-state depth {V0:.3f} MeV (FRESCO: 48.18), nodes {nodes(u, rr)}")

sc = np.load(os.path.join(HERE, "dp48ca_cutc.npz"))
def prof(tot):
    rc = sc["cut"]; d = -np.gradient(tot, rc)
    return np.interp(r, rc, d)

# eikonal transmission of the deuteron (E = 10 MeV): hbar v = hbar c * v/c
hbv = 197.327 * np.sqrt(2 * 10.0 / 1875.6)
def T(W):
    b = np.arange(0, 16.0001, 0.25); z = np.linspace(-20, 20, 2001); out = []
    for bb in b:
        out.append(np.exp(-(2 / hbv) * np.trapezoid(np.interp(np.hypot(bb, z), r, W, right=0), z)))
    return b, np.array(out)
bT, Tkd = T(Wkd); _, Tch = T(Wch)

def frac_band(tot, lo_f=0.9, hi_f=0.1):
    rc, t = sc["cut"], tot / tot[0]
    i = np.where(t[rc > 5.5] < lo_f)[0][0]; j = np.where(t[rc > 5.5] < hi_f)[0][0]
    rr5 = rc[rc > 5.5]; tt5 = t[rc > 5.5]
    a = np.interp(lo_f, tt5[::-1], rr5[::-1]); b = np.interp(hi_f, tt5[::-1], rr5[::-1]); return a, b
bkd = frac_band(sc["kd02_tot"]); bch = frac_band(sc["ch89_tot"])
r1 = lambda W: float(r[np.where(W > 1.0)[0][-1]])
out = dict(r=r.round(3).tolist(), R_nuc=R_nuc, a_nuc=a_nuc,
           W_kd=Wkd.round(4).tolist(), W_ch=Wch.round(4).tolist(), u2p=u2p.round(5).tolist(),
           prof_kd=prof(sc["kd02_tot"]).round(3).tolist(), prof_ch=prof(sc["ch89_tot"]).round(3).tolist(),
           b=bT.tolist(), T_kd=Tkd.round(4).tolist(), T_ch=Tch.round(4).tolist(),
           band_kd=bkd, band_ch=bch, rW1_kd=r1(Wkd), rW1_ch=r1(Wch))
json.dump(out, open(os.path.join(HERE, "dp48ca_scene.json"), "w"))
print(f"R_nuc {R_nuc:.2f} a {a_nuc:.3f}; 80% transfer band KD02 {bkd[0]:.2f}-{bkd[1]:.2f}, CH89 {bch[0]:.2f}-{bch[1]:.2f} fm")
print(f"W = 1 MeV at r = {out['rW1_kd']:.2f} (KD02), {out['rW1_ch']:.2f} (CH89) fm")
for bb in (5, 6, 7, 8, 9, 10): i = int(bb / 0.25); print(f"T(b={bb}) KD02 {Tkd[i]:.3f} CH89 {Tch[i]:.3f}")
