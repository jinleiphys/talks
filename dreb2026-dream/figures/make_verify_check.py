#!/usr/bin/env python3
"""
DREB 2026, slide 14 figure "verify_check": the check, drawn as curves.

Claim: at parameter points outside the basis the emulator was built on, the emulator
reproduces the direct solver's angular distribution. It is not a smoothed stand-in for the
solver at those points. The largest disagreement of any point at any angle is 0.3 of a
standard deviation of the measurement, and the worst of the ten chi-squares is 0.30.

What is drawn, and why this way.

  top panel, ink blue       the direct solver at the worst of the ten points, over the
                            measurement with its error bars
  top panel, red dashed     the emulator at that same point. On this slide the two are
                            the same curve, so the two are identified by a legend and
                            not by leader lines: a line drawn to each would have to
                            point at the same place twice.
  lower panel, ink blue     the difference between the two curves at each of the 64
                            measured angles, divided by that angle's error, for ALL TEN
                            points. The worst of them reaches 0.29. The shaded strip is
                            one standard deviation.
  lower panel, the same     on slide 15, at a different parameter point from a basis
    panel, one curve        built the wrong way. That panel is the comparison.

Provenance. Both curve sets from examples/cdcc_d58Ni/gate_points_v728.py --curve_out
against the v728 production grid, which prints the same chi-square values quoted here. The
exact S-matrices are data/smat_v728_gate_ext/*.dat with parameter points from
data/gate_ext_points_v728.txt; the ten-point gate file data/gate_ext_v728.npz gives
chi2_emu = 0.077 to 0.298 and max pointwise 0.087 to 0.292 sigma. Four further points
inside the posterior (the mean, the median-nearest draw, the first-percentile V_v^p point)
give 0.154, 0.186 and 0.292 and are not drawn; ten lines already fill the lower panel. The
remote high-V_v^p structure is a separate matter and fails this same check at 5.044, which
is what the check is for.
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

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "curves_gate_v728.npz")
SHOWN = "ext_c3_1"                     # the worst of the ten: chi2_emu 0.298

z = np.load(SRC)
theta = z["theta_dense"]
labels = [str(s) for s in z["labels"]]
i = labels.index(SHOWN)
te, re, ee = z["theta_exp"], z["ratio_exp"], z["err_exp"]
exact = z[f"{SHOWN}__exact_dense"]
emu = z[f"{SHOWN}__emu_dense"]

fig, (ax, axr) = plt.subplots(
    2, 1, figsize=(7.2, 4.9), height_ratios=[3.0, 1.25], sharex=True)
fig.patch.set_facecolor(PAPER)
for a in (ax, axr):
    a.set_facecolor(PAPER)

ax.errorbar(te, re, yerr=ee, ls="none", marker="o", ms=4.0, mfc=STONE, mec=STONE,
            ecolor=STONE, elinewidth=0.8, capsize=0, alpha=0.7, zorder=3)
ax.plot(theta, exact, color=INK_BLUE, lw=2.4, zorder=5, solid_capstyle="round",
        label="direct solver")
ax.plot(theta, emu, color=GAP_RED, lw=1.6, ls=(0, (5, 3)), zorder=6, label="emulator")
ax.legend(loc="upper right", bbox_to_anchor=(0.995, 0.99), frameon=False, fontsize=12.5,
          handlelength=2.0, borderpad=0.2, labelspacing=0.35)
ax.text(0.025, 0.05, "d + 58Ni elastic, 20 MeV", transform=ax.transAxes,
        fontsize=11.5, color=CHARCOAL, va="bottom")
ax.set_yscale("log")
ax.set_ylim(0.010, 1.7)
ax.set_ylabel(r"$\sigma/\sigma_\mathrm{Ruth}$", labelpad=6, fontsize=13)
ax.tick_params(axis="both", labelsize=12.5)

axr.axhspan(-1, 1, color=SAND, alpha=0.9, linewidth=0, zorder=1)
axr.axhline(0, color=STONE, lw=1.0, zorder=2)
for lab in labels:
    r = (z[f"{lab}__emu_exp"] - z[f"{lab}__exact_exp"]) / ee
    worst = lab == SHOWN
    axr.plot(te, r, color=INK_BLUE, lw=1.6 if worst else 1.0,
             alpha=1.0 if worst else 0.5, zorder=5 if worst else 4)
axr.set_ylim(-2.0, 2.0)
axr.set_yticks([-2, 0, 2])
axr.set_xlim(0, 180)
axr.set_xticks([0, 30, 60, 90, 120, 150, 180])
axr.set_xlabel(r"$\theta_\mathrm{c.m.}$ (deg)", labelpad=5, fontsize=13)
axr.set_ylabel("difference\n(in errors)", labelpad=6, fontsize=11)
axr.tick_params(axis="both", labelsize=12.5)

fig.subplots_adjust(hspace=0.10, left=0.135, right=0.975, top=0.965, bottom=0.115)

out = os.path.join(HERE, "verify_check")
for ext in ("png", "pdf"):
    fig.savefig(f"{out}.{ext}", dpi=300, facecolor=PAPER)

res = np.vstack([(z[f"{l}__emu_exp"] - z[f"{l}__exact_exp"]) / ee for l in labels])
print(f"ten points: chi2_emu {np.sum(res**2, axis=1).min():.3f} to "
      f"{np.sum(res**2, axis=1).max():.3f}; worst pointwise {np.abs(res).max():.3f} sigma")
print("wrote verify_check")
