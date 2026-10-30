#!/usr/bin/env python3
"""
DREB 2026, slide 10 figure "potential_information": the information geometry of the
potential, drawn as the angular distribution and as what the data see of it.

Claim: the elastic angular distribution does not determine the thirteen parameters of the
potential independently. It sees a few combinations of them and is blind to the rest.
Above, that statement as a picture: move the parameter set by the same ten percent along
the direction the data see best and the angular distribution leaves the diffraction pattern
out of phase, while moving it ten percent along any other of the twelve directions leaves
the curve within a few percent of where it was. Below, the same statement as a count: the
response of each of the thirteen directions, ordered, with the line the count is taken at.
Eight reach that line, five do not.

What is drawn.

  top panel, ink blue       the base curve: n + 208Pb elastic at 20 MeV, at the KD02
                            central potential of Koning and Delaroche for that system
  top panel, red dashed     the same set moved ten percent along the leading direction.
                            It leaves the diffraction pattern out of phase: the classical
                            radius-depth ambiguity, seen from the observable side.
  top panel, grey           the same for the other twelve. The third of them separates
                            visibly in the forward region, a depth and spin-orbit radius
                            combination; the rest lie on the base curve.

  lower panel, lollipop      for each of the thirteen directions, the RMS change of the
                            cross section over the angular range, from a ten percent step
                            along it. Red for the eight the data determine at a ten percent
                            tolerance, grey for the five they do not. On a log axis the
                            leading direction reaches 95 per cent and the last one 0.15 per
                            cent, a factor of six hundred: that spread IS the anisotropy the
                            participation ratio summarizes as 1.7.
  lower panel, the line      at 1.7 per cent, and derived rather than chosen: a ten percent
                            step along a direction changes the curve by 10 per cent times
                            sqrt(lambda_i / n) at RMS, with n = 35 angles, so the direction
                            sitting exactly at the boundary of the ten percent tolerance is
                            the one whose curve change is 10 / sqrt(35) = 1.7 per cent.

Provenance. n + 208Pb at 20 MeV, chosen because its D_eff = 1.587 and its count of eight
directions out of thirteen are both the median of the full 168-configuration scan, whose
ensemble values are D_eff = 1.66 +/- 0.40 and 7.92 +/- 1.65 directions, so this picture is
not an outlier either way. The Fisher matrix is F = S S^T with S_i(theta) = d log sigma /
d log p_i by central difference at a one percent step, on the 35 angles of the scan, using
the forward model in the opticalfisher analysis module (angle_resolved_sensitivity.py,
deff_scan_extended.py), imported rather than copied. This script recomputes D_eff and the
count and asserts them against the stored values for this configuration (1.587 and 8 of 13
in data/deff_scan_extended.json); if they move, the figure no longer says what the slide
says. The script also prints the composition of each direction, which is where the slide's
sentence about what the data do and do not see comes from: the eight are the real radius
against the depth, the surface absorption geometry, the real diffuseness and the real
spin-orbit depth; the five are the volume absorption, the imaginary geometry and the
imaginary spin-orbit.

Both slide numbers come from that scan and are unchanged: the participation ratio
D_eff = (sum lambda)^2 / sum(lambda^2) is 1.66 +/- 0.40 over the 168 configurations, a
statement about the shape of the response and never a count of determined directions; the
count is the other number, about 8 of 13 at a ten percent tolerance, and it moves with the
tolerance.
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

# The forward model is the paper's, not a copy of it. Both functions below already exist in
# the opticalfisher analysis module and are imported rather than reimplemented.
OPT = os.path.join(os.path.expanduser("~"), "Desktop", "code", "opticalfisher")
sys.path.insert(0, os.path.join(OPT, "analysis"))
sys.path.insert(0, os.path.join(OPT, "src"))
from angle_resolved_sensitivity import compute_angle_sensitivity  # noqa: E402
from deff_scan_extended import (get_kd02_params_13,                # noqa: E402
                                compute_observables_vector)

PAPER, NEAR_BLACK, CHARCOAL = "#f5f4ed", "#141413", "#4d4c48"
STONE, OLIVE, INK_BLUE, GAP_RED, SAND = "#66655f", "#5e5d59", "#1B365D", "#b53333", "#e8e6dc"
NAMES = ["V", "rv", "av", "W", "rw", "aw", "Wd", "rvd", "avd", "Vso", "Wso", "rvso", "avso"]

PROJ, A, Z, E_LAB = "n", 208, 82, 20.0
EPS = 0.10                     # the ten percent step, in log-parameter space
TAU = 0.10                     # the tolerance the count is taken at
N_SCAN = 35                    # angles in the scan, the n in sqrt(lambda/n)

theta_scan = np.linspace(5.0, 175.0, N_SCAN)      # the angles the scan used
theta = np.linspace(2.0, 178.0, 353)              # the drawing grid
p0 = np.array(get_kd02_params_13(PROJ, A, Z, E_LAB), dtype=float)

# The Fisher matrix and its directions, from the paper's forward model.
S, _, _ = compute_angle_sensitivity(PROJ, A, Z, E_LAB, theta_scan, list(p0))
F = S @ S.T
lam, V = np.linalg.eigh(F)
lam, V = lam[::-1], V[:, ::-1]
deff = float(lam.sum() ** 2 / np.sum(lam ** 2))
determined = (EPS / np.sqrt(lam) < TAU)
level = EPS / np.sqrt(N_SCAN)                     # the 1.7 percent line, derived
print(f"{PROJ}+{A} at {E_LAB:g} MeV: D_eff = {deff:.3f}, "
      f"directions at the {TAU:g} tolerance = {int(determined.sum())} of 13, "
      f"line = {100*level:.2f} per cent")
assert int(determined.sum()) == 8 and abs(deff - 1.587) < 0.01, \
    "not the configuration the slide describes"

# The base curve and the thirteen displaced ones.
base = np.asarray(compute_observables_vector(PROJ, A, Z, E_LAB, theta, list(p0))["elastic_dcs"])
curves = np.empty((13, theta.size))
delta = np.empty((13, theta.size))
for i in range(13):
    p_i = p0 * np.exp(EPS * V[:, i])
    c = np.asarray(compute_observables_vector(PROJ, A, Z, E_LAB, theta, list(p_i))["elastic_dcs"])
    curves[i] = c
    delta[i] = c / base - 1.0
rms = 100.0 * np.sqrt(np.mean(delta ** 2, axis=1))

for i in range(13):
    dom = sorted(range(13), key=lambda j: -abs(V[j, i]))[:3]
    print(f"  {i+1:2d} {rms[i]:7.2f} per cent  "
          + ", ".join(f"{V[j, i]:+.2f} {NAMES[j]}" for j in dom))
assert np.all(rms[determined] > 100 * level) and np.all(rms[~determined] < 100 * level)

fig = plt.figure(figsize=(6.0, 3.9))
fig.patch.set_facecolor(PAPER)
gs = fig.add_gridspec(2, 1, height_ratios=[1.42, 1.0], hspace=0.46,
                      left=0.115, right=0.975, top=0.935, bottom=0.165)
ax, axr = fig.add_subplot(gs[0]), fig.add_subplot(gs[1])
for a in (ax, axr):
    a.set_facecolor(PAPER)

# Top panel: the observable. Twelve of the thirteen directions are invisible in it.
ax.plot(theta, base, color=INK_BLUE, lw=2.6, zorder=8, solid_capstyle="round",
        label="reference potential")
for i in range(1, 13):
    ax.plot(theta, curves[i], color=GAP_RED if determined[i] else STONE,
            lw=0.8, alpha=0.6, zorder=5)
ax.plot(theta, curves[0], color=GAP_RED, lw=1.5, ls=(0, (5, 3)), zorder=7,
        label="ten percent along the leading direction")
ax.legend(loc="upper right", bbox_to_anchor=(0.995, 0.99), frameon=False, fontsize=12.5,
          handlelength=2.0, borderpad=0.2, labelspacing=0.35)
ax.text(0.025, 0.05, r"n + $^{208}$Pb elastic, 20 MeV", transform=ax.transAxes, va="bottom",
        fontsize=11.5, color=CHARCOAL)
ax.set_yscale("log")
ax.set_ylim(1.5, 6.0e4)
ax.set_ylabel(r"d$\sigma$/d$\Omega$   (mb/sr)", labelpad=6, fontsize=12.5)
ax.set_xlim(0, 180)
ax.set_xticks([0, 30, 60, 90, 120, 150, 180])
ax.set_xlabel(r"$\theta_\mathrm{c.m.}$ (deg)", labelpad=4, fontsize=12.5)
ax.tick_params(axis="both", labelsize=12)

# Lower panel: what each of the thirteen moves, against the line the count is taken at.
pos = np.arange(1, 14)
axr.axhline(100 * level, color=OLIVE, lw=1.1, ls=(0, (4, 3)), zorder=2)
for i, d in zip(range(13), determined):
    col = GAP_RED if d else STONE
    axr.vlines(pos[i], 100 * level, rms[i], color=col, lw=1.4, alpha=0.9, zorder=4)
    axr.plot(pos[i], rms[i], marker="o", ms=7.0, mfc=col, mec=PAPER, mew=0.8,
             ls="none", zorder=6)
axr.set_yscale("log")
axr.set_xlim(0.35, 13.65)
axr.set_ylim(0.08, 1500)
axr.set_xticks(pos)
axr.set_xticklabels([str(p) for p in pos], fontsize=10.5)
axr.set_yticks([0.1, 100 * level, 10, 100])
axr.set_yticklabels(["0.1", "1.7", "10", "100"])
axr.get_yticklabels()[1].set_color(OLIVE)
axr.set_xlabel("the thirteen directions, in the order the data see them", labelpad=6,
               fontsize=11.5)
axr.set_ylabel("change (%)", labelpad=6, fontsize=11.5)
axr.tick_params(axis="y", labelsize=12)

# Direct labels, in space the stems do not use.
axr.text(13.4, 500, "the eight the data determine", ha="right", va="center", fontsize=11.5,
         color=GAP_RED, zorder=10)
axr.text(13.4, 4.6, "the five it does not", ha="right", va="center", fontsize=11.5,
         color=CHARCOAL, zorder=10)
axr.text(0.6, 0.55, "1.7% = 10%/\u221a35", ha="left", va="center", fontsize=11.5,
         color=OLIVE, zorder=10)

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "potential_information")
for ext in ("png", "pdf"):
    fig.savefig(f"{out}.{ext}", dpi=300, facecolor=PAPER)
print("wrote potential_information")
