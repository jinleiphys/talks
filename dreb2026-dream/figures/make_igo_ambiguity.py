#!/usr/bin/env python3
"""
DREB 2026, slide "The potential is not determined by the data": the figure igo_ambiguity.

Claim: two optical potentials whose real depths differ by 50 percent describe the same
elastic angular distribution within 10 percent errors over the angles usually measured.
They agree only in the surface region; inside they differ by up to 50 percent.

What is drawn (all numbers computed with FRESCO by run_igo_ambiguity.py; nothing fitted
to real data):
  left   the real potentials. A: V = 100 MeV, r = 1.25 fm, a = 0.60 fm (illustrative,
         strongly absorbing W = 20 MeV volume). B: V = 150 MeV with r, a and W refitted to
         A's angular distribution. Shaded: where |U_B/U_A - 1| < 3 percent.
  right  alpha + 58Ni elastic at 40 MeV, ratio to Rutherford. Points: A sampled every 5 deg
         from 5 to 90 deg with 10 percent errors (pseudo-data). Line: B. Beyond 90 deg,
         where alpha data rarely exist, the two separate.
This is the discrete ambiguity of strongly absorbed projectiles (Drisko, Satchler and
Bassel, Phys. Lett. 5, 347 (1963)): V = 130 MeV, between the two families, does not fit
(chi2/N = 7.5 with r, a, W free; run_igo_ambiguity.py a58ni 1.3 90).
"""
import os
import sys

import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "..", "..", "qfs-rb-2026", "figures"))
import kami_style  # noqa: F401,E402  (kami palette + APS closed-box rcParams)

PAPER, CHARCOAL, STONE = "#f5f4ed", "#4d4c48", "#66655f"
INK_BLUE, GAP_RED, SAND = "#1B365D", "#b53333", "#e8e6dc"

HERE = os.path.dirname(os.path.abspath(__file__))
d = np.load(os.path.join(HERE, "igo_ambiguity_a58ni_x1.5.npz"))
r, uA, uB, th, sA, sB = d["r"], d["uA"], d["uB"], d["th"], d["sA"], d["sB"]
print(f"A: V={float(d['VA']):.0f}  B: V={float(d['VB']):.0f} r={float(d['rB']):.3f} "
      f"a={float(d['aB']):.3f} W={float(d['WB']):.2f}  chi2/N={float(d['chi2N']):.3f} "
      f"(5-90 deg), {float(d['chi2N_full']):.2f} (5-175 deg)  J_R/A {float(d['JA']):.0f} vs {float(d['JB']):.0f}")
assert float(d["chi2N"]) < 1.0, "B no longer fits A: the figure would not say what the slide says"

fig, (ax, ay) = plt.subplots(1, 2, figsize=(7.4, 3.0),
                             gridspec_kw=dict(width_ratios=[1.0, 1.15], wspace=0.34,
                                              left=0.085, right=0.985, top=0.95, bottom=0.18))
fig.patch.set_facecolor(PAPER)
for a in (ax, ay):
    a.set_facecolor(PAPER)

# Left: the two real potentials and where they agree.
agree = np.abs(uB / uA - 1) < 0.03
ra = r[agree & (r > 3)]
ax.axvspan(ra.min(), ra.max(), color=SAND, zorder=0)
ax.text(0.5 * (ra.min() + ra.max()), -62, "agree\nwithin 3%", ha="center", va="center",
        fontsize=10, color=CHARCOAL)
ax.plot(r, uA, color=INK_BLUE, lw=2.4, label=r"A: $V$ = 100 MeV")
ax.plot(r, uB, color=GAP_RED, lw=1.8, ls=(0, (5, 3)), label=r"B: $V$ = 150 MeV")
ax.set_xlim(0, 10)
ax.set_ylim(-165, 8)
ax.set_xlabel(r"$r$ (fm)", fontsize=12)
ax.set_ylabel(r"real potential (MeV)", fontsize=12)
ax.legend(loc="lower right", bbox_to_anchor=(1.0, 0.0), frameon=False, fontsize=10.5,
          handlelength=1.8)
ax.tick_params(labelsize=11)

# Right: the angular distributions.
m = (th >= 5) & (th <= 90) & (np.abs(th % 5) < 1e-6)
ay.axvspan(90, 180, color=SAND, zorder=0)
ay.text(135, 2.0, "rarely\nmeasured", ha="center", va="center", fontsize=10, color=CHARCOAL)
ay.plot(th, sA, color=INK_BLUE, lw=0.9, alpha=0.55, zorder=3)
ay.errorbar(th[m], sA[m], yerr=0.1 * sA[m], fmt="o", ms=4.2, color=INK_BLUE, mfc=INK_BLUE,
            mec=PAPER, mew=0.6, elinewidth=1.0, capsize=0, zorder=5, label="A, 10% errors")
ay.plot(th, sB, color=GAP_RED, lw=1.8, ls=(0, (5, 3)), zorder=6, label="B")
ay.set_yscale("log")
ay.set_xlim(0, 180)
ay.set_ylim(1.5e-4, 12)
ay.set_xticks([0, 30, 60, 90, 120, 150, 180])
ay.set_xlabel(r"$\theta_\mathrm{c.m.}$ (deg)", fontsize=12)
ay.set_ylabel(r"$\sigma/\sigma_\mathrm{R}$", fontsize=12)
ay.legend(loc="lower center", bbox_to_anchor=(0.71, 0.0), frameon=False, fontsize=10.5, handlelength=1.8)
ay.text(0.04, 0.96, r"$\alpha$ + $^{58}$Ni, 40 MeV" + "\n" + rf"$\chi^2/N$ = {float(d['chi2N']):.2f} (5 to 90 deg)",
        transform=ay.transAxes, va="top", fontsize=10.5, color=CHARCOAL)
ay.tick_params(labelsize=11)

out = os.path.join(HERE, "igo_ambiguity")
for ext in ("png", "pdf"):
    fig.savefig(f"{out}.{ext}", dpi=300, facecolor=PAPER)
print("wrote igo_ambiguity")
