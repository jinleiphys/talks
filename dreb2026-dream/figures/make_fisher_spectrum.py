#!/usr/bin/env python3
"""
DREB 2026, slide 10 figure "fisher_spectrum".

Claim: at one beam energy the elastic angular distribution fixes a large first direction
and then almost nothing. The spectrum of the Fisher matrix falls by about fourteen orders of
magnitude across thirteen directions, and the two numbers people quote off it answer two
different questions:

  * the participation ratio, D_eff = (sum lambda)^2 / sum(lambda^2), is 1.66 +/- 0.40 over
    168 configurations. This is a statement about the SHAPE of the spectrum, how anisotropic
    the information is. It is not a count of determined directions.
  * the number of directions determined to within 10 percent is 7.92 +/- 1.65, so about 8 of
    13. This IS a count, and it moves with the tolerance you choose.

Both are drawn on the figure because the referee of the 2026-09-22 PRC report made exactly
this point, and a reader who sees only D_eff will over-read it.

Provenance. Read directly from ~/Desktop/code/opticalfisher/data/deff_scan_extended.json,
field data[i].deff_results.elastic_13p.eigenvalues, for all 168 configurations
(12 targets x 7 energies x {n, p}). That field is the authoritative source; the file
data/elastic_fisher_matrices.json is stale (11 parameters, predates the 2026-07-14 l_max
fix) and must not be used. The recipe, from analysis/deff_scan_extended.py: the log-log
Jacobian is G_i(theta) = p_i * d[log sigma(theta)] / d p_i by two-point central difference
with step 0.01 |p_i|, the elastic Fisher matrix is F = G G^T, and D_eff is the
participation ratio of its eigenvalues. The count of resolved directions, from
analysis/n_eps_count.py, is #{i : eps / sqrt(lambda_i) < tau} with eps = 0.1 and tau = 0.1 in
log-parameter space.

One configuration, n + 12C at 10 MeV, returns only 12 eigenvalues above the numerical floor.
It is carried as a missing value rather than padded with a zero, so the thirteenth point of
the mean spectrum is an average over 167 configurations and not 168.
"""
import json
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

SRC = os.path.join(os.path.expanduser("~"), "Desktop", "code", "opticalfisher",
                   "data", "deff_scan_extended.json")
K = 13

with open(SRC) as fh:
    scan = json.load(fh)

spectra = np.full((len(scan["data"]), K), np.nan)
for i, cfg in enumerate(scan["data"]):
    lam = np.asarray(cfg["deff_results"]["elastic_13p"]["eigenvalues"], dtype=float)
    lam = np.sort(lam)[::-1]
    spectra[i, :len(lam)] = lam / lam[0]          # normalised to this configuration's largest

mean = np.nanmean(spectra, axis=0)
p10 = np.nanpercentile(spectra, 10, axis=0)
p90 = np.nanpercentile(spectra, 90, axis=0)
n_used = np.sum(np.isfinite(spectra), axis=0)

# The two numbers the panel is here to keep apart.
deff_cfg = np.array([c["deff_results"]["elastic_13p"]["D_eff"] for c in scan["data"]])
DEFF, DEFF_SD = float(np.mean(deff_cfg)), float(np.std(deff_cfg))
DEFF_MEAN_SPECTRUM = float(mean.sum() ** 2 / np.sum(mean ** 2))
N_DIR, N_DIR_SD = 7.92, 1.65                   # from data/n_eps_count.json, eps = tau = 0.1

BB = dict(facecolor=PAPER, edgecolor="none", pad=2.0)
x = np.arange(1, K + 1)

fig, ax = plt.subplots(figsize=(5.6, 2.75))
fig.patch.set_facecolor(PAPER)
ax.set_facecolor(PAPER)

ax.fill_between(x, p10, p90, color=SAND, alpha=0.9, linewidth=0, zorder=1)
ax.plot(x, mean, color=INK_BLUE, lw=2.0, zorder=4, solid_capstyle="round")
ax.plot(x, mean, ls="none", marker="o", ms=7.0, mfc=INK_BLUE, mec=INK_BLUE, zorder=5)

# The two counts, drawn where they fall on the index axis. Both labels go in the empty top
# of the box, where the curve has already left.
for xv, color in ((DEFF, GAP_RED), (N_DIR, CHARCOAL)):
    ax.axvline(xv, color=color, lw=1.2, ls=(0, (5, 3)), zorder=3)

# Both names go in the empty floor of the box, under the curve. The curve is above 1e-4
# from the third index on, so the band below 1e-8 is free along the whole axis, and a
# label placed there can be two lines tall without reaching the data or the top spine.
ax.text(DEFF + 0.18, 3.0e-10, f"effective dimension\n{DEFF:.1f} $\\pm$ {DEFF_SD:.1f}",
        color=GAP_RED, fontsize=13, ha="left", va="center", linespacing=1.35, bbox=BB, zorder=8)
ax.text(K + 0.5, 3.0e-10, f"determined to 10 percent\nabout {N_DIR:.0f} of {K}",
        color=CHARCOAL, fontsize=13, ha="right", va="center", linespacing=1.35, bbox=BB, zorder=8)

ax.set_yscale("log")
ax.set_xlim(0.4, K + 0.7)
ax.set_ylim(1.0e-12, 14.0)
ax.set_xticks(x)
ax.set_yticks([1e0, 1e-2, 1e-4, 1e-6, 1e-8, 1e-10, 1e-12])
ax.set_xlabel("index of the Fisher eigenvalue", labelpad=6, fontsize=12.5)
ax.set_ylabel("normalised eigenvalue", labelpad=6, fontsize=12)
ax.tick_params(axis="both", labelsize=13)

band = "168 configurations; line is the mean, band the 10th to 90th percentile."
fig.tight_layout()
fig.subplots_adjust(bottom=0.31, top=0.94, left=0.14, right=0.985)
fig.text(0.5, 0.02, band, ha="center", va="bottom", fontsize=10.5, color=STONE)

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fisher_spectrum")
for ext in ("png", "pdf"):
    fig.savefig(f"{out}.{ext}", dpi=300, facecolor=PAPER, bbox_inches="tight")

print(f"configs {len(scan['data'])}   contributing at index 13: {n_used[-1]}")
print(f"D_eff per configuration: mean {DEFF:.4f}  sd {DEFF_SD:.4f}")
print(f"D_eff of the mean spectrum: {DEFF_MEAN_SPECTRUM:.4f}")
print(f"mean spectrum orders of magnitude: {np.log10(mean[0]/mean[-1]):.2f}")
print("wrote fisher_spectrum")
