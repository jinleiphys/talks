#!/usr/bin/env python3
"""
QFS-RB 2026, the "why 9% against 74%" figure.

Claim: the two published Morillon-Romain parameter sets agree where elastic scattering
constrains them, at the surface, and differ by a factor of about 2.6 in the interior, which is
exactly where the deeply bound orbital sits. One parameter, B_V, carries the whole difference.

Everything plotted is the quantity the calculation actually uses: the MR07 imaginary part built
exactly as d2_rho_eff.jl mr_W() builds it, and the bound-state radial functions dumped from the
same code (runs/bound_deep.dat, runs/bound_weak.dat).
"""
import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, INK_BLUE, GAP_RED = "#87867f", "#1B365D", "#b53333"
OLIVE_G = "#4a6b3a"

mpl.rcParams.update({
    "font.family": "serif",
    "font.serif": ["Newsreader", "Source Serif 4", "DejaVu Serif", "Georgia", "serif"],
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

# ---- MR07 imaginary part, 39Al core, proton channel, as in mr_W() -----------------------------
A, NmZ = 39, (26 - 13) / 39.0
EF = -(23.112 + 19.873) / 2.0
R  = (1.3 - 2.7e-4 * A) * A ** (1 / 3.)
aa = 0.566 + 5e-9 * A ** 3
AS = -17.5 - 19 * NmZ
AV = -11.21 - 0.017 * A
BV = {"a": 62 + 0.15 * A, "b": 65 - 120 * NmZ}          # 67.85 against 25.00 MeV
BS = {"a": 18.2, "b": 13.0}
CS = {"a": 0.027 - 7e-5 * A, "b": 0.025}

def minus_imU(r, E, mset):
    e2 = (E - EF) ** 2
    WV = AV * e2 / (e2 + BV[mset] ** 2)
    WS = AS * e2 / (e2 + BS[mset] ** 2) * np.exp(-CS[mset] * (E - EF))
    ex = np.exp((r - R) / aa); f = 1 / (1 + ex); df = -ex / (aa * (1 + ex) ** 2)
    return -(WV * f - 4 * aa * WS * df)

r = np.linspace(0.02, 9.0, 600)
EPRIME = 21.4                                            # the energy the standard construction gives

fig, ax = plt.subplots(figsize=(10, 5.6))
fig.patch.set_facecolor(PAPER); ax.set_facecolor(PAPER)

Wa, Wb = minus_imU(r, EPRIME, "a"), minus_imU(r, EPRIME, "b")
ax.fill_between(r, Wa, Wb, color=GAP_RED, alpha=0.10, linewidth=0, zorder=1)
ax.plot(r, Wb, color=GAP_RED, lw=2.4, zorder=3)
ax.plot(r, Wa, color=INK_BLUE, lw=2.4, ls=(0, (6, 3)), zorder=3)

ax.text(0.35, Wb[0] + 0.9, "set b", color=GAP_RED, fontsize=16, va="bottom")
ax.text(0.35, Wa[0] - 1.5, "set a", color=INK_BLUE, fontsize=16, va="top")
ax.annotate("", xy=(0.9, Wb[np.argmin(abs(r - 0.9))]), xytext=(0.9, Wa[np.argmin(abs(r - 0.9))]),
            arrowprops=dict(arrowstyle="<->", color=GAP_RED, lw=1.5))
ax.text(1.15, 5.6, "factor 2.6\nin the interior", color=GAP_RED, fontsize=14, va="center",
        linespacing=1.3)
iR = np.argmin(abs(r - R))
ax.annotate("agree at the surface,\nwhere elastic data live", xy=(R, Wa[iR]), xytext=(6.1, 11.6),
            color=CHARCOAL, fontsize=14, ha="left", va="center", linespacing=1.3,
            arrowprops=dict(arrowstyle="-", color=STONE, lw=1.2,
                            connectionstyle="arc3,rad=-0.2"))

ax.set_xlabel("r  (fm)")
ax.set_ylabel(r"$-\,$Im $U_{bx}$  (MeV)")
ax.set_xlim(0, 9); ax.set_ylim(0, 15.5)

# ---- where each orbital actually sits ---------------------------------------------------------
ax2 = ax.twinx()
ax2.set_facecolor("none")
# labels are placed apart by hand: the two peaks sit at 3.25 and 3.5 fm and would collide.
for tag, col, lab, lx, ly, ha in (
        ("deep", NEAR_BLACK, "deeply bound $0d_{5/2}$ proton", 1.55, 0.30, "left"),
        ("weak", OLIVE_G,    "weakly bound $0f_{7/2}$ neutron", 6.55, 0.115, "left")):
    d = np.loadtxt(f"bound_{tag}.dat")
    rr, u = d[:, 0], d[:, 1]
    dens = u ** 2 / np.trapz(u ** 2, rr)
    ax2.plot(rr, dens, color=col, lw=1.8, alpha=0.85, zorder=2)
    ax2.fill_between(rr, 0, dens, color=col, alpha=0.09, linewidth=0, zorder=0)
    ax2.text(lx, ly, lab, color=col, fontsize=13.5, ha=ha, va="center",
             bbox=dict(facecolor=PAPER, edgecolor="none", pad=1.5), zorder=7)
ax2.annotate("", xy=(3.15, 0.44), xytext=(2.35, 0.315),
             arrowprops=dict(arrowstyle="-", color=NEAR_BLACK, lw=1.0))
ax2.annotate("", xy=(4.9, 0.175), xytext=(6.45, 0.122),
             arrowprops=dict(arrowstyle="-", color=OLIVE_G, lw=1.0))
ax2.set_ylim(0, 0.62)
ax2.set_yticks([])
ax2.spines["right"].set_visible(False)
ax2.spines["top"].set_visible(False)

fig.tight_layout()
for ext in ("png", "pdf", "svg"):
    fig.savefig(f"w-profile.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")
print("wrote w-profile")
