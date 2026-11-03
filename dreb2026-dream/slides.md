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
<h1 class="cover-title">Full Bayesian calibration</h1>
<div class="cover-subtitle">of coupled-channel reaction models,<br>by differentiable emulation</div>
<div class="cover-rule"></div>
<div class="cover-author">Jin Lei</div>
<div class="cover-affiliation">Tongji University, Shanghai<br>Southern Center for Nuclear-Science Theory, IMP, CAS, Huizhou</div>
<div class="cover-support">NSFC 12475132 · 12535009</div>

<LiveOnly><CoverUQ /></LiveOnly>

<!--
Central message: what the talk is, in one line, before any machinery.
Say in the first sentence what calibration means here: not one best-fit potential, but the
whole range of potentials compatible with a measured angular distribution, and from it an
error bar on anything computed with them.

Talking points:
- This is a methods talk about how a coupled-channel reaction model gets calibrated,
  and it is deliberately framed as a physics problem rather than a statistics problem.
- Twenty minutes, one argument: the optical potentials in the denominator of every
  extraction are not fixed by the elastic data, full Bayesian calibration is the honest
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
<div class="citation mt-1">Hebborn et al., J. Phys. G 50, 060501 (2023), outlook.</div>

</div>

</div>
</div>

<div class="takeaway">
The question is not only the best potential, but <b>how wrong it can be</b>.
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

Say once, aloud, before anyone asks: the absolute S here (about 0.5) is lower than the ~0.8 to
1.1 of the next slide because the bound-state well is held fixed at r0 1.25, a 0.65; only the
ratio between the two potentials is the point.

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

<div class="subtitle"><sup>48</sup>Ca(d,p)<sup>49</sup>Ca g.s., measured at four deuteron energies, each analyzed with two optical potentials.</div>

<div class="grid grid-cols-12 gap-7 mt-1 items-center">
<div class="col-span-8">

<img src="./figures/sfactor.png" class="kami-img" style="height: 305px; width: auto; margin: 0 auto; display: block;" />

</div>
<div class="col-span-4">

<div class="sf-row" style="border-color: #1b365d;">
<div class="sf-label">CH89 · across four energies</div>
<div class="sf-num" style="color: #1b365d;">43% spread</div>
<div class="sf-note">S of one state, <sup>49</sup>Ca g.s., moves with beam energy alone.</div>
</div>

<div class="sf-row mt-4" style="border-color: #b53333;">
<div class="sf-label">DOM · across four energies</div>
<div class="sf-num" style="color: #b53333;">7% spread</div>
<div class="sf-note">Flat across energies; CH89 sits 13 to 57% above it at the same energy.</div>
</div>

<div class="citation mt-4" style="font-size: 11px; line-height: 1.35; color: #66655f;">S: Nguyen et al., PRC 84, 044611 (2011), Table II. Shell model: Tsang, Lee, Lynch, PRL 95, 222501 (2005).</div>

</div>
</div>

<div class="takeaway mt-3">
Same data, same state: swapping the potential alone changes S by <b>13 to 57%</b>.
</div>

<style>
.pa-def { position: absolute; top: 14px; right: 52px; width: 262px; font-family: Inter, sans-serif; font-size: 12px; line-height: 1.45; color: #66655f; border-left: 1px solid #d4d1c6; padding-left: 12px; }
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
- The takeaway: at each energy, CH89/DOM = 1.31, 1.22, 1.13, 1.57 (0.94/0.72, 0.82/0.67,
  0.77/0.68, 1.10/0.70), so the potential alone moves S by 13 to 57 percent.
- Accuracy, only if asked: the spread across energies is consistency (CH89 43 percent, DOM 7
  percent), not the precision of one extraction, and neither series is shown to be accurate. Accuracy is distance from a true value, and S is not an observable, so it needs a
  stated reference. Dashed line: large-basis shell model (Oxbash) 0.92 for 49Ca g.s., Tsang,
  Lee, Lynch, PRL 95, 222501 (2005), Table 1 (same paper extracts 0.68 +- 0.07 with a CH89
  adiabatic prescription). DOM sits about 25 percent below the shell model; Nguyen et al. say
  their DOM values are more in line with (e,e'p), i.e. with the usual quenching. So DOM is
  consistent, and whether it is accurate depends on the reference.
- If asked about 2 MeV (below the Coulomb barrier, where little optical-potential dependence
  is expected, yet 0.94 vs 0.72): these are Nguyen et al.'s values, not reanalyzed here; the
  two series also differ in the energy dependence they put into the nucleon potentials. Say
  that plainly and do not improvise a mechanism.
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

# The best-fit band holds only 11 of 16 (d,p) points

<div class="cov-row">
<div class="cov-panel">
<div class="ui-label">the two 95% bands</div>
<img src="./figures/king2019_48cadp_bands_full.png" style="height: 278px;" />
</div>
<div class="cov-nums">
<div class="ui-label">data points inside the 95% band</div>
<div class="cov-num kF"><span class="n">11</span><span class="of">/ 16</span></div>
<div class="cov-name">F · χ² best fit</div>
<div class="cov-num kB" style="margin-top: 22px;"><span class="n">16</span><span class="of">/ 16</span></div>
<div class="cov-name">B · Bayesian</div>
</div>
</div>

<div class="fig-caption" style="margin-top: 6px;">
<sup>48</sup>Ca(d,p)<sup>49</sup>Ca g.s., 19.3 MeV. Both bands come from potentials fitted to the same nucleon elastic data; the 16 (d,p) points were not fitted, only normalized at the peak. King et al., PRL 122, 232502 (2019), Fig. 3(a,c).
</div>

<style>
.cov-row { display: flex; justify-content: center; align-items: flex-start; gap: 72px; margin-top: 0; }
.cov-panel img { display: block; }
.cov-nums { padding-top: 0; }
.cov-num { font-family: Inter, sans-serif; font-weight: 500; letter-spacing: -0.03em; line-height: 1; margin-top: 26px; }
.cov-num .n { font-size: 64px; }
.cov-num .of { font-size: 30px; margin-left: 6px; opacity: 0.75; }
.cov-name { font-family: Inter, sans-serif; font-size: 15px; color: #4d4c48; margin-top: 4px; }
.kF { color: #1a237e; }
.kB { color: #e6501b; }
</style>

<div class="takeaway">
Same elastic data, same model: <b>the Bayesian band holds all 16</b>.
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
- The Bayesian band is wider, most of all past 80 degrees, where there are no data (they stop near 75).
- The (d,p) points were not used in the fit (only the peak normalization), so they are a
  test set. The figure shows what the two bands look like; the counts on the right come from
  King et al.'s coverage plot. If asked which points miss: King et al. do not list them, and the five sit
  within a marker width of the dashed edge, so do not point at any.

Where 11 and 16 come from (only if asked): King et al. Fig. 3(c) plots, for bands of every
confidence level from 10 to 95 percent, the fraction of the 16 (d,p) points inside. At 95 the
frequentist band holds 69 percent = 11 of 16 and the Bayesian band 100 percent = 16 of 16 (read
from the figure and turned into counts with the 16 points of panel (a); the paper prints no
number). The frequentist points sit below the diagonal at every level, so it is not a 95-percent
accident. The bands come from the parameter samples alone. On the nine elastic sets used in the
fits the same pattern holds: frequentist 44 to 92 percent, Bayesian 76 to 100 percent (Table I).

Talking points:
- King et al. compared the two by counting: how many of the 16 (d,p) points fall inside each
  95% band. The chi-square best-fit band held 11, the Bayesian band all 16.
- If asked (no longer on screen): King 2018 shows the same lesson inside the chi-square world: once angle-angle correlations
  are put into the fit, (d,p) band widths at the peak go from 8.3 to 34 percent to 30 to 158
  percent (their Table VI). The naive error bar was far too narrow.
- Even the Bayesian band holds only 76 percent on one elastic set. Do not claim a posterior
  is calibrated in general.
- Only if asked how the Bayesian band is built: prior times likelihood gives the posterior; push it through the reaction
  model to get a band on the calculated cross section, hence on S.

Timing target: 1 minute 30 seconds.

- The takeaway is scoped to King et al.'s comparison: the band from sampled potentials covered better.
  If asked for the coverage of our own band: the noise-inclusive predictive check has not
  been computed (slide 19 notes); do not quote a number.

Transition: this lesson is what moved the field to Bayesian optical potentials.
-->

---

<div class="act-label">II · How it is done now</div>

# Bayesian optical potentials: the established programme

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-7">

<div class="timeline text-sm">
<div><b>2017</b><span>χ² bands for optical-model fits. <i class="citation">Lovell et al., PRC 95</i></span></div>
<div><b>2018</b><span>Sampled potentials carried into (d,p): S uncertain by <b style="white-space: nowrap;">±12 to ±50%</b> from the optical potential alone. <i class="citation">Lovell and Nunes, PRC 97</i></span></div>
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
  to transfer; uncertainties of 25 to 100 percent on the transfer cross section, depending on the reaction
  (their abstract: "Uncertainties in transfer cross sections can vary significantly (25-100%)
  depending on the reaction"; arXiv:1801.06096).
- How the on-screen "±12 to ±50%" is obtained (my conversion, not printed in the paper): their
  Eq. (12) defines eps95 = (sigma_max - sigma_min)/mean at the peak of the (d,p) angular
  distribution, i.e. the FULL width of the 95% band. Table III gives eps95 from 20% (90Zr(d,n),
  ADWA, 5% elastic errors) to 122% (116Sn(d,p), ADWA, 10% errors); the abstract rounds to
  25-100%. Half of the full width: about +-12 to +-50%. S = sigma_exp/sigma_th uses the peak,
  so S inherits it. Elastic data errors assumed 10% or 5%; experimental and structure errors
  are not included.
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

# The recipe: a cheap model and a random walk

<div class="grid grid-cols-12 gap-6 mt-2">
<div class="col-span-7">

<div class="ui-label">how the posterior is sampled</div>

<svg viewBox="0 0 660 240" style="width: 100%; height: 11.2rem;" font-family="Newsreader, Georgia, serif">
<defs><marker id="ar8" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#1B365D"/></marker><filter id="sh8" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#1B365D" flood-opacity="0.13"/></filter></defs>
<g filter="url(#sh8)"><rect x="2" y="10" width="148" height="158" rx="10" fill="#FFFFFF" stroke="#c9d3df"/></g>
<path d="M2 46 V20 a10 10 0 0 1 10 -10 H140 a10 10 0 0 1 10 10 V46 Z" fill="#1B365D"/>
<circle cx="20" cy="28.0" r="10" fill="#fff"/><text x="20" y="33.0" text-anchor="middle" fill="#1B365D" font-weight="700" style="font-size:14px">1</text>
<text x="88.0" y="34.0" text-anchor="middle" fill="#fff" style="font-size:17px">propose θ</text>
<text x="76.0" y="142" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">new parameters,</text>
<text x="76.0" y="159" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">picked at random</text>
<g filter="url(#sh8)"><rect x="172" y="10" width="148" height="158" rx="10" fill="#FFFFFF" stroke="#c9d3df"/></g>
<path d="M172 46 V20 a10 10 0 0 1 10 -10 H310 a10 10 0 0 1 10 10 V46 Z" fill="#1B365D"/>
<circle cx="190" cy="28.0" r="10" fill="#fff"/><text x="190" y="33.0" text-anchor="middle" fill="#1B365D" font-weight="700" style="font-size:14px">2</text>
<text x="258.0" y="34.0" text-anchor="middle" fill="#fff" style="font-size:17px">solve</text>
<text x="246.0" y="142" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">one optical-model</text>
<text x="246.0" y="159" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">calculation</text>
<g filter="url(#sh8)"><rect x="342" y="10" width="148" height="158" rx="10" fill="#FFFFFF" stroke="#c9d3df"/></g>
<path d="M342 46 V20 a10 10 0 0 1 10 -10 H480 a10 10 0 0 1 10 10 V46 Z" fill="#1B365D"/>
<circle cx="360" cy="28.0" r="10" fill="#fff"/><text x="360" y="33.0" text-anchor="middle" fill="#1B365D" font-weight="700" style="font-size:14px">3</text>
<text x="428.0" y="34.0" text-anchor="middle" fill="#fff" style="font-size:17px">compare</text>
<text x="416.0" y="142" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">σ(θ) against the</text>
<text x="416.0" y="159" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">data gives χ²</text>
<g filter="url(#sh8)"><rect x="512" y="10" width="148" height="158" rx="10" fill="#FFFFFF" stroke="#c9d3df"/></g>
<path d="M512 46 V20 a10 10 0 0 1 10 -10 H650 a10 10 0 0 1 10 10 V46 Z" fill="#1B365D"/>
<circle cx="530" cy="28.0" r="10" fill="#fff"/><text x="530" y="33.0" text-anchor="middle" fill="#1B365D" font-weight="700" style="font-size:14px">4</text>
<text x="598.0" y="34.0" text-anchor="middle" fill="#fff" style="font-size:17px">accept/reject</text>
<text x="586.0" y="142" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">keep the new θ</text>
<text x="586.0" y="159" text-anchor="middle" fill="#4d4c48" style="font-size:14.5px">or the old one</text>
<rect x="53.0" y="61.0" width="46" height="46" rx="9" fill="#E4ECF5" stroke="#1B365D" stroke-width="1.6" transform="rotate(-10 76.0 84)"/>
<circle cx="62.1" cy="74.3" r="3.6" fill="#1B365D"/>
<circle cx="85.7" cy="70.1" r="3.6" fill="#1B365D"/>
<circle cx="76.0" cy="84.0" r="3.6" fill="#1B365D"/>
<circle cx="66.3" cy="97.9" r="3.6" fill="#1B365D"/>
<circle cx="89.9" cy="93.7" r="3.6" fill="#1B365D"/>
<line x1="200" y1="70" x2="298" y2="70" stroke="#9aa6b5" stroke-width="1"/>
<path d="M200 70 L200.0 114.0 L201.7 113.9 L203.3 113.9 L205.0 113.9 L206.6 113.9 L208.3 113.8 L210.0 113.8 L211.6 113.7 L213.3 113.6 L214.9 113.5 L216.6 113.3 L218.3 113.1 L219.9 112.8 L221.6 112.5 L223.3 112.0 L224.9 111.4 L226.6 110.6 L228.2 109.6 L229.9 108.4 L231.6 106.8 L233.2 104.9 L234.9 102.7 L236.5 100.2 L238.2 97.4 L239.9 94.4 L241.5 91.3 L243.2 88.2 L244.8 85.3 L246.5 82.6 L248.2 80.2 L249.8 78.2 L251.5 76.5 L253.2 75.1 L254.8 73.9 L256.5 73.0 L258.1 72.3 L259.8 71.8 L261.5 71.4 L263.1 71.0 L264.8 70.8 L266.4 70.6 L268.1 70.4 L269.8 70.3 L271.4 70.3 L273.1 70.2 L274.7 70.1 L276.4 70.1 L278.1 70.1 L279.7 70.1 L281.4 70.0 L283.1 70.0 L284.7 70.0 L286.4 70.0 L288.0 70.0 L289.7 70.0 L291.4 70.0 L293.0 70.0 L294.7 70.0 L296.3 70.0 L298.0 70.0" fill="none" stroke="#1B365D" stroke-width="2.2"/>
<text x="300" y="74" fill="#4d4c48" font-style="italic" style="font-size:13px">r</text>
<text x="262" y="110" fill="#1B365D" font-style="italic" style="font-size:14px">V(r)</text>
<path d="M364.0 60.5 L366.1 63.0 L368.2 66.0 L370.4 69.3 L372.5 72.7 L374.6 76.2 L376.7 79.6 L378.8 82.7 L381.0 85.4 L383.1 87.7 L385.2 89.5 L387.3 90.8 L389.4 91.6 L391.6 92.0 L393.7 92.1 L395.8 91.9 L397.9 91.6 L400.0 91.1 L402.2 90.6 L404.3 90.2 L406.4 90.0 L408.5 89.9 L410.6 90.0 L412.8 90.3 L414.9 90.8 L417.0 91.5 L419.1 92.3 L421.2 93.2 L423.4 94.2 L425.5 95.2 L427.6 96.2 L429.7 97.1 L431.8 97.9 L434.0 98.5 L436.1 99.1 L438.2 99.5 L440.3 99.7 L442.4 99.9 L444.6 99.9 L446.7 99.9 L448.8 99.8 L450.9 99.6 L453.0 99.5 L455.2 99.4 L457.3 99.3 L459.4 99.3 L461.5 99.3 L463.6 99.4 L465.8 99.5 L467.9 99.7 L470.0 99.9" fill="none" stroke="#1B365D" stroke-width="2"/>
<line x1="371.4" x2="371.4" y1="63.8" y2="73.8" stroke="#b53333" stroke-width="1.2"/><circle cx="371.4" cy="68.8" r="2.8" fill="#b53333"/>
<line x1="385.2" x2="385.2" y1="85.9" y2="95.9" stroke="#b53333" stroke-width="1.2"/><circle cx="385.2" cy="90.9" r="2.8" fill="#b53333"/>
<line x1="400.0" x2="400.0" y1="84.9" y2="94.9" stroke="#b53333" stroke-width="1.2"/><circle cx="400.0" cy="89.9" r="2.8" fill="#b53333"/>
<line x1="414.9" x2="414.9" y1="86.7" y2="96.7" stroke="#b53333" stroke-width="1.2"/><circle cx="414.9" cy="91.7" r="2.8" fill="#b53333"/>
<line x1="429.7" x2="429.7" y1="91.1" y2="101.1" stroke="#b53333" stroke-width="1.2"/><circle cx="429.7" cy="96.1" r="2.8" fill="#b53333"/>
<line x1="445.6" x2="445.6" y1="95.4" y2="105.4" stroke="#b53333" stroke-width="1.2"/><circle cx="445.6" cy="100.4" r="2.8" fill="#b53333"/>
<line x1="461.5" x2="461.5" y1="93.9" y2="103.9" stroke="#b53333" stroke-width="1.2"/><circle cx="461.5" cy="98.9" r="2.8" fill="#b53333"/>
<circle cx="562.0" cy="84" r="19" fill="#E4ECF5" stroke="#1B365D" stroke-width="1.6"/><path d="M553.0 84 l7 8 l13 -15" fill="none" stroke="#1B365D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="610.0" cy="84" r="19" fill="#F6E3E1" stroke="#b53333" stroke-width="1.6"/><path d="M603.0 77 l14 14 M617.0 77 l-14 14" stroke="#b53333" stroke-width="3" stroke-linecap="round"/>
<path d="M153 97.0 L169 97.0" stroke="#1B365D" stroke-width="2" marker-end="url(#ar8)"/>
<path d="M323 97.0 L339 97.0" stroke="#1B365D" stroke-width="2" marker-end="url(#ar8)"/>
<path d="M493 97.0 L509 97.0" stroke="#1B365D" stroke-width="2" marker-end="url(#ar8)"/>
<path d="M586.0 171 C 586.0 205, 546.0 205, 506.0 205 L 156.0 205 C 116.0 205, 76.0 205, 76.0 177" fill="none" stroke="#1B365D" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ar8)"/>
<rect x="258" y="193" width="144" height="24" rx="12" fill="#F5F4ED"/>
<text x="330" y="210" text-anchor="middle" fill="#1B365D" font-style="italic" style="font-size:15px">repeat many times</text>
<text x="330" y="237" text-anchor="middle" fill="#b53333" style="font-size:16.5px">each step is a random guess; it never uses the slope of χ²</text>
</svg>

<div class="box-evidence" style="margin-top: 4px;">

<b>Why it works</b>

<div class="text-sm">Single-channel optical-model solves are cheap, so many random steps are affordable, even when one likelihood needs many targets and energies.</div>

</div>

</div>
<div class="col-span-5">

<div class="ui-label">three published calibrations</div>

<div class="ptab">

| parameters | model | reference |
|---|---|---|
| <b>9</b> | single-system fit | King 2019 |
| <b>21</b> | ELM, global | Beyer 2026 |
| <b>46</b> | KDUQ, global | Pruitt 2023 |

</div>

<style>
.ptab td, .ptab th { white-space: nowrap; }
</style>

<div class="fig-caption" style="text-align: left;">
Optical-potential parameters only (hyperparameters not counted). Different models and data sets; not a performance comparison.
</div>

</div>
</div>

<div class="takeaway">
The proven route: a <b>cheap forward model</b>, sampled by <b>random steps</b> that never use the slope of χ².
</div>

<!--
Central message: describe the sampling recipe, because the difficulties of Act III come from
exactly this recipe.

Talking points:
- Propose, solve, compare, accept or reject; every step is one reaction solve, and no step
  uses the slope of chi-square with respect to the parameters (the likelihood gradient). KDUQ, for example, used the affine-invariant ensemble sampler (emcee)
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

<div class="ui-label">emulator: a fast stand-in built from full calculations</div>

<svg viewBox="0 0 600 200" style="width: 100%; height: 10rem;">
  <defs><marker id="ar7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#1B365D"/></marker></defs>
  <g font-family="Newsreader, Georgia, serif" text-anchor="middle" font-size="20px" fill="#1B365D" font-weight="600">
    <text x="104" y="24">full solve</text>
    <text x="430" y="24">emulator</text>
  </g>
  <path d="M16.0 86.0 L18.2 85.5 L20.4 84.1 L22.6 82.1 L24.8 79.8 L27.0 77.5 L29.2 75.5 L31.4 74.2 L33.6 73.6 L35.8 73.9 L38.0 75.3 L40.2 77.6 L42.4 80.8 L44.6 84.6 L46.8 88.9 L49.0 93.2 L51.2 97.5 L53.4 101.2 L55.6 104.2 L57.8 106.3 L60.0 107.3 L62.2 107.0 L64.4 105.5 L66.6 102.9 L68.8 99.2 L71.0 94.7 L73.2 89.6 L75.4 84.2 L77.6 78.9 L79.8 73.9 L82.0 69.5 L84.2 66.1 L86.4 63.7 L88.6 62.6 L90.8 62.7 L93.0 64.2 L95.2 66.9 L97.4 70.7 L99.6 75.3 L101.8 80.5 L104.0 86.0 L106.2 91.5 L108.4 96.6 L110.6 101.2 L112.8 104.9 L115.0 107.5 L117.2 108.9 L119.4 109.1 L121.6 107.9 L123.8 105.6 L126.0 102.2 L128.2 97.9 L130.4 93.0 L132.6 87.8 L134.8 82.5 L137.0 77.4 L139.2 72.9 L141.4 69.1 L143.6 66.3 L145.8 64.6 L148.0 64.1 L150.2 64.8 L152.4 66.7 L154.6 69.6 L156.8 73.4 L159.0 77.8 L161.2 82.7 L163.4 87.7 L165.6 92.5 L167.8 96.9 L170.0 100.6 L172.2 103.5 L174.4 105.5 L176.6 106.3 L178.8 106.0 L181.0 104.6 L183.2 102.1 L185.4 98.9 L187.6 94.9 L189.8 90.6 L192.0 86.0" stroke="#1B365D" stroke-width="1.2" fill="none" opacity="0.45"/>
  <circle cx="16.0" cy="86.0" r="2.3" fill="#1B365D"/><circle cx="21.9" cy="82.8" r="2.3" fill="#1B365D"/><circle cx="27.7" cy="76.8" r="2.3" fill="#1B365D"/><circle cx="33.6" cy="73.6" r="2.3" fill="#1B365D"/><circle cx="39.5" cy="76.7" r="2.3" fill="#1B365D"/><circle cx="45.3" cy="86.0" r="2.3" fill="#1B365D"/><circle cx="51.2" cy="97.5" r="2.3" fill="#1B365D"/><circle cx="57.1" cy="105.7" r="2.3" fill="#1B365D"/><circle cx="62.9" cy="106.6" r="2.3" fill="#1B365D"/><circle cx="68.8" cy="99.2" r="2.3" fill="#1B365D"/><circle cx="74.7" cy="86.0" r="2.3" fill="#1B365D"/><circle cx="80.5" cy="72.3" r="2.3" fill="#1B365D"/><circle cx="86.4" cy="63.7" r="2.3" fill="#1B365D"/><circle cx="92.3" cy="63.6" r="2.3" fill="#1B365D"/><circle cx="98.1" cy="72.1" r="2.3" fill="#1B365D"/><circle cx="104.0" cy="86.0" r="2.3" fill="#1B365D"/><circle cx="109.9" cy="99.8" r="2.3" fill="#1B365D"/><circle cx="115.7" cy="108.1" r="2.3" fill="#1B365D"/><circle cx="121.6" cy="107.9" r="2.3" fill="#1B365D"/><circle cx="127.5" cy="99.4" r="2.3" fill="#1B365D"/><circle cx="133.3" cy="86.0" r="2.3" fill="#1B365D"/><circle cx="139.2" cy="72.9" r="2.3" fill="#1B365D"/><circle cx="145.1" cy="65.1" r="2.3" fill="#1B365D"/><circle cx="150.9" cy="65.3" r="2.3" fill="#1B365D"/><circle cx="156.8" cy="73.4" r="2.3" fill="#1B365D"/><circle cx="162.7" cy="86.0" r="2.3" fill="#1B365D"/><circle cx="168.5" cy="98.2" r="2.3" fill="#1B365D"/><circle cx="174.4" cy="105.5" r="2.3" fill="#1B365D"/><circle cx="180.3" cy="105.1" r="2.3" fill="#1B365D"/><circle cx="186.1" cy="97.6" r="2.3" fill="#1B365D"/><circle cx="192.0" cy="86.0" r="2.3" fill="#1B365D"/>
  <path d="M210 86 L252 86" stroke="#1B365D" stroke-width="2" marker-end="url(#ar7)"/>
  <g font-family="Newsreader, Georgia, serif" font-size="21px" fill="#1B365D">
    <text x="270" y="93" text-anchor="start">c<tspan font-size="14px" dy="5">1</tspan></text><path d="M298.0 86.0 L299.0 84.9 L300.0 83.3 L301.0 81.4 L302.0 79.7 L303.0 78.4 L304.0 77.8 L305.0 77.9 L306.0 78.8 L307.0 80.4 L308.0 82.6 L309.0 85.2 L310.0 87.9 L311.0 90.7 L312.0 93.2 L313.0 95.3 L314.0 96.8 L315.0 97.7 L316.0 97.7 L317.0 97.0 L318.0 95.6 L319.0 93.6 L320.0 91.1 L321.0 88.3 L322.0 85.4 L323.0 82.6 L324.0 80.1 L325.0 77.9 L326.0 76.3 L327.0 75.3 L328.0 75.1 L329.0 75.5 L330.0 76.5 L331.0 78.2 L332.0 80.3 L333.0 82.7 L334.0 85.2 L335.0 87.8 L336.0 90.1 L337.0 92.2 L338.0 93.8" stroke="#1B365D" stroke-width="2" fill="none"/><text x="350" y="93" text-anchor="start">+ c<tspan font-size="14px" dy="5">2</tspan></text><path d="M400.0 86.0 L401.0 84.0 L402.0 82.2 L403.0 81.3 L404.0 81.5 L405.0 83.0 L406.0 85.4 L407.0 88.5 L408.0 91.7 L409.0 94.4 L410.0 96.3 L411.0 96.9 L412.0 96.2 L413.0 94.1 L414.0 91.0 L415.0 87.2 L416.0 83.1 L417.0 79.4 L418.0 76.5 L419.0 74.7 L420.0 74.3 L421.0 75.2 L422.0 77.5 L423.0 80.7 L424.0 84.5 L425.0 88.4 L426.0 92.0 L427.0 94.9 L428.0 96.6 L429.0 97.0 L430.0 96.2 L431.0 94.2 L432.0 91.2 L433.0 87.7 L434.0 84.1 L435.0 80.8 L436.0 78.2 L437.0 76.5 L438.0 76.0 L439.0 76.7 L440.0 78.5" stroke="#1B365D" stroke-width="2" fill="none"/><text x="452" y="93" text-anchor="start">+ c<tspan font-size="14px" dy="5">3</tspan></text><path d="M502.0 86.0 L503.0 84.4 L504.0 84.4 L505.0 86.1 L506.0 89.0 L507.0 92.1 L508.0 94.3 L509.0 94.8 L510.0 93.3 L511.0 89.8 L512.0 85.2 L513.0 80.5 L514.0 76.7 L515.0 74.7 L516.0 75.0 L517.0 77.7 L518.0 82.1 L519.0 87.4 L520.0 92.4 L521.0 96.1 L522.0 97.7 L523.0 96.9 L524.0 93.9 L525.0 89.3 L526.0 84.1 L527.0 79.3 L528.0 76.0 L529.0 74.8 L530.0 75.8 L531.0 78.9 L532.0 83.4 L533.0 88.3 L534.0 92.6 L535.0 95.6 L536.0 96.5 L537.0 95.3 L538.0 92.2 L539.0 88.0 L540.0 83.4 L541.0 79.5 L542.0 77.0" stroke="#1B365D" stroke-width="2" fill="none"/>
    <text x="554" y="93" text-anchor="start">+ …</text>
  </g>
  <g font-family="Newsreader, Georgia, serif" font-size="18px" fill="#66655f" text-anchor="middle">
    <text x="104" y="156">values at N mesh points</text>
    <text x="104" y="182">N: thousands</text>
    <text x="430" y="156">n stored solutions, n ≈ 10</text>
    <text x="430" y="182">new potential: only the weights c</text>
  </g>
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

<b>What it buys</b>

<div class="mt-1 text-sm">Milliseconds per evaluation instead of minutes, so a sampler can afford 10<sup>5</sup> to 10<sup>6</sup> of them.</div>

</div>

<div class="box-gap mt-3">

<b>What the fits of slide 7 do not use</b>

<div class="mt-1 text-sm">The slope: which way to change the potential to fit better.</div>

</div>

</div>
</div>

<div class="takeaway">
An emulator makes <b>each solve cheap</b>; the fits of slide 7 use its value, <b>not its slope</b>.
</div>

<!--
Central message: emulators solved the cost of one evaluation. Gradient samplers exist where
the structure allows it (chiral EFT; a differentiable photonuclear emulator with NUTS, Walton,
Khatiwada and Kawano, PRC 114, 034621 (2026)), but the optical-potential calibrations
cited here are gradient-free. Non-affine emulators exist (Odell et al. 2024, ROSE, single-channel optical
models; Catacora-Rios et al. 2026, coupled channels; both cited on the slide), but none has been used to obtain a joint HMC
posterior for a coupled-channel reaction observable. If asked "why not their emulator?": the
new piece here is the exact gradient of the emulated posterior, built from operators exported
by an existing solver without rewriting it, plus direct-solver checks at posterior points.

Talking points:
- The picture, in words: a full solve gives the wave function at N mesh points (thousands of
  numbers). The emulator stores n full solutions (about ten) and writes the wave function for a
  new potential as a weighted sum of them, so only the n weights c are computed. This is the
  reduced-basis (eigenvector-continuation) type; Gaussian-process emulators interpolate the
  observable instead.
- Be fair: eigenvector continuation and reduced bases changed what is affordable; Sürer et
  al. already did a Bayesian breakup analysis with Gaussian-process emulators in 2022.
- The chiral case is the instructive contrast: low-energy constants multiply fixed
  operators (affine), so the emulator derivative is analytic and HMC is routine there.
- The optical-potential calibrations cited remain gradient-free; do not claim no one has ever
  used HMC on an optical potential. Distinguish the cost of an evaluation
  (emulators attack it) from the number of evaluations (set by how the sampler moves).
- Do not claim emulation is insufficient in general; claim it is insufficient alone.

Timing target: 1 minute 15 seconds.

Slide 13's takeaway names "non-affine emulators": Odell et al. 2024 (ROSE, single-channel) and
Catacora-Rios et al. 2026 (coupled channels), both cited here. Point back to them there.

If asked where gradients are already used: chiral NN interactions sampled with HMC
(Svensson et al. 2022-2024; couplings multiply fixed operators, so emulator derivatives are
analytic, Melendez et al. 2021) and a photonuclear emulator with NUTS (Walton et al., PRC 114,
034621 (2026)).

Transition: now move from one channel to coupled channels, and the recipe stops working.
Three difficulties.
-->

---

<div class="act-label">III · What is hard</div>

# Difficulty 1: one coupled-channel solve is expensive

<div class="subtitle">The deuteron breaks up on the way in: ADWA folds this in adiabatically; CDCC treats the continuum explicitly, at a price.</div>

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 44px; margin: 22px 0 18px;">
<div><div class="ui-label">01 / one solve</div><div class="hero-number">29<span class="metric-unit"> min</span></div><p class="text-sm">On 16 cores. Up to 151 channels per total-J block; dense complex systems of dimension ~2.7×10<sup>4</sup>.</p></div>
<div><div class="ui-label">02 / one campaign</div><div class="hero-number">~10<sup>5</sup></div><p class="text-sm">Likelihood evaluations for one calibration.</p></div>
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
- 1e5 is a floor, not an estimate: our own gradient-free ensemble run on the emulator used
  6.4e6 calls, and NUTS 6e5 gradients. The real gap is larger than the slide says.
- A gradient-free campaign is of order 1e5 evaluations; the product is of order 1e6
  core-hours. This is the paper's own cost accounting.
- So an emulator is mandatory. Plant the second half of the takeaway: an emulator that is
  wrong does not crash, it returns a smooth slightly wrong curve. That comes back in Act V.

Timing target: 1 minute.

Transition: even with a cheap emulator, the posterior itself is hard to explore.
-->

---

<div class="act-label">III · What is hard</div>

# Difficulty 2: the data constrain combinations, not parameters

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-5">
<div class="ui-label">one elastic calculation</div>
<p class="text-sm">n + <sup>208</sup>Pb, 20 MeV, KD02. Step this nucleon potential 10% along each of its 13 parameter-space (Fisher) directions.</p>
<div class="metric">600<span class="metric-unit">×</span></div>
<p class="text-sm">Largest change 95%, smallest 0.15%.</p>
<div class="box-idea"><b>8 of 13 directions resolved</b><div class="text-sm">To 10%; 35 angles to 175°, 10% errors. The other five are mostly absorption.<br>Ten angles at 10–60°: <b>4 of 13</b>, at 10% or 15% errors.</div></div>
</div>
<div class="col-span-7"><img src="./figures/potential_information.png" class="kami-img" style="width: 100%;" /></div>
</div>
<div class="takeaway">The measured directions <b>mix parameters</b>, so the posterior is a correlated ridge.</div>

<!--
Central message: the information the data carry about the potential is anisotropic, which is
the physical reason a posterior over many parameters is a ridge.

Figure explanation (n + 208Pb elastic at 20 MeV, KD02 reference, 13 parameters, 35 angles;
computed for this talk):
- Top panel. Bold: the elastic angular distribution at KD02. Red dashed: the potential moved
  ten per cent (in log space) along the direction the data see best; the diffraction pattern
  goes out of phase. Thin curves: the same step along other directions.
  Directions 9 to 13 move the curve by less than 1.7 per cent: those are the ridge.
- Lower panel. Each dot is the RMS change of the curve from that ten per cent step. Leading
  direction 95 per cent, last one 0.15 per cent: a factor of about six hundred.
- The line at 1.7 per cent is derived, not chosen: a step eps changes the curve by
  eps sqrt(lambda/n) at RMS over n = 35 angles, so a direction resolved exactly at ten per
  cent sits at 10/sqrt(35) = 1.7 per cent. Eight above, five below.

Talking points:
- Define the matrix in one clause: Fisher information of the angular distribution with
  respect to the potential parameters, under the data errors; eigenvectors are directions in
  parameter space.
- Physics payoff, say it slowly: the data determine the real radius against the depth, the
  surface absorption geometry and the real diffuseness; they leave the volume absorption, the
  imaginary geometry and the imaginary spin-orbit nearly free.
- One spoken bridge: the same thing shows up in the real calibration as the p-n ridge on
  slide 20.
- Say "a different 13": these are 13 single-channel potential parameters, not DREAM's 13
  sampled coordinates.
- The sparse-data line (computed for this talk: figures/make_potential_information.py --count,
  same forward model, same 10 percent tolerance): 10 angles from 10 to 60 degrees resolve 4 of
  13 with 10 or 15 percent errors; 10 angles spread over 5 to 175 degrees with 15 percent errors
  resolve 6; 35 angles to 90 degrees resolve 6. For an experimentalist: angular range buys
  more than smaller error bars. One nucleon system at one energy; do not generalize the counts.
- Uneven response means a correlated posterior; a sampler that ignores the correlation pays
  for it. One target, one energy: do not generalize the 8 of 13 beyond this case.

Timing target: 1 minute 15 seconds.

Transition: so state the obstruction precisely, in one slide.
-->

---
clicks: 3
class: scene-slide
---

<div class="act-label">III · What is hard</div>

# Difficulty 2, as a shape: a curved ridge

<div class="subtitle">Only a narrow, curved band of parameter sets fits the data. Schematic: random steps mostly fall off it; moves guided by the slope travel far and are still accepted. Measured comparison: slide 16.</div>

<HmcScene :step="$clicks" :height="322" />

<div class="takeaway mt-3">Using the slope, a sampler makes <b>long moves that are still accepted</b>, not short random ones.</div>

<!--
Central message: gradients help construct proposals in a correlated parameter space.
This is a schematic two-parameter density, not the 13-coordinate (18-parameter) posterior of the calculation.
The figure is live (public/hmc_ridge.html, source figures/hmc_ridge/): the block is carved to height
U = -log p, so HMC is literally a frictionless puck sliding on it. Each click runs one sampler;
the audience can drag to turn the block. Focus returns to the deck after a drag, so the arrow keys
keep advancing slides.
Click 0: identify axes and equal-density contours (1, 2, 3 sigma). Several correlated combinations fit similarly.
Click 1: eight random-walk proposals. Red crosses are proposals into low-density regions, rejected. Short steps improve acceptance but explore slowly.
Click 2: one HMC trajectory. Momentum plus the slope carry the puck along the ridge; every leapfrog step costs one gradient. It is not gradient ascent. An acceptance check follows.
Click 3: NUTS. Say only: it keeps extending the path until the path starts to come back, then keeps one point from it, so nobody has to tune the path length.
If asked about the mechanics: the trajectory grows by 1, 2, 4, ... steps, forward or backward in time at random, until it turns back at both ends; a half that turns back inside itself is dropped (red dashed); one state is drawn with weight exp(-H) (multinomial NUTS). Checked: 10^5 transitions reproduce the exact means and variances to 1-2 percent.
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

<div class="takeaway mt-3">A fast model must <b>rebuild this shape at every trial potential</b>, and still return the slope.</div>

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

# DREAM: one answer to each difficulty, one check for its risk

<div class="subtitle">A fast stand-in for full CDCC that also returns the slope, for a sampler that follows it.</div>

<div class="mt-2 dream-map">

| | DREAM's answer |
|---|---|
| 1 · expensive solve | build a small model once, from ≈10<sup>3</sup> direct-solve equivalents; milliseconds per evaluation afterwards |
| 2 · correlated ridge | a sampler that follows the slope (No-U-Turn, a form of Hamiltonian Monte Carlo); the small model returns its own slope exactly, for ≈1.2 extra evaluations; built for many-parameter fits, about parity here (slide 16) |
| 3 · geometry reshapes the potential | store the coupling matrices on a grid of radius and diffuseness, compress them, rebuild them for each trial potential |
| new risk · a wrong emulator fails silently | rerun the full CDCC at points the sampler visits; enlarge the small model when they disagree |

</div>

<div class="fig-caption">
Builds on Lei, PRC 113, 024614 (2026), the direct solver, and PRC 113, 044610 (2026), the reduced-basis emulator (220× per solve).
</div>

<div class="takeaway">
Leave the full CDCC code as it is; <b>differentiate its compressed version</b>.
</div>

<!--
Central message: DREAM is not a new sampler or a new emulator; it is the combination that
removes each obstacle of Act III, one row per difficulty.

Talking points:
- Read the table row by row, pointing back to the slide where each difficulty appeared.
- Row 1: the solver is used only offline; the full offline database costs about a thousand
  direct solves, versus about 1e5 for a gradient-free campaign on the solver.
- Row 3: the key idea. Geometry enters nonlinearly, so the solver exports the operator on a
  grid in radius and diffuseness; SVD keeps 8 to 15 matrix modes per form factor.
- If asked about accuracy versus cost (the paper's CAT figure, as in Odell 2024 and
  Catacora-Rios): every lower rank is an exact truncation of the production basis, so the
  curve is cheap to draw. Worst chi2_emu over the 13 posterior points falls from 151 at
  n_b = 20 to 0.30 at n_b = 180; both acceptance criteria are first met at n_b = 140
  (chi2_emu <= 0.43, worst angle 0.32 sigma). Production carries a margin of about 1.4 at 1.3
  times the cost of the smallest passing rank. Online cost grows only 3.2x (4.4x with
  gradient) while n_b triples: accuracy is cheap online, the snapshots are the expense.
- If asked how accurate the gradient is against the true model: NUTS uses the exact gradient
  of the emulated posterior (AD vs finite differences agree to 1e-6). Against direct-CDCC
  central differences the emulator derivative of the cross section agrees to 3.9 to 4.7
  percent, a solution-space plateau; it does not affect sampling, which only needs the
  gradient of the posterior it samples.
- Row 2, second half: the reduced solve is written in differentiable operations, so reverse-mode
  automatic differentiation returns the exact gradient of the emulated posterior; measured
  cost 7.3 ms against 3.3 ms forward on one A800.
- The last row is part of the method, not a check added afterwards. Act V shows why.
- Rows follow the three difficulties in the order of slides 10 to 13; the last row is the risk the
  emulator itself brings.
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

<div class="subtitle">Full calculations once, a small differentiable model many times, and checks against the full calculation.</div>

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

<style>
.budget-grid { margin: 14px 0 6px !important; }
.budget-grid .hero-number { font-size: 58px; }
.budget-grid h3 { margin: 2px 0 8px !important; }
.budget-grid p { margin: 0; }
</style>

<div class="budget-grid">
<div><div class="ui-label">01 / offline</div><div class="hero-number">≈1,000</div><h3>direct-solve equivalents</h3><p>728 snapshots + operator grids, once.<br>29 min per solve on 16 cores.</p></div>
<div><div class="ui-label">02 / online</div><div class="hero-number">16,000</div><h3>posterior samples</h3><p>Four independent chains agree, &lt; 1 h on one GPU.<br>6×10<sup>5</sup> gradient evaluations.</p></div>
</div>
<div class="scope-line" style="margin-top: 10px;">18 potential parameters, sampled as 12 (proton and neutron geometries move together), plus one error scale</div>
<div class="box-gap mt-2" style="font-size: 15px; line-height: 1.4;">
<b>In this calibration the speed-up is the emulator, not the sampler</b>
In the physical basin, an ensemble sampler on the same emulator matches the NUTS marginals to 1%. NUTS: 2.4× more independent samples per call, near parity per unit compute.
</div>
<div class="takeaway">Pay for the full model offline. Explore the posterior online.</div>

<!--
Central message: separate the two budgets. The offline budget is large and finite; the online
budget is the one that used to be hopeless.

Talking points:
- Give the offline number plainly. About a thousand direct-solve equivalents (728 snapshots
  over five enrichment rounds, about 5e3 core-hours, plus operator grids) is a real investment
  and the honest price of the method.
- 6e5 gradient evaluations in the production run: on the direct solver each would be a solve
  plus 12 more for finite differences (the error scale beta enters the likelihood
  analytically, so only the 12 optical coordinates need solves). That is the cost argument,
  set against slide 10.
- Sixteen thousand samples in under an hour on one GPU, and say the qualifier: zero
  divergent trajectories in this run (it does not prove every region was explored; slide 17 notes).
- Do not present the speed-up as a single headline ratio. The honest statement is the two
  budgets side by side.
- Rehearse one sentence for "why differentiate, then?": "In this calibration the emulator is the
  speed-up; the gradient is built for multi-energy and global fits."
- The "what the gradient buys" box is the question the Bayesian-optical-potential people in the room will ask, so
  answer it before they do. An affine-invariant ensemble sampler (emcee), 64 walkers, 1e5
  steps, on the same thirteen-coordinate posterior and the same emulator: within the physical
  basin it reproduces the NUTS marginals to one percent. NUTS leads by about 2.4 in effective
  samples per model call; a gradient costs 2.2 forward evaluations, so per unit of compute
  they are close to parity. The gain expected at higher dimension (HMC steps grow like d^1/4
  against about d for random walk) is not measured here. Neither sampler crosses between
  separated posterior structures; that is what the direct-solver checks are for.

Timing target: 1 minute.

Transition: an emulator is a numerical instrument. Before reading a posterior off it, check
it against the thing it replaces. The next slide is what happened the one time we were less
careful.
-->

---

<div class="act-label">V · What DREAM gives</div>

# A smooth emulator error can fake a better fit

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-5">

<div class="ui-label">an earlier basis, not yet checked at its own posterior</div>

<div class="text-base mt-2">

<span class="metric">89 <span class="metric-unit">vs</span> 117</span>χ² against the data, same parameters: the emulator (89) looked <b>better</b> than the full calculation (117)

</div>

<div class="box-gap mt-3">

<div class="text-sm">An emulator–solver discrepancy of χ² = <b>6.4</b> improves the apparent fit by <b>28</b>: the error points towards the data.<br>Δ/σ: difference in data error bars.</div>

</div>

</div>
<div class="col-span-7">

<img src="./figures/verify_broken.png" class="kami-img" style="width: 100%; display: block; margin: 0 auto;" />

</div>
</div>

<div class="takeaway mt-3">
Build, sample, <b>check at the posterior</b>, enrich. After rebuilding: emulator–solver χ² = 0.08–0.30.
</div>

<!--
Central message: this is the methodological slide of the talk. A validation that is
geometrically comfortable is not a validation.

Talking points:
- Provenance if asked for the table: this pair is a development run, not in the paper. A direct
  CDCC solve at that run's posterior mean, recomputed 2026-10-16 from the saved S-matrix and
  that basis's grid. The paper's own verification is the 13-point table.
- "Why didn't your gate catch it?": that basis had been checked only at points away from its
  own posterior; the gate was not yet applied where the sampler went. That is the rule this
  slide earned.
- Tell it as a sequence, not as a confession. The check passed, the physics looked right, and
  the numbers were wrong.
- The lower panel now shows both residuals: line = emulator minus solver, dots = data minus
  solver. Past 145 degrees they move together: that is "the error points towards the data"
  made visible, and it is why a 6.4 disagreement buys 28 (2 x 17.3 = 34.6 alignment term).
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
  Cauchy-Schwarz bound 2 sqrt(chi2_solver x chi2_emu-solver) = 2 sqrt(117 x 6.4), 34.6 against 54.7
  (89 = 117 - 34.6 + 6.4). This is why a
  disagreement of 6.4 can buy 28: the error is not random noise, it points where the data
  point. That is the general mechanism, not an accident of this system.
- The fix is a self-consistent loop, and say it as a loop: build a basis, find the posterior,
  add points from that posterior, rebuild, re-check. The production basis took five
  enrichment rounds (728 snapshots).
- If asked about multimodality: from the full prior the reduced model also showed a remote
  high-V_v^p structure. Neither NUTS nor the ensemble sampler crosses between the two; 18 of
  64 ensemble walkers sat there while the pooled diagnostics looked fine, and four NUTS chains
  flagged it only through split R-hat 7.35. The direct solver puts it 15 to 33 log-posterior
  units below the physical basin at all 25 points checked, so the reported posterior is the
  basin the solver supports. Lesson: multi-start chains plus direct-solver adjudication.
- This is the slide to slow down on. It is the reason the two slides after it are trustworthy:
  say explicitly that the posterior shown next was produced after this fix, and that the
  0.08 to 0.30 in the takeaway is the paper's 13-point table after the rebuild; the 0.30
  on the next slide is the worst of 10 further points not used to build the emulator.
  Both are after the rebuild.
- Do not claim credit for the failure being interesting. Claim the rule.

Timing target: 1 minute 15 seconds.

Transition: so the rule is to check where the sampler goes. Here is that check on the
production run.
-->

---

<div class="act-label">V · What DREAM gives</div>

# Verify before reading the posterior

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-5">

<div class="ui-label">the check</div>

<div class="text-base mt-2">

<span class="metric">0.30 <span class="metric-unit">/ 1.0</span></span>Worst disagreement, emulator vs full CDCC: χ² over 64 angles, pass below 1. No angle off by more than 0.3 of an error bar.<br><b class="mt-2" style="display:block">10 fresh posterior points</b>None used to build the emulator. 13 more in the paper also pass.

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
- The lower panel has the same meaning as on the previous slide (emulator minus solver, in error
  units); there the axis is wider because the data residuals are drawn too.
- Explain why silence is the danger. A solver that is wrong usually diverges or returns
  nonsense. An emulator that is wrong returns a slightly wrong smooth curve, and the
  posterior quietly moves.
- "By your own slide 17, a 0.30 discrepancy aligned with the data could move chi2 by up to
  2 sqrt(chi2_data x 0.30), about 7 to 12 here. What does it actually do?" Computed at all 10
  points (figures/curves_gate_v728.npz, assigned errors, beta not applied): emulator minus
  solver chi2 against the data is -1.6 to +3.1, signs mixed (mean +0.6), so about a quarter
  of the bound and no systematic pull towards the data. With beta in the likelihood the effect
  on log p is smaller still. Before the rebuild (slide 17) it was -28, one-signed.
- If asked about model inadequacy: the error scale beta is sampled jointly and absorbs
  model inadequacy only to the extent that it mimics independent fractional noise; correlated
  model-space errors are not represented (slide 20 notes).
- Say that the results after this slide were produced with the rule in place.

Timing target: 1 minute 15 seconds.

Transition: with the check in place, here is the posterior.
-->

---

<div class="act-label">V · What DREAM gives</div>

# The posterior in data space

<div class="grid grid-cols-12 gap-5 mt-1">
<div class="col-span-7">

<img src="./figures/predictive_posterior.png" class="kami-img" style="width: 100%;" />

</div>
<div class="col-span-5">

<div class="ui-label">fit to the 64 data points</div>

<div class="text-base mt-2">

<span class="metric">51.8 <span class="metric-arrow">→</span> 1.16</span>χ²/N, assigned errors only: KD02 in CDCC, not refit → posterior mean. 60 of 64 error bars had to be assigned (EXFOR quotes 4).

</div>

<div class="box-evidence mt-2">

<b>Error scale β, sampled with the potential</b>

<div class="mt-1 text-sm">Extra fractional error the data ask for: β = 0.03 ± 0.02. Halve every assigned error and β rises to 0.12, restoring nearly the same total.</div>

</div>

</div>
</div>

<div class="takeaway">Calibrated on one angular distribution, the model <b>follows its diffraction minima to 150°</b>.</div>

<!--
Central message: the posterior is best shown in data space (a postdiction on the fitted data), because that is what it is
for.

Figure explanation:
- Black points: the elastic angular distribution, with its experimental uncertainties.
- Green line: the median of the posterior predictive. Green band: its 95 percent credible
  interval.
- Dashed pink: the global reference potential the calibration starts from.
- Read the band width, not the line. Narrow through the forward minima; beyond 150 degrees
  it widens and misses a few points, and that is where the spinless model is weakest.

Talking points:
- Say what a credible interval is in one clause, because the audience is a reaction audience
  and not all of them work in Bayesian terms.
- The interesting feature is the minima. A potential that is slightly wrong misses the
  minima badly, so a narrow band there is a real statement about how much the data
  constrain the prediction. Do not say the band is narrow because the model has eighteen
  parameters; the point is where it is narrow, not that it is.
- Be descriptive about the dashed curve, not dismissive: it is a global fit to a very large
  body of data, and it was never fitted to this system at this energy. Numbers if asked:
  KD02 chi2/N = 51.8 in this CDCC model, the posterior mean 1.16. That is not a test of KD02
  as a nucleon potential: it is the unrenormalized proton-plus-neutron fold, spinless, failing
  for this deuteron angular distribution, which is why one calibrates.
- First experimentalist question, "how did you assign 60 error bars?": absolute errors of
  0.005, 0.01, 0.02 or 0.05 in sigma/sigma_R, one common value forward, beyond that graded by
  the size of the ratio so the assignment follows the diffraction pattern: median 13 percent
  relative. "Did you inflate errors until chi2 = 1?": no. With all errors halved the sampled
  error scale beta rises to 0.122 +- 0.022 and restores nearly the same total uncertainty:
  the likelihood itself rejects an assignment tighter than the scatter of the data.
- If asked for coverage (slide 6 made coverage the referee): the band drawn is the 95 percent
  credible interval of the model curve, without the measurement noise, so the fraction of
  points inside it is not the right test. The proper check is a posterior predictive with
  the beta-inflated noise; it has not been computed for this talk. What exists: chi2/N = 1.16
  at the posterior mean with the assigned errors alone, and both headline integrals stable
  under halving or doubling those errors. Offer the predictive check as the obvious next
  diagnostic; do not quote a coverage number.
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

<div class="ui-label">volume integrals: strength summed over space</div>

| | prior | posterior |
|---|---|---|
| real, summed | 915 ± 99 | <b style="white-space: nowrap;">772 ± 13</b> |
| imaginary, summed | 219 ± 40 | <b style="white-space: nowrap;">204 ± 14</b> |

<div class="fig-caption" style="text-align: left;">
MeV fm<sup>3</sup>/nucleon; spinless CDCC, Woods–Saxon, 3% radius prior. Real sum 15% below KD02.
</div>

<div class="box-evidence mt-2">

<b>The volume integral of U<sub>p</sub> + U<sub>n</sub> is pinned; the split is not.</b>

<div class="mt-1 text-sm">Absorption, which drove the <sup>48</sup>Ca swing, is less pinned; transfer also needs its shape.</div>

</div>

</div>
</div>

<div class="takeaway mt-3">
Within Woods–Saxon (3% radius prior): <b>real sum to 1.7%, imaginary sum to 7%</b>.
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
- Panel (b): the imaginary part. The posterior centre sits on the prior centre; the data
  narrow the sum threefold but do not shift it.

Talking points:
- Quote the two numbers with their uncertainties and say what the percent means: the summed
  real volume integral is determined to 1.7 percent by this single elastic data set, and the
  imaginary one to 6.9 percent. Say them separately; the real part is the sharp number.
- The comparison number is the reference: 772 against about 913. Say it as a shift, not as a
  correction, and remember the scope: one system, one energy. If someone asks whether the
  shift is the data or the prior pulling, the honest answer is that the prior sits at 915 (KD02 nominal 913) and
  the data pulled the posterior to 772, and the one-energy comparison to the reference is a
  statement about this data set, not a verdict on the reference.
- The anti-correlation is the physics content of panel (a): deuteron elastic sees mainly
  U_p + U_n, so the sum is fixed and the split is not. Do not call it the Igo ambiguity. The
  depth-radius (Igo) move is separate: depth sum 94.0 +- 3.3 against KD02 104.8 MeV, with a
  slightly smaller radius.
- Panel (b) is the contrast to hold: the imaginary centre did not move (204 against KD02 198),
  but its width shrank threefold (219 +- 40 -> 204 +- 14); 7 percent against 1.7 percent for
  the real sum.
- If asked why panel (a) sits far from the prior along the split direction when the split is
  not determined: with doubled errors the posterior slides back along the ridge toward the
  prior centre (V_v^p 34 -> 44, V_v^n 60 -> 46 MeV; J_R^p 282 -> 379, J_R^n 490 -> 398) while
  the sum stays. The location along the ridge depends on the error model and the reaction
  model; only the sum is a result.
- The hardest question (slide 5 said the data fix the surface, not the potential; how is a
  volume integral pinned to 1.7 percent?): within the Woods-Saxon family under a 3 percent
  radius prior, shared proton-neutron geometry and a five-sigma real-depth support, the
  discrete Igo families of slide 5 (depths 50 percent apart) lie outside the prior support.
  So 772 +- 13 is conditional on that geometry prior; say so. The posterior moved along the
  depth-radius ambiguity (depth sum 94.0 +- 3.3 against KD02 104.8 MeV, slightly smaller
  radius), which is the Igo direction of slide 5.
- One-sentence answer to the hardest question (slide 5 vs 1.7 percent): "Within Woods-Saxon
  under a 3 percent radius prior the discrete Igo families are outside the support, and inside
  it the data narrow the sum from 915 +- 99 to 772 +- 13."
- If asked whether 1.7 percent just reflects the 3 percent radius prior: the prior on the
  summed real integral is 915 +- 99, the posterior 772 +- 13, so the narrowing comes from the
  data, within the Woods-Saxon family and that radius prior; the location along the p-n ridge
  is not a result.
- Error rescaling is not monotone in width, and someone will notice: doubled errors give
  777 +- 9, halved 771 +- 18. With the weaker likelihood the posterior slides along the p-n
  ridge toward the prior centre, the p-n anti-correlation tightens from -0.92 to -0.97, and
  the strongly anti-correlated sum narrows as a result. Narrower here is not more
  information. With halved errors beta rises to 0.122 and the width grows.
- Prior to posterior, both from 1e5 draws of the actual prior (DREAM_project
  final_volume_integrals_v728.npz): real 915 +- 99 -> 772 +- 13 (a factor 8 narrower, and
  moved); imaginary 219 +- 40 -> 204 +- 14 (a factor 3 narrower, centre consistent with KD02
  198). 913 is the KD02 nominal sum; 915 is the prior mean of the truncated draws.
- Why a KD02 prior with Pruitt-style widths (10 percent depths, 25 percent surface depths,
  3 percent radii, 5 percent diffuseness) rather than KDUQ draws: the widths follow the KDUQ
  analysis scale, but the shared proton-neutron quantile is a deliberate modelling choice;
  sampling the geometries independently gives 764 +- 12, so the sum is not an artifact of it.
- If asked whether the 15 percent is missing physics: possibly in part. The model has no
  spins, no spin-orbit and an inert 58Ni (2+ at 1.45 MeV not coupled); the posterior is
  conditioned on that model and the error scale beta absorbs inadequacy only as independent
  noise. Say so plainly.
- Robustness, if asked: halving or doubling all assigned errors leaves both statements
  standing; sampling all twelve geometry parameters independently (18 coordinates instead of
  12) gives 764 +- 12 and 205 +- 11, widths do not grow, and the extra freedom goes into the
  proton-neutron split (anti-correlation -0.92 -> -0.94).
- Do not state anything about the proton-neutron decomposition as a result. What the data
  support is the sum.

Timing target: 1 minute 15 seconds.

Transition: the check passed and the run is the one the paper reports. Read the numbers.
-->

---

<div class="act-label">V · What DREAM gives</div>

# Limits and outlook

<style>.next-row { padding: 7px 0 !important; } .outlook-grid { margin-top: 18px !important; }</style>

<div class="outlook-grid">
<div><div class="ui-label">demonstrated</div><h2>One system.<br>One energy.<br>Elastic scattering.</h2><p>d + <sup>58</sup>Ni, with direct-solver checks in the<br>posterior region. Within this spinless,<br>inert-target model, the summed real<br>volume integral is 15% below KD02.</p><p><b>For a new system and energy:</b> ≈10<sup>3</sup> full<br>CDCC solves once, then &lt; 1 h per calibration.</p></div>
<div><div class="ui-label">what would tighten it: from experiment</div><div class="next-row"><span>01</span><div><b>Elastic where you measure transfer</b><p>Same target, same energy as the (d,p): the posterior then carries into S, and a swing like <sup>48</sup>Ca’s (0.49 vs 0.58) becomes an interval.</p></div></div><div class="next-row"><span>02</span><div><b>Quote every error</b><p>Point-by-point and normalization uncertainties. Here 60 of 64 error bars had to be assigned.</p></div></div><div class="next-row"><span>03</span><div><b>Pin the absorption</b><p>Wide angular range before smaller error bars (slide 11), several energies, σ<sub>R</sub>: absorption is the weak part here.</p></div></div></div>
</div>
<div class="takeaway">A 151-channel CDCC calibration is now practical. <b>Next: several energies and (d,p) on the same target.</b></div>

<!--
Central message: separate what has been shown from what has not, and give the audience the
honest next step.

Talking points:
- Say the scope sentence exactly once, plainly, and do not hedge it further. The audience
  will respect a stated limit more than a soft claim.
- The energies item is cheap and true: the machinery is dimension-agnostic.
- U_p + U_n: in the zero-range adiabatic (Johnson-Soper) entrance channel the deuteron sees
  the sum of the nucleon potentials at half the deuteron energy, so the combination elastic
  pins is the one ADWA uses. Finite range and the CDCC continuum make this approximate; say
  it as the reason the next step is promising, not as a result.
- The (d,p) item closes the loop with slide 3: there the extracted S moved by 17 percent when
  the potential was swapped, mostly through the deuteron-channel absorption. Be straight that
  the absorption is the less-constrained part (7 percent against 1.7, centre not shifted), so
  the interval on S may stay wide until several energies or breakup data enter. Say it as
  the next step, not as a result.
- Cost line (left): the paper's offline database is roughly 1e3 direct-solve equivalents
  (snapshots about 5e3 core-hours plus operator grids and checks); the basis is per system and
  energy. "< 1 h" is the sampling on one GPU. Item 03's "angular range" points to slide 11.
- The right column is addressed to the experimentalists in the room; say it as a request.
  Item 01 is the (d,p) step: same target and energy, so the deuteron posterior propagates
  into the transfer calculation. Item 02: EXFOR carried errors for 4 of the 64 points.
  Item 03: the imaginary sum is the weak part (7 percent against 1.7, centre not moved), and
  slide 3 showed the deuteron absorption drove the 17 percent swing in S. A reaction cross
  section constrains the absorption directly; several energies constrain its energy
  dependence. Do not promise how much each would shrink the interval; not computed.
- Theory next steps if asked: breakup observables need far higher emulator fidelity than
  elastic, and global or multi-energy fits are where the gradient is expected to pay off
  (not yet measured).
- End on the closing line without dressing it up. It is the honest state of the field.

Timing target: 1 minute 15 seconds.

Transition: thank you.
-->

---

# Thank you

<div class="closing-message">Coupled-channel models can now<br>be calibrated on your data,<br>the emulator checked against full CDCC.<br><span>Measure elastic where you measure transfer.</span></div>
<div class="closing-contact"><b>Jin Lei</b><br>jinl@tongji.edu.cn</div>
<div class="closing-credit">Tongji University · SCNT, IMP, CAS<br>Supported by NSFC 12475132 and 12535009</div>

<!--
Central message: stop, thank, and leave the contact and the support line on screen.

Talking points:
- Say the funding number, because the Chinese funding agencies expect it and it is the right
  thing to do.
- The closing lines are for the experimentalists: their elastic data, with errors quoted,
  are what this calibration consumes. Read the last line as the one request.
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
