#!/usr/bin/env python3
"""
DREB 2026, slide 15 figure "verify_broken": the check that passed and should not have.

Claim: with the basis built around snapshots taken from an earlier, differently located
fit, the summary numbers all looked healthy and the emulator was still wrong where the
posterior went. At the point that posterior converges to, the emulator and the direct
solver differ by a chi-square of 6.4, twenty times the worst of the ten points on
slide 14, and the difference is not noise: it is one error bar, systematically placed.
The emulator fits the measurement at 89 where the solver fits it at 117, and the figure
shows why the likelihood preferred it. The emulator's error against the solver is
anti-correlated with the solver's own error against the data, -0.65, so the emulator
crosses the solver in the direction that repairs it: where the solver runs above the data
at 165 degrees, by 3.1 errors, the emulator sits below it, and where the solver runs below
it at 173 degrees, by 3.9 errors, the emulator sits above. That compensation, summed over
the angles, is the 28 units of chi-square the emulator buys.

What is drawn, and why this way.

  ink blue, solid           the direct solver at the posterior mean of that basis,
                            chi-square 117 over the 64 measured angles, 1.83 per point
  red dashed, on top        the emulator at the same point, 89, or 1.39 per point. The
                            two curves lie within a third of an error of each other up to
                            about 143 degrees and part company after it.
  lower panel               the difference between the two curves at each measured angle,
                            divided by that angle's error. Inside a third of an error to
                            143 degrees, then a systematic swing, positive to 0.71 between
                            145 and 168 degrees and negative to 0.94 at 173. The shaded
                            strip is one standard deviation, so the emulator is one error
                            away from the solver exactly where the measurement is.
  the same panel            on slide 14, where ten points stay inside 0.3. That is the
                            comparison this slide is built on.

Provenance. The exact S-matrix is a direct CDCC solve at the posterior mean of that basis
on the same 20 MeV deck, and the emulator curve is the same 18-parameter point evaluated
on that basis's grid; both through examples/cdcc_d58Ni/gate_points_v728.py --curve_out, so
the curves and the two chi-squares come from one script run. That run reads chi2_emu 6.387,
largest pointwise 0.941 sigma, chi2_CDCC 116.94, chi2_emu_dat 88.70. The recorded history of
the run quotes the same two values as 117 and 89, so this figure and that record agree.
"""
import os
import sys

import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "..", "..", "qfs-rb-2026", "figures"))
import kami_style  # noqa: F401,E402

PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, OLIVE, INK_BLUE, GAP_RED, SAND = "#66655f", "#5e5d59", "#1B365D", "#b53333", "#e8e6dc"

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "curves_v3_postmean.npz")
LABEL = "v3pm_mean"           # the one point this slide rests on

z = np.load(SRC)
theta = z["theta_dense"]
labels = [str(s) for s in z["labels"]]
i = labels.index(LABEL)
exact = z[f"{LABEL}__exact_dense"]
emu = z[f"{LABEL}__emu_dense"]
te, re, ee = z["theta_exp"], z["ratio_exp"], z["err_exp"]

chi2_exact = float(np.sum(((z[f"{LABEL}__exact_exp"] - re) / ee) ** 2))
chi2_emu = float(np.sum(((z[f"{LABEL}__emu_exp"] - re) / ee) ** 2))
chi2_diff = float(np.sum(((z[f"{LABEL}__emu_exp"] - z[f"{LABEL}__exact_exp"]) / ee) ** 2))
resid = np.interp(theta, te, (z[f"{LABEL}__emu_exp"] - z[f"{LABEL}__exact_exp"]) / ee)

# Axes identical to slide 14's, so that the two figures read as one comparison.
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
axr.plot(theta, resid, color=INK_BLUE, lw=2.2, zorder=4)
axr.set_ylim(-2.0, 2.0)
axr.set_yticks([-2, 0, 2])
axr.set_xlim(0, 180)
axr.set_xticks([0, 30, 60, 90, 120, 150, 180])
axr.set_xlabel(r"$\theta_\mathrm{c.m.}$ (deg)", labelpad=5, fontsize=13)
axr.set_ylabel("difference\n(in errors)", labelpad=6, fontsize=11)
axr.tick_params(axis="both", labelsize=12.5)

fig.subplots_adjust(hspace=0.10, left=0.135, right=0.975, top=0.965, bottom=0.115)

out = os.path.join(HERE, "verify_broken")
for ext in ("png", "pdf"):
    fig.savefig(f"{out}.{ext}", dpi=300, facecolor=PAPER)

print(f"chi2(emulator, data) = {chi2_emu:.2f}   chi2(direct solver, data) = {chi2_exact:.2f}")
print(f"chi2(emulator, direct solver) = {chi2_diff:.3f}; "
      f"max |emu-exact|/err = {np.max(np.abs(resid)):.3f}")
print("wrote verify_broken")
