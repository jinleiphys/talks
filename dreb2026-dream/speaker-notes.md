# Speaker notes: Full Bayesian calibration of coupled-channel reaction models, by differentiable emulation

Jin Lei · DREB 2026, Shenzhen, November 2026

Extracted from `slides.md` (23 slides).

---

## 1. Title slide

**Central message:** what the talk is, in one line, before any machinery.
Say in the first sentence what calibration means here: not one best-fit potential, but the
whole range of potentials compatible with a measured angular distribution, and from it an
error bar on anything computed with them.

**Talking points:**
- This is a methods talk about how a coupled-channel reaction model gets calibrated,
  and it is deliberately framed as a physics problem rather than a statistics problem.
- Twenty minutes, one argument: the optical potentials in the denominator of every
  extraction are not fixed by the elastic data, full Bayesian calibration is the honest
  way to say what the data do determine, and it is now affordable.

**Timing target:** 20 seconds.

**Transition:** start where the audience lives, with the extraction they all perform.

---

## 2. Rare isotopes are reached through reactions

**Central message:** the big picture. The rare-isotope programme measures reactions on nuclei far
from stability, and every number it extracts goes through a reaction model whose optical
potentials were fitted near stability.

Figure explanation (Hebborn et al. 2023, Fig. 1 of the optical-potential white paper):
- Both panels are the chart of nuclides. Black: stable isotopes. Pink diamonds: the nuclei
  whose data were used to fit Koning-Delaroche.
- Left: green and yellow are the reach of FRIB reaccelerated and fast beams.
- Right: the astrophysical process paths; the r process runs far on the neutron-rich side.
- The authors' own caption: the diamonds highlight "the dramatic extrapolations made".

**Talking points:**
- Spectroscopic factors, asymptotic normalizations, neutron-capture rates for the r process:
  far from stability all of them are reaction-model outputs.
- Elastic data are scarce away from stability, so global potentials are mostly extrapolated
  there (the white paper: fitted primarily to stable nuclei).
- So the question is not only "what is the best potential" but "how wrong can it be", and
  the community white paper names Bayesian analysis as the route (outlook section). The
  BAND collaboration was set up for exactly this across nuclear physics.

**Timing target:** 1 minute 15 seconds.

**Transition:** to see why the error bar matters, look at what an extraction actually does.

---

## 3. Extracting S means normalizing a calculation

**Central message:** S is measured divided by calculated, and the calculated part carries the
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

**Transition:** one reaction at one energy; the next slide shows the published systematics across
four energies.

**Timing target:** 1 minute 30 seconds.

---

## 4. The extracted answer depends on the potential

**Central message:** one published example shows the extraction moving under the optical
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

**Talking points:**
- 48Ca is doubly magic and this is the textbook (d,p) case, so nobody in the room will
  think the target was chosen to make the point.
- The DOM series is much flatter in energy. Do not claim it is a better elastic fit or that
  dispersion alone causes the stability; the paper does not isolate that.
- Do not overclaim: this is one reaction, and the paper is about transfer. The point here
  is only that the denominator of the ratio is not pinned down.

**Timing target:** 1 minute 15 seconds.

**Transition:** so the potential is underdetermined, and the next slide says why, in physical
terms rather than statistical ones.

---

## 5. The potential is not determined by the data

**Central message:** the non-uniqueness is a property of the object, not a failure of anyone's
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
  scattering sees more of the interior. Do not claim the alpha picture holds for nucleons.

**Talking points:**
- Feshbach projection: the optical potential is what is left of a many-body problem after
  the other channels (the Q space) are projected out, so it is complex, energy dependent and
  nonlocal. Causality links the energy dependence of the real part to the imaginary part.
- Say the conclusion as physics: the data fix the surface, and an extraction that needs the
  potential elsewhere inherits the ambiguity.
- If someone points out that transfer is surface dominated, agree. The extraction still moves
  because energy dependence, nonlocality and the overlap enter beyond the elastic surface
  match. Do not claim the interior is what transfer probes.

**Timing target:** 1 minute 45 seconds.

**Transition:** so how has the field answered this? That is the next block.

---

## 6. The best-fit band holds only 11 of 16 (d,p) points

**Central message:** this is the answer to "why Bayesian". A best fit plus a chi-square error bar
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

**Talking points:**
- King et al. compared the two by counting: how many of the 16 (d,p) points fall inside each
  95% band. The chi-square best-fit band held 11, the Bayesian band all 16.
- If asked (no longer on screen): King 2018 shows the same lesson inside the chi-square world: once angle-angle correlations
  are put into the fit, (d,p) band widths at the peak go from 8.3 to 34 percent to 30 to 158
  percent (their Table VI). The naive error bar was far too narrow.
- Even the Bayesian band holds only 76 percent on one elastic set. Do not claim a posterior
  is calibrated in general.
- Only if asked how the Bayesian band is built: prior times likelihood gives the posterior; push it through the reaction
  model to get a band on the calculated cross section, hence on S.

**Timing target:** 1 minute 30 seconds.

- The takeaway is scoped to King et al.'s comparison: the band from sampled potentials covered better.
  If asked for the coverage of my own band: the noise-inclusive predictive check has not
  been computed (slide 19 notes); do not quote a number.

**Transition:** this lesson is what moved the field to Bayesian optical potentials.

---

## 7. Bayesian optical potentials: the established programme

**Central message:** the Bayesian optical-potential programme exists, works, and is the state of
the art. Give its history in the right order.

**Talking points:**
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

**Timing target:** 1 minute 30 seconds.

**Transition:** how do these analyses actually sample the posterior?

---

## 8. The recipe: a cheap model and a random walk

**Central message:** describe the sampling recipe, because the difficulties of Act III come from
exactly this recipe.

**Talking points:**
- Propose, solve, compare, accept or reject; every step is one reaction solve, and no step
  uses the slope of chi-square with respect to the parameters (the likelihood gradient). KDUQ, for example, used the affine-invariant ensemble sampler (emcee)
  for 46 parameters.
- The parameter column: nine in a single-system Woods-Saxon fit, 21 in ELM, 46 in KDUQ.
- Why it works: the forward model is a single-channel optical-model solve, which is cheap.
  Hold on to that word; Act III takes it away.

**Timing target:** 1 minute.

**Transition:** the second ingredient the field developed is the emulator.

---

## 9. Emulators make each solve cheap

**Central message:** emulators solved the cost of one evaluation. Do not raise the slope on this
slide (slides 8 and 12 own it); the gradient material below is for questions only. Gradient samplers exist where
the structure allows it (chiral EFT; a differentiable photonuclear emulator with NUTS, Walton,
Khatiwada and Kawano, PRC 114, 034621 (2026)), but the optical-potential calibrations
cited here are gradient-free. Non-affine emulators exist (Odell et al. 2024, ROSE, single-channel optical
models; Catacora-Rios et al. 2026, coupled channels; both cited on the slide), but none has been used to obtain a joint HMC
posterior for a coupled-channel reaction observable. If asked "why not their emulator?": the
new piece here is the exact gradient of the emulated posterior, built from operators exported
by an existing solver without rewriting it, plus direct-solver checks at posterior points.

**Talking points:**
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

**Timing target:** 1 minute 15 seconds.

The next slide (10) explains affine versus non-affine and names the non-affine emulators: Odell
et al. 2024 (ROSE, single-channel) and Catacora-Rios et al. 2026 (coupled channels).

**If asked where gradients are already used:** chiral NN interactions sampled with HMC
(Svensson et al. 2022-2024; couplings multiply fixed operators, so emulator derivatives are
analytic, Melendez et al. 2021) and a photonuclear emulator with NUTS (Walton et al., PRC 114,
034621 (2026)).

**Transition:** why is the emulator cheap? Because of how the parameters enter.

---

## 10. An emulator is cheapest when the parameters just multiply

**Central message:** why the emulator of the previous slide is cheap, and when it stops being cheap.
Say it with the two pictures before the formulas.

**Talking points:**
- Left: change the depth V and the curve only gets deeper; the shape is the same. In general,
  if the Hamiltonian is a fixed piece plus parameters times fixed pieces (affine), each piece is
  projected onto the n stored solutions once, offline. A new parameter set then only adds small
  n by n matrices with new weights: the cost no longer depends on the mesh size N. The chiral
  low-energy constants are the textbook case (Melendez et al. 2021).
- Right: change R and the surface moves; a changes how sharp it is. R and a sit inside the
  exponential, so there is no fixed piece to precompute: every new R or a means building the
  operator on all N mesh points and projecting it again. The saving shrinks but does not vanish:
  my CDCC emulator (PRC 113, 044610) frees all 18 Woods-Saxon parameters this way and is still
  about 220 times faster than full CDCC, but the rebuild-and-project step is its dominant online
  cost.
- An optical potential has both kinds: depths are affine, geometry is not. A calibration that
  frees only depths is cheap; one that frees geometry is not, unless the emulator handles it.
- Non-affine emulators exist: empirical interpolation (Odell et al. 2024, ROSE, single
  channel; Catacora-Rios et al. 2026, coupled channels). DREAM's own answer is on slide 14.
- If asked about derivatives: in the affine case the derivative with respect to theta_k is the
  fixed piece H_k itself, which is why HMC is routine for chiral interactions. Do not raise it
  unprompted; slides 12 and 14 own the slope.
- The curves are analytic Woods-Saxon shapes (left R = 5 fm; right R = 4, 5, 6 fm; a = 0.6 fm),
  not a fitted potential. The small matrix and the dot grid are icons, not data.

**Timing target:** 1 minute.

**Transition:** now move from one channel to coupled channels, and the recipe stops working.
Three difficulties.

---

## 11. Difficulty 1: one coupled-channel solve is expensive

**Central message:** the "cheap forward model" of the established recipe does not exist for
coupled channels.

**Talking points:**
- One converged CDCC solve of this model space: about 29 minutes on 16 cores with my own
  direct solver, roughly 7.7 core-hours per likelihood evaluation. Say "my solver" aloud: the
  number is a property of this code, not of CDCC.
- If asked "is that just slow code?": possibly, and it does not matter. The direct solver is
  not tuned (it also carries the known basis-size penalty of dropping the Bloch term). Take a
  code 10 times faster: 1e5 solves still cost about 8e4 core-hours, some nine core-years; 100
  times faster, about 8e3. A single-channel optical-model solve is milliseconds, so 1e5 of them
  take minutes. The gap is six to seven orders of magnitude; no code optimization closes it.
  Do not quote a FRESCO timing; none was measured for this model space.
- 1e5 is a floor, not an estimate: my own gradient-free ensemble run on the emulator used
  6.4e6 calls, and NUTS 6e5 gradients. The real gap is larger than the slide says.
- A gradient-free calibration is of order 1e5 evaluations; the product is of order 1e6
  core-hours. This is the paper's own cost accounting.
- So an emulator is mandatory. Plant the second half of the takeaway: an emulator that is
  wrong does not crash, it returns a smooth slightly wrong curve. That comes back in Act V.

**Timing target:** 1 minute.

**Transition:** even with a cheap emulator, the posterior itself is hard to explore.

---

## 12. Difficulty 2: change one parameter and the others must follow

**Central message:** good fits require parameters to move together, so they form a narrow, curved band;
gradients let a sampler travel along it. Say first: every point on the block is a set of potential
parameters, and the height is how badly it fits. Use "ridge" only if someone asks.
This is a schematic two-parameter density, not the 13-coordinate (18-parameter) posterior of the calculation.
The figure is live (public/hmc_ridge.html, source figures/hmc_ridge/): the block is carved to height
U = -log p, so HMC is literally a frictionless puck sliding on it. Each click runs one sampler;
the audience can drag to turn the block. Focus returns to the deck after a drag, so the arrow keys
keep advancing slides.
Click 0: each point is one set of potential parameters; height is chi^2. Good fits: the narrow, curved valley.
Click 1: random walk (Metropolis MCMC): jump in a random direction, keep or throw away depending on the change in fit. In a narrow valley most jumps hit the wall (red crosses); short jumps survive but crawl.
Click 2: HMC: roll a ball. Push it in a random direction and let it roll under "gravity"; it follows the valley floor and travels far. Rolling needs the slope of chi^2 at every step: that is why the gradient matters. It is not a minimizer: the ball has momentum, climbs as well as falls.
Click 3: NUTS decides how long to roll. Too short and the ball barely moves; too long and it swings back towards the start and the gradients are wasted. It stops each roll when the path starts to turn back (a U-turn, not reaching the bottom), then keeps one random point from it, not the lowest. Details, including why the path grows in both directions: backup slide.
**If asked why the height is chi^2 or what H is:** with Gaussian errors and a flat prior the posterior is exp(-chi^2/2), formally a Boltzmann distribution, so chi^2/2 plays the potential energy of a fictitious particle in parameter space (U-tilde, not the optical potential); H = T + U-tilde is its total energy, nearly conserved while it rolls, which is why the end point is almost always accepted. Random walk = Metropolis Monte Carlo (energies only); HMC = molecular dynamics (needs forces). If asked about the mechanics: the trajectory grows by 1, 2, 4, ... steps, forward or backward in time at random, until it turns back at both ends; a half that turns back inside itself is dropped (red dashed); one state is drawn with weight exp(-H) (multinomial NUTS). Checked: 10^5 transitions reproduce the exact means and variances to 1-2 percent.
Do not infer an efficiency ratio from this schematic or from the counters, and do not say 18 parameters are impossible for an ensemble sampler.
**Timing target:** 1 minute.

---

## 13. Difficulty 3: geometry changes every coupling

**Central message:** slide 10's non-affine problem, multiplied. In CDCC the deuteron feels the
proton and neutron potentials separately; the couplings between continuum bins are those
two potentials folded over the deuteron's internal wave functions. Change a radius or a
diffuseness and every element of every block changes.

**Talking points:**
- Left: the deuteron is a proton and a neutron; each sees its own optical potential, with its
  own radius and diffuseness. These are the parameters being calibrated.
- Right: one block of the coupling matrix for one total angular momentum J. Element ij is the
  coupling between bin i and bin j: U_p plus U_n, folded over the two bin wave functions.
  Up to 151 channels per block and one block for every J up to 30 (slide 11's model space).
- Single channel (slide 10): one radial shape to rebuild. Here: every element of every block,
  because each one folds the same R- and a-dependent potentials.
- Red line: this is why the cheap projection of slide 10 is lost. The fast model has to
  rebuild every coupling for each trial potential, and return its derivative for the sampler.

**If asked:**
- The small curves are schematic: diagonal couplings look like a potential, off-diagonal ones
  are peaked at the surface. They are not computed form factors.
- Multipoles: each coupling is a sum over multipoles q of the folded potential; the slide
  hides that layer.
- Depths are affine and would be cheap on their own; the geometry is what forces the rebuild.

**Timing target:** 1 minute.
**Transition:** so the requirements are three: cheap, differentiable, and checked against the
solver. DREAM is built to meet exactly these.

---

## 14. DREAM: one answer to each difficulty, one check for its risk

**Central message:** read the name out once (Differentiable Reduced-basis Emulator with Automatic
gradients for Markov-chain inference: a fast stand-in for full CDCC that also returns the slope).
DREAM is not a new sampler or a new emulator; it is the combination that
removes each obstacle of Act III, one row per difficulty.

**If asked how the slope is obtained:** the small model returns its own slope exactly, for about
1.2 extra forward evaluations per gradient.

**Talking points:**
- Read the table row by row, pointing back to the slide where each difficulty appeared.
- Row 1: the solver is used only offline; the full offline database costs about a thousand
  direct solves, versus about 1e5 for a gradient-free calibration on the solver.
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
- Rows follow the three difficulties in the order of slides 11 to 13; the last row is the risk the
  emulator itself brings.
- The two earlier papers: the exact solver every claim is checked against, and the reduced
  basis that made one solve 220 times cheaper. Neither returned a derivative.

**Timing target:** 1 minute 30 seconds.

**Transition:** here is the data flow, offline and online.

---

## 15. The construction

**Central message:** show explicitly what is computed offline and what happens at each sampler evaluation.
Click 0: read the two rows, offline construction and online evaluation.
Click 1: reference calculations cover parameter points and store solutions and operators.
Click 2: form the reduced basis and the parameter-dependent small operator.
Click 3: NUTS proposes theta; rebuild and solve the small system, then compute the angular distribution.
Click 4: compare prediction with measured data, add the prior, and differentiate the log posterior. The value and gradient return to NUTS.
Click 5: resolve selected posterior points with the reference solver. Compare cross sections and enrich the basis if necessary.
No ring, puck, or physical machine is intended. The diagram labels the actual mathematical objects and the validation loop.
**Timing target:** 1 minute 30 seconds.

---

## 16. What it costs, and what it buys

**Central message:** separate the two budgets. The offline budget is large and finite; the online
budget is the one that used to be hopeless.

**Talking points:**
- Give the offline number plainly. About a thousand direct-solve equivalents (728 snapshots
  over five enrichment rounds, about 5e3 core-hours, plus operator grids) is a real investment
  and the honest price of the method.
- 6e5 gradient evaluations in the production run: on the direct solver each would be a solve
  plus 12 more for finite differences (the error scale beta enters the likelihood
  analytically, so only the 12 optical coordinates need solves). That is the cost argument,
  set against slide 11.
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

**Timing target:** 1 minute.

**Transition:** an emulator is a numerical instrument. Before reading a posterior off it, check
it against the thing it replaces. The next slide is what happened the one time we were less
careful.

---

## 17. A smooth emulator error can fake a better fit

**Central message:** this is the methodological slide of the talk. A validation that is
geometrically comfortable is not a validation.

**Talking points:**
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

**Timing target:** 1 minute 15 seconds.

**Transition:** so the rule is to check where the sampler goes. Here is that check on the
production run.

---

## 18. Verify before reading the posterior

**Central message:** the verification step is part of the method, not a nicety, and the failure
mode it prevents is a silent one.

**Talking points:**
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

**Timing target:** 1 minute 15 seconds.

**Transition:** with the check in place, here is the posterior.

---

## 19. The posterior in data space

**Central message:** the posterior is best shown in data space (a postdiction on the fitted data), because that is what it is
for.

Figure explanation:
- Black points: the elastic angular distribution, with its experimental uncertainties.
- Green line: the median of the posterior predictive. Green band: its 95 percent credible
  interval.
- Dashed pink: the global reference potential the calibration starts from.
- Read the band width, not the line. Narrow through the forward minima; beyond 150 degrees
  it widens and misses a few points, and that is where the spinless model is weakest.

**Talking points:**
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

**Timing target:** 1 minute 15 seconds.

**Transition:** so which numbers did the data actually determine.

---

## 20. What the data determine

**Central message:** the posterior compresses into two well-determined numbers per target
nucleon, and everything else is a correlated ridge.

Figure explanation:
- Panel (a): the real part, proton axis against neutron axis. Contours are the 68 and 95
  percent posterior regions, the dashed ellipse is the reference prior, the star is the
  reference value, and the dotted line is a constant total.
- The posterior has moved off the prior and sits compactly, but its long axis is close to
  the constant-total direction.
- Panel (b): the imaginary part. The posterior centre sits on the prior centre; the data
  narrow the sum threefold but do not shift it.

**Talking points:**
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

**Timing target:** 1 minute 15 seconds.

**Transition:** the check passed and the run is the one the paper reports. Read the numbers.

---

## 21. Limits and outlook

**Central message:** separate what has been shown from what has not, and give the audience the
honest next step.

**Talking points:**
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
  energy. "< 1 h" is the sampling on one GPU.
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

**Timing target:** 1 minute 15 seconds.

**Transition:** thank you.

---

## 22. Thank you

**Central message:** stop, thank, and leave the contact and the support line on screen.

**Talking points:**
- Say the funding number, because the Chinese funding agencies expect it and it is the right
  thing to do.
- The closing lines are for the experimentalists: their elastic data, with errors quoted,
  are what this calibration consumes. Read the last line as the one request.
- Invite the two questions this talk is built to get: what happens at other energies, and
  what happens for breakup.

**Timing target:** 20 seconds.

**Transition:** end the talk. The backup slides are unnumbered.

---

## 23. How NUTS decides how long to roll

Backup for the question "what does the No-U-turn sampler actually do?" (slide 12, click 3).

**Talking points:**
- Plain HMC needs a roll length set by hand. Too short: the ball barely moves, a random walk
  again. Too long: it swings back towards where it started and the gradients are wasted. The
  best length is about half a swing, and that differs from place to place.
- NUTS chooses it per roll. It grows the path by doubling (1, 2, 4, 8 ... steps), each time
  forward or backward in time at random, so the path has two ends. It stops when the
  direction in which either end is growing points back toward the other end (the U-turn).
  It is not "the ball reached the bottom": it is "the path started to fold back".
- Then one point of the path is kept, drawn with weight exp(-H); since H is nearly conserved
  this is close to uniform. Keeping the lowest point would be optimization and would lose the
  width of the posterior.
- Why both directions: if the path only grew forward, the starting point would always be at
  one end, and the chain would not sample the posterior correctly (detailed balance). Growing
  both ways at random puts the start anywhere along the path.
- Every step costs one gradient; checking the U-turn costs nothing extra (positions and
  momenta only).

The picture: figures/make_nuts_backup.py, seed 2, directions backward/forward alternating,
step 0.12; U-tilde = (y - 0.9 x^2)^2 / (2 * 0.18^2) + x^2 / (2 * 0.75^2). The path stopped
after the fifth doubling (32 steps); the right end turned back. Energy spread along the path
0.10. Schematic potential, not the calculation.
