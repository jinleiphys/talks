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

<LiveOnly><CoverUQ /></LiveOnly>

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

<div class="act-label">I · Why a Bayesian analysis</div>

# Rare isotopes are reached through reactions

<div class="grid grid-cols-12 gap-5 mt-1">
<div class="col-span-8">

<img src="./figures/hebborn2023_chart.png" class="kami-img" style="width: 100%;" />

<div class="fig-caption">
Pink diamonds: nuclei used to fit the Koning-Delaroche potential. Left: reach of FRIB beams. Right: astrophysical r-, p-, s- and rp-process paths. Figure from Hebborn et al., J. Phys. G 50, 060501 (2023).
</div>

</div>
<div class="col-span-4 pt-1">

<div class="ui-label">what this means</div>

<div style="font-size: 15px; line-height: 1.5;">

- Spectroscopic factors, ANCs, capture rates far from stability: read off reactions through a model.
- Its optical potentials there are mostly <b>extrapolations</b> from the stable valley.

</div>

<div class="box-evidence mt-2">

<div style="font-size: 15px; line-height: 1.45;">“The field is ripe for merging … with experimental data within a <b>Bayesian analysis</b>.”</div>
<div class="citation mt-1">Hebborn et al. 2023, outlook. BAND: Phillips et al., J. Phys. G 48, 072001 (2021).</div>

</div>

</div>
</div>

<div class="takeaway">
An extrapolated potential is only as useful as <b>its error bar</b>.
</div>

<!--
Central message: the big picture. The rare-isotope programme measures reactions on nuclei far
from stability, and every number it extracts goes through a reaction model whose optical
potentials were fitted near stability.

Figure explanation (Hebborn et al. 2023, Fig. 1 of the optical-potential white paper):
- Both panels are the chart of nuclides. Black: stable isotopes. Pink diamonds: the nuclei
  whose data were used to fit Koning-Delaroche.
- Left: green and yellow are the reach of FRIB reaccelerated and fast beams.
- Right: the astrophysical process paths; the r process runs far on the neutron-rich side.
- The authors' own caption: the diamonds highlight "the dramatic extrapolations made".

Talking points:
- Spectroscopic factors, asymptotic normalizations, neutron-capture rates for the r process:
  far from stability all of them are reaction-model outputs.
- Elastic data are scarce away from stability, so global potentials are mostly extrapolated
  there (the white paper: fitted primarily to stable nuclei).
- So the question is not only "what is the best potential" but "how wrong can it be", and
  the community white paper names Bayesian analysis as the route (outlook section). The
  BAND collaboration was set up for exactly this across nuclear physics.

Timing target: 1 minute 15 seconds.

Transition: to see why the error bar matters, look at what an extraction actually does.
-->

---
clicks: 4
class: scene-slide
---

<div class="act-label">I · Why a Bayesian analysis</div>

# Extracting S means normalizing a calculation

<div class="subtitle">One measured angular distribution, two global nucleon potentials: ⁴⁸Ca(d,p)⁴⁹Ca at E<sub>d</sub> = 10 MeV.</div>

<LiveOnly><TransferScene :step="$clicks" :height="372" /></LiveOnly>

<!--
Central message: S is measured divided by calculated, and the calculated part carries the
optical potential. A real case, computed for this talk.

Setup (figures/run_dp48ca.py, figures/make_dp48ca.py):
- Data: Brown, Denning, Macgregor, NPA 153, 145 (1970), EXFOR F0910020 (relative angular
  distribution, c.m.), put on an absolute scale with the same paper's 36.6 mb/sr at 12.5 deg
  lab (F0910027; 10 percent systematic).
- Calculation: finite-range ADWA (Johnson-Soper, U_n + U_p at E_d/2), post form with remnant,
  2p3/2 neutron in a WS well (r0 1.25, a 0.65). The ONLY change between the two curves is the
  global nucleon potential, KD02 or CH89. Converged to 0.1 percent.
- S fitted over theta_cm <= 25 deg (the forward peak).

Left panel: every length is in fm from this calculation (figures/export_dp48ca_scene.py).
- Glass shell: half-value radius of the KD02 real potential, 4.33 fm.
- Blue cloud: |psi|^2 of the 2p3/2 bound state used in the calculation (m = j, drawn in the plane).
- Gold band: transfer region DEFINED by a radial cutoff scan (FRESCO cutc: remove the transfer
  coupling inside R). 90 percent of sigma survives a cut at 6.5 fm, 10 percent at 9.3 fm, so
  80 percent comes from 6.5 to 9.3 fm (CH89: 6.7 to 9.5). Inside 5.5 fm the net contribution is
  slightly negative (interference). Same diagnostic as the IAV-cut of Liu Junzhe et al.
- Red glow: W(r) of the adiabatic deuteron potential, one log scale for both potentials.
  Rings: W = 1 MeV at 6.8 fm (KD02) and 7.2 fm (CH89).
- Particles: a deuteron at impact parameter b survives with the eikonal T(b) = exp(-(2/hbar v)
  int W dz) of the potential shown (T(7 fm) = 0.69 KD02, 0.47 CH89; straight line, no Coulomb)
  and transfers with a probability following the cutc profile. Event rates are illustrative.

Click 0: the measurement. Protons counted versus angle.
Click 1: the neutron is captured well outside the nucleus (gold band), into the blue orbital.
  Right: the two S = 1 calculations; CH89 is 14 percent lower at the peak (64.0 vs 74.5 mb/sr).
Click 2: KD02 absorption. Click 3: CH89 absorption, further out. Real parts nearly equal.
  Swapping only the deuteron-channel potential moves the peak 74.5 -> 65.7 (12 percent); only
  the proton channel, 74.5 -> 72.6 (2.5 percent). The difference is the deuteron absorption.
  The two cutc curves agree outside 9 fm: the difference is built between 6 and 8 fm.
Click 4: normalize each to the data: S = 0.49 (KD02) and 0.58 (CH89), 17 percent apart. The
  scaled curves are indistinguishable.

Caveats if asked:
- CH89 at 5 MeV (the nucleon energy in the deuteron channel) is outside its fitted range
  (10 to 65 MeV): it is an extrapolation, which is itself the point of slide 2.
- Absolute S here is about 0.5; it depends also on the bound-state well (r0, a), which is held
  fixed. The slide is about the ratio, not the absolute value.
- Deuteron spin-orbit dropped in the adiabatic potential, same for both.

Transition: one reaction at one energy; the next slide shows the published systematics across
four energies.

Timing target: 1 minute 30 seconds.
-->

---

<div class="act-label">I · Why a Bayesian analysis</div>

# The extracted answer depends on the potential

<div class="pa-def">
<div><b>Precision</b>: how closely repeated extractions agree (their spread).</div>
<div><b>Accuracy</b>: how close they are to the true value.</div>
</div>

<div class="grid grid-cols-12 gap-7 mt-1 items-center">
<div class="col-span-8">

<img src="./figures/sfactor.png" class="kami-img" style="height: 340px; width: auto; margin: 0 auto; display: block;" />

</div>
<div class="col-span-4">

<div class="sf-row" style="border-color: #1b365d;">
<div class="sf-label">CH89 · low precision</div>
<div class="sf-num" style="color: #1b365d;">43% spread</div>
<div class="sf-note">The same level moves with beam energy alone.</div>
</div>

<div class="sf-row mt-4" style="border-color: #b53333;">
<div class="sf-label">DOM · high precision</div>
<div class="sf-num" style="color: #b53333;">7% spread</div>
<div class="sf-note">Accurate? 25% below the shell model, yet in line with (e,e′p) quenching.</div>
</div>

<div class="citation mt-4" style="font-size: 11px; line-height: 1.35; color: #66655f;">S: Nguyen et al., PRC 84, 044611 (2011), Table II. Shell model: Tsang, Lee, Lynch, PRL 95, 222501 (2005).</div>

</div>
</div>

<div class="takeaway mt-3">
A small spread is <b>precision</b>, not <b>accuracy</b>: the second needs a reference, and S has no unique one.
</div>

<style>
.pa-def { position: absolute; top: 18px; right: 52px; width: 262px; font-family: Inter, sans-serif; font-size: 11px; line-height: 1.45; color: #66655f; border-left: 1px solid #d4d1c6; padding-left: 12px; }
.pa-def b { color: #1b365d; font-weight: 600; }
.sf-row { border-left: 3px solid; padding: 4px 0 4px 16px; }
.sf-label { font-family: Inter, sans-serif; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: #66655f; }
.sf-num { font-family: Inter, sans-serif; font-size: 28px; font-weight: 500; letter-spacing: -.02em; line-height: 1.2; margin-top: 2px; }
.sf-note { font-size: 15px; color: #4d4c48; line-height: 1.4; }
</style>

<!--
Central message: one published example shows the extraction moving under the optical
potential alone.

Figure explanation (the two series of the paper's Table II, redrawn at their four energies):
- The blue series is a global nucleon optical potential, read at half the deuteron energy,
  the standard adiabatic choice: 0.94, 0.82, 0.77, 1.1 at 2, 13, 19.3 and 56 MeV.
- The red series is the dispersive optical model (DOM), whose real and imaginary parts are
  linked by a subtracted dispersion relation (their Eq. 9): 0.72, 0.67, 0.68, 0.70.
- Both use the same overlap function, so the entire difference between the series is the
  potential. That is what the caption says and it is the point of the slide.
- Precision vs accuracy (the takeaway). Precision is the spread: CH89 43 percent, DOM 7
  percent. Accuracy is distance from a true value, and S is not an observable, so it needs a
  stated reference. Dashed line: large-basis shell model (Oxbash) 0.92 for 49Ca g.s., Tsang,
  Lee, Lynch, PRL 95, 222501 (2005), Table 1 (same paper extracts 0.68 +- 0.07 with a CH89
  adiabatic prescription). DOM sits about 25 percent below the shell model; Nguyen et al. say
  their DOM values are more in line with (e,e'p), i.e. with the usual quenching. So DOM is
  precise, and whether it is accurate depends on the reference.
- TRAP if asked: the mean of the four CH89 values is about 0.91, next to 0.92. That is a
  coincidence of four scattered points, not evidence that CH89 is accurate on average. Do not
  say it.
- The brackets on the right of the figure are each series' own spread across the four
  energies: 43 percent for CH89 (0.77 to 1.10), 7 percent for DOM (0.67 to 0.72). Neither is a
  distance between the two series at one energy.
- The closer (e,e'p) agreement in the paper comes after DOM overlap ingredients are also used,
  not for this DOM+WS series. Do not attribute it to the plotted red points.

Talking points:
- 48Ca is doubly magic and this is the textbook (d,p) case, so nobody in the room will
  think the target was chosen to make the point.
- The DOM series is much flatter in energy. Do not claim it is a better elastic fit or that
  dispersion alone causes the stability; the paper does not isolate that.
- Do not overclaim: this is one reaction, and the paper is about transfer. The point here
  is only that the denominator of the ratio is not pinned down.

Timing target: 1 minute 15 seconds.

Transition: so the potential is underdetermined, and the next slide says why, in physical
terms rather than statistical ones.
-->

---

<div class="act-label">I · Why a Bayesian analysis</div>

# The potential is not determined by the data

<img src="./figures/igo_ambiguity.png" class="kami-img" style="width: 100%; max-height: 285px; margin-top: 2px;" />

<div class="fig-caption" style="margin-top: 6px;">
FRESCO, illustrative Woods-Saxon potentials, not fitted to real data. B: depth fixed at 150 MeV, radius, diffuseness and absorption refitted to A (points: every 5°, 10% errors). Strong absorption: the data see the surface, and discrete families of potentials fit them. Igo, Phys. Rev. 115, 1665 (1959); Drisko, Satchler and Bassel, Phys. Lett. 5, 347 (1963).
</div>

<div class="takeaway">
Depths 50% apart, same angular distribution to 90°: the data fix <b>the surface</b>, not the potential.
</div>

<!--
Central message: the non-uniqueness is a property of the object, not a failure of anyone's
fitting procedure. Shown here as a real calculation, not a sketch.

Figure explanation (computed with FRESCO, figures/run_igo_ambiguity.py; both potentials are
illustrative, neither is fitted to measured data):
- Left: two real potentials. A: V = 100 MeV, r = 1.25 fm, a = 0.60 fm, volume W = 20 MeV.
  B: depth held at 150 MeV; r = 1.170 fm, a = 0.618 fm and W = 22.5 MeV refitted so that B
  reproduces A's angular distribution. They agree to 3 percent only between about 5.6 and
  7.2 fm, the strong-absorption surface; at r = 2 fm they differ by 49 percent, and the real
  volume integrals per nucleon are 942 against 1193 MeV fm^3.
- Right: alpha + 58Ni elastic at 40 MeV, ratio to Rutherford. Points are A every 5 degrees
  from 5 to 90 with 10 percent errors; the dashed line is B. chi2/N = 0.51 on those 18
  points. Beyond 90 degrees, where alpha data are rarely taken, the two separate
  (chi2/N = 11 over 5 to 175).
- This is the discrete ambiguity of strongly absorbed projectiles (Drisko, Satchler and
  Bassel 1963): V = 100 and 150 MeV are neighbouring families. An intermediate depth,
  130 MeV, does NOT fit (chi2/N = 7.5 with r, a, W free). Say this if asked: the families
  are discrete, the surface is what is fixed.
- Numerics: A and B are stable to 1e-3 and 2e-3 in the cross section under hcm 0.05 -> 0.03,
  rmatch 25 -> 30, jtmax 60 -> 70.
- Control: for n + 208Pb at 20 MeV with KD02 (weak absorption) the same exercise fails even
  for a 10 percent depth change (chi2/N about 2.5 with r and a free). Nucleon elastic
  scattering sees more of the interior; that matches the Fisher slide, 8 of 13 directions
  resolved. Do not claim the alpha picture holds for nucleons.

Talking points:
- Feshbach projection: the optical potential is what is left of a many-body problem after
  the other channels (the Q space) are projected out, so it is complex, energy dependent and
  nonlocal. Causality links the energy dependence of the real part to the imaginary part.
- Say the conclusion as physics: the data fix the surface, and an extraction that needs the
  potential elsewhere inherits the ambiguity.
- If someone points out that transfer is surface dominated, agree. The extraction still moves
  because energy dependence, nonlocality and the overlap enter beyond the elastic surface
  match. Do not claim the interior is what transfer probes.

Timing target: 1 minute 45 seconds.

Transition: so how has the field answered this? That is the next block.
-->

---

<div class="act-label">I · Why a Bayesian analysis</div>

# Same data, same model: the Bayesian band covers better

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-6">

<img src="./figures/king2019_48cadp_bands.png" class="kami-img" style="width: 100%;" />

<div class="fig-caption">
<sup>48</sup>Ca(d,p) at 19.3 MeV, 95% bands from the same data and model. F: frequentist, χ² around the best fit. B: Bayesian posterior. Figure from King et al., PRL 122, 232502 (2019).
</div>

</div>
<div class="col-span-6">

<div class="ui-label">same data, same model, different statistics</div>

<span class="metric" style="font-size: 32px; margin: 2px 0 6px;">44–92%</span>
<div class="text-sm">of elastic data inside the nominal 95% frequentist bands (nine data sets); Bayesian: 76–100%. <span class="citation">King et al. 2019</span></div>

<div class="box-gap mt-2">

<span class="metric" style="font-size: 32px; margin: 2px 0 6px;">8.3–34% → 30–158%</span>
<div class="text-sm">(d,p) band widths at the peak, before and after angle correlations enter χ². <span class="citation">King et al., PRC 98, 044623 (2018)</span></div>

</div>

<div class="mt-2" style="font-size: 16px;">

$p(\theta \mid \text{data}) \propto p(\text{data} \mid \theta)\, p(\theta)$ → band on $\sigma_\text{calc}$ → band on $S$

</div>

</div>
</div>

<div class="takeaway">
The uncertainty of an extraction is itself a result, and it needs <b>calibrated statistics</b>.
</div>

<!--
Central message: this is the answer to "why Bayesian". A best fit plus a chi-square error bar
is the classical answer, and when it was tested head to head it undercovered badly.

Figure explanation (King et al. PRL 2019, Fig. 3a):
- Black points: 48Ca(d,p) data at 19.3 MeV. Blue dotted band F: frequentist 95% band, from
  the chi-square around the best fit. Orange band B: Bayesian 95% band from the posterior.
- Same elastic data, same model, same assigned 10% errors; the interval constructions differ,
  and some frequentist parameters had to be fixed. Transfer predictions are normalized at the
  peak.
- The Bayesian band is wider, especially past 80 degrees. The data stop near 75 degrees, so
  coverage is a statement about the elastic sets, not about this backward region.

Talking points:
- Coverage is the referee: across nine elastic data sets the nominal-95% frequentist band
  contained 44 to 92 percent of the data, the Bayesian one 76 to 100 percent (their Table I).
- King 2018 shows the same lesson inside the chi-square world: once angle-angle correlations
  are put into the fit, (d,p) band widths at the peak go from 8.3 to 34 percent to 30 to 158
  percent (their Table VI). The naive error bar was far too narrow.
- Coverage here is the fraction of the fitted data inside the band; even the Bayesian case
  has one set at 76 percent. Do not claim a posterior is calibrated in general.
- The formula: prior times likelihood gives the posterior; push it through the reaction
  model to get a band on the calculated cross section, hence on S.

Timing target: 1 minute 30 seconds.

Transition: this lesson is what moved the field to Bayesian optical potentials.
-->

---

<div class="act-label">II · How it is done now</div>

# Bayesian optical potentials: the established programme

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-7">

<div class="timeline text-sm">
<div><b>2017</b><span>χ² bands for optical-model fits. <i class="citation">Lovell et al., PRC 95</i></span></div>
<div><b>2018</b><span>MCMC posteriors propagated to transfer: 25–100%. <i class="citation">Lovell and Nunes, PRC 97</i></span></div>
<div><b>2019</b><span>Bayesian against frequentist, head to head. <i class="citation">King et al., PRL 122</i></span></div>
<div><b>2019</b><span>Which measurement reduces the uncertainty. <i class="citation">Catacora-Rios et al., PRC 100</i></span></div>
<div><b>2023</b><span>Global KD and CH89 with uncertainties (KDUQ, CHUQ). <i class="citation">Pruitt et al., PRC 107</i></span></div>
<div><b>2025</b><span>Systematic propagation to transfer observables. <i class="citation">Hebborn and Nunes, Front. Phys. 13</i></span></div>
<div><b>2026</b><span>ELM: a global potential for rare isotopes, with (p,n). <i class="citation">Beyer and Nunes, arXiv:2603.28599</i></span></div>
</div>

</div>
<div class="col-span-5">

<img src="./figures/king2019_48cap14_corner.png" class="kami-img" style="width: 100%; max-height: 300px;" />

<div class="fig-caption">
Posterior of nine Woods-Saxon parameters, <sup>48</sup>Ca(p,p) at 14 MeV. Orange: Bayesian. Blue: frequentist. Figure from King et al. (2019).
</div>

</div>
</div>

<div class="takeaway">
The posterior is the object this programme reports, and its <b>correlations</b> are part of the answer.
</div>

<!--
Central message: the Bayesian optical-potential programme exists, works, and is the state of
the art. Give its history in the right order.

Talking points:
- 2017: Lovell et al. was frequentist, chi-square bands, the starting point.
- 2018: Lovell and Nunes, Bayesian (MCMC) optical-potential posteriors, propagated
  to transfer; uncertainties of 25 to 100 percent depending on the reaction.
- 2019: King et al., the head-to-head of the previous slide; Catacora-Rios et al. asked which
  measurement would shrink the posterior most.
- 2023: Pruitt, Escher and Rahman put uncertainties on the two global workhorses, KDUQ and
  CHUQ.
- 2025 and 2026: systematic propagation to transfer (a 48Ca study), and ELM, a global
  potential aimed at rare isotopes with (p,n) charge exchange in the calibration.

Figure explanation (King et al. 2019, Fig. 2b): diagonal panels are marginal posteriors,
off-diagonal ones pairwise correlations. Orange is Bayesian, blue frequentist. Note the
strong Bayesian correlation between real depth V and radius r: that is the Igo ambiguity of
the earlier slide, now as a posterior shape. Other pairs are weakly correlated.

Timing target: 1 minute 30 seconds.

Transition: how do these analyses actually sample the posterior?
-->

---

<div class="act-label">II · How it is done now</div>

# The recipe: a cheap model and a blind walk

<div class="grid grid-cols-12 gap-6 mt-2">
<div class="col-span-7">

<div class="ui-label">how the posterior is sampled</div>

<svg viewBox="0 0 660 150" style="width: 100%; height: 8rem;">
  <defs><marker id="ar6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#1B365D"/></marker></defs>
  <g font-size="19px" font-family="Newsreader, Georgia, serif" text-anchor="middle">
    <rect x="2" y="14" width="140" height="50" rx="6" fill="#E4ECF5" stroke="#1B365D"/><text x="72" y="46" fill="#1B365D">propose θ</text>
    <rect x="174" y="14" width="140" height="50" rx="6" fill="#E4ECF5" stroke="#1B365D"/><text x="244" y="46" fill="#1B365D">solve</text>
    <rect x="346" y="14" width="140" height="50" rx="6" fill="#E4ECF5" stroke="#1B365D"/><text x="416" y="46" fill="#1B365D">compare</text>
    <rect x="518" y="14" width="140" height="50" rx="6" fill="#E4ECF5" stroke="#1B365D"/><text x="588" y="46" fill="#1B365D">accept / reject</text>
  </g>
  <g stroke="#1B365D" stroke-width="2" fill="none" marker-end="url(#ar6)">
    <path d="M142 39 L172 39"/><path d="M314 39 L344 39"/><path d="M486 39 L516 39"/>
    <path d="M588 64 L588 104 L72 104 L72 67"/>
  </g>
  <text x="330" y="136" font-size="18px" fill="#b53333" text-anchor="middle" font-family="Newsreader, Georgia, serif">repeat until converged; no likelihood gradient</text>
</svg>

<div class="box-evidence mt-3">

<b>Why it works</b>

<div class="mt-1 text-sm">Single-channel optical-model solves are cheap, so many random steps are affordable, even when one likelihood needs many targets and energies.</div>

</div>

</div>
<div class="col-span-5">

<div class="ui-label">potential parameters (hyperparameters not counted)</div>

| | | |
|---|---|---|
| <b>9</b> | one Woods-Saxon set | King 2019 |
| <b>21</b> | ELM, global | Beyer 2026 |
| <b>46</b> | KDUQ, global | Pruitt 2023 |

<div class="fig-caption" style="text-align: left;">
Different models and data sets. Parameter counts are not a performance comparison.
</div>

</div>
</div>

<div class="takeaway">
The proven route: a <b>cheap forward model</b>, sampled <b>without gradients</b>.
</div>

<!--
Central message: describe the sampling recipe, because the difficulties of Act III come from
exactly this recipe.

Talking points:
- Propose, solve, compare, accept or reject; every step is one reaction solve, and no step
  uses a derivative. KDUQ, for example, used the affine-invariant ensemble sampler (emcee)
  for 46 parameters.
- The parameter column: nine in a single-system Woods-Saxon fit, 21 in ELM, 46 in KDUQ.
- Why it works: the forward model is a single-channel optical-model solve, which is cheap.
  Hold on to that word; Act III takes it away.

Timing target: 1 minute.

Transition: the second ingredient the field developed is the emulator.
-->

---

<div class="act-label">II · How it is done now</div>

# Emulators make each solve cheap

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-6">

<div class="ui-label">what a reduced basis gives you</div>

<svg viewBox="0 0 560 190" style="width: 100%; height: 9.5rem;">
  <defs><marker id="ar7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#1B365D"/></marker></defs>
  <rect x="10" y="12" width="150" height="150" fill="#E4ECF5" stroke="#1B365D" stroke-width="1.5"/>
  <text x="85" y="84" font-size="20px" fill="#1B365D" text-anchor="middle" font-family="Newsreader, Georgia, serif">full system</text>
  <text x="85" y="110" font-size="18px" fill="#66655f" text-anchor="middle" font-family="Newsreader, Georgia, serif">dimension N</text>
  <path d="M180 87 L350 87" stroke="#1B365D" stroke-width="2" marker-end="url(#ar7)"/>
  <text x="265" y="72" font-size="17px" fill="#66655f" text-anchor="middle" font-family="Newsreader, Georgia, serif">project onto n</text>
  <text x="265" y="114" font-size="17px" fill="#66655f" text-anchor="middle" font-family="Newsreader, Georgia, serif">stored solutions</text>
  <rect x="380" y="57" width="60" height="60" fill="#1B365D" opacity="0.85"/>
  <text x="410" y="145" font-size="18px" fill="#1B365D" text-anchor="middle" font-family="Newsreader, Georgia, serif">n ≪ N, per θ</text>
</svg>

<div class="text-sm" style="line-height: 1.6;">

- Established for scattering, optical models and coupled channels. Gaussian-process emulators have also enabled Bayesian breakup analysis.

</div>

<div class="fig-caption">
Frame et al., PRL 121, 032501 (2018). Melendez et al., PLB 821, 136608 (2021). Duguet et al., Rev. Mod. Phys. 96, 031002 (2024). Odell et al., PRC 109, 044612 (2024). Catacora-Rios et al., PRC 113, 044623 (2026). Sürer et al., PRC 106, 024607 (2022).
</div>

</div>
<div class="col-span-6">

<div class="box-idea">

<b>Where gradients are already used</b>

<div class="mt-1 text-sm">Chiral nucleon-nucleon interactions, sampled with Hamiltonian Monte Carlo. <span class="citation">Svensson et al. 2022–2024.</span><br>The couplings multiply fixed operators, so emulator derivatives follow analytically. <span class="citation">Melendez et al. 2021.</span><br>Photonuclear emulator with NUTS. <span class="citation">Walton et al., PRC 114, 034621 (2026).</span></div>

</div>

<div class="box-gap mt-3">

<b>Cited optical-potential fits: gradient-free</b>

<div class="mt-1 text-sm">A likelihood value tests a proposal.<br>A likelihood gradient guides the next step.</div>

</div>

</div>
</div>

<div class="takeaway">
Cheaper solves made calibration <b>possible</b>; optical-potential samplers still walk <b>blind</b>.
</div>

<!--
Central message: emulators solved the cost of one evaluation. Gradient samplers exist where
the structure allows it (chiral EFT; a differentiable photonuclear emulator with NUTS, Walton,
Khatiwada and Kawano, PRC 114, 034621 (2026)), but the optical-potential calibrations
cited here are gradient-free, and none treats coupled channels with variable geometry.

Talking points:
- Be fair: eigenvector continuation and reduced bases changed what is affordable; Sürer et
  al. already did a Bayesian breakup analysis with Gaussian-process emulators in 2022.
- The chiral case is the instructive contrast: low-energy constants multiply fixed
  operators (affine), so the emulator derivative is analytic and HMC is routine there.
- The optical-potential calibrations cited remain gradient-free; do not claim no one has ever
  used HMC on an optical potential. Distinguish the cost of an evaluation
  (emulators attack it) from the number of evaluations (set by how the sampler moves).
- Do not claim emulation is insufficient in general; claim it is insufficient alone.

Timing target: 1 minute 15 seconds.

Transition: now move from one channel to coupled channels, and the recipe stops working.
Three difficulties.
-->

---

<div class="act-label">III · What is hard</div>

# Difficulty 1: one coupled-channel solve is expensive

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 44px; margin: 34px 0 18px;">
<div><div class="ui-label">01 / one solve</div><div class="hero-number">29<span class="metric-unit"> min</span></div><p class="text-sm">On 16 cores. Up to 151 channels per total-J block; dense complex systems of dimension ~2.7×10<sup>4</sup>.</p></div>
<div><div class="ui-label">02 / one campaign</div><div class="hero-number">10<sup>5</sup></div><p class="text-sm">Likelihood evaluations for a gradient-free calibration.</p></div>
<div><div class="ui-label">03 / product</div><div class="hero-number">~10<sup>6</sup></div><p class="text-sm">Core-hours. Direct sampling is out of reach.</p></div>
</div>

<div class="scope-line">d + <sup>58</sup>Ni at 20 MeV · continuum bins to 20 MeV, ℓ ≤ 4 · J ≤ 30</div>

<div class="takeaway">
Coupled channels need an emulator, and it must be <b>trusted where the sampler goes</b>.
</div>

<!--
Central message: the "cheap forward model" of the established recipe does not exist for
coupled channels.

Talking points:
- One converged CDCC solve of this model space: about 29 minutes on 16 cores, roughly 7.7
  core-hours per likelihood evaluation.
- A gradient-free campaign is of order 1e5 evaluations; the product is of order 1e6
  core-hours. This is the paper's own cost accounting.
- So an emulator is mandatory. Plant the second half of the takeaway: an emulator that is
  wrong does not crash, it returns a smooth slightly wrong curve. That comes back in Act V.

Timing target: 1 minute.

Transition: even with a cheap emulator, the posterior itself is hard to explore.
-->

---

<div class="act-label">III · What is hard</div>

# Difficulty 2: very unequal sensitivities

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
<div class="takeaway">Uneven sensitivity means <b>strongly correlated parameters</b>: the posterior is a ridge.</div>

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

<div class="act-label">III · What is hard</div>

# Difficulty 2: the posterior is a curved ridge

<div class="subtitle">Correlated parameters favor a narrow region. Gradient-based proposals use its local geometry.</div>

<HmcScene :step="$clicks" :height="322" />

<div class="takeaway mt-3">The missing ingredient: <b>a differentiable reaction model</b>.</div>

<!--
Central message: gradients help construct proposals in a correlated parameter space.
This is a schematic two-parameter density, not the posterior of the 18-parameter calculation.
The figure is live (public/hmc_ridge.html, source figures/hmc_ridge/): the block is carved to height
U = -log p, so HMC is literally a frictionless puck sliding on it. Each click runs one sampler;
the audience can drag to turn the block. Focus returns to the deck after a drag, so the arrow keys
keep advancing slides. "Gradient field" shows the -grad U arrows if asked.
Click 0: identify axes and equal-density contours (1, 2, 3 sigma). Several correlated combinations fit similarly.
Click 1: eight random-walk proposals. Red crosses are proposals into low-density regions, rejected. Short steps improve acceptance but explore slowly.
Click 2: one HMC trajectory. Momentum plus the slope carry the puck along the ridge; every leapfrog step costs one gradient (counter top right). It is not gradient ascent. An acceptance check follows.
Click 3: NUTS, full doubling tree. The ring marks the start; the trajectory grows by 1, 2, 4, ... steps, each time forward or backward in time at random, until it turns back at both ends. A new half that turns back inside itself is dropped (red dashed). One state of the kept trajectory is drawn with weight exp(-H) (multinomial NUTS, no separate accept/reject). Checked: 10^5 transitions reproduce the exact means and variances to 1-2 percent.
Do not infer an efficiency ratio from this schematic or from the counters, and do not say 18 parameters are impossible for an ensemble sampler.
Timing target: 1 minute.
-->

---
clicks: 3
class: scene-slide
---

<div class="act-label">III · What is hard</div>

# Difficulty 3: geometry changes the operator

<div class="subtitle">Depth scales the radial profile. Radius and diffuseness change its shape; the reduced operator must retain that dependence.</div>

<LiveOnly><MatrixScene :step="$clicks" :height="300" /></LiveOnly>

<div class="takeaway mt-3">And production codes give no derivative: <b>one extra solve per parameter per step</b>.</div>

<!--
Central message: optical-model geometry cannot be represented by merely scaling one fixed radial function.
Click 0: define the Woods–Saxon formula and the reference V = 50 MeV, R = 5 fm, a = 0.6 fm.
Click 1: increase V to 65 MeV at fixed R and a. The radial function scales.
Click 2: restore V and move R to 6 fm. The surface moves rather than simply scaling.
Click 3: connect this dependence to matrix elements and likelihood gradients.
The curves are analytic illustrations, not a calibrated potential or a scattering calculation. Affine operator dependence does not imply an affine observable or a simple posterior. Gradient samplers can be used in both cases; the issue here is constructing a differentiable non-affine operator.
Timing target: 1 minute 15 seconds.
Transition: so the requirements are three: cheap, differentiable, and checked against the
solver. DREAM is built to meet exactly these.
-->


---

<div class="act-label">IV · Why DREAM</div>

# DREAM: one answer to each difficulty

<div class="subtitle">Differentiable Reduced-basis Emulator with Automatic gradients for Markov-chain inference</div>

<div class="mt-2 dream-map">

| difficulty | DREAM's answer |
|---|---|
| expensive solve | reduced basis built from the direct solver: ≈10<sup>3</sup> direct-solve equivalents offline, milliseconds per evaluation online |
| geometry reshapes the operator | export operators on geometry grids, compress them by SVD, rebuild them online |
| no derivatives | reduced model built from differentiable operations: exact emulator gradient for ≈1.2 extra forward costs |
| correlated ridge | No-U-Turn Sampler, the adaptive form of Hamiltonian Monte Carlo |
| silent emulator error | direct-solver checks at posterior points; enrich the basis when they fail |

</div>

<div class="fig-caption">
Builds on Lei, PRC 113, 024614 (2026), the direct solver, and PRC 113, 044610 (2026), the reduced-basis emulator (220× per solve).
</div>

<div class="takeaway">
Do not differentiate the legacy solver. <b>Differentiate its compressed operator.</b>
</div>

<!--
Central message: DREAM is not a new sampler or a new emulator; it is the combination that
removes each obstacle of Act III, one row per difficulty.

Talking points:
- Read the table row by row, pointing back to the slide where each difficulty appeared.
- Row 1: the solver is used only offline; the full offline database costs about a thousand
  direct solves, versus about 1e5 for a gradient-free campaign on the solver.
- Row 2: the key idea. Geometry enters nonlinearly, so the solver exports the operator on a
  grid in radius and diffuseness; SVD keeps 8 to 15 matrix modes per form factor.
- Row 3: the reduced solve is written in differentiable operations, so reverse-mode
  automatic differentiation returns the exact gradient of the emulated posterior; measured
  cost 7.3 ms against 3.3 ms forward on one A800.
- Row 5 is part of the method, not a check added afterwards. Act V shows why.
- The two earlier papers: the exact solver every claim is checked against, and the reduced
  basis that made one solve 220 times cheaper. Neither returned a derivative.

Timing target: 1 minute 30 seconds.

Transition: here is the data flow, offline and online.
-->

---
clicks: 5
class: scene-slide
---

<div class="act-label">IV · Why DREAM</div>

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

<div class="act-label">V · What DREAM gives</div>

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

<div class="act-label">V · What DREAM gives</div>

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

<div class="act-label">V · What DREAM gives</div>

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

<div class="act-label">V · What DREAM gives</div>

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

<div class="act-label">V · What DREAM gives</div>

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

<div class="act-label">V · What DREAM gives</div>

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
