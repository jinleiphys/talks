# Critic-loop target: slide 12 of the DREB 2026 talk ("Difficulty 2": the data fix combinations of parameters)

## Goal in one line
One slide that lets an experimentalist see, in under a minute and without the word "Fisher",
that an elastic angular distribution pins down some combinations of optical-potential
parameters and leaves others free, how this relates to the Igo ambiguity they just saw on
slide 5, and why that makes the posterior a correlated ridge (the next slide's picture).

## Target
- The rendered slide: `critique/s12/rNN/12.png` (1980x1114, final click state) and
  `critique/s12/rNN/notes.md` (what the speaker says).
- House style: the neighbouring slides as rendered, `critique/s12/ref/05.png` (the Igo slide this
  one must connect to), `critique/s12/ref/11.png`, `critique/s12/ref/13.png`, and the redesigned
  card-style slides `critique/s12/ref/08.png`, `critique/s12/ref/10.png` (parchment background,
  ink-blue accent, serif titles, one takeaway line at the bottom).
- Slide rules: one message; a title that states the point; every curve and mark in the figure
  explained on the slide (a viewer must know what every line is); no unexplained jargon (no
  "Fisher", "eigenvector", "information"); nothing under ~14 px at 1980x1114; no overlap,
  clipping or overflow; one obvious first place to look.

## Context (to check correctness, not to be judged)
- Figure script and its provenance notes: `figures/make_potential_information.py` (docstring).
- The printed composition of the 13 directions (from that script, n + 208Pb, 20 MeV, KD02):
  1: -0.92 rv, -0.37 V (radius and depth together; rms change 95%); 2: rvd, avd, Wd (27%);
  3: V, rvso, rvd (18%); 4: rvd, avd, Wd (19%); 5: av, rvso, V (9.3%); 6: av, rvso, V (8.0%);
  7: Vso (5.5%); 8: Wd, avd (2.3%); 9: W (0.70%); 10: avso (0.43%); 11: aw (0.26%);
  12: rw, Wso (1.0%); 13: Wso (0.15%). Threshold 1.7% = 10%/sqrt(35). Signs of a direction
  are arbitrary; the red dashed curve is the step p -> p exp(0.1 v1), i.e. radius -9%, depth -3.7%.
- Slide source: `slides.md`, the slide titled "Difficulty 2: the data constrain combinations,
  not parameters"; slide 5's notes contain the nucleon control (n + 208Pb: a 10% depth change
  cannot be refitted, chi2/N ~ 2.5).

## Persona
A senior experimentalist at a rare-isotope facility (runs (d,p) campaigns, fits optical
potentials to elastic data with standard codes, knows the Igo ambiguity, has never heard of
Fisher information), mid-room after lunch, giving the slide five seconds before deciding it is
noise. Secondary: a designer who would be embarrassed to see this slide next to slides 8 and 10.

## Bar
9/10 per family. Round cap: 5.

## Fixed points (do not ask to change)
- The numbers: 13 parameters, 600x (95% vs 0.15%), 8 of 13 fixed at a 10% tolerance with 35
  angles to 175 deg and 10% errors, 4 of 13 with ten angles at 10-60 deg, the 1.7% line.
- The system: n + 208Pb, 20 MeV, KD02. The figure's data (curves and dots) come from the script;
  labels, legend, layout and which panels are shown may change, the computed values may not.
- No "Fisher" or other information-geometry jargon on the slide face (the speaker's decision).
- The deck's visual style and slide size; this stays one slide.
- The message: the data fix combinations, not individual parameters, so the posterior is a
  correlated ridge.
