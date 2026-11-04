# Critic-loop target: slide 20 of the DREB 2026 talk, judged on visual quality

## Goal in one line
Make the last content slide (what was shown, what experiments can give) as beautiful and as
clearly designed as the best earlier slides of the same deck, so it looks like it belongs to them
and an experimentalist reads it at a glance.

## Target
- The rendered slide: `critique/s20b/rNN/20.png` (1980x1114, final click state) and
  `critique/s20b/rNN/notes.md` (speaker notes, check only for consistency with the slide).
- The deck's design language, as rendered in `ref/02.png` to `ref/17.png`. The strongest
  models for this slide: `ref/09.png` (white cards with a navy left edge, round line icon, bold
  lead phrase), `ref/11.png` and `ref/16.png` (small-caps "01 / LABEL" over large ink-blue
  numbers or words), `ref/04.png` (vertical-rule stat blocks), `ref/15.png` (icon cards).
  Parchment background, ink-blue accent, serif titles, sans body, one takeaway line at the bottom.
- `ref/20_rejected_by_user.png`: a version the speaker rejected as ugly (heavy grey band, pill
  chips, three tall boxed cards, overlap). Do not drift back towards it.
  `ref/20_current.png`: the starting point (approved wording, plain two-column text).
- Judge mainly: beauty and consistency with the earlier slides (hierarchy, whitespace, rhythm,
  alignment, balance of the two halves, icon and colour use), then readability (nothing under
  ~14 px at 1980x1114, no overlap or clipping, one obvious first place to look).

## Context (for correctness only)
- Slide source: `slides.md`, the slide titled "Shown for one case; your data take it further".

## Persona
A slide designer who made slides 9, 15 and 16 of this deck and would be embarrassed if slide 20
looked like it came from a different talk. Secondary: a senior experimentalist at the end of the
talk, deciding whether to talk to the speaker.

## Bar
9/10 per family. Round cap: 5.

## Fixed points (do not ask to change)
- Content: shown = d + 58Ni at 20 MeV, one energy, elastic only, real strength 15% below KD02 in a
  simple model (no spin, target not excited); cost = about 1000 full calculations once per
  nucleus and energy, then under an hour per calibration. Three asks, each with its gain:
  (1) measure elastic with your (d,p), same target and beam energy, gives an error bar on S
  (e.g. 48Ca); (2) give every error bar, point by point and the normalization, so the
  uncertainty is set by your data; (3) help pin down absorption (wide angles, several energies,
  the total reaction cross section), the weak part, which moved S most. Bottom line: next on our
  side, more energies, then (d,p) on the same target. Wording may be tightened, no new claims.
- No em-dashes. One slide. Deck colours (ink blue #1B365D, pink = KD02, green = calibrated).
