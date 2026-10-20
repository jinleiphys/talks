<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{step?: number; height?: number}>(), {step:0,height:344})
const k = computed(() => Math.min(3, Math.max(0, props.step)))
// Analytic illustrative potential, not a calibrated optical-model result.
const curve = (depth:number,radius:number) => Array.from({length:121},(_,i)=>{const r=i/10;const u=-depth/(1+Math.exp((r-radius)/.6));return `${65+r*43},${40-u*3.5}`}).join(' ')
const base=curve(50,5)
const changed=computed(()=>curve(k.value===1?65:50,k.value>=2?6:5))
</script>
<template>
<div class="potential-demo" :style="{height:height+'px'}">
  <div>
    <div class="diagram-label">Illustrative real Woods–Saxon potential, a = 0.6 fm</div>
    <svg viewBox="0 0 640 310" aria-label="Potential against radius, changing depth or radius">
      <rect x="65" y="40" width="516" height="230" fill="none" stroke="#66655f"/>
      <g fill="#66655f" font-size="14px"><text x="47" y="45" text-anchor="end">0</text><text x="47" y="217" text-anchor="end">−50</text><text x="65" y="290">0</text><text x="320" y="290">6</text><text x="570" y="290">12</text><text x="330" y="309" text-anchor="middle">r (fm)</text><text x="18" y="155" transform="rotate(-90 18 155)" text-anchor="middle">U(r) (MeV)</text></g>
      <polyline :points="base" fill="none" stroke="#9b998f" stroke-width="3" stroke-dasharray="7 5"/>
      <polyline :points="changed" fill="none" stroke="#1b365d" stroke-width="3"/>
      <g font-size="14px"><text x="345" y="85" fill="#9b998f">Reference: V = 50 MeV, R = 5 fm</text><text x="345" y="110" fill="#1b365d">{{ k===1?'Change depth: V = 65 MeV': k>=2?'Change radius: R = 6 fm':'Reference potential' }}</text></g>
    </svg>
  </div>
  <div class="potential-note">
    <div class="ui-label">{{ k<2?'Depth parameter':'Geometry parameter' }}</div>
    <h3>{{ k<2?'Scale a fixed shape':'Move the nuclear surface' }}</h3>
    <div class="potential-formula">U(r) = −V / [1 + exp((r − R)/a)]</div>
    <p>{{ k<2?'With R and a fixed, changing V multiplies the same radial function.':'Changing R shifts the radial profile. It cannot be reproduced by scaling the original curve.' }}</p>
    <div class="operator-consequence">{{ k<2?'Operator: a coefficient multiplying a fixed matrix.':'Operator: matrix elements must follow the changing radial shape.' }}</div>
    <p v-if="k===3">The emulator must retain this dependence to differentiate the likelihood with respect to R and a.</p>
  </div>
</div>
</template>
<style scoped>
.potential-demo {display:grid;grid-template-columns:1.65fr 1fr;gap:25px;align-items:center}.potential-demo svg {width:100%;overflow:visible}.potential-note {border-left:1px solid #e0ddd2;padding-left:23px}.potential-note h3 {font-size:24px;margin:8px 0 14px}.potential-note p {font-size:15px;line-height:1.45}.potential-formula {font-family:Georgia,serif;font-size:17px;color:#1b365d;line-height:1.5}.operator-consequence {border-top:1px solid #e0ddd2;padding-top:12px;font-size:15px;color:#1b365d}
</style>
