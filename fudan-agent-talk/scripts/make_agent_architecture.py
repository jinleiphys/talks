#!/usr/bin/env python3
"""Create the five-layer research-agent architecture figure."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch


plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["font.sans-serif"] = ["Arial", "DejaVu Sans", "Liberation Sans"]
plt.rcParams["svg.fonttype"] = "none"
plt.rcParams["pdf.fonttype"] = 42
plt.rcParams["font.size"] = 7


PALETTE = {
    "ink": "#203044",
    "blue": "#3C6486",
    "forest": "#6BAA7A",
    "leaf": "#B7E1C1",
    "mint": "#DFF2E3",
    "sage": "#D9E6D2",
    "cream": "#FFF6E3",
    "pink": "#FAD6DE",
    "fog_pink": "#F7BFCB",
    "paper": "#FFFFFF",
    "line": "#5A6470",
    "muted": "#66717E",
}


def rounded_box(ax, x, y, w, h, face, edge=PALETTE["line"], lw=0.75, radius=0.025):
    patch = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle=f"round,pad=0.012,rounding_size={radius}",
        linewidth=lw,
        edgecolor=edge,
        facecolor=face,
    )
    ax.add_patch(patch)
    return patch


def arrow(ax, start, end, color=PALETTE["blue"], lw=1.0, connectionstyle="arc3"):
    patch = FancyArrowPatch(
        start,
        end,
        arrowstyle="-|>",
        mutation_scale=8,
        linewidth=lw,
        color=color,
        connectionstyle=connectionstyle,
        shrinkA=2,
        shrinkB=2,
    )
    ax.add_patch(patch)
    return patch


def main():
    out_dir = Path(__file__).resolve().parents[1] / "figures" / "article"
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = out_dir / "five-layer-agent-architecture"

    width_in = 160 / 25.4
    height_in = 92 / 25.4
    fig = plt.figure(figsize=(width_in, height_in), facecolor=PALETTE["paper"])
    ax = fig.add_axes([0.02, 0.035, 0.96, 0.93])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    ax.text(0.005, 0.965, "a", fontsize=8, fontweight="bold", va="top", color=PALETTE["ink"])
    ax.text(0.56, 0.965, "b", fontsize=8, fontweight="bold", va="top", color=PALETTE["ink"])

    x0, w = 0.07, 0.39
    agent_y, agent_h = 0.83, 0.105
    rounded_box(ax, x0, agent_y, w, agent_h, PALETTE["ink"], edge=PALETTE["ink"], radius=0.022)
    ax.text(x0 + w / 2, agent_y + agent_h * 0.62, "RESEARCH AGENT", ha="center", va="center",
            fontsize=8, fontweight="bold", color="white")
    ax.text(x0 + w / 2, agent_y + agent_h * 0.30, "reason  |  act  |  read  |  write", ha="center", va="center",
            fontsize=6.2, color="#E7EDF3")

    layers = [
        ("L5", "Feedback memory", "persistent corrections", PALETTE["pink"]),
        ("L4", "Skills", "read and write protocols", PALETTE["cream"]),
        ("L3", "Concept wiki", "notes, vocabulary, indices", PALETTE["mint"]),
        ("L2", "Profile", "identity, goals, standards, resources", PALETTE["leaf"]),
        ("L1", "Plain text + links + git", "portable, inspectable substrate", PALETTE["sage"]),
    ]
    layer_h = 0.105
    gap = 0.014
    top = 0.77
    for i, (tag, title, subtitle, face) in enumerate(layers):
        y = top - (i + 1) * layer_h - i * gap
        rounded_box(ax, x0, y, w, layer_h, face, radius=0.018)
        ax.text(x0 + 0.022, y + layer_h / 2, tag, ha="left", va="center",
                fontsize=7, fontweight="bold", color=PALETTE["ink"])
        ax.text(x0 + 0.080, y + layer_h * 0.64, title, ha="left", va="center",
                fontsize=7.1, fontweight="bold", color=PALETTE["ink"])
        ax.text(x0 + 0.080, y + layer_h * 0.31, subtitle, ha="left", va="center",
                fontsize=5.8, color=PALETTE["muted"])

    raw_y = 0.035
    rounded_box(ax, x0, raw_y, w, 0.072, "#F2F3F5", edge="#939BA4", radius=0.016)
    ax.text(x0 + w / 2, raw_y + 0.045, "IMMUTABLE RAW SOURCES", ha="center", va="center",
            fontsize=6.7, fontweight="bold", color=PALETTE["ink"])
    ax.text(x0 + w / 2, raw_y + 0.018, "papers  |  code  |  data  |  records", ha="center", va="center",
            fontsize=5.6, color=PALETTE["muted"])

    arrow(ax, (x0 + w * 0.18, top - layer_h + 0.003), (x0 + w * 0.18, agent_y), PALETTE["blue"])
    ax.text(x0 - 0.010, 0.785, "load every session", ha="right", va="center",
            fontsize=5.5, color=PALETTE["blue"])
    arrow(ax, (x0 + w * 0.82, top - 3 * layer_h - 2 * gap + layer_h),
          (x0 + w * 0.82, agent_y), PALETTE["forest"])
    ax.text(x0 + w + 0.010, 0.735, "retrieve on demand", ha="left", va="center",
            fontsize=5.5, color=PALETTE["forest"])
    arrow(ax, (x0 + w * 0.68, agent_y), (x0 + w * 0.68, top - layer_h + 0.003), "#C2697D")
    ax.text(x0 + w + 0.010, 0.875, "write back through skills", ha="left", va="center",
            fontsize=5.5, color="#A44C61")

    cx, cy = 0.77, 0.55
    loop_boxes = [
        (0.685, 0.78, 0.17, 0.095, "1  READ CONTEXT", PALETTE["mint"]),
        (0.845, 0.525, 0.13, 0.105, "2  DO THE TASK", PALETTE["cream"]),
        (0.685, 0.29, 0.17, 0.095, "3  WRITE BACK", PALETTE["pink"]),
        (0.565, 0.525, 0.13, 0.105, "4  START HIGHER", PALETTE["leaf"]),
    ]
    for x, y, bw, bh, label, face in loop_boxes:
        rounded_box(ax, x, y, bw, bh, face, radius=0.020)
        ax.text(x + bw / 2, y + bh / 2, label, ha="center", va="center",
                fontsize=6.2, fontweight="bold", color=PALETTE["ink"])

    arrow(ax, (0.845, 0.81), (0.915, 0.64), connectionstyle="arc3,rad=-0.18")
    arrow(ax, (0.915, 0.525), (0.845, 0.385), connectionstyle="arc3,rad=-0.18")
    arrow(ax, (0.685, 0.335), (0.625, 0.525), connectionstyle="arc3,rad=-0.18")
    arrow(ax, (0.625, 0.63), (0.685, 0.81), connectionstyle="arc3,rad=-0.18")
    ax.text(cx, cy + 0.025, "COMPOUNDING", ha="center", va="center",
            fontsize=6.4, fontweight="bold", color=PALETTE["ink"])
    ax.text(cx, cy - 0.010, "LOOP", ha="center", va="center",
            fontsize=6.0, fontweight="bold", color=PALETTE["muted"])

    rounded_box(ax, 0.56, 0.09, 0.415, 0.105, "#F4F7F9", edge="#8794A0", radius=0.018)
    ax.text(0.7675, 0.155, "HUMAN CONTROL PLANE", ha="center", va="center",
            fontsize=6.9, fontweight="bold", color=PALETTE["ink"])
    ax.text(0.7675, 0.117, "source provenance  |  review gates  |  version history  |  confidentiality",
            ha="center", va="center", fontsize=5.5, color=PALETTE["muted"])

    fig.savefig(f"{stem}.svg", bbox_inches="tight", pad_inches=0.02)
    fig.savefig(f"{stem}.pdf", bbox_inches="tight", pad_inches=0.02)
    fig.savefig(f"{stem}.tiff", dpi=600, bbox_inches="tight", pad_inches=0.02,
                pil_kwargs={"compression": "tiff_lzw"})
    fig.savefig(f"{stem}.png", dpi=600, bbox_inches="tight", pad_inches=0.02)
    plt.close(fig)


if __name__ == "__main__":
    main()
