#!/usr/bin/env python3
"""
QFS-RB 2026, figure "w-profiles".

Claim: the three absorptive potentials differ in WHERE the absorption sits, not only in
how deep it is, and the two orbitals sample different parts of it. This is why the
microscopic potential, which has the deepest volume term of the three, does not give the
most suppression.

All six parameter sets are read from the dumps written by the production code itself
(d2_rho_eff.jl --dumpw), and the radial form is rebuilt with the same expression the code
integrates. The bound radial functions are the ones the runs actually used.
"""
import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, OLIVE, INK_BLUE = "#66655f", "#5e5d59", "#1B365D"
GAP_RED, EVIDENCE = "#b53333", "#4a6b3a"

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

E_PHYS = 40.3


def read_w(path, elab):
    """(W_V, R_V, a_V, W_S, R_S, a_S) at the requested E_lab, from the production dump."""
    rows = []
    for line in open(path):
        parts = line.split()
        if len(parts) == 7:
            try:
                rows.append([float(x) for x in parts])
            except ValueError:
                continue
    for row in rows:
        if abs(row[0] - elab) < 1e-6:
            return row[1:]
    raise SystemExit(f"{path}: no row at E_lab = {elab}")


def minus_im_u(r, par):
    """Exactly the assembly d2_rho_eff.jl integrates, with the 4 a_S surface convention."""
    WV, RV, aV, WS, RS, aS = par
    ex = np.exp((r - RV) / aV)
    f = 1.0 / (1.0 + ex)
    exS = np.exp((r - RS) / aS)
    df = -exS / (aS * (1.0 + exS) ** 2)
    return -(WV * f - 4.0 * aS * WS * df)


def density(path, rmax):
    d = np.loadtxt(path)
    r, u = d[:, 0], d[:, 1]
    m = r <= rmax
    r, u = r[m], u[m]
    return r, u ** 2 / np.trapz(u ** 2, r)


RMAX = 9.0
r = np.linspace(0.02, RMAX, 700)

SETS = [("a", "MR07a", INK_BLUE, "-", 2.4),
        ("b", "MR07b", GAP_RED, (0, (6, 3)), 2.4),
        ("wlh", "WLH", EVIDENCE, (0, (1.5, 1.8)), 2.8)]

fig, axes = plt.subplots(1, 2, figsize=(11.6, 5.4), sharey=True)
fig.patch.set_facecolor(PAPER)

PANELS = [("p", "removed proton, deep", "bound_deep.dat",
           r"$0d_{5/2}$ proton, $S_p$ = 23.1 MeV", NEAR_BLACK),
          ("n", "removed neutron, weak", "bound_weak.dat",
           r"$0f_{7/2}$ neutron, $S_n$ = 4.72 MeV", OLIVE)]

ymax = 0.0
for ax, (ch, title, dfile, dlabel, dcol) in zip(axes, PANELS):
    ax.set_facecolor(PAPER)
    for tag, name, col, ls, lw in SETS:
        par = read_w(f"W_{ch}_{tag}.dat", E_PHYS)
        y = minus_im_u(r, par)
        ymax = max(ymax, y.max())
        ax.plot(r, y, color=col, lw=lw, ls=ls, zorder=4)
    ax.set_title(title, fontsize=15.5, color=CHARCOAL, pad=10)
    ax.set_xlim(0, RMAX)
    ax.set_xlabel(r"$r$   (fm)", labelpad=6)
    ax.tick_params(axis="both", length=5.5, width=1.0, labelsize=13.5)
    ax.tick_params(which="minor", length=3, width=0.8)

for ax, (ch, title, dfile, dlabel, dcol) in zip(axes, PANELS):
    ax.set_ylim(0, ymax * 1.30)

axes[0].set_ylabel(r"$-\,$Im $U_{bx}$ at $E'$ = 40.3 MeV   (MeV)")

# where each orbital actually sits, on its own hidden axis
BB = dict(facecolor=PAPER, edgecolor="none", pad=2.0)
for ax, (ch, title, dfile, dlabel, dcol) in zip(axes, PANELS):
    rr, dd = density(dfile, RMAX)
    ax2 = ax.twinx()
    ax2.set_facecolor("none")
    ax2.plot(rr, dd, color=dcol, lw=1.6, alpha=0.75, zorder=2)
    ax2.fill_between(rr, 0, dd, color=dcol, alpha=0.10, linewidth=0, zorder=1)
    ax2.set_ylim(0, dd.max() * 2.55)
    ax2.set_yticks([])
    for sp in ("top", "right", "left", "bottom"):
        ax2.spines[sp].set_visible(False)
    # inside its own hump: the fill is light, and no curve can ever be there
    ax2.text(rr[np.argmax(dd)], dd.max() * 0.17, dlabel, color=dcol, fontsize=13.5,
             ha="center", va="center", zorder=8)

# direct labels on the three potentials, in the one region no curve reaches
for yfrac, name, col in ((1.255, "MR07b", GAP_RED),
                         (1.125, "WLH", EVIDENCE),
                         (0.995, "MR07a", INK_BLUE)):
    axes[0].text(8.85, ymax * yfrac, name, color=col, fontsize=15.5,
                 ha="right", va="center", bbox=BB, zorder=8)

axes[1].text(8.85, ymax * 1.255,
             "WLH has the deepest volume term\nof the three and no surface term",
             color=EVIDENCE, fontsize=13.5, ha="right", va="top",
             linespacing=1.35, bbox=BB, zorder=8)

fig.tight_layout()
fig.subplots_adjust(bottom=0.24)
fig.text(0.5, 0.055,
         "Two dispersive fits and one microscopic potential, all at the physical kick energy. They disagree on where the\n"
         "absorption sits, not only on its depth, and the deeply bound orbital reaches further into the interior.",
         ha="center", va="bottom", fontsize=12.5, color=STONE, linespacing=1.45)

for ext in ("png", "pdf"):
    fig.savefig(f"w-profiles.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")

for ch, _, _, _, _ in PANELS:
    vals = {name: minus_im_u(r, read_w(f"W_{ch}_{tag}.dat", E_PHYS))
            for tag, name, _, _, _ in SETS}
    print(f"{ch}: peak -Im U  " + "  ".join(f"{k} {v.max():6.2f} at r={r[v.argmax()]:.2f}"
                                            for k, v in vals.items()))
print("wrote w-profiles")
