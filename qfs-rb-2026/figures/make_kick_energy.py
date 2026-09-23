#!/usr/bin/env python3
"""
QFS-RB 2026, figure "kick-energy".

Claim: the energy the struck nucleon actually receives from the NN collision is broad,
with a mean near 40 MeV, while the average-impact-parameter approximation used in the
published construction collapses it to a single value near 21 MeV at the low end. That
substitution is what decides the Delta S dependence.

Everything plotted comes from kickE_p.dat and kickE_n.dat, written by the same
impulse-kernel object the production runs use. Nothing here is fitted or read off a figure.

Note on the shape: the distribution is bathtub shaped, high at both ends, shallowest
between about 30 and 45 MeV, because the NN elastic amplitude is forward and backward
peaked. So 40.26 MeV is the MEAN, not a peak, and the figure must say so.
"""
import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, OLIVE, INK_BLUE = "#66655f", "#5e5d59", "#1B365D"
INK_TINT, GAP_RED = "#E4ECF5", "#b53333"

mpl.rcParams.update({
    "font.family": "serif",
    "font.serif": ["Charter", "Palatino", "Georgia", "DejaVu Serif", "serif"],
    "svg.fonttype": "none", "pdf.fonttype": 42, "font.size": 15,
    "axes.spines.top": True, "axes.spines.right": True,
    "axes.spines.left": True, "axes.spines.bottom": True,
    "axes.linewidth": 1.0, "axes.edgecolor": CHARCOAL,
    "xtick.direction": "in", "ytick.direction": "in",
    "xtick.top": True, "ytick.right": True,
    "xtick.minor.visible": True, "ytick.minor.visible": True,
    "xtick.color": CHARCOAL, "ytick.color": CHARCOAL,
    "axes.labelcolor": NEAR_BLACK, "text.color": NEAR_BLACK,
    "axes.grid": False, "legend.frameon": False,
})

GAP_TINT = "#f3e6e0"
E_M1, E_MEAN = 21.4, 40.26

p = np.loadtxt("kickE_p.dat")
n = np.loadtxt("kickE_n.dat")
ctr, wp, wn = p[:, 0], p[:, 1], n[:, 1]
half = 0.5 * (ctr[1] - ctr[0])
edges = np.concatenate(([ctr[0] - half], ctr + half))

fig, ax = plt.subplots(figsize=(10, 5.5))
fig.patch.set_facecolor(PAPER)
ax.set_facecolor(PAPER)

# the distribution itself: proton filled, neutron overlaid, they agree to 3 percent
ax.stairs(wp, edges, fill=True, color=GAP_TINT, edgecolor="none", zorder=1)
ax.stairs(wp, edges, color=GAP_RED, linewidth=2.2, zorder=3)
ax.stairs(wn, edges, color=OLIVE, linewidth=1.2, linestyle=(0, (5, 3)), zorder=4)

top = wp.max() * 1.68
ax.set_ylim(0, top)
ax.set_xlim(0, 82)
# stop the tick ladder where the data stops, so the upper third is clean label space
ax.set_yticks([0.0, 0.01, 0.02, 0.03, 0.04])

# the two energies, drawn as segments that stop well below the label row
ax.plot([E_M1, E_M1], [0, top * 0.58], color=INK_BLUE, lw=2.6, zorder=5)
ax.plot([E_MEAN, E_MEAN], [0, top * 0.58], color=GAP_RED, lw=2.6,
        linestyle=(0, (1, 1.6)), zorder=5)

BB = dict(facecolor=PAPER, edgecolor="none", pad=2.0)
ax.annotate("picture A: x's own motion\nin the projectile, 21.4 MeV",
            xy=(E_M1, top * 0.58), xytext=(1.5, top * 0.985),
            ha="left", va="top", color=INK_BLUE, fontsize=15, linespacing=1.35,
            bbox=BB, zorder=7,
            arrowprops=dict(arrowstyle="-", color=INK_BLUE, lw=1.1,
                            connectionstyle="angle,angleA=0,angleB=90,rad=0"))
ax.annotate("picture B: what a free NN kick\nadds, mean 40.3 MeV",
            xy=(E_MEAN, top * 0.58), xytext=(45.0, top * 0.985),
            ha="left", va="top", color=GAP_RED, fontsize=15, linespacing=1.35,
            bbox=BB, zorder=7,
            arrowprops=dict(arrowstyle="-", color=GAP_RED, lw=1.1,
                            connectionstyle="angle,angleA=0,angleB=90,rad=0"))

# one label for both curves: they lie on top of each other, so two direct labels would
# invite the reader to look for a separation that is not there
ax.text(41.0, 0.0088, "removed proton (solid) and neutron (dashed)",
        color=OLIVE, fontsize=14, ha="center", va="center", bbox=BB, zorder=7)

ax.set_xlabel(r"x-b energy scale   (MeV)", labelpad=7)
ax.set_ylabel("probability per bin")
ax.tick_params(axis="both", length=5.5, width=1.0, labelsize=13.5)
ax.tick_params(which="minor", length=3, width=0.8)

ax.text(0.5, -0.185,
        r"$^{40}$Si on $^{9}$Be at 79 MeV/nucleon, folded from the measured $pp$ and $np$ elastic amplitudes."
        "\nHistogram: the energy a free NN kick adds, $q^2/2\\mu$ (picture B). Line A: $\\langle T\\rangle$ of the 40Si($-p$) orbital.",
        transform=ax.transAxes, ha="center", va="top", fontsize=12.5,
        color=STONE, linespacing=1.4)

fig.tight_layout()
for ext in ("png", "pdf"):
    fig.savefig(f"kick-energy.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")
print("wrote kick-energy  (mean p %.2f, n %.2f MeV; peak bin at %.1f MeV)"
      % ((ctr * wp).sum(), (ctr * wn).sum(), ctr[wp.argmax()]))
