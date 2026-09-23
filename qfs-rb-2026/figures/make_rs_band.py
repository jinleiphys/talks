#!/usr/bin/env python3
"""
QFS-RB 2026 hero figure (v2).

Claim: the DIRECTION of the reaction-model correction to the R_s(Delta S) systematics is fixed,
its SIZE is not, spanning almost the whole empirical slope between two legitimate readings of
the same published optical potential.

v1 drew three R_s lines pinned at Delta S = 0. Rejected: the lines form a bowtie about the pin,
the wedge flips sides, and the right-hand labels collide. The quantity being compared is
one dimensional, the slope, so the figure is a slope number line.

No R_s data points are drawn. The digitized MSU points are not in hand and are not invented.

Two outputs:
  rs-slope-m1.png    hero slide: the zero-momentum-transfer bracket alone (settled)
  rs-slope-both.png  preliminary slide: adds the physical-kick bracket

Style: kami deck (parchment, single ink-blue accent, serif, no italic), slide-sized type.
A one-dimensional number line, so the APS closed box does not apply; a single baseline spine
carries the scale.
"""
import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
import numpy as np

PAPER      = "#f5f4ed"
NEAR_BLACK = "#141413"
CHARCOAL   = "#4d4c48"
STONE      = "#87867f"
INK_BLUE   = "#1B365D"
INK_TINT   = "#E4ECF5"
GAP_RED    = "#b53333"
GAP_TINT   = "#f3e6e0"

mpl.rcParams.update({
    "font.family": "serif",
    "font.serif": ["Newsreader", "Source Serif 4", "DejaVu Serif", "Georgia", "serif"],
    "svg.fonttype": "none", "pdf.fonttype": 42,
    "font.size": 15,
    "axes.grid": False, "legend.frameon": False,
    "text.color": NEAR_BLACK, "axes.labelcolor": NEAR_BLACK,
    "xtick.color": CHARCOAL, "xtick.direction": "out",
})

M0 = -0.016                       # measured slope, MeV^-1 (Tostevin and Gade representation)
def slope_from_flattening(pct):   # flattening = 1 - m/m0
    return M0 * (1.0 - pct / 100.0)

# zero momentum transfer (the published construction), two legitimate readings of MR07
M1_A, M1_B = slope_from_flattening(9.0), slope_from_flattening(73.8)
# physical NN kick energy (preliminary, this work)
IM_A, IM_B = slope_from_flattening(-17.1), slope_from_flattening(4.9)


def draw(with_impulse: bool, outfile: str):
    """Row layout: one thing per row, and the reference verticals are drawn as segments that
    cross only the bar bands, so no label can ever sit on a line. v2 centred the bar titles and
    they collided horizontally with the reference labels; v3 gives every text its own row."""
    fig, ax = plt.subplots(figsize=(10, 5.4 if with_impulse else 4.2))
    fig.patch.set_facecolor(PAPER); ax.set_facecolor(PAPER)
    BB = dict(facecolor=PAPER, edgecolor="none", pad=1.5)
    bar_h = 0.10

    if with_impulse:
        rows = dict(top=1.10, t_blue=0.88, y_blue=0.72, s_blue=0.575, t_red=0.36, y_red=0.20)
        segs = [(0.46, 1.04), (0.12, 0.29)]
    else:
        rows = dict(top=1.10, t_blue=0.83, y_blue=0.66, s_blue=0.515)
        segs = [(0.40, 1.04)]

    def vline(x, color, lw, ls):
        for y0, y1 in segs:
            ax.plot([x, x], [y0, y1], color=color, lw=lw, ls=ls, zorder=2)

    vline(M0, NEAR_BLACK, 2.4, "-")
    vline(0.0, STONE, 1.4, (0, (4, 3)))
    ax.text(M0, rows["top"], "measured slope", ha="center", va="center",
            color=NEAR_BLACK, fontsize=15.5, bbox=BB, zorder=6)
    ax.text(0.0, rows["top"], "no trend left", ha="center", va="center",
            color=STONE, fontsize=14, bbox=BB, zorder=6)

    def bar(lo, hi, y, face, edge):
        lo, hi = min(lo, hi), max(lo, hi)
        ax.add_patch(Rectangle((lo, y - bar_h / 2), hi - lo, bar_h,
                               facecolor=face, edgecolor=edge, linewidth=1.6, zorder=3))
        for x in (lo, hi):
            ax.plot([x, x], [y - bar_h * 1.05, y + bar_h * 1.05], color=edge, lw=1.8, zorder=4)
        return (lo + hi) / 2

    c = bar(M1_A, M1_B, rows["y_blue"], INK_TINT, INK_BLUE)
    ax.text(c, rows["t_blue"], "what reaction theory allows", ha="center", va="center",
            color=INK_BLUE, fontsize=15.5, bbox=BB, zorder=6)
    ax.text(c, rows["s_blue"], "same potential, two published parameter sets",
            ha="center", va="center", color=STONE, fontsize=13, bbox=BB, zorder=6)

    if with_impulse:
        c = bar(IM_A, IM_B, rows["y_red"], GAP_TINT, GAP_RED)
        ax.text(c, rows["t_red"], "with the physical kick energy   (preliminary)",
                ha="center", va="center", color=GAP_RED, fontsize=15.5, bbox=BB, zorder=6)

    ax.set_xlim(-0.0212, 0.0025)
    ax.set_ylim(0.02 if with_impulse else 0.30, 1.20)
    ax.set_yticks([])
    ax.set_xticks([-0.020, -0.016, -0.012, -0.008, -0.004, 0.0])
    ax.set_xticklabels(["-0.020", "-0.016", "-0.012", "-0.008", "-0.004", "0"])
    ax.set_xlabel(r"slope of $R_s$ against $\Delta S$   (MeV$^{-1}$)", labelpad=8)
    for sp in ("top", "right", "left"):
        ax.spines[sp].set_visible(False)
    ax.spines["bottom"].set_color(CHARCOAL); ax.spines["bottom"].set_linewidth(1.0)
    ax.tick_params(axis="x", length=5, width=1.0, labelsize=13.5)

    fig.tight_layout()
    for ext in ("png", "pdf", "svg"):
        fig.savefig(f"{outfile}.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")
    plt.close(fig)
    print("wrote", outfile)


draw(False, "rs-slope-m1")
draw(True, "rs-slope-both")
