---
theme: seriph
title: "How much of spectroscopic quenching belongs to the reaction model?"
info: "QFS-RB 2026, Takayama. The additive optical model omits two exact terms. Putting them in gives a robust direction and a size the reaction theory cannot fix."
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
Jin Lei &nbsp;·&nbsp; Tongji University
</div>

<div class="meta mt-10">
QFS-RB 2026 &nbsp;·&nbsp; Takayama &nbsp;·&nbsp; 28 September 2026
</div>

---

# The fact everyone in this room knows

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

Knockout gives us

$$R_s=\frac{\sigma_{\rm exp}}{\sigma_{\rm th}}$$

and across the MSU systematics it falls with the separation-energy asymmetry

$$\Delta S = S_{\rm removed}-S_{\rm other}$$

<div class="box-evidence mt-6">
Roughly <b>R<sub>s</sub> = 0.61 − 0.016 ΔS</b><br>
<span style="font-size:0.85em">Tostevin and Gade, PRC 103, 054610 (2021)</span>
</div>

</div>
<div>

<div class="kami-card">

**Removing a deeply bound nucleon**<br>
(ΔS large and positive)<br>
→ R<sub>s</sub> as low as 0.3

<div class="mt-4"></div>

**Removing a weakly bound nucleon**<br>
(ΔS large and negative)<br>
→ R<sub>s</sub> close to 0.9

</div>

<div class="mt-6" style="color: var(--charcoal);">
Same reaction, same analysis, same code.<br>
Only the binding changes.
</div>

</div>
</div>

---

# Two ways to read it

<div class="grid grid-cols-2 gap-8 mt-8">
<div class="box-idea">

### Structure

Short-range and tensor correlations deplete deeply bound orbitals more.

The spectroscopic factor really is smaller.

</div>
<div class="box-gap">

### Reaction model

The calculation of $\sigma_{\rm th}$ is wrong, and wrong in a way that depends on binding.

$R_s$ is then partly an artifact.

</div>
</div>

<div class="box-idea mt-10">
Both cannot be fully right. This talk asks only the second question, and tries to answer it with a number.
</div>

---

# What the standard calculation assumes

<div class="mt-4"></div>

<div class="kami-card">

**1.** The projectile is core + nucleon. Each interacts with the target through **its own** optical potential, fitted to **free** fragments, and the two are **added**.

</div>

<div class="kami-card mt-4">

**2.** The core is only ever scattered **elastically**. It enters through one S-matrix.

</div>

<div class="kami-card mt-4">

**3.** Everything the removed nucleon can do afterwards is **summed over** (closure).

</div>

<div class="box-idea mt-8">
Every one of the three is an approximation. None of them is stated as a physics claim about the residue.
</div>

---

# What is exactly missing

<div class="mt-2"></div>

<img src="./figures/fig1_v3.png" class="kami-img" style="max-height: 62%; margin: 0 auto;" />

<div class="box-idea mt-4">
Project the target, then project the core. Two terms appear that <b>no additive model has</b>. This is an identity, not a model.
</div>

---

# But a decomposition is not an answer

<div class="mt-8"></div>

<div class="box-gap">

Writing down $U^{\rm (nonadd)}+U^{\rm (pol)}$ does not tell you the **sign** of their effect on the cross section, the **size**, or whether it depends on $\Delta S$ at all.

</div>

<div class="mt-10" style="color: var(--charcoal);">

A referee put it to me plainly:

</div>

<div class="kami-card-accent mt-4">
"What one would really need is a realistic and accurate calculation that would explicitly contain such information. If such a calculation would reproduce the quenching or rule it definitely out, the problem could be considered solved from the point of view of the reaction studies."
</div>

<div class="takeaway mt-6">
Fair. So the rest of this talk is the calculation, step by step.
</div>

---
layout: section
---

# How the number is computed

---

# The mechanism, in words

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

The removed nucleon is not taken away. It is **knocked into the continuum of the residue**, and there it can be **absorbed**.

If it is absorbed, the residue is destroyed, and the event never appears as a clean knockout.

<div class="box-idea mt-6">

Both orbitals have amplitude **inside** the residue, where the absorption is strongest and least constrained.

**The two channels sample it differently. That is a ΔS dependence.**

</div>

</div>
<div>

<div class="kami-card">
<div class="ui-label">Credit where it is due</div>

The mechanism is not mine. It is

**Gómez-Ramos, Gómez-Camacho and Moro**<br>
PLB 847, 138284 (2023)

They report it removes **60 to 70%** of the empirical slope.

</div>

<div class="kami-card mt-4">
<div class="ui-label">What I add</div>

Put it **inside the exact framework**, so everything except the nucleon-residue step cancels, and then ask what the number actually depends on.

</div>

</div>
</div>

---

# What is actually solved

<div class="mt-2"></div>

<div class="kami-card">

**Standard, unchanged.** &nbsp; The bound state $\phi_{n\ell j}(r)$ in a Woods-Saxon refitted to each separation energy, and the eikonal $S_x(b)$, $S_c(b)$ from the optical limit. Exactly what the usual analysis uses.

</div>

<div class="kami-card-accent mt-4">

**The step that is new.** &nbsp; Instead of summing over every final state of the removed nucleon, propagate it in the residue with $T+\mathrm{Re}\,U_{bx}-i\,W_{bx}$ and keep only the flux that **stays in the continuum**.

</div>

<div class="kami-card mt-4">

**The ratio.** &nbsp; $f=\sigma[\text{new}]/\sigma[\text{closure}]$, with everything above **identical in numerator and denominator**, so nothing but this one step survives the division.

</div>

<div class="box-idea mt-4">
The check: the sum over final states must equal the norm lost to absorption. It does, to <b>0.14%</b>; a solvable square-well model closes to <b>0.3%</b>.
</div>

---

# What comes out, orbital by orbital

<div class="mt-2" style="color: var(--charcoal);">
<sup>40</sup>Si on <sup>9</sup>Be at 79 MeV/nucleon. Survival fraction f for every bound orbital of the residue.
</div>

<div class="grid grid-cols-2 gap-10 mt-5">
<div>

| orbital | weight | set a | set b |
|---|---|---|---|
| **(−p)** 0d<sub>5/2</sub> | 77% | **0.306** | **0.228** |
| **(−n)** 0f<sub>7/2</sub> | 53% | 0.583 | 0.598 |
| **(−n)** 1p<sub>3/2</sub> | 12% | 0.610 | 0.612 |
| **(−n)** 0d<sub>3/2</sub> | 20% | 0.543 | 0.553 |
| **(−n)** 1s<sub>1/2</sub> | 14% | 0.575 | 0.577 |
| **(−n)** weighted | | **0.577** | **0.588** |

</div>
<div>

<div class="box-evidence">
Change the optical potential and the <b>weakly bound channel barely moves</b>: 0.577 to 0.588, under 2%.
</div>

<div class="box-gap mt-5">
The <b>deeply bound channel moves by 25%</b>: 0.306 to 0.228.
</div>

<div class="box-idea mt-5">
The ambiguity bites almost entirely on the deeply bound channel. That is exactly how it gets into the ΔS slope.
</div>

</div>
</div>

---
layout: section
---

# Result 1

## The direction is real

---

# Every reading gives the same sign

<div class="mt-6"></div>

<div class="grid grid-cols-2 gap-8">
<div>

In **every** reading of the nucleon-residue absorption we tried, the deeply bound channel is suppressed more:

<div class="eq-highlight mt-4">

$$\frac{f_{\rm deep}}{f_{\rm weak}}=0.32\ \text{to}\ 0.59$$

</div>

<div class="mt-6" style="color: var(--charcoal);">
No parameter choice reverses it. It follows from where the two orbitals sit and where the absorption is.
</div>

</div>
<div>

<div class="box-idea">

**Part of the R<sub>s</sub> trend is dynamical.**

The reaction model does own a piece of spectroscopic quenching.

</div>

<div class="mt-8" style="color: var(--olive);">
So the answer to the title is not "none".
</div>

<div class="mt-4" style="color: var(--olive);">
The interesting question is <b>how much</b>.
</div>

</div>
</div>

---
layout: section
---

# Result 2

## The size is not ours to fix

---

# Same potential paper. Two published parameter sets.

<div class="mt-4"></div>

<img src="./figures/rs-slope-m1.png" class="kami-img" style="max-height: 56%; margin: 0 auto;" />

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="box-evidence">
<b>Morillon-Romain set a</b><br>
removes <b>9%</b> of the empirical slope
</div>
<div class="box-gap">
<b>Morillon-Romain set b</b><br>
removes <b>74%</b> of the empirical slope
</div>
</div>

<div class="fig-caption mt-3">
Both sets are published in the same paper, PRC 76, 044601 (2007). Both are legitimate. Both include the proton Coulomb.
</div>

---

# Where the factor of eight comes from

<div class="mt-2"></div>

<img src="./figures/w-profile.png" class="kami-img" style="max-height: 63%; margin: 0 auto;" />

<div class="grid grid-cols-2 gap-8 mt-3">
<div style="color: var(--charcoal); font-size: 0.92em;">
One parameter carries the whole difference: the volume-absorption width, <b>B<sub>V</sub> = 68 MeV in set a, 25 MeV in set b</b>.
</div>
<div class="box-idea" style="margin-top: 0;">
They agree at the surface. They differ by 2.6 in the interior. Elastic scattering only sees the surface.
</div>
</div>

---
layout: section
---

# Result 3

## The kick energy matters

<div class="mt-8" style="color: var(--color-gap); font-weight: 500;">
Preliminary
</div>

---

# A nucleon that receives no momentum is not knocked out

<div class="grid grid-cols-2 gap-8 mt-5">
<div>

<div class="box-gap">
<div class="ui-label">The standard construction</div>

The removed nucleon is given **zero momentum** by the collision.

Its energy in the residue is then only its Fermi motion, about **21 MeV**.

Restore the real potential and it is still **94% bound**.

</div>

</div>
<div>

<div class="box-idea">
<div class="ui-label">What actually happens</div>

It was struck by a nucleon at **79 MeV**.

From measured NN phase shifts, the kick delivers

$$\langle q^2\rangle/2\mu = 40\ \text{MeV}$$

</div>

</div>
</div>

<div class="mt-5" style="color: var(--charcoal);">
And the absorption contrast between the two channels <b>falls</b> as that energy rises:
</div>

<div class="grid grid-cols-4 gap-4 mt-3">
<div class="kami-card" style="text-align:center"><div class="ui-label">E' = 10 MeV</div><b>4.9</b></div>
<div class="kami-card" style="text-align:center"><div class="ui-label">20 MeV</div><b>2.6</b></div>
<div class="kami-card" style="text-align:center"><div class="ui-label">40 MeV</div><b>1.6</b></div>
<div class="kami-card" style="text-align:center"><div class="ui-label">60 MeV</div><b>1.3</b></div>
</div>

<div class="fig-caption mt-2">
Ratio of deep-channel to weak-channel volume absorption at the same energy, from the dispersive form.
</div>

---

# Preliminary: the trend weakens further

<div class="mt-4"></div>

<img src="./figures/rs-slope-both.png" class="kami-img" style="max-height: 52%; margin: 0 auto;" />

<div class="box-gap mt-5">
<b>Preliminary.</b> One potential family, two systems, no compound-return correction, and the numbers moved once this month after an internal cross-check found an integration defect. Do not quote them yet.
</div>

<div class="mt-4" style="color: var(--olive);">
The point I want to leave is not the number. It is that an approximation nobody discusses turns out to control it.
</div>

---
layout: section
---

# Meanwhile

## Error bars on the part we can constrain

---

# If the reaction model owns a piece, it needs an error bar

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

To quote a reaction-model share honestly you need a **posterior** on the optical potential, not one fit.

That has been out of reach: a coupled-channel calculation inside an MCMC is too slow.

<div class="box-idea mt-6">

Compress the legacy operator, rebuild it so that derivatives are **exact and automatic**, and the gradient costs one extra solve.

</div>

</div>
<div>

<div class="kami-card">
<div class="ui-label">Result</div>

**18 parameters**, full Hamiltonian Monte Carlo

Under **10 minutes** on one GPU, zero divergences

<div class="mt-4"></div>

$J_R/A_T = 772 \pm 13$ MeV fm<sup>3</sup>

$J_W/A_T = 204 \pm 14$ MeV fm<sup>3</sup>

</div>

<div class="fig-caption mt-3">
d + <sup>58</sup>Ni, arXiv:2605.30980
</div>

</div>
</div>

<div class="box-idea mt-6">
This constrains what elastic data sees, to a few percent. The quenching question lives in what it does not see.
</div>

---

# The answer, as far as I can give one

<div class="mt-6"></div>

<div class="kami-card">
<div class="ui-label">Direction</div>

**Yes.** The reaction model owns part of the ΔS trend. Every reading of the absorption gives the same sign, and the mechanism is a real omission from the additive optical model.

</div>

<div class="kami-card mt-4">
<div class="ui-label">Size</div>

**Between a tenth and three quarters of the slope.** The ambiguity is one parameter of the interior absorption, and it acts almost entirely on the deeply bound channel. Preliminary work suggests the physical kick energy pushes the answer toward the low end.

</div>

<div class="kami-card-accent mt-4">
<div class="ui-label">What would narrow it</div>

The nucleon-residue absorption in the interior, at E − E<sub>F</sub> of tens of MeV. From dispersive or self-energy theory, or from an observable that is sensitive to it.

</div>

<div class="box-idea mt-6">
Which observable? That is the question I would most like to take away from this meeting.
</div>

---
layout: center
class: text-center
---

# Thank you

<div class="mt-8" style="color: var(--olive);">
jinl@tongji.edu.cn
</div>

<div class="meta mt-10">
NSFC 12475132 and 12535009 &nbsp;·&nbsp; Fundamental Research Funds for the Central Universities
</div>
