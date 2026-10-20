<script setup lang="ts">
import { computed } from 'vue'
const props=withDefaults(defineProps<{step?:number;height?:number}>(),{step:0,height:322})
const k=computed(()=>Math.min(3,Math.max(0,props.step)))
// Qualitative two-parameter density: a Gaussian bent by y -> y + x^2.
const xy=(x:number,y:number)=>[300+x*115,182-y*68]
const contour=(r:number)=>Array.from({length:101},(_,i)=>{const t=2*Math.PI*i/100;const x=r*Math.cos(t);const y=.22*r*Math.sin(t)+.5*x*x-.5;return xy(x,y).join(',')}).join(' ')
const path=Array.from({length:31},(_,i)=>{const x=-1.35+i*.09;return xy(x,.5*x*x-.5+.05*Math.sin(i/3)).join(',')}).join(' ')
const start=xy(-1.35,.5*1.35**2-.5)
const rejected=[[216,79],[102,212],[254,213]]
</script>
<template>
<div class="sampling-demo" :style="{height:height+'px'}">
<div>
<div class="diagram-label">Schematic posterior in two parameter coordinates, not a fitted result</div>
<svg viewBox="0 0 600 300" aria-label="Correlated posterior with explicit parameter axes and sampler proposals">
<defs><marker id="sampling-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#1b365d"/></marker></defs>
<rect x="65" y="35" width="485" height="220" fill="none" stroke="#66655f"/>
<polygon v-for="(r,i) in [1.85,1.5,1.15,.8]" :key="r" :points="contour(r)" :fill="i===0?'#eeede5':'none'" stroke="#aaa89e" stroke-width="1.4"/>
<g fill="#66655f" font-size="15px"><text x="310" y="281" text-anchor="middle">Parameter θ₁</text><text x="23" y="150" transform="rotate(-90 23 150)" text-anchor="middle">Parameter θ₂</text><text x="305" y="58">Contours: equal posterior density</text></g>
<circle :cx="start[0]" :cy="start[1]" r="5" fill="#1b365d"/>
<text :x="start[0]-10" :y="start[1]+23" text-anchor="end" font-size="14px" fill="#1b365d">Current state</text>
<g v-if="k===1">
<g v-for="(p,i) in rejected" :key="i"><line :x1="start[0]" :y1="start[1]" :x2="p[0]" :y2="p[1]" stroke="#b53333" stroke-dasharray="4 4"/><path :d="`M${p[0]-4} ${p[1]-4}l8 8m-8 0l8 -8`" stroke="#b53333" stroke-width="2"/></g>
<text x="310" y="125" font-size="14px" fill="#b53333">Low-density proposals</text>
</g>
<g v-if="k>=2"><polyline :points="path" fill="none" stroke="#1b365d" stroke-width="3" marker-end="url(#sampling-arrow)"/><text x="280" y="154" font-size="14px" fill="#1b365d">Illustrative HMC trajectory</text></g>
</svg>
</div>
<div class="sampling-note"><div class="ui-label">{{ ['Correlated parameters','Random-walk proposals','Hamiltonian Monte Carlo','What the model must return'][k] }}</div><h3>{{ ['Many combinations fit similarly','An arbitrary step can leave the band','Use momentum and local gradients','Cross sections and derivatives'][k] }}</h3><p>{{ ['The data favor a narrow, curved region. Moving one parameter alone can spoil the fit.','Low-density proposals are often rejected. Shorter steps can improve acceptance but explore slowly.','Hamiltonian dynamics uses the gradient of the log posterior to propose longer trajectories. An acceptance check still follows.','NUTS adapts the trajectory length. It needs the log posterior and its gradient at each state.'][k] }}</p><div class="gradient-expression">∇<sub>θ</sub> log p(θ | data)</div><div class="diagram-label">Illustration of geometry, not a benchmark of sampler efficiency.</div></div>
</div>
</template>
<style scoped>
.sampling-demo {display:grid;grid-template-columns:1.65fr 1fr;gap:25px;align-items:center}.sampling-demo svg {width:100%}.sampling-note {padding-left:22px;border-left:1px solid #e0ddd2}.sampling-note h3 {font-size:23px;line-height:1.2;margin:8px 0 14px}.sampling-note p {font-size:15px;line-height:1.45}.gradient-expression {font-family:Georgia,serif;font-size:24px;color:#1b365d;margin:18px 0}
</style>
