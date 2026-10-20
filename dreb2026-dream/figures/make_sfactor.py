#!/usr/bin/env python3
"""
DREB 2026, slide 3 figure "sfactor".

Claim: one reaction, one target, four beam energies. With a global optical potential the
extracted spectroscopic factor moves by 43 percent, from 0.77 at 19.3 MeV to 1.10 at
56 MeV, with no new measurement between them. With a dispersive potential, whose real part
is tied to the measured imaginary part by a dispersion relation, it holds: 0.67 to 0.72.
Those two swings are printed at the end of this script; the deck's sentence and its takeaway
quote the 43 percent, and it is the global series' own swing, not the distance between the
two series at any one energy. The figure therefore labels the arrow at 56 MeV with the two
values it spans (1.10 and 0.70, which are 57 percent apart relative to the lower one) rather
than with a percentage, so that the only percentage the audience hears is the one the slide
is making.

Every number is published. Source: Nguyen et al., Phys. Rev. C 84, 044611 (2011), Table II,
spectroscopic factor for the ground state of 49Ca from 48Ca(d,p)49Ca. Both columns use the
same overlap function, so the difference between the two series is the optical potential
alone. Nothing here is computed by us.

The comparison is the previous slide's point made concrete: the published number is a
quotient, and the denominator is a choice.
"""
import os
import sys

import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

# The kami palette and the APS closed-box rcParams live once, in the sibling talk's
# figure directory. Importing them keeps a single definition rather than a second copy.
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "..", "..", "qfs-rb-2026", "figures"))
import kami_style  # noqa: F401,E402

PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, OLIVE, INK_BLUE, GAP_RED, SAND = "#66655f", "#5e5d59", "#1B365D", "#b53333", "#e8e6dc"

E = np.array([2.0, 13.0, 19.3, 56.0])
GLOBAL = np.array([0.94, 0.82, 0.77, 1.10])
DISPERSIVE = np.array([0.72, 0.67, 0.68, 0.70])

BB = dict(facecolor=PAPER, edgecolor="none", pad=2.0)

# Slide typography: a sans face close to the deck's Inter, lighter frame and ticks.
plt.rcParams.update({"font.family": "sans-serif", "font.sans-serif": ["Helvetica Neue", "Helvetica", "Arial"],
                     "mathtext.fontset": "custom", "mathtext.rm": "Helvetica Neue", "mathtext.it": "Helvetica Neue:italic",
                     "axes.edgecolor": "#b9b6aa", "xtick.color": "#66655f", "ytick.color": "#66655f"})

# Dumbbell: the four measured energies as categories, so nothing is drawn between them.
X = np.arange(len(E))
fig, ax = plt.subplots(figsize=(6.4, 4.1))
fig.patch.set_facecolor(PAPER)
ax.set_facecolor(PAPER)

# Reference: large-basis shell model (Oxbash), Tsang, Lee, Lynch, PRL 95, 222501 (2005), Table 1.
S_SM = 0.92
ax.axhline(S_SM, xmin=0.0, xmax=0.80, color="#8a877c", lw=1.4, ls=(0, (5, 4)), zorder=1)
ax.text(1.5, S_SM + 0.012, "shell model 0.92", color="#6f6c62", fontsize=12.5, ha="center", va="bottom")

for x, g, d in zip(X, GLOBAL, DISPERSIVE):
    ax.plot([x, x], [d, g], color="#cfcabd", lw=3.0, solid_capstyle="round", zorder=2)
ax.plot(X, GLOBAL, ls="none", marker="o", ms=15, mfc=INK_BLUE, mec=PAPER, mew=2.0, zorder=5)
ax.plot(X, DISPERSIVE, ls="none", marker="o", ms=13, mfc=PAPER, mec=GAP_RED, mew=2.8, zorder=5)
for x, g, d in zip(X, GLOBAL, DISPERSIVE):
    ax.text(x + 0.13, g, f"{g:.2f}", color=INK_BLUE, fontsize=14, ha="left", va="center", fontweight="medium", bbox=dict(facecolor=PAPER, edgecolor="none", pad=1.0), zorder=6)
    ax.text(x + 0.13, d, f"{d:.2f}", color=GAP_RED, fontsize=14, ha="left", va="center", fontweight="medium", bbox=dict(facecolor=PAPER, edgecolor="none", pad=1.0), zorder=6)

# Each series' spread over the four energies.
def bracket(x, lo, hi, color, text):
    ax.plot([x, x], [lo, hi], color=color, lw=2.0, solid_capstyle="butt")
    for y in (lo, hi):
        ax.plot([x - 0.06, x], [y, y], color=color, lw=2.0, solid_capstyle="butt")
    ax.text(x + 0.09, 0.5 * (lo + hi), text, color=color, fontsize=18, ha="left", va="center", fontweight="bold")
bracket(3.62, GLOBAL.min(), GLOBAL.max(), INK_BLUE, f"{100*(GLOBAL.max()/GLOBAL.min()-1):.0f}%")
bracket(3.62, DISPERSIVE.min(), DISPERSIVE.max(), GAP_RED, f"{100*(DISPERSIVE.max()/DISPERSIVE.min()-1):.0f}%")

# Legend as direct labels, top left.
ax.plot([-0.32], [1.155], ls="none", marker="o", ms=11, mfc=INK_BLUE, mec=PAPER)
ax.text(-0.2, 1.155, "global potential (CH89)", fontsize=13.5, color=INK_BLUE, va="center")
ax.plot([-0.32], [1.095], ls="none", marker="o", ms=10, mfc=PAPER, mec=GAP_RED, mew=2.4)
ax.text(-0.2, 1.095, "dispersive potential (DOM)", fontsize=13.5, color=GAP_RED, va="center")

ax.set_xlim(-0.45, 4.4)
ax.set_ylim(0.58, 1.2)
ax.set_xticks(X)
ax.set_xticklabels([f"{e:g}" for e in E])
ax.set_yticks([0.6, 0.8, 1.0])
ax.minorticks_off()
ax.set_xlabel(r"deuteron energy  (MeV)", labelpad=8, fontsize=14, color="#4d4c48")
ax.set_ylabel(r"spectroscopic factor  $S$", labelpad=8, fontsize=14, color="#4d4c48")
ax.tick_params(axis="both", length=5, width=0.9, labelsize=14)
ax.tick_params(axis="x", length=0, pad=8)

fig.tight_layout()
for ext in ("png", "pdf"):
    fig.savefig(os.path.join(os.path.dirname(os.path.abspath(__file__)), f"sfactor.{ext}"),
                dpi=300, facecolor=PAPER, bbox_inches="tight")

print(f"global      {GLOBAL.min():.2f} to {GLOBAL.max():.2f}   "
      f"swing {100*(GLOBAL.max()/GLOBAL.min()-1):.0f} percent")
print(f"dispersive  {DISPERSIVE.min():.2f} to {DISPERSIVE.max():.2f}   "
      f"swing {100*(DISPERSIVE.max()/DISPERSIVE.min()-1):.0f} percent")
print("wrote sfactor")
