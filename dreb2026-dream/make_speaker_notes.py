#!/usr/bin/env python3
"""Rebuild speaker-notes.md from the <!-- --> notes in slides.md.

Run after every slide change:  python3 make_speaker_notes.py
The slide's `# ` heading becomes the section title (the cover is "Title slide");
the labels Central message / Talking points / Timing target / Transition / If asked ...: are
set in bold. Untitled separator slides are skipped.
"""
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC, OUT = HERE / "slides.md", HERE / "speaker-notes.md"
TITLE = ("Speaker notes: Full Bayesian calibration of coupled-channel reaction models, "
         "by differentiable emulation")
BYLINE = "Jin Lei · DREB 2026, Shenzhen, November 2026"
BOLD = ("Central message:", "Talking points:", "Timing target:", "Transition:")

text = SRC.read_text()
text = re.sub(r"\A---\n.*?\n---\n", "", text, count=1, flags=re.S)  # headmatter
# split on slide separators; a separator followed by YAML (layout: ...) keeps that YAML
slides = re.split(r"\n---\n(?:(?:[a-zA-Z]+:.*\n)+---\n)?", "\n" + text)
slides = [s for s in slides if s.strip()]

parts = []
for k, s in enumerate(slides):
    m = re.search(r"^# (.+)$", s, flags=re.M)
    if not m and k > 0:
        continue  # untitled separator (the backup divider) gets no section
    i = len(parts) + 1
    title = m.group(1).strip() if m else "Title slide"
    notes = re.findall(r"<!--(.*?)-->", s, flags=re.S)
    body = "\n\n".join(n.strip("\n") for n in notes).strip()
    lines = []
    for line in body.splitlines():
        for lab in BOLD:
            if line.startswith(lab):
                line = f"**{lab}**" + line[len(lab):]
        line = re.sub(r"^(If asked[^:]*:)", r"**\1**", line)
        lines.append(line)
    parts.append(f"## {i}. {title}\n\n" + "\n".join(lines).strip() + "\n")

OUT.write_text(f"# {TITLE}\n\n{BYLINE}\n\nExtracted from `slides.md` ({len(parts)} slides).\n\n"
               "---\n\n" + "\n---\n\n".join(parts))
print(f"wrote {OUT.name}: {len(parts)} slides")
