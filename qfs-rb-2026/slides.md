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

<div class="text-xs mt-6" style="color: var(--stone);">
NSFC 12475132 and 12535009 &nbsp;&middot;&nbsp; Fundamental Research Funds for the Central Universities
</div>

<div style="height: 7rem;"></div>

<TakayamaScene :height="290" />

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
<div class="mt-1 text-sm">N&nbsp;=&nbsp;20 and 28 dissolve, N&nbsp;=&nbsp;32 and 34 appear far from stability; knockout along <sup>36,38,40</sup>Si tracks the approach to N&nbsp;=&nbsp;28.</div>
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

# Deep removal: R<sub>s</sub> falls from 0.9 to 0.3

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
(e,e'p), transfer, (p,2p), (p,pn): no strong slope; for modest &Delta;S most lie at 40 to 70%. Only knockout on Be and C falls, analysed with <b>one reaction model</b>.
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
<div class="eqrow"><span class="ui-label">cluster</span>

$H = T_R + T_r + H_A + H_a + V_{bA} + V_{xA}$

</div>
<div class="eqnote">b, x and target with their internal states; H<sub>a</sub> = H<sub>b</sub> + H<sub>x</sub> + V<sub>bx</sub></div>
</div>

<div class="eqarrow">&darr;&ensp;exact projection: target in its ground state, b bound</div>

<div class="eqrow"><span class="ui-label">three-body</span>

$H_{\rm eff} = PHP + PHQ\,\dfrac{1}{E + i0 - QHQ}\,QHP$

</div>

<div class="eqarrow eqask">&darr;&ensp;?&ensp;assumed: U<sub>bA</sub>, U<sub>xA</sub> fitted separately, nothing else</div>

<div class="eqrow"><span class="ui-label">model</span>

$H_3^{(0)} = T_R + T_r + H_a + U_{bA} + U_{xA}$

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
This work: what the optical reduction leaves out of H<sub>eff</sub>, and which of it the trend can carry.
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
<div class="tb-what">V<sub>3N</sub>: two-pion exchange through an intermediate &Delta;, the &Delta; projected out <span class="tb-ref">Fujita, Miyazawa 1957</span></div>
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
<div class="tb-what">The same shared target excitation, <b>plus</b> the internal states of b and x: a second elimination. Its connection to <b>knockout quenching</b> had not been established.</div>
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
<div class="sg-cell sg-meas"><div class="sg-key"><b>R</b> = Q<sub>A</sub>P<sub>b</sub></div><b>b bound</b><br><span>contains the measured yield</span></div>
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

<div class="elim-note">Hartree reference, so no first-order term. &Delta;V = &Delta;v<sub>bA</sub> + &Delta;v<sub>xA</sub>, G<sub>A</sub> = (E + i0 &minus; Q<sub>A</sub>HQ<sub>A</sub>)<sup>&minus;1</sup>; all resolvents outgoing. Picture: <b>x excites</b> the target, <b>b de-excites</b> it, the cross term no U<sub>xA</sub> or U<sub>bA</sub> holds.</div>
</div>
</div>
</div>

<div class="elim-step"><span class="ui-label">2 &nbsp;excited b out</span>
<div class="elim-row">
<MiniIcon mode="elimB" :size="96" />
<div class="elim-body">

$U^{(\rm pol)} = P_b\,H^{(A)} Q_b\,\dfrac{1}{E + i0 - Q_bH^{(A)}Q_b}\,Q_b H^{(A)} P_b$

<div class="elim-note">H<sup>(A)</sup> = H<sub>3</sub><sup>(0)</sup> + U<sup>(nonadd)</sup>. Target in its ground state, b lifted to b* and back: by the <b>x-b coupling</b>, and by the target through &Delta;v<sub>bA</sub>. U<sub>bA</sub>, fitted to a free b, knows b excited by the target, <b>not by x</b>.</div>
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
Standard practice keeps H<sub>3</sub><sup>(0)</sup> and drops both. Freezing b is the <b>spectator</b> part of that step.
</div></div>


---

# Who excites the target, and who de-excites it

<div class="eqmeaning mt-1">

<div class="eqm-row">
<div class="eqm-eq">

$U^{(\rm nonadd)} = \langle\phi_A|\,\Delta V\,Q_A\,G_A\,Q_A\,\Delta V\,|\phi_A\rangle$

</div>
<div class="eqm-say"><span class="eqm-step">start</span> From the previous slide. &Delta;v<sub>iA</sub> = V<sub>iA</sub> &minus; U<sup>H</sup><sub>iA</sub>, U<sup>H</sup> the ground-state folding: &Delta;v carries <b>all</b> target excitation.</div>
</div>

<div class="eqm-row">
<div class="eqm-eq">

$U^{(\rm nonadd)} = \underbrace{U_{xx}}_{\text{N in, N out}} + \underbrace{U_{bb}}_{\text{b in, b out}} + \underbrace{U_{xb} + U_{bx}}_{\text{three-body force}}$

</div>
<div class="eqm-say"><span class="eqm-step">expand</span> U<sub>xx</sub>: N excites the target, N de-excites it. U<sub>bb</sub>: b excites, b de-excites. U<sub>xb</sub>, U<sub>bx</sub>: one excites, the other de-excites, the <b>three-body force</b>.</div>
</div>


</div>

<div class="grid grid-cols-3 gap-4 mt-3 text-center">
<div class="flex flex-col items-center"><MiniIcon mode="uxx" :size="200" /><div class="text-sm mt-1">U<sub>xx</sub>: N in, N out</div></div>
<div class="flex flex-col items-center"><MiniIcon mode="ubb" :size="200" /><div class="text-sm mt-1">U<sub>bb</sub>: b in, b out</div></div>
<div class="flex flex-col items-center"><MiniIcon mode="elimA" :size="200" /><div class="text-sm mt-1">U<sub>bx</sub>: N in, b out (three-body)</div></div>
</div>

---
clicks: 5
---

# Inside stripping, b is not frozen

<StripScene :step="$clicks" :height="260" />

<div class="takeaway mt-4" :style="{ opacity: $clicks >= 5 ? 1 : 0, transition: 'opacity 0.4s' }">
U<sub>xx</sub> looks like N on the target alone, yet inside [G<sub>A</sub>]<sub>RR</sub> <b>b is not frozen</b>.
</div>


---

# What the absorption of U<sub>xx</sub> counts

<div class="eqmeaning mt-1">

<div class="eqm-row">
<div class="eqm-eq">

$$-\mathrm{Im}\,U_{xx}\;\Rightarrow\;\sigma_{\rm str} = \underbrace{\sigma_{R}}_{\textcolor{#4a6b3a}{\text{b bound}}} + \underbrace{\sigma_{R\to D}}_{\textcolor{#b53333}{\text{b lost}}}$$

</div>
<div class="eqm-say"><span class="eqm-step">split</span> The absorption of U<sub>xx</sub> is all of stripping: N takes the target out of its ground state. That flux then <b style="color: var(--color-evidence);">stays in R</b> (b bound, measured) or <b style="color: var(--color-gap);">passes to D</b> (b lost).</div>
</div>

<div class="eqm-row" v-click>
<div class="eqm-eq">

$$\sigma_{R\to D} = -\frac{2}{\hbar v}\,\langle W_R\rangle, \qquad W_R \le 0$$

</div>
<div class="eqm-say"><span class="eqm-step">loss</span> Because b can leave R for D, [G<sub>A</sub>]<sub>RR</sub> has an absorptive part of its own, W<sub>R</sub> (U = V + iW convention), taken over the state N leaves behind in R.</div>
</div>

<div class="eqm-row" v-click>
<div class="eqm-eq">

$$W_R = W_R^{(bA)} + W_R^{(bx)} + \text{interference}$$

</div>
<div class="eqm-say"><span class="eqm-step">who</span> <b>W<sub>R</sub><sup>(bA)</sup></b>: the target breaks b, already in the eikonal as |S<sub>b</sub>|<sup>2</sup>. <b>W<sub>R</sub><sup>(bx)</sup></b>: the <b>N-b coupling</b> breaks b. Freezing b sets it to zero.</div>
</div>

<div class="eqm-row" v-click>
<div class="eqm-eq">

$$W_R^{(bx)} \;\approx\; \mathrm{Im}\,U_{N\text{-core}}(E_{N\text{-core}})$$

</div>
<div class="eqm-say"><span class="eqm-step">in practice</span> The imaginary part of the nucleon-core optical potential, at the N-core energy inside the projectile. It is the absorption in <b>Eq. (7) of Gomez-Ramos et al.</b></div>
</div>

</div>

<div v-click>
<div class="takeaway mt-4">
The spectator formula counts the b lost through the N-b coupling as survival. Gomez-Ramos et al. compute that piece.
</div>
</div>

---

# Which channel loses more of b

<OrbitalCloud :height="300" />

<div class="grid grid-cols-2 gap-8 mt-3 text-center">
<div><b style="color: var(--color-gap);">deeply bound x</b>: its orbital lies inside b, where the N-core absorption acts</div>
<div><b style="color: var(--ink-blue);">weakly bound x</b>: mostly outside b, little overlap with it</div>
</div>

<div class="takeaway mt-5">
Prediction: &langle;W<sub>R</sub><sup>(bx)</sup>&rangle; is larger in the deep channel, and <b>fades as the binding goes to zero</b>.
</div>

---

# W<sub>R</sub><sup>(bx)</sup> computed: Gomez-Ramos <i>et al.</i> 2023

<div class="grid grid-cols-12 gap-6 mt-1">
<div class="col-span-7">

<img src="./figures/gr23-fig4.png" class="kami-img" style="height: 19rem;" />

<div class="fig-caption">
Gomez-Ramos, Gomez-Camacho, Moro, PLB 847, 138284 (2023), Fig. 4. Models I, II: PACE, GEMINI return fractions set the N-core absorption.
</div>

</div>
<div class="col-span-5 pt-2">

<div class="box-idea">
<b>(a)</b> Stripping with the N-core absorption, over the standard eikonal: the <b>deep</b> channels lose most.
</div>

<div class="box-evidence mt-4">
<b>(b)</b> For their six systems, the slope of R<sub>s</sub>: &minus;0.013 &rarr; &minus;0.004 (I), &minus;0.005 (II) MeV<sup>&minus;1</sup>, <b>less than half</b>. Close to the (p,pN) trend.
</div>

<div class="box-gap mt-4">
The size rests on the N-core absorption and the compound-nucleus return.
</div>

</div>
</div>

<div style="margin-top: 0.8rem;"><div class="takeaway">
Keeping the N-b coupling during stripping, W<sub>R</sub><sup>(bx)</sup>, <b>halves the slope</b>.
</div></div>


---

# The story is not over

<div class="text-center mt-2">

$$H_{\rm eff} = H_3^{(0)} + \underbrace{U_{xx}}_{\textcolor{#4a6b3a}{W_R^{(bx)}:\ \text{GR23}}} + \underbrace{U_{bb}}_{\textcolor{#b53333}{\text{not computed}}} + \underbrace{U_{xb} + U_{bx}}_{\textcolor{#b53333}{\text{not computed}}} + \underbrace{U^{(\rm pol)}}_{\textcolor{#b53333}{\text{not computed}}}$$

</div>

<div class="nc-list mt-3">
<div class="kami-card nc-row" v-click>
<MiniIcon mode="ubb" :size="66" />
<b>U<sub>bb</sub></b>
<div>b excites the target, b de-excites it, with N still present: not the free U<sub>bA</sub>.</div>
</div>
<div class="kami-card nc-row" v-click>
<MiniIcon mode="elimA" :size="66" />
<b>U<sub>xb</sub> + U<sub>bx</sub></b>
<div>N excites the target, b de-excites it, or the reverse: the induced three-body force. In <sup>40</sup>Ca(d,p): &minus;20 to &minus;40%.</div>
</div>
<div class="kami-card nc-row" v-click>
<MiniIcon mode="elimB" :size="66" />
<b>U<sup>(pol)</sup></b>
<div>Target in its ground state; b lifted to b* and back, by N or by the target. Three things:
<div class="nc-sub"><b>a.</b> diffraction: a breaks up on the unexcited target and the N-b coupling excites b on the way out, so b is lost from the diffractive yield;</div>
<div class="nc-sub"><b>b.</b> core-first stripping: b excited first, then N strips while b de-excites;</div>
<div class="nc-sub"><b>c.</b> b* mixed into the ground state of a: a normalization, not a yield.</div>
</div>
</div>
</div>

<div v-click>
<div class="takeaway mt-4">
Gomez-Ramos et al. computed one piece of one term. The slope is settled only when the rest of H<sub>eff</sub> is in.
</div>
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

<TakayamaScene :height="320" />


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

<div class="kami-card"><b>Diagonal terms</b> (x in, x out; b in, b out) only <b>resemble</b> U<sub>xA</sub>, U<sub>bA</sub>: G<sub>A</sub> still contains the other fragment; in the leading spectator expansion each fragment meets the target at a shifted energy (Austern and Richards, Ann. Phys. 49, 309 (1968)).</div>

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

<div class="kami-card"><b>In practice</b> S<sub>b</sub>, S<sub>x</sub> come from Glauber with complex NN amplitudes, or from a fitted optical potential. These absorb part of the diagonal target-excitation physics <b>phenomenologically</b>; they are not the exact U<sub>bb</sub>, U<sub>xx</sub> of the composite.</div>

<div class="kami-card mt-4"><b>b broken by the target</b> after stripping (W<sub>R</sub><sup>(bA)</sup>) sits in the same factor under the eikonal step, identically in &sigma;<sub>surv</sub> and &sigma;<sub>sp</sub>.</div>

<div class="kami-card mt-4"><b>Order of elimination:</b> names move (U<sup>(nonadd)</sup> or U<sup>(pol)</sup>), the physics does not.</div>

</div>
</div>

---

# Backup: the grey band in Aumann <i>et al.</i> Fig. 56

<div class="mt-8 text-lg">

<div class="box-gap">
Not defined in the caption or text of Fig. 56. It spans about 0.45 to 0.72 (read from the figure), roughly the range of the (e,e'p) points in panel (a).
</div>

<div class="kami-card mt-6">
Fig. 29 of the same review uses a grey band for the mean &plusmn; 2&sigma; of (e,e'p) data, but at about 0.40 to 0.68 (read from the figure): a different band.
Aumann <i>et al.</i>, Prog. Part. Nucl. Phys. 118, 103847 (2021).
</div>

</div>


---

# Backup: a test with multi-nucleon removal

<div class="mt-6 text-lg">

<div class="box-evidence">
<b>A candidate constraint.</b> b broken by the x-b coupling leaves b &minus; 1, b &minus; 2, &hellip;: it feeds <b>multi-nucleon removal</b> of the same beam.
The yield beyond the target breaking b directly is flux the spectator formula counts as survival.
<span class="text-xs" style="color: var(--stone);">First attempt: <sup>14</sup>O on C, 60 MeV/nucleon, <sup>13</sup>O* &rarr; p + <sup>12</sup>N and 2p + <sup>11</sup>C below 7.5 MeV: upper limits 2.0(14) and 2.6(14) mb, against 16.8(12) mb for &minus;1n (scaled from 53 MeV/nucleon). Higher <sup>13</sup>O* not measured. Sun et al., PRC 93, 044607 (2016).</span>
</div>

</div>
