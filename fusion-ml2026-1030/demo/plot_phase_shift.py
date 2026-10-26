# Slide figure: square-well n-p s-wave phase shift, Numerov vs analytic, two mass choices.
import csv, matplotlib as mpl, matplotlib.pyplot as plt
mpl.rcParams.update({
    "font.family": "sans-serif", "font.sans-serif": ["Arial", "Helvetica", "DejaVu Sans"],
    "svg.fonttype": "none", "pdf.fonttype": 42, "font.size": 17,
    "axes.linewidth": 1.1, "xtick.direction": "in", "ytick.direction": "in",
    "xtick.top": True, "ytick.right": True, "xtick.minor.visible": True, "ytick.minor.visible": True,
    "xtick.major.size": 6, "ytick.major.size": 6, "xtick.minor.size": 3, "ytick.minor.size": 3,
    "axes.grid": False, "legend.frameon": False,
})
GREEN, PINK, INK = "#6BAA7A", "#E58CA3", "#141413"
rows = list(csv.DictReader(open("demo/phase_shift.csv")))
col = lambda k: [float(r[k]) for r in rows]
E = col("E")
def draw(series, name):
    fig, ax = plt.subplots(figsize=(7.2, 4.6))
    for key, c, lab in series:
        ax.plot(E, col("exact_" + key), color=c, lw=2.4, label=f"{lab}: analytic")
        ax.plot(E[::8], col("num_" + key)[::8], "o", ms=7, mfc="white", mec=c, mew=1.8, label=f"{lab}: Numerov")
    ax.set_xlim(0, 50); ax.set_ylim(0, 190)
    ax.set_xlabel("E (MeV)"); ax.set_ylabel(r"$\delta_0$ (deg)")
    ax.legend(loc="upper right", fontsize=13.5, handlelength=1.6)
    fig.tight_layout()
    for ext in ("svg", "png"):
        fig.savefig(f"figures/{name}.{ext}", dpi=220, bbox_inches="tight", transparent=True)

OK = ("ok", GREEN, "reduced mass")
BAD = ("bad", PINK, "nucleon mass (slip)")
draw([OK], "phase-shift-ok")
draw([OK, BAD], "phase-shift-slip")
