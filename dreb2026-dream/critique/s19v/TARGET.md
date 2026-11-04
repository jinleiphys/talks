# Critic-loop target: visual quality of slide 19 of the DREB 2026 talk

## Goal in one line
Make slide 19 visually as strong as its neighbours, so an experimentalist sees in five seconds
that the elastic data moved the real volume integral (913 -> 772 +- 13, 15% below KD02) and left
the absorption (imaginary) where KD02 put it (198 -> 204 +- 14, three times sharper).

## Target
- The rendered slide: `critique/s19v/rNN/19.png` (1980x1114, final click state) and
  `critique/s19v/rNN/notes.md` (what the speaker says).
- House style: `ref/16.png`, `ref/17.png`, `ref/18.png` (parchment background, ink-blue accent,
  serif titles, figures drawn on the parchment with no white box, pink = KD02, green = calibrated,
  big numbers with a small-caps label above, one takeaway line at the bottom).
  `ref/19_before.png` is the slide before this loop: the content is approved by the speaker, its
  look is what must improve (it pastes the paper's white-background raster).
- Slide rules: one message; every mark in the figure explained; nothing under ~14 px at
  1980x1114; no overlap, clipping or overflow; one obvious first place to look; the eye path from
  the figure to the numbers should be immediate (which panel is which number).

## Context (to check correctness, not to be judged)
- Figure data: `figures/volume_integrals_v728.npz` (copy of the paper's
  `DREAM_project/examples/cdcc_d58Ni/data/final_volume_integrals_v728.npz`: 16000 posterior and
  1e5 prior draws of the proton and neutron volume integrals, KD02 components).
- The paper figure's own script: `/Users/jinlei/Desktop/code/DREAM_project/examples/cdcc_d58Ni/make_fig3_information.py`.
- Slide source: `slides.md`, the slide titled "The data move the real strength; the absorption
  stays at KD02".

## Persona
A senior experimentalist at a rare-isotope facility (runs (d,p) and elastic campaigns, has never
run a sampler), mid-room after lunch, giving the slide five seconds. Secondary: a designer who
would be embarrassed to see this slide next to slides 16, 17, 18.

## Bar
9/10 per family. Round cap: 5.

## Fixed points (do not ask to change)
- The figure is the paper's figure (user decision): two panels, proton share (x) against neutron
  share (y) for (a) real and (b) imaginary volume integral, posterior 68/95% regions, the KD02
  prior 1-sigma ellipse, the KD02 star, the constant-total line. Its data and computed contours
  may not change; styling, size, labels, legend wording and placement may.
- The text content approved by the speaker: the title; the two rows (real 913 -> 772 +- 13,
  "moved: 15% below KD02"; imaginary (absorption) 198 -> 204 +- 14, "unchanged, only three times
  sharper"); the one-line dotted-line sentence (the data fix the total, not the proton/neutron
  share); the takeaway "One angular distribution fixes the real strength to +-1.7%, the
  absorption to +-7%." Wording may be tightened; no new claims, no new caveats on the slide face.
- No em-dashes. This stays one slide.
