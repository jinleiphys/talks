#!/usr/bin/env python3
"""
DREB 2026, slide 3 figure "dp48ca" (three click states).

Claim: one measured angular distribution, two global nucleon potentials, two spectroscopic
factors. Both ADWA curves describe the forward peak; normalized to the same data they give
S = 0.49 (KD02) and S = 0.58 (CH89). The data cannot choose between them.

Data: 48Ca(d,p)49Ca(g.s.), E_d = 10 MeV, Brown, Denning, Macgregor, Nucl. Phys. A 153, 145
(1970), EXFOR F0910020 (relative, c.m.), put on an absolute scale with the same paper's
36.6 mb/sr at 12.5 deg lab (EXFOR F0910027, converted to c.m.; 10% systematic).
Calculations: run_dp48ca.py (finite-range ADWA, converged to 0.1% in hcm, jtmax, rnl, nnu).
S is fitted over theta_cm <= 25 deg, the forward peak.

States: 0 = data only, 1 = S = 1 calculations, 2 = each scaled by its fitted S.
"""
import os
import sys

import numpy as np
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "..", "qfs-rb-2026", "figures"))
from kami_style import PAPER, STONE, CHARCOAL, INK_BLUE, GAP_RED, BB  # noqa: E402

c = np.load(os.path.join(HERE, "dp48ca_curves.npz"))
d = np.load(os.path.join(HERE, "dp48ca_data.npz"))
th, y, e = d["theta"], d["sigma"], d["err"]
TFIT = 25.0


def fit_S(calc):
    m = th <= TFIT
    w = 1 / e[m] ** 2
    ci = np.interp(th[m], c["theta"], calc)
    return np.sum(w * y[m] * ci) / np.sum(w * ci * ci)


S = {k: fit_S(c[k]) for k in ("kd02", "ch89")}
COL = {"kd02": INK_BLUE, "ch89": GAP_RED}
NAME = {"kd02": "KD02", "ch89": "CH89"}

for state in (0, 1, 2):
    fig, ax = plt.subplots(figsize=(5.0, 3.9))
    fig.patch.set_facecolor(PAPER)
    ax.set_facecolor(PAPER)
    m = c["theta"] <= 92
    if state >= 1:
        for k in ("kd02", "ch89"):
            scale = S[k] if state == 2 else 1.0
            ax.plot(c["theta"][m], scale * c[k][m], color=COL[k], lw=2.4, zorder=4)
    ax.errorbar(th, y, yerr=e, fmt="o", ms=6.5, mfc=CHARCOAL, mec=CHARCOAL, ecolor=CHARCOAL,
                elinewidth=1.1, capsize=0, zorder=6)
    if state == 0:
        ax.text(3, 2.6, "measured", color=CHARCOAL, fontsize=16, ha="left", va="center", bbox=BB)
    elif state == 1:
        ax.text(3, 2.6, "KD02,  S = 1", color=INK_BLUE, fontsize=16, ha="left", va="center", bbox=BB, zorder=8)
        ax.text(3, 1.4, "CH89,  S = 1", color=GAP_RED, fontsize=16, ha="left", va="center", bbox=BB, zorder=8)
    else:
        ax.text(3, 2.6, f"KD02 x {S['kd02']:.2f}", color=INK_BLUE, fontsize=16, ha="left", va="center", bbox=BB, zorder=8)
        ax.text(3, 1.4, f"CH89 x {S['ch89']:.2f}", color=GAP_RED, fontsize=16, ha="left", va="center", bbox=BB, zorder=8)
    ax.set_yscale("log")
    ax.set_xlim(0, 90)
    ax.set_ylim(0.8, 150)
    ax.set_xticks([0, 30, 60, 90])
    ax.set_xlabel(r"$\theta_{\rm c.m.}$  (deg)", labelpad=5)
    ax.set_ylabel(r"$d\sigma/d\Omega$  (mb/sr)", labelpad=4)
    ax.tick_params(axis="both", length=5.5, width=1.0, labelsize=14)
    ax.tick_params(which="minor", length=3, width=0.8)
    ax.text(0.97, 0.94, r"$^{48}$Ca(d,p)$^{49}$Ca(g.s.),  $E_d$ = 10 MeV", transform=ax.transAxes,
            ha="right", va="top", fontsize=13, color=STONE, bbox=BB, zorder=9)
    fig.tight_layout()
    fig.savefig(os.path.join(HERE, f"dp48ca_{state}.png"), dpi=300, facecolor=PAPER, bbox_inches="tight")
    plt.close(fig)

print({k: round(v, 3) for k, v in S.items()}, f"ratio {S['ch89'] / S['kd02']:.3f}")
