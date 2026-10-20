---
theme: seriph
title: "Differentiable emulation for full Bayesian calibration of coupled-channel reaction models"
info: "DREB2026, Shenzhen. Full Bayesian calibration of an eighteen-parameter coupled-channel reaction model, made affordable by a differentiable reduced-basis emulator."
author: "Jin Lei"
background: none
transition: fade
comark: true
exportFilename: differentiable-emulation-dreb2026
fonts:
  sans: 'Inter'
  serif: 'Newsreader, Source Serif 4, TsangerJinKai02, Source Han Serif SC, Songti SC, Georgia, serif'
  mono: 'JetBrains Mono, SF Mono, Consolas, monospace'
  local: 'Newsreader'
drawings:
  persist: false
layout: cover
class: editorial-cover
---

<div class="cover-kicker">DREB 2026 <span>SHENZHEN · NOVEMBER 2026</span></div>
<h1 class="cover-title">Differentiable emulation</h1>
<div class="cover-subtitle">Full Bayesian calibration of<br>coupled-channel reaction models</div>
<div class="cover-rule"></div>
<div class="cover-author">Jin Lei</div>
<div class="cover-affiliation">Tongji University, Shanghai<br>Southern Center for Nuclear-Science Theory, IMP, CAS, Huizhou</div>
<div class="cover-support">NSFC 12475132 · 12535009</div>

<!--
Central message: what the talk is, in one line, before any machinery.

Talking points:
- This is a methods talk about how a coupled-channel reaction model gets calibrated,
  and it is deliberately framed as a physics problem rather than a statistics problem.
- Twenty minutes, one argument: the reaction model in the denominator of every
  extraction is not determined by the data, full Bayesian calibration is the honest
  way to say what the data do determine, and it is now affordable.

Timing target: 20 seconds.

Transition: start where the audience lives, with the extraction they all perform.
-->

---
clicks: 3
class: scene-slide
---

# Extracting S means normalizing a calculation

<div class="subtitle">A spectroscopic factor inherits the optical-potential dependence of the calculated cross section.</div>

<LiveOnly><RatioScene :step="$clicks" :height="356" /></LiveOnly>

<!--
Central message: a model-dependent normalization produces a model-dependent extraction.
Click 0: identify the fixed measured cross section and its units. The numbers are illustrative.
Click 1: compute for S = 1 with optical potential A.
Click 2: normalize: S = 100 / 125 = 0.80. Real analyses fit an angular distribution.
Click 3: change only the potential. The unit-S prediction becomes 100 and the extracted S becomes 1.00.
These are illustrative values, not results for a measured system. Do not generalize the normalization formula to all ANC or astrophysical S-factor extractions.
Transition: the next slide supplies a published example.
Timing target: 1 minute 15 seconds.
-->

---

# The extracted answer depends on the potential

<div class="grid grid-cols-12 gap-6 mt-2">
<div class="col-span-7">

<img src="./figures/sfactor.png" class="kami-img" style="width: 100%;" />

</div>
<div class="col-span-5 pt-1">

<div class="box-gap">

<b>Global potential</b>

<div class="mt-1 text-sm"><span class="metric">0.77–1.10</span>Four energies, one reaction.</div>

</div>

<div class="box-evidence mt-3">

<b>Dispersive potential</b>

<div class="mt-1 text-sm"><span class="metric">0.67–0.72</span>Real and imaginary parts linked by dispersion.</div>

</div>

</div>
</div>

<div class="takeaway mt-4">
<b>43% variation</b> across energies with the global potential.
</div>

<!--
Central message: one published example shows the extraction moving under the optical
potential alone, and shows that the physics content of the potential, not the fit, decides
which answer survives.

Figure explanation (the two series of the paper's Table II, redrawn at their four energies):
- The blue series is a global nucleon optical potential, read at half the deuteron energy,
  the standard adiabatic choice: 0.94, 0.82, 0.77, 1.1 at 2, 13, 19.3 and 56 MeV.
- The red series is a dispersive potential, whose real part obeys a dispersion relation with
  its own measured imaginary part: 0.72, 0.67, 0.68, 0.70.
- Both use the same overlap function, so the entire difference between the series is the
  potential. That is what the caption says and it is the point of the slide.
- The two numbers the figure labels are the ends of the arrow at 56 MeV, 1.10 and 0.70. The
  43 percent on the slide and in the takeaway is a different statement: it is the swing of
  the blue series across the four energies, from its 0.77 at 19.3 MeV to its 1.10 at 56 MeV.
  If a questioner reads the arrow as the 43 percent, correct it: the arrow spans a factor of
  1.57, which is 57 percent relative to its lower end. The figure no longer carries a
  percentage for exactly that reason.
- The paper's own reading is that the dispersive series agrees with (e,e'p) knockout. If the
  question comes, say plainly that (e,e'p) spectroscopic factors carry their own reduction,
  so the agreement is the authors' reading and not a calibration.

Talking points:
- 48Ca is doubly magic and this is the textbook (d,p) case, so nobody in the room will
  think the target was chosen to make the point.
- The dispersive series is not a better fit to the elastic data. It is a potential built with
  more physics, and that is what stabilises the extracted number.
- Do not overclaim: this is one reaction, and the paper is about transfer. The point here
  is only that the denominator of the ratio is not pinned down.

Timing target: 1 minute 15 seconds.

Transition: so the potential is underdetermined, and the next slide says why, in physical
terms rather than statistical ones.
-->

---

# The potential is not determined by the data

<div class="grid grid-cols-12 gap-6 mt-2">
<div class="col-span-7">

<svg viewBox="0 0 900 300" style="width: 100%; height: 15.5rem;">
  <rect x="540" y="20" width="340" height="238" fill="#E4ECF5" opacity="0.55"></rect>
  <line x1="70" y1="258" x2="890" y2="258" stroke="#a9a79b" stroke-width="2"></line>
  <line x1="70" y1="20" x2="70" y2="258" stroke="#a9a79b" stroke-width="2"></line>
  <path d="M 70 52 L 250 52 C 320 52 356 96 400 160 C 440 218 500 244 610 252 L 880 256"
        fill="none" stroke="#1B365D" stroke-width="3"></path>
  <path d="M 70 113 L 180 113 C 265 113 330 138 385 175 C 435 208 495 246 620 253 L 880 256"
        fill="none" stroke="#b53333" stroke-width="2.4" stroke-dasharray="8 5"></path>
  <line x1="540" y1="20" x2="540" y2="258" stroke="#66655f" stroke-width="1" stroke-dasharray="3 4"></line>
  <text x="336" y="44" font-size="22px" fill="#1B365D" font-family="Newsreader, Georgia, serif">V1</text>
  <text x="222" y="152" font-size="22px" fill="#b53333" font-family="Newsreader, Georgia, serif">V2</text>
  <text x="30" y="34" font-size="22px" fill="#66655f" font-family="Newsreader, Georgia, serif">V</text>
  <text x="886" y="284" font-size="22px" fill="#66655f" font-family="Newsreader, Georgia, serif" text-anchor="end">r</text>
</svg>

<div class="flex justify-between text-sm mt-1" style="color: var(--stone);">
<span>interior: weak sensitivity</span>
<span>surface: strongest sensitivity</span>
</div>

<div class="fig-caption">
Schematic: different interiors can produce similar elastic scattering.
</div>

</div>
<div class="col-span-5 pt-1">

<div class="text-base">

- Feshbach projection gives a nonlocal, complex, energy-dependent interaction.
- Real and imaginary parts tied by a dispersion relation, so not separately adjustable.
- Strong absorption makes elastic scattering mainly sensitive to the <b>surface</b>.
- Whole families of potentials fit the same data.

</div>

<div class="mt-4 text-sm" style="color: var(--stone); line-height: 1.7;">
Feshbach, Ann. Phys. 5, 357 (1958). Perey and Buck, Nucl. Phys. 32, 353 (1962). Igo and Thaler, Phys. Rev. 115, 1665 (1959).
</div>

</div>
</div>

<div class="takeaway mt-6">
Two potentials that agree <b>where the data are</b> still give different extracted numbers.
</div>

<!--
Central message: the non-uniqueness is a property of the object, not a failure of anyone's
fitting procedure.

Figure explanation (the sketch):
- Two potentials with different depths and radii, drawn so that their tails coincide beyond
  about 7 fm and diverge inside.
- The shaded band is the surface region, which is what elastic scattering actually probes.
- Outside the band, the two curves are indistinguishable, which is why both reproduce the
  same angular distribution.

Talking points:
- Feshbach projection: the optical potential is what is left of a many-body problem after
  the open channels are projected out, so it is complex, energy dependent and nonlocal.
- Causality ties the real part to the imaginary part. A potential that ignores that link has
  a free parameter that the data will try to fix and cannot. This is why the dispersive
  column on the previous slide behaved.
- The Igo ambiguity is the historical statement: the data determine a product of depth and
  radius, not the depth and the radius.
- Say the conclusion as physics, not as statistics: the data fix the surface, and the
  extraction needs the potential everywhere, so the ambiguity reaches the answer through the
  part of the potential nobody measured.
- If someone points out that transfer is surface dominated, agree with them and use it: that
  is exactly why two potentials agreeing on the surface can still disagree on the extracted
  number. Do not claim the interior is what transfer probes.

Timing target: 2 minutes.

Transition: so how has the field answered this? That is the next block.
-->

---

# The classical answer: one fit, one point

<div class="grid grid-cols-12 gap-6 mt-2">
<div class="col-span-7">

| potential | for | range |
|---|---|---|
| Becchetti-Greenlees | nucleon | below 50 MeV |
| CH89 | nucleon | 10 to 65 MeV |
| Koning-Delaroche | nucleon | 1 keV to 200 MeV |
| Daehnick | deuteron | 12 to 90 MeV |
| An and Cai | deuteron | up to 183 MeV |

<div class="fig-caption">
Varner et al., Phys. Rep. 201 (1991). Koning and Delaroche, Nucl. Phys. A 713 (2003). Daehnick et al., PRC 21 (1980). An and Cai, PRC 73 (2006).
</div>

</div>
<div class="col-span-5 pt-1">

<div class="box-gap">

<b>Each row is a single point.</b>

<div class="mt-1 text-sm">A global fit supplies one parameter set.<br>The unresolved directions remain hidden.</div>

</div>

<div class="box-evidence mt-3">

<b>The spread stands in for an error bar.</b>

<div class="mt-1 text-sm">Differences between potentials are often used to estimate model dependence. <span style="color: var(--stone);">Pruitt et al., PRC 107, 014602 (2023).</span></div>

</div>

</div>
</div>

<div class="takeaway mt-3">
A good fit is not a statement about <b>what the data determined</b>.
</div>

<!--
Central message: the phenomenological tradition answers a different question from the one
a reaction prediction needs.

Talking points:
- These potentials are the workhorses, and the room uses them.
- They are fitted to very large data sets, so the fits are good. The problem is not fit
  quality.
- What is missing is the second half: which combinations of the parameters the data fixed,
  and which they left free.
- The practical workaround in the field is to run several of them and look at the spread.
  That is a reasonable error bar, and it is what the next slides will improve on, but it is
  not a posterior and it cannot be propagated cleanly.
- Pruitt et al. did the systematic version of that comparison and it is the honest baseline
  for this talk.

Timing target: 1 minute.

Transition: the Bayesian programme takes that seriously and answers it properly. Here is
how far it has come, and where it stops.
-->

---

# The Bayesian answer, so far

<div class="grid grid-cols-12 gap-6 mt-2">
<div class="col-span-7 pt-1">

**What it does**

- Infer the joint posterior and its correlations. <span style="color: var(--stone);">Lovell et al. 2017; Lovell and Nunes 2018.</span>
- Propagate uncertainty to transfer cross sections. <span style="color: var(--stone);">King et al. 2018.</span>
- Choose measurements that reduce uncertainty. <span style="color: var(--stone);">Catacora-Rios et al. 2019.</span>

<div class="box-gap mt-3">

<b>Why it matters for transfer</b>

<div class="mt-1 text-sm">Optical potentials dominate the uncertainty in adiabatic distorted-wave predictions of (d,p) cross sections.<br><span class="citation">Hebborn and Nunes, Front. Phys. 13 (2025)</span></div>

</div>

</div>
<div class="col-span-5 pt-1">

<div class="ui-label">parameters varied, and in what</div>

| | | |
|---|---|---|
| <b>9</b> | one Woods-Saxon set | Lovell 2017 |
| <b>46</b> | a global potential | Beyer 2026 |
| <b>18</b> | coupled-channel model | this work |

<div class="fig-caption" style="text-align: left;">
Different models and data sets. Parameter counts are not a performance comparison.
</div>

<div class="box-evidence mt-3">

<div class="text-sm"><b>8–158%</b> widths of propagated 95% bands at the (d,p) peak.<br><span class="citation">King et al., PRC 98 (2018)</span></div>

</div>

<div class="mt-3 text-sm" style="color: var(--stone); line-height: 1.7;">
Lovell et al., PRC 95, 024611 (2017). King et al., PRC 98, 044623 (2018).
</div>

</div>
</div>

<!--
Central message: the Bayesian programme is the right answer and it has already delivered
real results; what limits it is dimensionality and the number of channels, not the idea.

Talking points:
- Be precise about what this programme achieves: proper correlated posteriors for optical
  potentials, propagated into transfer observables, and used to design better experiments.
  It is not a niche idea, it is the state of the art.
- The ladder on the right is the honest measure of where the field is: of order ten
  parameters for a single-system fit, 46 for a global model, and the coupled-channel case
  in this talk sits at 18.
- The 8 to 158 percent band is the reason the field cares. The uncertainty is not
  academic, it dominates the extracted number.
- Say the limit plainly: these fits are Markov chains that step at random, and the cost of
  one step is a reaction solve.

Timing target: 1 minute 30 seconds.

Transition: the way the field made those solves cheap is the next slide, and it is only
half of what is needed.
-->

---

# Affordable solves are not enough

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-6">

<div class="ui-label">what a reduced basis gives you</div>

<div class="text-sm mt-2" style="line-height: 1.7;">

- <b>Reduced basis:</b> solve in a small space spanned by representative solutions.
- Established for scattering, optical models and coupled channels.
- Already used in Bayesian breakup analysis.

</div>

<div class="fig-caption">
Frame et al., PRL 121, 032501 (2018). Melendez et al., PLB 821, 136608 (2021). Duguet et al., Rev. Mod. Phys. 96, 031002 (2024). Odell et al., PRC 109, 044612 (2024). Catacora-Rios et al., PRC 113, 044623 (2026). Sürer et al., PRC 106, 024607 (2022).
</div>

</div>
<div class="col-span-6">

<div class="box-gap">

<b>A fast evaluation gives no direction</b>

<div class="mt-1 text-sm">A likelihood value tests a proposal.<br>A likelihood gradient guides the next step.</div>

</div>

<div class="kami-card mt-3">

<div class="ui-label">the missing object</div>

<div class="mt-1 text-base">The likelihood gradient,<br>for every sampled parameter.</div>

</div>

</div>
</div>

<div class="takeaway mt-6">
Cheaper solves made the calibration <b>possible</b>. They did not make it <b>scale</b>.
</div>

<!--
Central message: emulation solved the cost of one solve, and left the cost of exploring a
high-dimensional posterior untouched.

Talking points:
- Be fair to this literature: eigenvector continuation and reduced-basis methods changed
  what is affordable, and 2022 already saw a Bayesian breakup analysis on emulators.
- The distinction to hold is between the cost of an evaluation and the number of
  evaluations. Reduced bases attack the first. The second is set by how the sampler moves.
- A sampler that proposes and rejects has to cover a correlated posterior by random
  diffusion. The number of proposals grows badly with dimension.
- A sampler that follows the gradient does not. That is the whole argument.
- Do not claim emulation is insufficient in general. Claim it is insufficient alone.

Timing target: 1 minute 15 seconds.

Transition: gradient-following samplers are not new to nuclear theory. What is new is
applying them where the parameters enter the operator nonlinearly.
-->

---
clicks: 3
class: scene-slide
---

# The challenge: operators that change shape

<div class="subtitle">Depth scales the radial profile. Radius and diffuseness change its shape; the reduced operator must retain that dependence.</div>

<LiveOnly><MatrixScene :step="$clicks" :height="344" /></LiveOnly>

<!--
Central message: optical-model geometry cannot be represented by merely scaling one fixed radial function.
Click 0: define the Woods–Saxon formula and the reference V = 50 MeV, R = 5 fm, a = 0.6 fm.
Click 1: increase V to 65 MeV at fixed R and a. The radial function scales.
Click 2: restore V and move R to 6 fm. The surface moves rather than simply scaling.
Click 3: connect this dependence to matrix elements and likelihood gradients.
The curves are analytic illustrations, not a calibrated potential or a scattering calculation. Affine operator dependence does not imply an affine observable or a simple posterior. Gradient samplers can be used in both cases; the issue here is constructing a differentiable non-affine operator.
Timing target: 1 minute 15 seconds.
-->

---

# From a reference solver to an emulator

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-6">

<div class="ui-label">step one: a solver we can trust</div>

<div class="text-base mt-2">

Impose outgoing-wave boundary conditions directly; solve only for the entrance channels. <span style="color: var(--stone);">Lei, PRC 113, 024614 (2026).</span>

</div>

<div class="box-evidence mt-3">

<div class="text-sm"><b>Reference calculation</b><br>The full coupled equations, without emulation.</div>

</div>

</div>
<div class="col-span-6">

<div class="ui-label">step two: an emulator</div>

<div class="text-base mt-2">

Project the coupled-channel operator into a reduced basis. <span style="color: var(--stone);">Lei, PRC 113, 044610 (2026).</span>

</div>

<div class="box-evidence mt-3">

<div class="text-sm"><span class="metric">220<span class="metric-unit">×</span></span>speedup per solve<br>Elastic cross sections within 0.1% of the solver over the tested 18-parameter domain.</div>

</div>

</div>
</div>

<div class="takeaway mt-6">
A trustworthy solver and a fast emulator. Neither one returns <b>a derivative</b>.
</div>

<div class="mt-7 text-sm" style="color: var(--stone);">
Scope of everything that follows: one system, d + <sup>58</sup>Ni, one beam energy, elastic scattering only.
</div>

<!--
Central message: our own two building blocks are an exact solver and a fast emulator, and the
emulator is the one the rest of the talk leans on.

Talking points:
- Keep this slide short. It is here so that the construction on the next block is not a
  black box, and so that the audience knows the reference solver exists.
- The exact solver earns its place because every claim later is checked against it.
- The reduced basis is the emulator machinery the field already knows; our contribution is
  the particular reference solver it is built on and the fact that it is exact enough to
  serve as the check.
- Say the honest limit of the speed-up: 220 times is for this system, at this energy, with
  this parameter set.
- End on the gap, which the next two slides quantify.

Timing target: 1 minute.

Transition: before building anything, ask how much the data can see at all.
-->

---

# One curve, very unequal sensitivities

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-5">
<div class="ui-label">separate optical-model study</div>
<p class="text-sm">Fisher information: the elastic curve’s local response to 13 potential parameters.</p>
<div class="metric">8 <span class="metric-unit">of 13</span></div>
<p class="text-sm">Directions resolved at 10% tolerance.</p>
<div class="box-idea"><b>Spectral anisotropy: 1.7 ± 0.4</b><div class="text-sm">Across 168 configurations.<br>This is not a direction count.</div></div>
</div>
<div class="col-span-7"><img src="./figures/potential_information.png" class="kami-img" style="width: 100%;" /></div>
</div>
<div class="takeaway">Separate <b>spectral anisotropy</b> from the <b>number of resolved directions</b>.</div>

<!--
Central message: the information the data carry about the potential is anisotropic, which is
the physical reason a posterior over many parameters is a ridge.

Figure explanation (n + 208Pb elastic at 20 MeV, the median configuration of the 168-configuration scan):
- Top panel. The bold curve is the elastic angular distribution at the KD02 reference
  potential. The red dashed curve is the same potential moved ten per cent, in log space,
  along the direction the data see best: it leaves the diffraction pattern out of phase. The
  thin red curves are the same step along the other seven the data determine, the grey ones
  along the five they do not. All twelve lie within a few per cent of the reference curve,
  which is the picture of the ridge.
- Lower panel. Each dot is the RMS change of the curve over the angular range from that same
  ten per cent step, so it is the same quantity the count is defined on, in per cent. Red
  above the line, grey below. The leading direction reaches 95 per cent, the last one 0.15
  per cent: a factor of six hundred, which is the anisotropy the participation ratio
  summarizes as 1.7.
- The line at 1.7 per cent is derived, not chosen: a step of eps = 10 per cent along a
  direction changes the curve by eps sqrt(lambda_i / n) at RMS over the n = 35 angles of the
  scan, so the direction sitting exactly at the ten percent tolerance is the one whose curve
  change is 10 / sqrt(35) = 1.7 per cent. The eight above it and the five below it are the
  two numbers 1.7 +/- 0.4 and 8 of 13, in one picture.
- The configuration is the median of the scan (its D_eff 1.587 and its 8 of 13 are both the
  median values; the ensemble is 1.66 +/- 0.40 and 7.92 +/- 1.65). Everything on the figure
  was recomputed on 2026-10-16 from data/deff_scan_extended.json in the opticalfisher
  repository, so the figure and the scan agree by construction.
- The multi-energy value is 2.9, not the 2.3 to 2.5 that an earlier draft carried. That
  earlier range was retired in the 2026-09-07 correction round.

Talking points:
- Define the matrix before quoting any number from it. It is the Fisher information of the
  elastic angular distribution with respect to the potential parameters, under the data
  covariance, so the eigenvectors are directions in parameter space.
- Be careful and honest here, because this is the number most easily over-read. The
  participation ratio is a shape measure. It is not "only 1.7 combinations are determined".
- The count is the other number, and both are on the slide so nobody has to choose between
  them: about eight of the thirteen directions are resolved at a ten percent tolerance.
- The composition of the directions is the physics payoff. It is not on the slide, so it is
  yours to say, slowly: what these data determine is the real radius against the depth, the
  surface absorption geometry and the real diffuseness; what they leave free is the volume
  absorption, the imaginary geometry and the imaginary spin-orbit. That is exactly why a
  posterior over the potential is a ridge over those five directions.
- The physics use of the numbers is qualitative and robust: the response is uneven, so the
  posterior is correlated, so a sampler that needs the correlation pays for it.
- This is why the last block is about gradients and not about speed. A random walk over a
  ridge is the expensive thing.

Timing target: 1 minute 15 seconds.

Transition: so state the obstruction precisely, in one slide.
-->

---
clicks: 3
class: scene-slide
---

# The posterior is a curved ridge

<div class="subtitle">Correlated parameters favor a narrow region. Gradient-based proposals use its local geometry.</div>

<LiveOnly><RidgeScene :step="$clicks" :height="322" /></LiveOnly>

<div class="takeaway mt-3">The missing ingredient: <b>a differentiable reaction model</b>.</div>

<!--
Central message: gradients help construct proposals in a correlated parameter space.
This is a schematic two-parameter density, not the posterior of the 18-parameter calculation.
Click 0: identify axes and equal-density contours. Several correlated combinations fit similarly.
Click 1: show proposals into low-density regions, which are often rejected. A random-walk chain can explore, but may require short steps.
Click 2: show an illustrative HMC trajectory. Momentum and gradients generate the trajectory; it is not gradient ascent and is not guaranteed to remain on a ridge.
Click 3: NUTS adapts trajectory length, requiring the log posterior and its gradient. An acceptance check still follows.
Do not infer an efficiency ratio from this schematic or say 18 parameters are impossible for an ensemble sampler.
Timing target: 1 minute.
-->

---
clicks: 5
class: scene-slide
---

# The construction

<div class="subtitle">From reference calculations to cross sections and likelihood gradients: the complete data flow.</div>

<LiveOnly><ConstructionScene :step="$clicks" :height="368" /></LiveOnly>

<div class="takeaway mt-4">Compress offline. Differentiate and sample online. Verify against the solver.</div>

<!--
Central message: show explicitly what is computed offline and what happens at each sampler evaluation.
Click 0: read the two rows, offline construction and online evaluation.
Click 1: reference calculations cover parameter points and store solutions and operators.
Click 2: form the reduced basis and the parameter-dependent small operator.
Click 3: NUTS proposes theta; rebuild and solve the small system, then compute the angular distribution.
Click 4: compare prediction with measured data, add the prior, and differentiate the log posterior. The value and gradient return to NUTS.
Click 5: resolve selected posterior points with the reference solver. Compare cross sections and enrich the basis if necessary.
No ring, puck, or physical machine is intended. The diagram labels the actual mathematical objects and the validation loop.
Timing target: 1 minute 30 seconds.
-->
---

# What it costs, and what it buys

<div class="budget-grid">
<div><div class="ui-label">01 / offline</div><div class="hero-number">1,000</div><h3>reference solves</h3><p>Cover the prior once.<br>~30 minutes per solve on 16 cores.</p></div>
<div><div class="ui-label">02 / online</div><div class="hero-number">16,000</div><h3>posterior samples</h3><p>Four chains, under one hour on one GPU.<br>Zero divergences.</p></div>
</div>
<div class="scope-line">18 physical parameters · 12 sampled coordinates · gradients exact for the emulator</div>
<div class="takeaway">Pay for the full model offline. Explore the posterior online.</div>

<!--
Central message: separate the two budgets. The offline budget is large and finite; the online
budget is the one that used to be hopeless.

Talking points:
- Give the offline number plainly. A thousand exact solves is a real investment and it is
  the honest price of the method.
- The block size is there so the audience can feel the scale of one solve, not to impress.
- The hundred thousand evaluations is the standard rule of thumb for a posterior of this
  dimension. Multiplying by half an hour is the whole argument for the construction.
- Sixteen thousand samples in under an hour on one GPU, and say the qualifier: zero
  divergences, which means the sampler found no pathological region.
- Do not present the speed-up as a single headline ratio. The honest statement is the two
  budgets side by side.

Timing target: 1 minute.

Transition: an emulator is a numerical instrument. Before reading a posterior off it, check
it against the thing it replaces. The next slide is what happened the one time we were less
careful. Here is what happened the one time we were less careful.
-->

---

# Verify before reading the posterior

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-5">

<div class="ui-label">the check</div>

<div class="text-base mt-2">

<span class="metric">0.30 <span class="metric-unit">/ 1.0</span></span>Worst emulator–solver χ² / threshold<br><br><b>10 independent points</b><br>Differences weighted by experimental errors, summed over 64 angles.

</div>

<div class="box-gap mt-3">

<b>Check the posterior region</b>

<div class="mt-1 text-sm">A smooth emulator error can shift the posterior without a warning.</div>

</div>

</div>
<div class="col-span-7">

<img src="./figures/verify_check.png" class="kami-img" style="width: 100%; display: block; margin: 0 auto;" />

</div>
</div>

<div class="takeaway mt-3">
Read the posterior <b>only after the solver check</b>.
</div>

<!--
Central message: the verification step is part of the method, not a nicety, and the failure
mode it prevents is a silent one.

Talking points:
- State the check concretely: ten parameter points, solved both ways, agreement quoted in
  units of the experimental error so the audience can calibrate it against the fit quality.
  Say that this is a chi-square summed over the 64 angles, not a per-angle number, and give
  the worst case: 0.30, with no single angle off by more than 0.29 of an error. The gate is
  1.0, so this is a factor of three inside it.
- The lower panel is the same panel as on the next slide. Say so: it is where the comparison
  is made, and it is the panel that changes.
- Explain why silence is the danger. A solver that is wrong usually diverges or returns
  nonsense. An emulator that is wrong returns a slightly wrong smooth curve, and the
  posterior quietly moves.
- Introduce model discrepancy in one clause. It is the standard Bayesian term, and it is
  the honest place to put what the emulator cannot cover.
- This slide is the bridge. Say that the next slide is what happened before we adopted the
  rule, and that the results after it were produced with the rule in place.

Timing target: 1 minute 15 seconds.

Transition: the rule did not come first. Here is the run that made it a rule.
-->

---

# What nearly went wrong

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-5">

<div class="ui-label">what the run reported</div>

<div class="text-base mt-2">

<span class="metric">89 <span class="metric-arrow">→</span> 117</span>χ² against the data<br>emulator → direct solver, at the same parameters

</div>

<div class="box-gap mt-3">

<b>A quiet bias in the likelihood</b>

<div class="mt-1 text-sm">An emulator–solver discrepancy of χ² = <b>6.4</b> improves the apparent fit by <b>28</b>.<br><br>The error points towards the data.</div>

</div>

</div>
<div class="col-span-7">

<img src="./figures/verify_broken.png" class="kami-img" style="width: 100%; display: block; margin: 0 auto;" />

</div>
</div>

<div class="takeaway mt-3">
Validate <b>where the sampler goes</b>. After rebuilding: emulator–solver χ² = 0.08–0.30.
</div>

<!--
Central message: this is the methodological slide of the talk. A validation that is
geometrically comfortable is not a validation.

Talking points:
- Tell it as a sequence, not as a confession. The check passed, the physics looked right, and
  the numbers were wrong.
- The single most useful sentence: weight the two curves by sin(theta), integrate over the
  measured angles, and they move by 0.84 per cent of each other; at the minima and the back
  angles they differ by up to 0.94 of an error bar. An integrated number hides a structured
  defect, and the likelihood does not. That gap is the whole lesson of the slide.
- Say where the difference is, because it is not uniform: inside a third of an error bar up
  to about 143 degrees, then positive to 0.71 between 145 and 168, then negative to 0.94 at
  173. Where the solver runs above the data the emulator sits below it, and the reverse.
- Give the Delta chi square as the diagnosis: at the posterior mean of that run the emulator
  fits the data better than the model does, 89 where the solver gives 117. A sampler
  optimising the emulator's likelihood will go there. Every number on this slide was
  recomputed on 2026-10-16 from the saved S-matrix of the direct solve and from that run's
  grid, so they can be quoted as read.
- The alignment is the part worth slowing on: 63 percent is 2 sum(r d / sigma^2) against the
  Cauchy-Schwarz bound 2 sqrt(chi2_solver chi2_emu), 34.6 against 54.7. This is why a
  disagreement of 6.4 can buy 28: the error is not random noise, it points where the data
  point. That is the general mechanism, not an accident of this system.
- The fix is a self-consistent loop, and say it as a loop: build a basis, find the posterior,
  add points from that posterior, rebuild, re-check. Two iterations were enough.
- This is the slide to slow down on. It is the reason the two slides after it are trustworthy:
  say explicitly that the posterior shown next was produced after this fix, and that the
  0.22 here and the 0.30 on the previous slide are the same check, before and after the
  rebuild, and the ten points of the previous slide are the after.
- Do not claim credit for the failure being interesting. Claim the rule.

Timing target: 1 minute 15 seconds.

Transition: with the check now sitting where the sampler goes, here is the posterior.
-->

---

# The posterior, seen as a prediction

<div class="grid grid-cols-12 gap-5 mt-1">
<div class="col-span-7">

<img src="./figures/predictive_posterior.png" class="kami-img" style="width: 100%;" />

</div>
<div class="col-span-5">

<div class="ui-label">what the band is</div>

<div class="text-base mt-2">

<span class="metric">95<span class="metric-unit">%</span></span>Posterior credible band<br>d + <sup>58</sup>Ni, 20 MeV

</div>

<div class="box-evidence mt-3">

<b>The band stays narrow through the minima.</b>

<div class="mt-1 text-sm">The calibrated prediction follows the diffraction pattern, including the minima.</div>

</div>

<div class="box-gap mt-3">

<div class="text-sm">Dashed: the global reference potential before calibration.</div>

</div>

</div>
</div>

<!--
Central message: the posterior is best shown as a prediction, because that is what it is
for.

Figure explanation:
- Black points: the elastic angular distribution, with its experimental uncertainties.
- Green line: the median of the posterior predictive. Green band: its 95 percent credible
  interval.
- Dashed pink: the global reference potential the calibration starts from.
- Read the band width, not the line. The band stays narrow through the minima.

Talking points:
- Say what a credible interval is in one clause, because the audience is a reaction audience
  and not all of them work in Bayesian terms.
- The interesting feature is the minima. A potential that is slightly wrong misses the
  minima badly, so a narrow band there is a real statement about how much the data
  constrain the prediction. Do not say the band is narrow because the model has eighteen
  parameters; the point is where it is narrow, not that it is.
- If someone asks whether sliders with more parameters would also give a narrow band, the
  honest answer is that a wider model would widen the band, not narrow it, and that the check
  against the solver on the previous slide is what the claim rests on.
- Be descriptive about the dashed curve, not dismissive: it is a global fit to a very large
  body of data, and it was never fitted to this system at this energy.
- Do not read the parameter values off this slide. They come next, and they come with a
  warning.

Timing target: 1 minute 15 seconds.

Transition: so which numbers did the data actually determine.
-->

---

# What the data determine

<div class="grid grid-cols-12 gap-5 mt-1">
<div class="col-span-7">

<img src="./figures/volume_integrals.png" class="kami-img" style="width: 100%;" />

</div>
<div class="col-span-5">

<div class="ui-label">volume integrals per target nucleon</div>

| | | |
|---|---|---|
| <b style="white-space: nowrap;">772 ± 13</b> | real, summed | <span style="white-space: nowrap;">1.7 percent</span> |
| <b style="white-space: nowrap;">204 ± 14</b> | imaginary, summed | <span style="white-space: nowrap;">6.9 percent</span> |

<div class="fig-caption" style="text-align: left;">
Volume integrals per target nucleon, in MeV fm<sup>3</sup>. The summed real part sits 15 percent below the reference potential the calibration started from.
</div>

<div class="box-evidence mt-3">

<b>The sum is what is pinned.</b>

<div class="mt-1 text-sm">The proton and neutron parts are anti-correlated at −0.92, so the data fix the sum and leave the split far less determined.</div>

</div>

</div>
</div>

<div class="takeaway mt-3">
The summed integrals are better determined than the proton–neutron split.
</div>

<!--
Central message: the posterior compresses into two well-determined numbers per target
nucleon, and everything else is a correlated ridge.

Figure explanation:
- Panel (a): the real part, proton axis against neutron axis. Contours are the 68 and 95
  percent posterior regions, the dashed ellipse is the reference prior, the star is the
  reference value, and the dotted line is a constant total.
- The posterior has moved off the prior and sits compactly, but its long axis is close to
  the constant-total direction.
- Panel (b): the imaginary part. Here the posterior sits almost on the prior, so the imaginary
  part is barely moved by this data set.

Talking points:
- Quote the two numbers with their uncertainties and say what the percent means: the summed
  real volume integral is determined to 1.7 percent by this single elastic data set, and the
  imaginary one to 6.9 percent. Say them separately; the real part is the sharp number.
- The comparison number is the reference: 772 against about 913. Say it as a shift, not as a
  correction, and remember the scope: one system, one energy. If someone asks whether the
  shift is the data or the prior pulling, the honest answer is that the prior sits at 913 and
  the data pulled the posterior to 772, and the one-energy comparison to the reference is a
  statement about this data set, not a verdict on the reference.
- The anti-correlation is the physics content of panel (a). It is the Igo ambiguity reappearing
  as a posterior shape, which closes the loop with the early slides.
- Panel (b) is the contrast to hold: the imaginary part did not move.
- Do not state anything about the proton-neutron decomposition as a result. What the data
  support is the sum.

Timing target: 1 minute 15 seconds.

Transition: the check passed and the run is the one the paper reports. Read the numbers.
-->

---

# Limits and outlook

<div class="outlook-grid">
<div><div class="ui-label">demonstrated</div><h2>One system.<br>One energy.<br>Elastic scattering.</h2><p>d + <sup>58</sup>Ni, with direct-solver checks<br>in the posterior region.</p></div>
<div><div class="ui-label">next questions</div><div class="next-row"><span>01</span><div><b>Several energies</b><p>Constrain the energy dependence jointly.</p></div></div><div class="next-row"><span>02</span><div><b>Breakup and transfer</b><p>Resolve the continuum couplings to sufficient fidelity.</p></div></div><div class="next-row"><span>03</span><div><b>Several systems</b><p>Connect calibration to microscopic interactions.</p></div></div></div>
</div>
<div class="takeaway">Differentiable emulation makes full coupled-channel calibration practical.</div>

<!--
Central message: separate what has been shown from what has not, and give the audience the
honest next step.

Talking points:
- Say the scope sentence exactly once, plainly, and do not hedge it further. The audience
  will respect a stated limit more than a soft claim.
- The energies item is cheap and true: the machinery is dimension-agnostic.
- The breakup item is the real physics limit, because a reduced basis has to represent the
  continuum couplings and that is where the fidelity question bites.
- The third item is the one with long-term value: a global calibration with a chiral prior
  would replace the phenomenological starting point that the whole Bayesian programme has
  been built on.
- End on the closing line without dressing it up. It is the honest state of the field.

Timing target: 1 minute 15 seconds.

Transition: thank you.
-->

---

# Thank you

<div class="closing-message">Differentiate the model.<br>Explore the correlations.<br><span>Verify the posterior.</span></div>
<div class="closing-contact"><b>Jin Lei</b><br>jinl@tongji.edu.cn</div>
<div class="closing-credit">Tongji University · SCNT, IMP, CAS<br>Supported by NSFC 12475132 and 12535009</div>

<!--
Central message: stop, thank, and leave the contact and the support line on screen.

Talking points:
- Say the funding number, because the Chinese funding agencies expect it and it is the right
  thing to do.
- Say the software line only if someone asks how the emulator is built. It is here so the
  question has an answer on screen.
- Invite the two questions this talk is built to get: what happens at other energies, and
  what happens for breakup.

Timing target: 20 seconds.

Transition: end the talk. The backup slides are unnumbered.
-->

---
backup: true
---

<!--
Backup separator. The page counter stops here, so "Thank you" is the last numbered-looking
slide and nothing after it carries a number.
-->
