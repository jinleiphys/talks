#!/usr/bin/env python3
"""
DREB 2026, slide 18 figure "predictive": the calibrated model against the data.

Claim: calibrated on this one angular distribution, the model follows the whole
diffraction pattern; the global potential (KD02, not refitted) drifts out of phase.

Drawn: the 64 measured points (d + 58Ni elastic, 20 MeV), the posterior median (green
line) with its 95% band (light green), and KD02 in the same CDCC model (pink dashed).
The colours match slide 19. There is no legend: the slide's two cards name the curves.

Provenance: predictive_cache_v728.npz is a copy of the paper's
DREAM_project/examples/cdcc_d58Ni/data/fig2_predictive_cache_v728_full16k.npz
(make_fig2_predictive.py: 200 draws of the final 16000-sample posterior, 2.5/97.5 percent).
"""
import os
import sys

import numpy as np
import matplotlib.pyplot as plt

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "..", "..", "qfs-rb-2026", "figures"))
import kami_style  # noqa: F401,E402

PAPER, CHARCOAL, NEAR_BLACK = "#f5f4ed", "#4d4c48", "#141413"
GREEN, BAND, PINK = "#4E8F5E", "#9CD3AC", "#E07A95"

HERE = os.path.dirname(os.path.abspath(__file__))
z = np.load(os.path.join(HERE, "predictive_cache_v728.npz"))
th = z["theta_dense"]

fig, ax = plt.subplots(figsize=(8.2, 5.45))
fig.patch.set_facecolor(PAPER)
ax.set_facecolor(PAPER)

from matplotlib.patches import Patch
from matplotlib.lines import Line2D
ax.fill_between(th, z["lo"], z["hi"], color=BAND, lw=0.6, ec=GREEN, zorder=2)
ax.plot(th, z["ratio_kd02"], color=PINK, lw=2.0, ls=(0, (5, 3)), zorder=3)
ax.errorbar(z["theta_exp"], z["ratio_exp"], yerr=z["error_exp"], ls="none", marker="o",
            ms=3.6, mfc=NEAR_BLACK, mec=NEAR_BLACK, ecolor=NEAR_BLACK, elinewidth=0.8,
            capsize=0, zorder=4)
# the median is drawn over the points so the calibrated curve reads from mid-room
ax.plot(th, z["median"], color=GREEN, lw=2.6, zorder=6, solid_capstyle="round")
handles = [Line2D([], [], color=PINK, lw=2.0, ls=(0, (5, 3))),
           Line2D([], [], color=GREEN, lw=2.6),
           Patch(facecolor=BAND, edgecolor=GREEN, lw=0.6),
           Line2D([], [], ls="none", marker="o", ms=5, color=NEAR_BLACK)]
ax.legend(handles, ["KD02, not refitted", "calibrated, median", "calibrated, 95% band",
                    "measured"], loc="upper right", bbox_to_anchor=(0.995, 0.995),
          frameon=False, fontsize=13, handlelength=2.2, labelspacing=0.3, borderpad=0.3)

ax.text(0.025, 0.04, r"d + $^{58}$Ni elastic, 20 MeV", transform=ax.transAxes,
        fontsize=13, color=CHARCOAL, va="bottom")
ax.set_yscale("log")
ax.set_ylim(4.0e-4, 1.6)
ax.set_xlim(0, 180)
ax.set_xticks([0, 30, 60, 90, 120, 150, 180])
ax.set_xlabel(r"$\theta_\mathrm{c.m.}$ (deg)", fontsize=15, labelpad=4)
ax.set_ylabel(r"$\sigma/\sigma_\mathrm{Ruth}$", fontsize=15, labelpad=4)
ax.tick_params(axis="both", labelsize=14)
fig.subplots_adjust(left=0.11, right=0.967, top=0.98, bottom=0.12)

out = os.path.join(HERE, "predictive")
for ext in ("png", "pdf"):
    fig.savefig(f"{out}.{ext}", dpi=300, facecolor=PAPER)
print("wrote", out, "| points:", len(z["theta_exp"]))
