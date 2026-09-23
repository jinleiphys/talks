"""Shared kami palette and APS closed-box rcParams for the QFS-RB 2026 figures."""
import matplotlib as mpl
mpl.use("Agg")
PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, OLIVE, INK_BLUE, MOSS = "#66655f", "#5e5d59", "#1B365D", "#4a6b3a"
INK_TINT, GAP_RED, SAND = "#E4ECF5", "#b53333", "#e8e6dc"
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
BB = dict(facecolor=PAPER, edgecolor="none", pad=2.0)
