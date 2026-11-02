# Critic-loop target: DREB 2026 talk "Differentiable emulation"

## Goal in one line
A ~20 to 25 minute contributed/invited talk at DREB 2026 (Direct Reactions with Exotic Beams,
Shenzhen, November 2026) that an **experimentalist** in the room (someone who measures (d,p),
knockout or elastic scattering with rare-isotope beams and extracts spectroscopic factors) can
follow from start to end, and leaves knowing what the method changes for *their* analysis,
while reaction theorists still find it correct and not dumbed down.

## Target
- The deck as rendered: one PNG per slide (final click state) in `critique/rNN/slides/`, plus
  `critique/rNN/notes.md` (the speaker notes, i.e. what the speaker will say aloud).
- Style house rules: the editorial (kami-like) look already in the deck. Clean, one idea per
  slide, a one-line takeaway per slide, readable from the back of a room (no text under ~14 px
  equivalent at 1980x1080 projection), figures labelled so a reader can tell what is plotted.
- Experimentalist-friendliness means, concretely:
  - every statistics or emulator term (posterior, prior, likelihood, Fisher direction, HMC/NUTS,
    reduced basis, emulator, coverage, SVD) is either explained in plain physics words on first
    use or not needed to follow the slide;
  - each act connects back to a quantity experimentalists produce or use (cross sections,
    angular distributions, S, error bars, which measurement to make next);
  - the talk answers "what should I do differently with my data / what would you need from me";
  - no slide depends on knowing the speaker's code names (DREAM, STARS, etc.) without saying
    what they are.

## Context (to check correctness, not to be judged)
- Paper the talk is based on: `/Users/jinlei/Desktop/code/DREAM_project/paper/prc/main_prc_v2.pdf`
  (PRC LT19565C revision). Numbers on slides must agree with it.
- Source of the slides: `/Users/jinlei/Desktop/talks/dreb2026-dream/slides.md` (speaker notes
  carry provenance of every number and figure).

## Persona
A senior experimentalist at a rare-isotope facility (has run (d,p) and knockout campaigns,
uses ADWA/DWBA from theorists, knows what a spectroscopic factor and an optical potential are,
has heard the word "Bayesian" but never run a sampler). Sits in the middle of the room, is
tired after lunch, and will decide in the first three minutes whether to keep listening.
Secondary check: a reaction theorist who will object to any wrong or overclaimed statement.

## Bar
9/10 per family. Round cap: 5.

## Fixed points (do not ask to change)
- The physics results and numbers (J_R/A_T = 772 +- 13, J_W/A_T = 204 +- 14 MeV fm^3, 151
  channels, 16000 samples, NUTS gain 2.4x per call / parity per forward-equivalent, the
  verification results, the 48Ca(d,p) numbers). Never ask to reinstate the retired "36% surface
  absorption" headline.
- The five-act structure (why Bayesian / how it is done now / what is hard / DREAM / results
  and limits) and the honest framing (modest NUTS gain, limits slide).
- The visual style of the deck. Talk length must not grow: no more than the current number of
  slides; prefer replacing over adding.
- No em-dashes in any text. Accuracy and precision are distinct words.
- Talk length and timing are out of scope (user instruction, 2026-11-01): do not flag them.
