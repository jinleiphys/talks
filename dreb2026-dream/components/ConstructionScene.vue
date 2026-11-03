<script setup lang="ts">
import { computed } from 'vue'
const props=withDefaults(defineProps<{step?:number;height?:number}>(),{step:0,height:368})
const k=computed(()=>Math.min(5,Math.max(0,props.step)))
const captions=[
'Build the reduced model offline; evaluate it repeatedly inside the posterior sampler.',
'Cover the prior with reference calculations. Store solutions and operator snapshots.',
'Compress the snapshots and project the coupled equations into a reduced space.',
'At each proposed parameter vector, rebuild the small operator and compute the angular distribution.',
'Compare with the measured angular distribution, then differentiate the log posterior for NUTS.',
'Re-solve selected posterior points with the full calculation; enlarge the small model if they disagree.'
]
// which card is in focus at each click (0 = none, all shown plainly)
const on=(ids:number[])=>k.value===0||ids.includes(k.value)
</script>
<template>
<div class="cs" :style="{height:height+'px'}">

<div class="lane">
  <div class="lane-tag">OFFLINE <span>once</span></div>
  <div class="row">
    <div class="card" :class="{focus:k===1,dim:!on([1])}">
      <svg class="ic" viewBox="0 0 40 40"><path d="M5 13 q5 -7 10 0 t10 0 t10 0" fill="none" stroke="#9DB2CB" stroke-width="2"/><path d="M5 21 q5 -7 10 0 t10 0 t10 0" fill="none" stroke="#5C7799" stroke-width="2"/><path d="M5 29 q5 -7 10 0 t10 0 t10 0" fill="none" stroke="#1B365D" stroke-width="2.2"/></svg>
      <div><b>Full CDCC calculations</b><span>Several hundred trial potentials; store the wave functions</span></div>
    </div>
    <svg class="arr" viewBox="0 0 24 24"><path d="M3 12 H18 M13 6 L19 12 L13 18" fill="none" stroke="#1B365D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="card" :class="{focus:k===2,dim:!on([2])}">
      <svg class="ic" viewBox="0 0 40 40"><path d="M5 7 H35 L23 21 V33 L17 30 V21 Z" fill="#E4ECF5" stroke="#1B365D" stroke-width="2" stroke-linejoin="round"/></svg>
      <div><b>Compress</b><span>Keep the shapes that matter, and the θ dependence</span></div>
    </div>
    <svg class="arr" viewBox="0 0 24 24"><path d="M3 12 H18 M13 6 L19 12 L13 18" fill="none" stroke="#1B365D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="card" :class="{focus:k===2,dim:!on([2])}">
      <svg class="ic" viewBox="0 0 40 40"><g fill="#1B365D"><rect x="8" y="8" width="7" height="7" rx="1.5" opacity=".85"/><rect x="17" y="8" width="7" height="7" rx="1.5" opacity=".45"/><rect x="26" y="8" width="7" height="7" rx="1.5" opacity=".65"/><rect x="8" y="17" width="7" height="7" rx="1.5" opacity=".45"/><rect x="17" y="17" width="7" height="7" rx="1.5" opacity=".85"/><rect x="26" y="17" width="7" height="7" rx="1.5" opacity=".45"/><rect x="8" y="26" width="7" height="7" rx="1.5" opacity=".65"/><rect x="17" y="26" width="7" height="7" rx="1.5" opacity=".45"/><rect x="26" y="26" width="7" height="7" rx="1.5" opacity=".85"/></g></svg>
      <div><b>Small model</b><span>Few unknowns, differentiable in every parameter</span></div>
    </div>
  </div>
</div>

<svg class="bridge" viewBox="0 0 900 24" preserveAspectRatio="none"><path d="M752 0 V8 Q752 12 748 12 H456 Q452 12 452 16 V23" fill="none" stroke="#1B365D" stroke-width="2.2" vector-effect="non-scaling-stroke"/></svg><svg class="bridge-head" viewBox="0 0 14 10"><path d="M1 1 L7 9 L13 1" fill="none" stroke="#1B365D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>

<div class="lane online">
  <div class="lane-tag">ONLINE <span>every sampler step</span></div>
  <div class="row">
    <div class="card" :class="{focus:k===3,dim:!on([3])}">
      <svg class="ic" viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="6" fill="#E4ECF5" stroke="#1B365D" stroke-width="2" transform="rotate(-10 20 20)"/><g fill="#1B365D"><circle cx="14" cy="15" r="2.4"/><circle cx="20" cy="20" r="2.4"/><circle cx="26" cy="25" r="2.4"/></g></svg>
      <div><b>Trial potential θ</b><span>Chosen by the sampler</span></div>
    </div>
    <svg class="arr" viewBox="0 0 24 24"><path d="M3 12 H18 M13 6 L19 12 L13 18" fill="none" stroke="#1B365D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="card" :class="{focus:k===3,dim:!on([3])}">
      <svg class="ic" viewBox="0 0 40 40"><g fill="#1B365D"><rect x="6" y="10" width="6" height="6" rx="1.2" opacity=".85"/><rect x="13" y="10" width="6" height="6" rx="1.2" opacity=".45"/><rect x="6" y="17" width="6" height="6" rx="1.2" opacity=".45"/><rect x="13" y="17" width="6" height="6" rx="1.2" opacity=".85"/></g><path d="M29 6 L23 20 H28 L25 33 L34 16 H29 Z" fill="#b07d10"/></svg>
      <div><b>Solve the small model</b><span>Milliseconds → dσ/dΩ</span></div>
    </div>
    <svg class="arr" viewBox="0 0 24 24"><path d="M3 12 H18 M13 6 L19 12 L13 18" fill="none" stroke="#1B365D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <div class="card" :class="{focus:k===4,dim:!on([4])}">
      <svg class="ic" viewBox="0 0 40 40"><path d="M5 8 C10 22 13 24 17 22 S24 26 27 27 S33 30 36 30" fill="none" stroke="#1B365D" stroke-width="2.2"/><g fill="#b53333"><circle cx="8" cy="14" r="2"/><circle cx="14" cy="22" r="2"/><circle cx="21" cy="23" r="2"/><circle cx="28" cy="28" r="2"/><circle cx="34" cy="29" r="2"/></g></svg>
      <div><b>Compare with the data</b><span>How well it fits, and which way to move θ</span></div>
    </div>
  </div>
  <svg class="loop" :class="{dim:!on([4])}" viewBox="0 0 900 30" preserveAspectRatio="none"><path d="M752 0 V10 Q752 22 740 22 H160 Q148 22 148 10 V4" fill="none" stroke="#1B365D" stroke-width="1.6" stroke-dasharray="6 4"/><path d="M143 9 L148 2 L153 9" fill="none" stroke="#1B365D" stroke-width="1.6"/></svg>
  <div class="loop-label" :class="{dim:!on([4])}">value and slope back to the sampler</div>
</div>

<div class="validate" :class="{focus:k===5,dim:!on([5])}">
  <svg class="ic sm" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="#F6E3E1" stroke="#b53333" stroke-width="2"/><path d="M13 20.5 L18 25.5 L27 15" fill="none" stroke="#b53333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <b>VALIDATE</b><span>Posterior points → full CDCC → compare cross sections → enlarge the small model if needed</span>
</div>

</div>
</template>
<style scoped>
.cs {display:flex;flex-direction:column;gap:4px;padding-top:4px}
.lane {position:relative;background:#EEF2F7;border-radius:12px;padding:19px 12px 8px}
.lane.online {background:#F3F1EA;padding-bottom:4px}
.lane-tag {position:absolute;top:4px;left:14px;font-size:10.5px;letter-spacing:.12em;font-weight:700;color:#1B365D}
.lane-tag span {letter-spacing:.02em;font-weight:400;color:#66655f;margin-left:8px;text-transform:none}
.row {display:grid;grid-template-columns:1fr 22px 1fr 22px 1fr;align-items:center;gap:6px}
.card {display:flex;gap:10px;align-items:center;background:#fff;border:1px solid #c9d3df;border-radius:10px;padding:8px 11px;min-height:62px;box-shadow:0 2px 5px rgba(27,54,93,.10);transition:opacity .25s,box-shadow .25s,border-color .25s}
.card b {display:block;font-size:15px;color:#1B365D;margin-bottom:3px}
.card span {display:block;font-size:12.5px;line-height:1.32;color:#5f5e58}
.card.focus {border:2px solid #1B365D;box-shadow:0 4px 12px rgba(27,54,93,.25)}
.dim {opacity:.38}
.ic {width:38px;height:38px;flex:none}
.ic.sm {width:28px;height:28px}
.arr {width:22px;height:22px}
.bridge {width:100%;height:14px;display:block}
.bridge-head {width:14px;height:10px;display:block;margin:-3px 0 -2px calc(50.2% - 7px)}
.loop {width:100%;height:20px;display:block;margin-top:0}
.loop path {vector-effect:non-scaling-stroke}
.loop-label {display:table;margin:-13px auto 4px;padding:0 10px;background:#F3F1EA;font-size:12px;font-style:italic;color:#1B365D;position:relative}
.validate {display:flex;gap:12px;align-items:center;margin-top:2px;padding:5px 12px;background:#fff;border:1px solid #e3c2bd;border-left:4px solid #b53333;border-radius:10px;font-size:13px;transition:opacity .25s,box-shadow .25s}
.validate b {font-size:11px;color:#b53333;letter-spacing:.1em}
.validate.focus {box-shadow:0 4px 12px rgba(181,51,51,.25)}
.caption {font-size:15px;color:#1B365D;line-height:1.35;margin-top:4px}
</style>
