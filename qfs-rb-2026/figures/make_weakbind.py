#!/usr/bin/env python3
"""
QFS-RB 2026, "weak-binding limit".

Claim: in the M1 construction the survival factor f rises toward 1 as the removed nucleon's
binding weakens, fastest for the s wave, i.e. b becomes a spectator as x moves out of it.

Data: threebodyreaction calc/plan_d/D3_results.md, section "Weak-binding limit" (runs/wbl_*).
40Si(-n), only S_eff varied, E_F and W fixed, M1, no return, f = RATIO(raw)/RATIO(pw).
The s-wave point at 1.0 MeV is box-limited (norm rho_Ei = 0.980) and drawn open.
"""
import matplotlib.pyplot as plt
from kami_style import *

D = {("1s1/2", "MR07a"): ([7.759, 2.0, 1.0], [0.5778, 0.7391, 0.7985]),
     ("1s1/2", "WLH"):   ([7.759, 2.0, 1.0], [0.6876, 0.8174, 0.8600]),
     ("0f7/2", "MR07a"): ([4.913, 2.0, 1.0], [0.5845, 0.6350, 0.6624]),
     ("0f7/2", "WLH"):   ([4.913, 2.0, 1.0], [0.6834, 0.7344, 0.7590])}
COL = {"1s1/2": INK_BLUE, "0f7/2": MOSS}
LS = {"MR07a": "-", "WLH": (0, (5, 3))}

fig, ax = plt.subplots(figsize=(9.6, 5.6))
fig.patch.set_facecolor(PAPER); ax.set_facecolor(PAPER)
ax.axhline(1.0, color=CHARCOAL, lw=1.2, ls=(0, (2, 3)), zorder=1)
ax.text(8.35, 1.0, "f = 1:  b a spectator", color=CHARCOAL, fontsize=14, ha="right", va="bottom", bbox=BB)
for (orb, w), (s, f) in D.items():
    c = COL[orb]
    ax.plot(s, f, color=c, ls=LS[w], lw=2.2, zorder=3)
    for si, fi in zip(s, f):
        boxlim = (orb == "1s1/2" and si == 1.0)
        ax.plot(si, fi, "o", ms=8, mec=c, mew=1.6, mfc=PAPER if boxlim else c, zorder=4)
# physical points
for orb, sp in (("1s1/2", 7.759), ("0f7/2", 4.913)):
    ax.axvline(sp, color=COL[orb], lw=0.9, ls=(0, (1, 3)), alpha=0.7, zorder=1)
    ax.text(sp, 0.525, "physical\n" + {"1s1/2": r"1$s_{1/2}$", "0f7/2": r"0$f_{7/2}$"}[orb], color=COL[orb], fontsize=12.5, ha="center", va="bottom",
            linespacing=1.15, bbox=BB)
# direct labels
ax.text(2.4, 0.875, r"1$s_{1/2}$ (no barrier)", color=INK_BLUE, fontsize=15, ha="left", va="center", bbox=BB)
ax.text(1.05, 0.552, r"0$f_{7/2}$ (held in by the barrier)", color=MOSS, fontsize=15, ha="left", va="center", bbox=BB)
ax.text(5.9, 0.93, "solid: MR07a\ndashed: WLH", color=CHARCOAL, fontsize=13, ha="left", va="center",
        linespacing=1.3, bbox=BB)
ax.annotate("", xy=(0.45, 0.945), xytext=(3.0, 0.945),
            arrowprops=dict(arrowstyle="->", color=STONE, lw=1.4))
ax.text(1.72, 0.955, "weaker binding", color=STONE, fontsize=13, ha="center", va="bottom", bbox=BB)
ax.set_xlim(0, 8.5); ax.set_ylim(0.5, 1.06)
ax.set_xlabel(r"separation energy of the removed nucleon, $S_{\rm eff}$  (MeV)", labelpad=6)
ax.set_ylabel(r"survival factor  $f$")
ax.tick_params(axis="both", length=5.5, width=1.0, labelsize=13.5)
ax.tick_params(which="minor", length=3, width=0.8)
fig.tight_layout()
for ext in ("png", "pdf"):
    fig.savefig(f"weakbind.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")
print("wrote weakbind")
