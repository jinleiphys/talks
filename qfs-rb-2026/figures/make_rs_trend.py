#!/usr/bin/env python3
"""
QFS-RB 2026, hero figure "rs-trend".

Claim: with the physical kick energy the core-destruction correction leaves the measured
Delta S trend where it was, while under the average-impact-parameter approximation the same
construction flattens it.

What is drawn and where it comes from:
  * the trend line R_s = 0.61 - 0.016 dS is Tostevin and Gade's published Eq. (2);
  * the band is the half-width 0.1 scatter stated in the caption of their Fig. 2, which is
    the spread of the compilation and NOT a fit uncertainty;
  * the two fans are this work: for each (kernel, W) the corrected ratio is R_s/f evaluated
    at the two 40Si channels, dS = -+18.38 MeV, which fixes a slope.

The compilation's points are now drawn too. They are read from the vector drawing operators of
that figure and calibrated on its own major ticks, not pixel-digitised and not identified by
colour sampling. Validated against the only two points the paper prints numerically in its
text, 16C(-p) at Rs = 0.34(4), dS = 18.1 and 25F(-p) at Rs = 0.48(5), dS = 10.17. Both exact.
Error bars are not extracted, so none are drawn.

Normalisation note, stated on the figure: each corrected line is anchored to the measured
line at dS = 0. The absolute level of R_s/f is not the claim, only its slope, because f is a
correction to sigma_sp whose overall scale carries the return factor that is not computed.
"""
import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, OLIVE, INK_BLUE = "#66655f", "#5e5d59", "#1B365D"
INK_TINT, GAP_RED, GAP_TINT = "#E4ECF5", "#b53333", "#f3e6e0"

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

R0, M0, HALF = 0.61, -0.016, 0.10          # Tostevin and Gade, Eq. (2) and the stated scatter
DS = 18.38                                  # the 40Si pair

# f (deep, weak) per kernel and W set, exactly the D3.1 table
F = {"eq7":     {"MR07a": (0.3062, 0.5770), "MR07b": (0.2282, 0.5875), "WLH": (0.3323, 0.6814)},
     "impulse": {"MR07a": (0.5239, 0.7000), "MR07b": (0.4636, 0.7285), "WLH": (0.4530, 0.6999)}}


def slope(fd, fw):
    """Two-point slope of R_s/f across the 40Si pair."""
    return ((R0 + M0 * DS) / fd - (R0 - M0 * DS) / fw) / (2 * DS)


x = np.linspace(-25, 25, 2)
fig, ax = plt.subplots(figsize=(10.4, 5.8))
fig.patch.set_facecolor(PAPER)
ax.set_facecolor(PAPER)

# the compilation itself
P = np.genfromtxt("tg2021_points.dat", dtype=None, encoding="utf-8",
                  names=["ds", "rs", "marker", "series"])
STYLE = {"n-removal": (GAP_RED, "n removal"),
         "p-removal": (INK_BLUE, "p removal"),
         "eep":       (CHARCOAL, r"($e,e'p$)")}

# the measured trend and its scatter
ax.fill_between(x, R0 + M0 * x - HALF, R0 + M0 * x + HALF,
                color="#e8e6dc", alpha=0.75, linewidth=0, zorder=1)
ax.plot(x, R0 + M0 * x - HALF, color=STONE, lw=1.0, ls=(0, (5, 4)), zorder=2)
ax.plot(x, R0 + M0 * x + HALF, color=STONE, lw=1.0, ls=(0, (5, 4)), zorder=2)
ax.plot(x, R0 + M0 * x, color=NEAR_BLACK, lw=2.4, zorder=6)

for ser, (col, _) in STYLE.items():
    m = P["series"] == ser
    for mk, fc, ms in (("circle", col, 4.6), ("square", PAPER, 5.0)):
        mm = m & (P["marker"] == mk)
        if not mm.any():
            continue
        ax.plot(P["ds"][mm], P["rs"][mm], ls="none",
                marker="o" if mk == "circle" else "s",
                mfc=fc, mec=col, mew=1.0, ms=ms, alpha=0.85, zorder=5)

# the two families. ONE nucleus, two channels, so the chord is drawn only between the two
# points it connects. Extrapolating a two-point chord across a 60-system compilation would
# claim a systematics we have not computed; that needs the other four channels (24Si, 12C).
xs = np.array([-DS, DS])
FANS = [("eq7", GAP_RED, 0.75), ("impulse", INK_BLUE, 0.85)]
env = {}
for key, col, al in FANS:
    ms = [slope(*F[key][w]) for w in ("MR07a", "MR07b", "WLH")]
    env[key] = (min(ms), max(ms))
    ax.fill_between(xs, R0 + max(ms) * xs, R0 + min(ms) * xs,
                    color=col, alpha=0.17, linewidth=0, zorder=3)
    for m in ms:
        ax.plot(xs, R0 + m * xs, color=col, lw=2.0, alpha=al, zorder=4,
                solid_capstyle="round")
        ax.plot(xs, R0 + m * xs, color=col, marker="o", ms=5.5, ls="none", zorder=5)

ax.set_xlim(-25, 25)
ax.set_ylim(0.13, 1.24)
ax.set_xlabel(r"$\Delta S$   (MeV)", labelpad=6)
ax.set_ylabel(r"$R_s$")
ax.tick_params(axis="both", length=5.5, width=1.0, labelsize=13.5)
ax.tick_params(which="minor", length=3, width=0.8)

BB = dict(facecolor=PAPER, edgecolor="none", pad=2.0)

# the two 40Si channels
for sgn, name, ha in ((-1, r"$^{40}$Si($-n$)", "right"), (+1, r"$^{40}$Si($-p$)", "left")):
    ax.plot([sgn * DS, sgn * DS], [0.13, R0 + M0 * sgn * DS], color=STONE, lw=0.9,
            ls=(0, (2, 3)), zorder=2)
    ax.text(sgn * DS + sgn * 0.8, 0.175, name, color=OLIVE, fontsize=13.5,
            ha=ha, va="center", bbox=BB, zorder=8)

# direct labels, placed in clear space on the left where the fans separate most
ax.text(-24.2, 1.155, "under their Eq. (7):  the tilt flattens",
        color=GAP_RED, fontsize=15, ha="left", va="center", bbox=BB, zorder=8)
ax.text(-24.2, 1.045, "with the physical kick:  the tilt survives",
        color=INK_BLUE, fontsize=15, ha="left", va="center", bbox=BB, zorder=8)
ax.text(19.5, 0.79, "measured\ntrend", color=NEAR_BLACK, fontsize=14, ha="center",
        va="center", linespacing=1.3, bbox=BB, zorder=8)
ax.annotate("", xy=(23.0, R0 + M0 * 23.0), xytext=(20.6, 0.71),
            arrowprops=dict(arrowstyle="-", color=CHARCOAL, lw=1.0), zorder=7)

fig.tight_layout()
fig.subplots_adjust(bottom=0.255)
fig.text(0.5, 0.045,
         "Points, line and band: Tostevin and Gade, Phys. Rev. C 103, 054610 (2021). The points are read from that figure's own\n"
         "vector operators and tick calibration, and reproduce the two values its text quotes exactly. Error bars not extracted.\n"
         r"Chords: this work, $^{40}$Si alone. Two channels, one nucleus, so this is a two-point chord and NOT a fit to the compilation;"
         "\nthe other four channels are not computed yet. Each chord is anchored at "
         r"$\Delta S$ = 0, because only its tilt is the claim.",
         ha="center", va="bottom", fontsize=12.5, color=STONE, linespacing=1.45)

for ext in ("png", "pdf"):
    fig.savefig(f"rs-trend.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")

for key, _, _ in FANS:
    lo, hi = env[key]
    print(f"{key:8s} slope {lo:+.4f} to {hi:+.4f}  ->  flattening "
          f"{100*(1-hi/M0):+.1f}% to {100*(1-lo/M0):+.1f}%")
print("wrote rs-trend")
