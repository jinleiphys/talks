# Critic-loop target: slide 18 of the DREB 2026 talk ("The posterior in data space")

## Goal in one line
A visual redesign of slide 18 so that an experimentalist sees in five seconds that the calibrated
model (green: posterior median and 95% band) follows the measured d + 58Ni angular distribution
across the whole angular range while the uncalibrated global potential (KD02, pink dashed) drifts
out of phase, and reads the size of that improvement (chi2/N 51.8 for KD02 vs 1.16 for the
posterior mean) without decoding anything.

## Target
- The rendered slide: `critique/s18/rNN/18.png` (1980x1114, final click state) and
  `critique/s18/rNN/notes.md` (what the speaker says).
- House style: the neighbouring slides as rendered, `critique/s18/ref/16.png`, `ref/17.png`,
  `ref/19.png` (parchment background, ink-blue accent, serif titles, one takeaway line at the
  bottom, big ink-blue numbers with a small caps label above). Slide 17 shows the in-house look of a
  redrawn angular-distribution figure (parchment, no white box). Slide 19 uses the same green
  (posterior) and pink (KD02) as this slide; the colours must stay consistent with slide 19.
- `ref/18_before.png` is the slide before the redesign, for reference only.
- Slide rules: one message; a title that states the point; every curve and mark explained on the
  slide; nothing under ~14 px at 1980x1114; no overlap, clipping or overflow (the old version's
  figure box overlaps the takeaway rule); one obvious first place to look; no unexplained jargon
  for an experimentalist ("posterior" may be used if said in plain words once).

## Context (to check correctness, not to be judged)
- Figure data: `figures/predictive_cache_v728.npz` (copied from the paper's
  `DREAM_project/examples/cdcc_d58Ni/data/fig2_predictive_cache_v728_full16k.npz`): posterior
  median and 2.5/97.5 percent band from 200 draws of the 16000-sample posterior, KD02 curve, the 64
  measured points with their (assigned) errors.
- Slide source: `slides.md`, the slide titled "The posterior in data space".

## Persona
A senior experimentalist at a rare-isotope facility (runs (d,p) and elastic campaigns, fits optical
potentials with standard codes, has never run a sampler), mid-room after lunch, giving the slide
five seconds. Secondary: a designer who would be embarrassed to see this slide next to 16, 17, 19.

## Bar
9/10 per family. Round cap: 5.

## Fixed points (do not ask to change)
- Numbers: 64 data points, chi2/N 51.8 (KD02 in this CDCC model, not refitted) and 1.16
  (posterior mean), 95% band. Curves come from the data file; their values may not change.
- The message of the takeaway (user-approved): calibrated on one angular distribution, the model
  reproduces the whole diffraction pattern; KD02 loses it beyond about 40 degrees. No angle
  details about where the green curve misses (user decision), no error-scale beta, no statement
  about how the error bars were assigned (both removed by the user).
- Green = posterior, pink dashed = KD02 (consistent with slide 19). Deck style and slide size;
  this stays one slide. No em-dashes.
