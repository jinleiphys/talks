#!/usr/bin/env python3
"""
QFS-RB 2026, "R_s with the compound-nucleus return".

Claim: under M1 the correction tilts the Delta S trend of both pairs toward flat once the
compound-nucleus return is included; without it 24Si barely moves.

Data: threebodyreaction calc/plan_d/D3_results.md, sections D3.4 and D3.5, MR07a only.
Line, band: Tostevin and Gade, PRC 103, 054610 (2021), Eq. (2) and the half-width 0.1 scatter.
Points: tg2021_points.dat (vector-operator extraction, validated; no error bars).
Chords: R_s/f at the pair's two channels, anchored at Delta S = 0 because only the tilt is the claim.
"""
import numpy as np
import matplotlib.pyplot as plt
from kami_style import *

R0, M0, HALF = 0.61, -0.016, 0.10
SYS = {r"$^{40}$Si": dict(ds=18.38, fd=0.3062, fw={"no return": 0.5770, "PACE": 0.7777, "GEMINI": 0.7338},
                            lab=(r"$-n$", r"$-p$")),
       r"$^{24}$Si": dict(ds=17.984, fd=0.3594, fw={"no return": 0.6063, "PACE": 0.8089, "GEMINI": 0.6731},
                            lab=(r"$-p$", r"$-n$"))}
STY = {"no return": (STONE, (0, (5, 3))), "PACE": (INK_BLUE, "-"), "GEMINI": (MOSS, "-")}
P = np.genfromtxt("tg2021_points.dat", dtype=None, encoding="utf-8", names=["ds", "rs", "marker", "series"])

fig, axs = plt.subplots(1, 2, figsize=(13.2, 5.6), sharey=True)
fig.patch.set_facecolor(PAPER)
x = np.array([-25, 25])
for ax, (name, s) in zip(axs, SYS.items()):
    ax.set_facecolor(PAPER)
    ax.fill_between(x, R0 + M0*x - HALF, R0 + M0*x + HALF, color=SAND, alpha=0.8, lw=0, zorder=1)
    ax.plot(x, R0 + M0*x, color=NEAR_BLACK, lw=2.2, zorder=5)
    ax.plot(P["ds"], P["rs"], "o", ms=4.2, mfc="none", mec=STONE, mew=0.8, alpha=0.55, zorder=2)
    ds = s["ds"]; xs = np.array([-ds, ds])
    for key, fw in s["fw"].items():
        m = ((R0 + M0*ds)/s["fd"] - (R0 - M0*ds)/fw) / (2*ds)
        col, ls = STY[key]
        ax.plot(xs, R0 + m*xs, color=col, ls=ls, lw=2.4, zorder=4)
        ax.plot(xs, R0 + m*xs, "o", color=col, ms=6, zorder=6)
        flat = 100*(1 - m/M0)
        s.setdefault("flat", {})[key] = flat
    for sgn, lab in ((-1, s["lab"][0]), (1, s["lab"][1])):
        ax.axvline(sgn*ds, color=STONE, lw=0.8, ls=(0, (1, 3)), zorder=1)
        ax.text(sgn*ds - sgn*0.6, 0.17, name + "(" + lab + ")", color=OLIVE, fontsize=13,
                ha="right" if sgn < 0 else "left", va="center", bbox=BB, zorder=8)
    y0 = 1.34
    for i, key in enumerate(("no return", "PACE", "GEMINI")):
        col, _ = STY[key]
        ax.text(-24, y0 - 0.075*i, f"{key}:  {s['flat'][key]:+.0f}% of the slope", color=col,
                fontsize=14, ha="left", va="center", bbox=BB, zorder=8)
    ax.text(24, 1.34, name, fontsize=20, ha="right", va="center", color=NEAR_BLACK, bbox=BB)
    ax.set_xlim(-25, 25); ax.set_ylim(0.12, 1.42)
    ax.set_xlabel(r"$\Delta S$   (MeV)", labelpad=6)
    ax.tick_params(axis="both", length=5.5, width=1.0, labelsize=13.5)
    ax.tick_params(which="minor", length=3, width=0.8)
axs[0].set_ylabel(r"$R_s$  and  $R_s/f$")
fig.tight_layout()
for ext in ("png", "pdf"):
    fig.savefig(f"rs-return.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")
for name, s in SYS.items():
    print(name, {k: round(v, 1) for k, v in s["flat"].items()})
print("wrote rs-return")
