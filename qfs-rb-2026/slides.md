---
theme: seriph
title: "How much of spectroscopic quenching belongs to the reaction model?"
info: "QFS-RB 2026, Takayama. The residue is not a spectator: the effective three-body Hamiltonian names the term the spectator model drops, and the calculation of Gomez-Ramos et al. evaluates it."
author: "Jin Lei"
background: none
transition: fade
mdc: true
fonts:
  sans: 'Inter'
  serif: 'Newsreader, Source Serif 4, TsangerJinKai02, Source Han Serif SC, Songti SC, Georgia, serif'
  mono: 'JetBrains Mono, SF Mono, Consolas, monospace'
  local: 'Newsreader'
drawings:
  persist: false
layout: cover
class: text-center
---

# How much of spectroscopic quenching<br>belongs to the reaction model?

<div class="text-xl mt-6" style="color: var(--olive);">
Jin Lei
</div>

<div class="text-sm mt-2" style="color: var(--stone); line-height: 1.5;">
School of Physics Science and Engineering, Tongji University, Shanghai<br>
Southern Center for Nuclear-Science Theory, Institute of Modern Physics, CAS, Huizhou
</div>

<div class="text-base mt-7" style="color: var(--stone);">
QFS-RB 2026 &nbsp;&middot;&nbsp; Takayama
</div>

<div class="text-xs mt-16" style="color: var(--stone);">
NSFC 12475132 and 12535009 &nbsp;&middot;&nbsp; Fundamental Research Funds for the Central Universities
</div>

---

# Why single-particle structure?

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-7">

<iframe src="./nuclides/nuclides.html?embed" class="kami-img" style="width: 100%; height: 23rem; border: 0; border-radius: 6px;" loading="eager"></iframe>

<div class="fig-caption">
NUBASE2020: Kondev et al., Chin. Phys. C 45, 030001 (2021).
</div>

</div>
<div class="col-span-5 pt-1">

<div class="box-idea flex items-center gap-3" style="padding: 0.55rem 0.9rem 0.55rem 1.1rem;">
<div class="flex-1">
<b>Spectra show where shells break.</b>
<div class="mt-1 text-sm">N&nbsp;=&nbsp;20 and 28 dissolve, N&nbsp;=&nbsp;32 and 34 appear far from stability; knockout follows N&nbsp;=&nbsp;28 through <sup>36,38,40</sup>Si.</div>
</div>
<MiniIcon :size="72" mode="shells" />
</div>

<div class="box-gap mt-2 flex items-center gap-3" style="padding: 0.55rem 0.9rem 0.55rem 1.1rem;">
<div class="flex-1">
<b>They do not show the orbitals.</b>
<div class="mt-1 text-sm">An energy or a spin belongs to the whole nucleus, not to the orbital a nucleon sits in.</div>
</div>
<MiniIcon :size="72" mode="hidden" />
</div>

<div class="box-evidence mt-2 flex items-center gap-3" style="padding: 0.55rem 0.9rem 0.55rem 1.1rem;">
<div class="flex-1">
<b>Take one nucleon out.</b>
<div class="mt-1 text-sm">How often b is left in a given state measures how much of the nucleus is b plus one nucleon in an orbital.</div>
</div>
<MiniIcon :size="72" mode="remove" />
</div>

</div>
</div>

<div class="takeaway mt-1">
To see an orbital, <b>remove a nucleon from it</b>.
</div>

---

# Knockout: a probe of single-particle structure

<ExperimentScene :height="300" />

<div class="grid grid-cols-3 gap-6 mt-2">
<div class="kami-card">
<span class="ui-label">how much</span><br>
cross section &sigma; &rarr; <b>spectroscopic factor</b> C<sup>2</sup>S
</div>
<div class="kami-card">
<span class="ui-label">which orbital</span><br>
residue momentum p<sub>&#8741;</sub> &rarr; <b>orbital angular momentum</b> l
</div>
<div class="kami-card">
<span class="ui-label">which final state</span><br>
&gamma; at the target &times; b at the focal plane &rarr; <b>state of b</b>
</div>
</div>

<div class="takeaway mt-4">
&sigma;<sub>th</sub> = &Sigma; C<sup>2</sup>S &times; &sigma;<sub>sp</sub>: structure times a reaction factor, with beams of <b>a few ions per second</b>.
</div>

---

# Deeply bound nucleons look twice as quenched

<div class="grid grid-cols-12 gap-5 mt-1">
<div class="col-span-7">

<img src="./figures/rs-systematics-trend.png" class="kami-img" style="height: 19rem;" />

<div class="fig-caption">
Heavy-ion knockout. Tostevin and Gade, PRC 103, 054610 (2021). R<sub>s</sub> = &sigma;<sub>exp</sub> / &sigma;<sub>th</sub>.
</div>

<div class="flex items-center justify-center gap-8 mt-1">
<div class="flex items-center gap-1">
<MiniIcon mode="weak" :size="44" />
<div class="text-sm" style="white-space: nowrap;">weak, &Delta;S = &minus;18: <b>R<sub>s</sub> &asymp; 0.9</b></div>
</div>
<div class="flex items-center gap-1">
<MiniIcon mode="deep" :size="44" />
<div class="text-sm" style="white-space: nowrap;">deep, &Delta;S = +18: <b>R<sub>s</sub> &asymp; 0.3</b></div>
</div>
</div>

</div>
<div class="col-span-5">

<div class="ui-label">the other probes</div>
<img src="./figures/aumann2021-fig56abc.png" class="kami-img mt-1" style="height: 14rem; background: #fff;" />
<div class="fig-caption">
Aumann et al., PPNP 118, 103847 (2021), Fig. 56(a) to (c).
</div>

<div class="box-gap text-base mt-2">
(e,e'p), transfer, (p,2p): <b>flat</b> at 40 to 70%. Only knockout on Be and C falls, analysed with <b>one reaction model</b>.
</div>

</div>
</div>

<div class="takeaway mt-2">
Is this <b>structure</b>, or is it the <b>reaction model</b>?
</div>


---

# What the reaction model assumes

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-7 eqchain">

<div class="eqgroup">
<div class="eqrow"><span class="ui-label">many-body</span>

$H = T_R + T_r + H_A + H_a + V_{bA} + V_{xA}$

</div>
<div class="eqnote">every nucleon; H<sub>a</sub> = H<sub>b</sub> + V<sub>bx</sub> keeps the internal states of b</div>
</div>

<div class="eqarrow">&darr;&ensp;exact projection: target in its ground state, b bound</div>

<div class="eqrow"><span class="ui-label">three-body</span>

$H_{\rm eff} = PHP + PHQ\,\dfrac{1}{E - QHQ}\,QHP$

</div>

<div class="eqarrow eqask">&darr;&ensp;?&ensp;assumed: U<sub>bA</sub>, U<sub>xA</sub> fitted separately, nothing else</div>

<div class="eqrow"><span class="ui-label">model</span>

$H_3^{(0)} = T_R + T_r + V_{bx} + U_{bA} + U_{xA}$

</div>

<div class="eqarrow">&darr;&ensp;eikonal, sudden: straight lines, b a spectator</div>

<div class="eqgroup">
<div class="eqrow"><span class="ui-label">eikonal</span>

$\sigma_{\rm str} = \int d^2b\,\langle\phi|\,|S_b|^2(1-|S_x|^2)\,|\phi\rangle$

</div>
<div class="eqrow"><span class="ui-label"></span>

$\sigma_{\rm th} = \sum C^2S\,\sigma_{sp}$

</div>
</div>

</div>
<div class="col-span-5">

<KnockoutScene mode="spectator" :height="230" />

<div class="box-gap mt-3">
Every &sigma;<sub>sp</sub> behind the systematics takes <b>H<sub>eff</sub> = H<sub>3</sub><sup>(0)</sup></b>. Does it hold?
</div>

</div>
</div>

<div style="margin-top: 1.6rem;"><div class="takeaway">
This work: what the optical reduction leaves out of H<sub>eff</sub>, and how much of the trend it carries.
</div></div>


---

# Where three-body forces come from

<div class="tb-ladder mt-2">

<div class="kami-card tb-row">
<MiniIcon mode="nnp" :size="104" />
<div class="tb-sys"><span class="ui-label">three nucleons</span><br><b>n + n + p</b></div>
<div class="tb-ham">

$H = T + \sum V_{NN} + V_{3N}$

</div>
<div class="tb-what">V<sub>3N</sub>: &Delta; and pion excitations projected out <span class="tb-ref">Fujita, Miyazawa 1957</span></div>
</div>

<div class="kami-card tb-row">
<MiniIcon mode="dA" :size="104" />
<div class="tb-sys"><span class="ui-label">deuteron + target</span><br><b>n + p + A</b></div>
<div class="tb-ham">

$H = T + V_{np} + U_{nA} + U_{pA} + V_{3B}$

</div>
<div class="tb-what">U<sub>nA</sub>, U<sub>pA</sub>: the target excited by <b>one</b> nucleon. V<sub>3B</sub>: one excites it, <b>the other</b> de-excites it. <sup>40</sup>Ca(d,p): &minus;20 to &minus;40% <span class="tb-ref">Austern, Richards 1968; Polyzou, Redish 1979; Johnson, Timofeyuk 2014; Dinmore et al. 2019</span></div>
</div>

<div class="kami-card-accent tb-row">
<MiniIcon mode="bxA" :size="104" />
<div class="tb-sys"><span class="ui-label">composite + target</span><br><b>b + x + A</b></div>
<div class="tb-ham">

$H = H_3^{(0)} + \;?$

</div>
<div class="tb-what">The same shared target excitation, <b>plus</b> the internal states of b and x: a second elimination. <b>Not derived before this work.</b></div>
</div>

</div>


<div style="margin-top: 0.9rem;"><div class="takeaway">
Knockout is the <b>x = N</b> limit: only b&rsquo;s internal states are projected out, yet the fitted U<sub>bA</sub>, U<sub>xA</sub> keep none of it.
</div></div>

---

# What H<sub>eff</sub> is: two eliminations

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-5">

<div class="sector-grid">
<div></div>
<div class="sg-head">b bound &nbsp;P<sub>b</sub></div>
<div class="sg-head">b excited or broken &nbsp;Q<sub>b</sub></div>
<div class="sg-side"><div>target g.s.<br>P<sub>A</sub></div></div>
<div class="sg-cell sg-p"><div class="sg-key"><b>P</b> = P<sub>A</sub>P<sub>b</sub></div>model space<br><span>elastic, diffraction</span></div>
<div class="sg-cell"><div class="sg-key"><b>C</b> = P<sub>A</sub>Q<sub>b</sub></div>b excited<br><span>&rarr; U<sup>(pol)</sup></span></div>
<div class="sg-side"><div>target excited<br>Q<sub>A</sub><br><b style="color: var(--near-black);">stripping</b></div></div>
<div class="sg-cell sg-meas"><div class="sg-key"><b>R</b> = Q<sub>A</sub>P<sub>b</sub></div><b>b bound</b><br><span>measured</span></div>
<div class="sg-cell sg-lost"><div class="sg-key"><b>D</b> = Q<sub>A</sub>Q<sub>b</sub></div><b>b lost</b><br><span>&rarr; G<sub>A</sub> of U<sup>(nonadd)</sup></span></div>
</div>

<div class="text-sm mt-3" style="color: var(--stone); line-height: 1.5;">
R, C, D are eliminated exactly. The spectator model counts <b>both</b> R and D:
</div>

<OutcomeScene :width="350" :height="110" />

</div>
<div class="col-span-7 elim">

<div class="elim-step"><span class="ui-label">1 &nbsp;target excitation out</span>
<div class="elim-row">
<MiniIcon mode="elimA" :size="96" />
<div class="elim-body">

$U^{(\rm nonadd)} = \langle\phi_A|\,\Delta V\,Q_A\,G_A\,Q_A\,\Delta V\,|\phi_A\rangle$

<div class="elim-note">&Delta;V = &Delta;v<sub>bA</sub> + &Delta;v<sub>xA</sub>, G<sub>A</sub> = (E &minus; Q<sub>A</sub>HQ<sub>A</sub>)<sup>&minus;1</sup>. Picture: <b>x excites</b> the target, <b>b de-excites</b> it, the cross term no U<sub>xA</sub> or U<sub>bA</sub> holds.</div>
</div>
</div>
</div>

<div class="elim-step"><span class="ui-label">2 &nbsp;excited b out</span>
<div class="elim-row">
<MiniIcon mode="elimB" :size="96" />
<div class="elim-body">

$U^{(\rm pol)} = P_b\,H^{(A)} Q_b\,\dfrac{1}{E - Q_bH^{(A)}Q_b}\,Q_b H^{(A)} P_b$

<div class="elim-note">H<sup>(A)</sup> = H<sub>3</sub><sup>(0)</sup> + U<sup>(nonadd)</sup>. Target in its ground state, the <b>x-b coupling</b> lifts b to b* and back. U<sub>bA</sub>, fitted to a free b, knows b excited by the target, <b>not by x</b>.</div>
</div>
</div>
</div>

<div class="elim-result">

$H_{\rm eff} = H_3^{(0)} + U^{(\rm nonadd)} + U^{(\rm pol)}$

<div class="elim-note">exact for the cluster Hamiltonian; no single term's absorption is the measured yield</div>
</div>

</div>
</div>

<div style="margin-top: 1.2rem;"><div class="takeaway">
Standard practice keeps H<sub>3</sub><sup>(0)</sup> and deletes both. That deletion <b>is</b> the spectator assumption.
</div></div>


---

# What happens to b during stripping

<div class="eqmeaning mt-1">

<div class="eqm-row">
<div class="eqm-eq">

$U^{(\rm nonadd)} = \langle\phi_A|\,\Delta V\,Q_A\,G_A\,Q_A\,\Delta V\,|\phi_A\rangle$

</div>
<div class="eqm-say"><span class="eqm-step">start</span> The term of H<sub>eff</sub> from the previous slide. Reference: U<sup>H</sup>, folding over the target and b ground states, absorption-free. &Delta;v<sub>iA</sub> = V<sub>iA</sub> &minus; U<sup>H</sup><sub>iA</sub> carries <b>all</b> coupling to target excitation.</div>
</div>

<div class="eqm-row">
<div class="eqm-eq">

$U^{(\rm nonadd)} = \underbrace{U_{xx}}_{\text{N in, N out}} + \underbrace{U_{bb}}_{\text{b in, b out}} + \underbrace{U_{xb} + U_{bx}}_{\text{three-body force}}$

</div>
<div class="eqm-say"><span class="eqm-step">expand</span> U<sub>xx</sub>: N excites the target, N de-excites it. U<sub>bb</sub>: b excites, b de-excites. U<sub>xb</sub>, U<sub>bx</sub>: one excites, the other de-excites, the <b>three-body force</b>.</div>
</div>

<div class="eqm-row">
<div class="eqm-eq">

$U_{xx} = P\,\Delta v_{xA}\,R\,[G_A]_{RR}\,R\,\Delta v_{xA}\,P$

</div>
<div class="eqm-say"><span class="eqm-step">split</span> Q<sub>A</sub> = R + D, the target-excited row of the table. &Delta;v<sub>xA</sub> does not touch b, so N enters and leaves through R.</div>
</div>

<div class="eqm-row">
<div class="eqm-eq">

$[G_A]_{RR} = \big(E - RHR - U_R^{(D)}\big)^{-1}$

</div>
<div class="eqm-say"><span class="eqm-step">fold</span> G<sub>A</sub> still contains D. Folding D back into R is the same Feshbach step, one level down: <b>b is not frozen</b> while the target is excited.</div>
</div>

<div class="eqm-row">
<div class="eqm-eq">

$U_R^{(D)} = RHD\,\dfrac{1}{E - DHD}\,DHR$

</div>
<div class="eqm-say"><span class="eqm-step">meaning</span> b leaves its bound state into D and comes back. Exact at the cluster level.</div>
</div>

<div class="eqm-row">
<div class="eqm-eq">

$-\mathrm{Im}\,U_{xx} = \text{flux in } R + \langle\psi_R|W_R^{(bA)} + W_R^{(bx)}|\psi_R\rangle$

</div>
<div class="eqm-say"><span class="eqm-step">count</span> All stripping = <b style="color: var(--color-evidence);">b bound</b> (measured) + <b style="color: var(--color-gap);">b lost</b>: broken by the target (standard, the same in &sigma;<sub>surv</sub> and &sigma;<sub>sp</sub>) or by the <b>N-b coupling</b> (new).</div>
</div>

</div>

<div style="margin-top: 0.7rem;"><div class="takeaway">
The spectator model freezes b (V<sub>bx</sub> &rarr; P<sub>b</sub>V<sub>bx</sub>P<sub>b</sub>): W<sub>R</sub><sup>(bx)</sup> = 0 and every b is counted. <b>W<sub>R</sub><sup>(bx)</sup></b> is the one new term.
</div></div>



---

# Where "b excited or broken" sits in H<sub>eff</sub>

<div class="text-center text-lg mt-1" style="color: var(--stone);">It depends on what the <b>target</b> is doing at that moment.</div>

<div class="grid grid-cols-2 gap-6 mt-4">
<div class="kami-card-accent">
<div class="ui-label">target excited (after stripping)</div>
<div class="mt-2">b broken there is the sector D = Q<sub>A</sub>Q<sub>b</sub>. Eliminating the target first, it is integrated out <b>inside G<sub>A</sub> of U<sup>(nonadd)</sup></b>, together with Q<sub>A</sub>.</div>
<div class="mt-3"><b>The new term:</b> W<sub>R</sub><sup>(bx)</sup> in the N-target term.</div>
</div>
<div class="kami-card-accent">
<div class="ui-label">target in its ground state</div>
<div class="mt-2">b excited there is the sector C = P<sub>A</sub>Q<sub>b</sub>: this is <b>U<sup>(pol)</sup></b>. It holds three things:</div>
<div class="mt-2 text-sm">
<b>a.</b> b broken in diffraction: the same N-b coupling, target in its ground state.<br>
<b>b.</b> core-first stripping (b excited, then the target): dropped by the sudden target, in both &sigma;<sub>surv</sub> and &sigma;<sub>sp</sub>.<br>
<b>c.</b> b* admixed in the projectile: a normalization, not a yield.
</div>
</div>
</div>

<div class="grid grid-cols-2 gap-6 mt-4 text-sm">
<div class="kami-card" style="padding: 0.6rem 1rem;"><b>U<sup>(nonadd)</sup>, U<sub>bb</sub>:</b> b excites the target, b de-excites it. The same in &sigma;<sub>surv</sub> and &sigma;<sub>sp</sub>.</div>
<div class="kami-card" style="padding: 0.6rem 1rem;"><b>U<sup>(nonadd)</sup>, U<sub>xb</sub> + U<sub>bx</sub>:</b> N excites the target, b de-excites it, or the reverse: the induced three-body force of slide 6.</div>
</div>

<div style="margin-top: 1.0rem;"><div class="takeaway">
The direct sequence, strip first and then break b, never passes through C: it is in U<sup>(nonadd)</sup>, not U<sup>(pol)</sup>.
</div></div>


---

# What decides how much b is disturbed: where x sits

<OrbitalCloud :height="300" />

<div class="grid grid-cols-2 gap-8 mt-3 text-center">
<div><b style="color: var(--color-gap);">deeply bound x</b>: lives inside b, strongly coupled to it</div>
<div><b style="color: var(--ink-blue);">weakly bound x</b>: lives outside b, b nearly a spectator</div>
</div>

<div class="takeaway mt-5">
Prediction: the deep channel loses more of b, and the effect <b>fades as the binding goes to zero</b>.
</div>

---

# The term evaluated: Gomez-Ramos <i>et al.</i> 2023

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-7">

<img src="./figures/gr23-fig4.png" class="kami-img" style="height: 19rem;" />

<div class="fig-caption">
Gomez-Ramos, Gomez-Camacho, Moro, PLB 847, 138284 (2023), Fig. 4. Models I, II: return from PACE, GEMINI.
</div>

</div>
<div class="col-span-5 pt-2">

<div class="box-idea">
<b>(a)</b> Stripping with the N-core absorption, over the standard eikonal: the <b>deep</b> channels lose most.
</div>

<div class="box-evidence mt-4">
<b>(b)</b> The slope of R<sub>s</sub>: &minus;0.013 &rarr; &minus;0.004 (I), &minus;0.005 (II) MeV<sup>&minus;1</sup>, <b>less than half</b>. Close to the (p,pN) trend.
</div>

<div class="box-gap mt-4">
The size rests on the N-core absorption and the compound-nucleus return.
</div>

</div>
</div>

<div style="margin-top: 0.8rem;"><div class="takeaway">
In H<sub>eff</sub>, this is W<sub>R</sub><sup>(bx)</sup>: the non-spectator dynamics of b, evaluated.
</div></div>

---

# What is open

<div class="grid grid-cols-2 gap-8 mt-8">
<div class="kami-card">
<span class="tag">1</span> <b class="ml-2">The return from the framework</b>
<div class="mt-2 text-sm">Flux that leaves bound b and comes back is a D &rarr; R path. Compute it instead of borrowing a decay code.</div>
</div>
<div class="kami-card">
<span class="tag">2</span> <b class="ml-2">Diffraction</b>
<div class="mt-2 text-sm">The same N-b coupling with the target in its ground state, in U<sup>(pol)</sup>.</div>
</div>
<div class="kami-card">
<span class="tag">3</span> <b class="ml-2">Beam energy</b>
<div class="mt-2 text-sm">The trend is the same from 80 MeV/nucleon to 1.6 GeV/nucleon; the correction must be too.</div>
</div>
<div class="kami-card">
<span class="tag">4</span> <b class="ml-2">The real N-b interaction</b>
<div class="mt-2 text-sm">Dropped in the published calculation.</div>
</div>
</div>

<div class="box-evidence mt-5">
<b>A direct test.</b> b broken by the x-b coupling leaves b &minus; 1, b &minus; 2, &hellip;: it feeds <b>multi-nucleon removal</b> of the same beam.
The yield beyond the target breaking b directly is the flux the spectator formula counts as survival.
<span class="text-xs" style="color: var(--stone);">First attempt: <sup>14</sup>O on C, 60 MeV/nucleon, <sup>13</sup>O* &rarr; p + <sup>12</sup>N and 2p + <sup>11</sup>C below 7.5 MeV: &lt; 4.6(20) mb, against 16.8 mb for &minus;1n. Higher <sup>13</sup>O* not measured. Sun et al., PRC 93, 044607 (2016).</span>
</div>

---

# Summary

<div class="mt-8">

<div class="box-idea">
<b>1.</b> The quenching systematics rests on treating the residue as a <b>spectator</b>. Inside a composite projectile it is not.
</div>

<div class="box-evidence mt-5">
<b>2.</b> H<sub>eff</sub> names what the spectator model drops: the <b>N-b coupling during stripping</b>, W<sub>R</sub><sup>(bx)</sup>, from the same elimination that gives the induced three-body force in d + A.
</div>

<div class="box-gap mt-5">
<b>3.</b> Evaluated by Gomez-Ramos <i>et al.</i>, it suppresses <b>deeply bound</b> removal more and halves the slope; its size rests on the N-b absorption and the compound-nucleus return.
</div>

</div>

---
layout: center
class: text-center
---

# Thank you

<div class="mt-8 text-lg" style="color: var(--stone);">
Jin Lei &nbsp;&middot;&nbsp; Tongji University &nbsp;&middot;&nbsp; jinl@tongji.edu.cn
</div>


---
backup: true
---


---

# Backup: isn't this already in the optical potential?

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

$U^{(\rm nonadd)} = \langle\phi_A|\,\Delta V\,Q_A\,G_A\,Q_A\,\Delta V\,|\phi_A\rangle$

$\Delta V = \Delta v_{bA} + \Delta v_{xA}$

<div class="box-idea mt-4">
U<sub>xA</sub> projects out the target excitations of <b>x alone</b>. With two fragments on one target, the projection gives the four terms above.
</div>

</div>
<div>

<div class="kami-card"><b>Diagonal terms</b> (x in, x out; b in, b out) only <b>resemble</b> U<sub>xA</sub>, U<sub>bA</sub>: G<sub>A</sub> still contains the other fragment, so each fragment meets the target at a shifted energy (Austern and Richards, Ann. Phys. 49, 309 (1968)).</div>

<div class="kami-card mt-4"><b>Cross terms</b> (x in, b out and the reverse) are in <b>neither</b> potential: the induced three-body force, established for d + A (Johnson and Timofeyuk, PRC 89, 024605 (2014); Dinmore <i>et al.</i>, PRC 99, 064612 (2019)).</div>

</div>
</div>

---

# Backup: where do S<sub>b</sub> and S<sub>x</sub> come from?

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

$$\langle\phi_\xi|\langle\phi_A|\,V_{\xi A}\,|\phi_A\rangle|\phi_\xi\rangle = U^{\rm H}_{\xi A}$$

<div class="box-idea">
<b>Reference potential:</b> Hartree folding over the target and fragment ground states.
Real and absorption-free: &Delta;v carries <b>all</b> coupling to target excitation.
</div>

<div class="mt-4">With U<sup>H</sup> alone, |S<sub>b</sub>| = |S<sub>x</sub>| = 1. All target-excitation absorption sits in U<sup>(nonadd)</sup>.</div>

</div>
<div>

<div class="kami-card"><b>In practice</b> S<sub>b</sub>, S<sub>x</sub> come from Glauber with complex NN amplitudes, or from a fitted optical potential: U<sup>H</sup> plus the <b>free-fragment</b> U<sub>bb</sub>, U<sub>xx</sub>.</div>

<div class="kami-card mt-4"><b>b broken by the target</b> after stripping (W<sub>R</sub><sup>(bA)</sup>) sits in the same factor under the eikonal step, identically in &sigma;<sub>surv</sub> and &sigma;<sub>sp</sub>.</div>

<div class="kami-card mt-4"><b>Order of elimination:</b> names move (U<sup>(nonadd)</sup> or U<sup>(pol)</sup>), the physics does not.</div>

</div>
</div>

---

# Backup: the grey band in Aumann <i>et al.</i> Fig. 56

<div class="mt-8 text-lg">

<div class="box-gap">
Not defined in the caption or text of Fig. 56. It spans about 0.45 to 0.72, roughly the range of the (e,e'p) points in panel (a).
</div>

<div class="kami-card mt-6">
Fig. 29 of the same review uses a grey band for the mean &plusmn; 2&sigma; of (e,e'p) data, but at 0.40 to 0.68: a different band.
Aumann <i>et al.</i>, Prog. Part. Nucl. Phys. 118, 103847 (2021).
</div>

</div>
