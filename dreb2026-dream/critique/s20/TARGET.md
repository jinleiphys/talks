# Critic-loop target: slide 20 of the DREB 2026 talk (limits and outlook), redesigned

## Goal in one line
The last content slide: an experimentalist sees in five seconds what has been shown (one system,
one energy, elastic only, a simple model) and leaves knowing the three things their experiments
can give, and what each one buys them, with no jargon to decode.

## Target
- The rendered slide: `critique/s20/rNN/20.png` (1980x1114, final click state) and
  `critique/s20/rNN/notes.md` (what the speaker says).
- House style: `ref/15.png`, `ref/16.png`, `ref/18.png`, `ref/19.png` (parchment, ink-blue accent,
  serif titles, small-caps labels, card layouts on 15/16, pink = KD02, green = calibrated, one
  takeaway line at the bottom). `ref/20_before.png` is the current slide: its wording is approved
  by the speaker; its layout is what is being redone.
- Slide rules: one message; a title that states the point (the current "Limits and outlook" is a
  topic); plain words (the speaker found "elastic where you measure transfer" unreadable and had
  it rewritten); nothing under ~14 px at 1980x1114; no overlap, clipping or overflow; one obvious
  first place to look; the request to experimentalists is the key turn and must not be buried.

## Context (to check correctness, not to be judged)
- Slide source: `slides.md`, the slide titled "Limits and outlook" or its successor; its speaker
  notes carry the provenance (48Ca S 0.49 vs 0.58 is a 17% swing driven by the deuteron
  absorption, slide 4; absorption pinned to 7% against 1.7% for the real part, slide 19; EXFOR
  quoted errors for 4 of the 64 points; ~1e3 direct-solve equivalents offline, < 1 h sampling on
  one GPU).

## Persona
A senior experimentalist at a rare-isotope facility (runs (d,p) and elastic campaigns, has never
run a sampler), at the end of the talk, deciding whether to talk to the speaker afterwards.
Secondary: a reaction theorist who objects to any overclaim, and a designer comparing it with
slides 15, 16, 18, 19.

## Bar
9/10 per family. Round cap: 5.

## Fixed points (do not ask to change)
- Content: shown = d + 58Ni at 20 MeV, elastic only, one energy, real strength 15% below KD02 in a
  simple model (no spin, target not excited); cost = about 1000 full calculations once per system,
  then under an hour per calibration. The three asks: (1) measure elastic together with your
  (d,p), same target and beam energy, so the potential's uncertainty becomes an error bar on S
  (48Ca: 0.49 vs 0.58 becomes one value with an error); (2) give every error bar, point by point
  and the normalization; (3) help pin down absorption: wide angles, several energies, the total
  reaction cross section. Next steps: more energies, plus (d,p). No new results or promises (how
  much each ask would shrink an interval was not computed).
- No em-dashes. This stays one slide. Deck style and colours.
