#!/usr/bin/env python3
"""
DREB 2026, slide 19 figures "volume_integrals_a/b": the paper's Fig. 3 redrawn for the slide.

Same panels, data and marks as DREAM_project/examples/cdcc_d58Ni/make_fig3_information.py
(posterior 68/95% regions from a smoothed 60x60 histogram, KD02 prior 1-sigma covariance
ellipse, KD02 star, line of constant total through the star). Only the styling changes: deck
parchment, slide-size type, the green/pink of slides 18-19, panel titles that name the row they
pair with. One file per panel so each sits beside its number; the legend and the
before/after scale of the total are HTML on the slide.

Data: volume_integrals_v728.npz is a copy of the paper's final_volume_integrals_v728.npz.
Printed check: real total 772 +- 13 (KD02 913), imaginary 204 +- 14 (KD02 198).
"""
import os
import sys

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.patches import Ellipse, Patch

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "..", "..", "qfs-rb-2026", "figures"))
import kami_style  # noqa: F401,E402

PAPER, CHARCOAL, INK = "#f5f4ed", "#4d4c48", "#272727"
POST_LINE, POST_BAND, POST_CORE = "#4E8F5E", "#B7E1C1", "#6FAE80"
PRIOR, NEUTRAL = "#E07A95", "#8A8A8A"

HERE = os.path.dirname(os.path.abspath(__file__))
d = np.load(os.path.join(HERE, "volume_integrals_v728.npz"))
kd = d["kd_components"]


def smooth(h, sigma=1.5):
    """Separable Gaussian filter (scipy.ndimage.gaussian_filter, mode='reflect')."""
    r = int(4 * sigma + 0.5)
    k = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2)
    k /= k.sum()
    for axis in (0, 1):
        pad = [(0, 0), (0, 0)]
        pad[axis] = (r, r)
        hp = np.pad(h, pad, mode="symmetric")
        h = np.apply_along_axis(lambda v: np.convolve(v, k, mode="valid"), axis, hp)
    return h


def panel(ax, x, y, px, py, kx, ky, title, xlabel, ylabel):
    h, xe, ye = np.histogram2d(x, y, bins=60)
    h = smooth(h)
    o = np.sort(h.ravel())[::-1]
    cdf = np.cumsum(o) / o.sum()
    lv = [o[np.searchsorted(cdf, 0.95)], o[np.searchsorted(cdf, 0.68)]]
    xc, yc = 0.5 * (xe[1:] + xe[:-1]), 0.5 * (ye[1:] + ye[:-1])
    ax.contourf(xc, yc, h.T, levels=[lv[0], lv[1], h.max() * 1.01],
                colors=[POST_BAND, POST_CORE], zorder=2)
    ax.contour(xc, yc, h.T, levels=lv, colors=POST_LINE, linewidths=1.2, zorder=3)
    c = np.cov(np.vstack([px, py]))
    val, vec = np.linalg.eigh(c)
    i = np.argsort(val)[::-1]
    val, vec = val[i], vec[:, i]
    ax.add_patch(Ellipse((px.mean(), py.mean()), 2 * np.sqrt(val[0]), 2 * np.sqrt(val[1]),
                         angle=np.degrees(np.arctan2(vec[1, 0], vec[0, 0])), fill=False,
                         edgecolor=PRIOR, ls=(0, (4, 2.5)), lw=2.0, zorder=4))
    ax.plot(kx, ky, marker="*", ms=17, mfc=PRIOR, mec=INK, mew=0.8, zorder=5)
    comb = np.concatenate([x, y, px, py])
    lo, hi = np.percentile(comb, [0.25, 99.75])
    pad = 0.08 * (hi - lo)
    ax.set_xlim(lo - pad, hi + pad)
    ax.set_ylim(lo - pad, hi + pad)
    lx = np.asarray(ax.get_xlim())
    ax.plot(lx, kx + ky - lx, color=NEUTRAL, ls=(0, (1, 2.2)), lw=1.8, zorder=1)
    ax.set_aspect("equal")
    ax.set_facecolor(PAPER)
    ax.set_title(title, fontsize=15, loc="left", pad=8, color=INK)
    ax.set_xlabel(xlabel, fontsize=19, labelpad=3)
    ax.set_ylabel(ylabel, fontsize=19, labelpad=3)
    ax.tick_params(axis="both", labelsize=17)


rows = [("a", d["jr_p"], d["jr_n"], d["prior_jr_p"], d["prior_jr_n"], kd[0], kd[1],
         r"proton $J_R^p/A$", r"neutron $J_R^n/A$" ),
        ("b", d["jw_p"], d["jw_n"], d["prior_jw_p"], d["prior_jw_n"], kd[2], kd[3],
         r"proton $J_W^p/A$", r"neutron $J_W^n/A$" )]
for tag, x, y, px, py, kx, ky, xl, yl in rows:
    fig, ax = plt.subplots(figsize=(4.4, 4.4))
    fig.patch.set_facecolor(PAPER)
    panel(ax, x, y, px, py, kx, ky, "", xl, yl)
    fig.subplots_adjust(left=0.25, right=0.965, top=0.965, bottom=0.22)
    out = os.path.join(HERE, f"volume_integrals_{tag}")
    for ext in ("png", "pdf"):
        fig.savefig(f"{out}.{ext}", dpi=300, facecolor=PAPER)
    plt.close(fig)
# the before/after scale of the total under each number: KD02 prior +-1 sigma (pink),
# posterior +-1 sigma (green), KD02 value (pink dotted)
for tag, t, lo, hi, ticks in (("real", "jr", 650, 1050, [700, 800, 900, 1000]),
                              ("imag", "jw", 150, 270, [160, 200, 240])):
    q, w = d[f"prior_{t}_p"] + d[f"prior_{t}_n"], d[f"{t}_p"] + d[f"{t}_n"]
    kv = kd[:2].sum() if t == "jr" else kd[2:].sum()
    fig, ax = plt.subplots(figsize=(2.7, 1.1))
    fig.patch.set_facecolor(PAPER)
    ax.set_facecolor(PAPER)
    for yy, v, col, lab in ((1.0, q, PRIOR, "before"), (0.0, w, "#3F7A4F", "after")):
        # width only: the bar is +-1 sigma; no centre mark (KD02 is the dotted tick)
        ax.plot([v.mean() - v.std(), v.mean() + v.std()], [yy, yy], color=col, lw=5,
                solid_capstyle="butt", zorder=3)
        ax.text(lo - 0.03 * (hi - lo), yy, lab, ha="right", va="center", fontsize=15,
                color=CHARCOAL)
    ax.axvline(kv, ymin=0.0, ymax=0.92, color="#C9567A", lw=1.6, ls=(0, (1.5, 2)), zorder=2)
    ax.text(kv, 1.62, "KD02", ha="center", va="bottom", fontsize=13, color="#C9567A")
    ax.set_xlim(lo, hi)
    ax.set_ylim(-0.6, 1.6)
    ax.set_yticks([])
    ax.set_xticks(ticks)
    ax.tick_params(axis="x", labelsize=14, top=False, which="both")
    ax.xaxis.set_minor_locator(plt.NullLocator())
    for side in ("top", "left", "right"):
        ax.spines[side].set_visible(False)
    fig.subplots_adjust(left=0.25, right=0.95, top=0.76, bottom=0.32)
    fig.savefig(os.path.join(HERE, f"volume_scale_{tag}.png"), dpi=300, facecolor=PAPER)
    plt.close(fig)

rt, it = d["jr_p"] + d["jr_n"], d["jw_p"] + d["jw_n"]
print(f"real {rt.mean():.0f} +- {rt.std():.0f} (KD02 {kd[:2].sum():.0f}); "
      f"imag {it.mean():.0f} +- {it.std():.0f} (KD02 {kd[2:].sum():.0f})")
