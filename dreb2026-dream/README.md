# DREB2026, Shenzhen

"Differentiable emulation for full Bayesian calibration of coupled-channel reaction models"
Jin Lei. Contributed oral, 20 min, English. Kami style.

13th International Conference on Direct Reactions with Exotic Beams, 2026-11-01 to 11-06,
Shenzhen, SUSTech (dreb2026@sustech.edu.cn). No proceedings. Session: theoretical
developments and advances in direct reaction theory.

## Visual revision, 2026-10-16

Reworked the cover, typography, figure annotations, budget, verification, and closing pages. Long explanations remain in speaker notes. Figures and data are unchanged. PNG export of all 20 pages was inspected; an overlap on slide 10 was corrected. A separate cold-reader pass clarified the two chi-square definitions and the offline batch of reference solves. This was a presentation edit, not a fresh validation of the scientific claims.

## Live sampler figure, 2026-10-26

Slide 12 ("Difficulty 2: the posterior is a curved ridge") now uses `components/HmcScene.vue`
instead of `RidgeScene.vue` (kept, unused). It embeds `public/hmc_ridge.html`, a hand-inked
block carved to height U = -log p of a schematic two-parameter banana posterior. Clicks 1-3 run
eight random-walk proposals, one HMC trajectory, one NUTS transition (full doubling tree in both time
directions, sub-tree U-turn checks, multinomial draw; 10^5 transitions match the exact means and
variances to 1-2 percent); the audience can drag to
turn the block, and focus returns to the deck so the arrow keys still advance. PDF export shows
`public/hmc_ridge_still.png`. Source: `figures/hmc_ridge/hmc_ridge.html` plus the Colorfigures
engine `core.js`; rebuild with

    python3 ~/Downloads/colorfigures/scripts/build.py figures/hmc_ridge/hmc_ridge.html public/hmc_ridge.html

Schematic only: not the 18-parameter posterior, and the counters are not an efficiency benchmark.

## Run it

    export PATH=/usr/local/bin:$PATH    # node 22; Homebrew node breaks Slidev
    npm install
    npx slidev slides.md --port 3039

Build: `npm run build` (base path `/talks/dreb2026-dream/`).

## Narrative

The talk is physics-first. It opens on a concrete extracted quantity that moves when the
optical potential is changed, not on a statistics argument, and it reaches the Bayesian
machinery only as the language the physics question needs.

```
Problem:   Every structure and astrophysics number extracted from a direct reaction is a
           ratio, and the denominator is a reaction model whose input optical potential is
           not measured.
Gap:       That potential is a Feshbach-projected, nonlocal, complex effective object that
           the data constrain only through the surface wavefunction, so it is non-unique by
           construction. The field quantifies this with point estimates, or with MCMC over
           two to six parameters in a single channel.
Idea:      The obstacle to full Bayesian calibration is gradient absence, not solve cost.
           Compress the parameter-dependent operator offline, reconstruct it inside an
           automatic-differentiation framework, and reverse-mode gradients make NUTS
           affordable on an eighteen-parameter coupled-channel model.
Evidence:  Elastically scattered d + 58Ni at 20 MeV, 18 parameters, 12 sampled coordinates.
           The emulator passes a 13-point direct-CDCC check before the posterior is read.
           NUTS returns 16000 samples in under an hour on one GPU with zero divergences.
Meaning:   The data determine the summed real and imaginary volume integrals to 2 percent
           and their proton-neutron split not at all. Full Bayesian calibration of a
           coupled-channel reaction model is now a routine computation.
```

## Slide list (18 main, then Thank you, then backup)

| # | Title | Block | Timing |
|---|---|---|---|
| 1 | Cover | | 0:20 |
| 2 | Every extracted structure number is a ratio | A physics problem | 1:15 |
| 3 | One reaction, two potentials, a different answer | A | 1:15 |
| 4 | The potential is not determined by the data | A | 2:00 |
| 5 | The classical answer: one fit, one point | B prior work | 1:00 |
| 6 | The Bayesian answer, so far | B | 1:30 |
| 7 | Affordable solves are not enough | B | 1:15 |
| 8 | Full Bayesian calibration is not new. The non-affine case is. | B | 1:15 |
| 9 | Our line: an exact solver, then a fast one | C our work | 1:00 |
| 10 | The information geometry of the potential | C | 1:15 |
| 11 | What blocks full Bayesian calibration | C (core idea) | 1:00 |
| 12 | The construction | D DREAM | 1:30 |
| 13 | What it costs, and what it buys | D | 1:00 |
| 14 | Verify before reading the posterior | D | 1:15 |
| 15 | What nearly went wrong | D | 1:15 |
| 16 | The posterior, seen as a prediction | D | 1:15 |
| 17 | What the data determine | D | 1:15 |
| 18 | Limits and outlook | E | 1:15 |
| 19 | Thank you, unnumbered | | 0:20 |
| 20 | `backup: true` separator, blank, unnumbered | | as asked |

`global-bottom.vue` reads the main slide count off the first `backup: true` slide, so the
printed counter stops at 18: slides 1 to 18 read "n / 18", and "Thank you" and the blank
separator carry no number. The separator is a placeholder for backup slides, not a slide.
Note that the counter arithmetic gives the same 18 without it, so the blank slide is there
only to mark where backups go.

## Term ledger

Every term the slides put in front of the audience, with its disposition. Terms marked
OURS are defined on the slide where they first appear; terms marked DROP do not reach the
slides at all.

| Term | Disposition |
|---|---|
| optical potential, OMP | field standard |
| Feshbach projection | field standard, glossed in one clause on slide 4 |
| Igo ambiguity | field standard, cited (Igo 1958) |
| dispersion relation (real and imaginary parts) | field standard |
| nonlocal (Perey-Buck) | field standard |
| KD02, CH89 | field standard global potentials, cited |
| CDCC | field standard, glossed in one clause |
| DWBA, ADWA, transfer, spectroscopic factor, ANC, S factor | field standard |
| MCMC | field standard in UQ |
| HMC, NUTS | HMC glossed on slide 8 as "a sampler that follows the gradient of the log posterior"; NUTS glossed on slide 19 as an adaptive gradient sampler |
| posterior, prior, likelihood, credible interval | field standard in UQ |
| reduced basis, Galerkin projection | adjacent-field, glossed in one clause on slide 7 |
| DREAM | OURS: the name of the construction. Introduced with a plain gloss, then used as a proper noun. Not a physics term |
| emulator | OURS-in-use: one word only. "surrogate" never appears |
| participation ratio | not named on the slides: slide 10 glosses its number as the shape of the spread before quoting it. Never "combinations of parameters", only spectral anisotropy |
| volume integral, J_R and J_W per target nucleon | field standard for optical-potential work, glossed once on slide 17 |
| model discrepancy | glossed once on slide 14 |
| DBMM | DROP from slides. Referred to as "an exact solver that imposes the outgoing-wave condition directly", with the citation |
| POD-I, V_red, chi2_emu, gate, Phase 3c | DROP. Figure internals relabelled |
| STARS, SLAM.jl, JAX, NumPyro | one line on the closing slide at most |
| Line A / B / C / D / E / F | DROP |

## Honesty guardrails (from the project record, binding)

1. The retired "surface absorption approximately 36 percent above KD" headline does not
   appear in any form.
2. The Fisher result is reported as a participation ratio (spectral anisotropy), never as
   "the data constrain only 1.7 combinations". The PRC referee's point 4 holds against our
   own spectrum, so slide 10 also carries the count that is a count: about 8 of 13
   directions resolved at 10 percent tolerance.
3. The earlier production run that was emulator-biased is presented as the talk's most
   useful methodological content, not hidden (slide 15).
4. The work is positioned as a framework: single energy, single system, elastic scattering
   only. Breakup needs higher emulator fidelity and is stated as future work.
5. No claim that a reaction measures the off-shell force, and no claim about the
   proton-neutron decomposition, which the paper leaves undetermined. Slide 17 says the
   data fix the sum and leave the split far less determined, which is the paper's own
   reading.

## Figures

| figure | source | slide |
|---|---|---|
| `sfactor.png` | Nguyen et al., PRC 84, 044611 (2011), Table II, redrawn | 3 |
| `potential_information.png` | the 168-configuration scan behind `opticalfisher/data/deff_scan_extended.json`, run through the forward model in its `analysis` module | 10 |
| `verify_check.png` | `DREAM_project/examples/cdcc_d58Ni/data/gate_ext_v728.npz` | 14 |
| `verify_broken.png` | the same file, plus one pair from the calibration record | 15 |
| `predictive_posterior.png` | reuse of Fig. 4 of the DREAM paper | 16 |
| `volume_integrals.png` | reuse of Fig. 3 of the DREAM paper | 17 |

Each plotted figure has its script beside it, and each script's docstring states the claim
and the provenance of every number: `make_sfactor.py`, `make_potential_information.py`,
`make_verify_check.py`, `make_verify_broken.py`. All four import the palette from
`../qfs-rb-2026/figures/kami_style.py` rather than carrying a second copy, and all were made
under the `nature-figure` skill: APS closed box, inward ticks on all four sides, no interior
grid, direct labels instead of legends, and no em-dashes in any figure text.

`potential_information.png` imports the forward model from the opticalfisher analysis module
rather than copying it, and asserts the chosen configuration's D_eff and its count against
`data/deff_scan_extended.json` before drawing anything. The configuration is n + 208Pb at
20 MeV, chosen because both of its values (1.587 and 8 of 13) are the median of the scan,
whose ensemble is 1.66 +/- 0.40 and 7.92 +/- 1.65; the picture is therefore not an outlier
either way. Its upper panel is the angular distribution, its lower panel the thirteen
responses in per cent with the line the count is taken at, and the line is derived rather
than chosen: a step of eps along a direction changes the curve by eps sqrt(lambda / n) at
RMS over the n angles of the scan, so the direction at the boundary of the ten percent
tolerance sits at 10 / sqrt(35) = 1.7 per cent. One figure was retired on 2026-10-16 and is
still in `figures/` unreferenced: `fisher_spectrum.png`, the eigenvalue spectrum, whose x
axis is an index and off which no audience can read a physical claim; it was replaced by the
same information in physical units, which is the lower panel described above.

`sfactor.png` carried a mislabelled percentage until 2026-10-16: an arrow spanning 0.70 to
1.10 was annotated "43 percent apart, same data", and 1.10 against 0.70 is 57 percent. The
arrow now carries the two values it spans, and the 43 percent the slide quotes is a
different statement, the swing of the global series across its own four energies, 0.77 to
1.10. `make_sfactor.py` prints both, and slide 3's note says which is which.

`potential_information.png` reads the scan in `data/deff_scan_extended.json`. The
neighbouring `data/elastic_fisher_matrices.json` is stale (11 parameters, predates the
2026-07-14 l_max fix) and must not be plotted.

Every number on slides 14 and 15 is reproducible from files. Slide 14's ten extension points
come from `gate_points_v728.py --curve_out` against the production grid, through
`data/gate_ext_v728.npz`. Slide 15's pair (the solver at 117, the emulator at 89, an
emulator-to-solver chi-square of 6.4) is a direct CDCC solve at the posterior mean of the
earlier, differently built basis on the 20 MeV deck, with the emulator evaluated at the same
point on that basis's grid; both sides were recomputed on 2026-10-16 from the saved S-matrix
and from that run's grid, so the two can be quoted as read. Both slides are at 20 MeV, the
energy at which the data were measured (Ermer et al., EXFOR F0709.024). An earlier case at
21.6 MeV, where the pre-fix pair read about 52 against 95, is more visibly broken, but it is
at an energy the data were not measured at, so the deck does not use it.

Slide 15 carries one more number, computed on 2026-10-16 from the same saved pair and not
from any record: weighting both curves by sin(theta) and integrating over the measured
angles, the emulator and the solver agree to 0.84 per cent, so an integrated quantity is
blind to a defect that reaches 0.94 of an error bar at a minimum. It also carries where the
defect is: inside a third of an error bar to about 143 degrees, positive to 0.71 between 145
and 168, negative to 0.94 at 173. What makes the failure a real one rather than noise is
that the emulator's error is anti-correlated with the solver's own error against the data,
at -0.65, so it crosses the solver in the direction that repairs the fit. The figure's
docstring said otherwise until 2026-10-16 (it claimed a region where the measurement lies
above both curves); the corrected sentence is in `make_verify_broken.py`.

## Click-driven diagrams

The four components keep the original click counts but now display direct, labelled 2D diagrams rather than Three.js metaphors:

- `RatioScene.vue`: illustrative spectroscopic-factor normalization, with cross-section units and explicit arithmetic.
- `MatrixScene.vue`: analytic Woods–Saxon depth and radius changes, with radial and potential axes.
- `RidgeScene.vue`: schematic two-parameter posterior contours, proposal rejection, and an illustrative HMC trajectory. This is not a sampler benchmark or the measured posterior.
- `ConstructionScene.vue`: the actual offline and online objects, from parameters through the reduced solve, cross sections, posterior gradients and reference validation.

All states retain context, and explanatory notes follow the new diagrams. The existing scene composable is retained for recovery but no longer imported by the four diagrams.

## Slide size check

Every slide was measured in the browser at the presentation route, comparing the deepest
element of each slide against the 980 x 552 canvas. All 20 fit. Figures are sized so that
the source pixel width is roughly four times their on-slide display width, which puts figure
text at about the slide body size.

## Notes on the construction of the deck

- **Figure heights.** `.kami-img` must not carry a fixed `height`: a rule that pinned it to
  20rem stretched every figure away from its true aspect ratio. It is `height: auto` now, and
  the figures' aspect ratios depend on it.
- **SVG text sizing.** Unitless `font-size` presentation attributes on `<svg><text>` are
  misrendered on a Slidev page: values below 16 come out multiplied by four. Always write an
  explicit unit, `font-size="22px"`. Slide 4's potential sketch was fixed this way.
- **Cold-reader check.** A fresh subagent read the slide bodies with the notes stripped and
  listed what it could not decode. Its verdict slide was 10, which is why that slide now
  defines the matrix it diagonalises and puts all three numbers on one scale. The same pass
  found the "ten thousand evaluations" contradiction with slide 13, now "a hundred thousand".
- **Cut order if the talk runs long:** slide 7, then slide 9, then slide 15.

## Provenance

Numbers are taken from `DREAM_project/paper/prc/main_prc.tex`, from
`DREAM_project/examples/cdcc_d58Ni/data/final_volume_integrals_v728.npz` (re-derived, not
quoted), and from `DREAM_project/CLAUDE.md` plus its devlog archive for the slide 15 failure
story. Citations are verified before they reach a slide.

The one do-not-use file is `phase3c_angular_pm_mean.png`: it labels the beam energy as
22 MeV while every other source says 20 MeV.
