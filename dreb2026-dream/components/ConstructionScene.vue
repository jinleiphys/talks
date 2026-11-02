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
''
]
</script>
<template>
<div class="workflow-demo" :style="{height:height+'px'}">
<div class="workflow-offline">
<div class="workflow-title">OFFLINE <span>build outside the sampler</span></div>
<div class="offline-chain">
<div class="flow-node" :class="{focus:k===1}"><b>Full CDCC calculations</b><span>Several hundred trial potentials;<br>store the wave functions</span></div><div class="flow-arrow">→</div>
<div class="flow-node" :class="{focus:k===2}"><b>Compress</b><span>Keep the shapes that matter,<br>and the θ dependence</span></div><div class="flow-arrow">→</div>
<div class="flow-node" :class="{focus:k===2}"><b>Small model</b><span>Few unknowns, same θ dependence,<br>differentiable in every parameter</span></div>
</div>
</div>
<div class="operator-bridge">
<svg viewBox="0 0 876 28" aria-label="The offline reduced operator supplies the online reduced solve"><defs><marker id="operator-transfer" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1b365d"/></marker></defs><path d="M735 0V12H430V27" fill="none" stroke="#1b365d" stroke-width="1.5" marker-end="url(#operator-transfer)"/><text x="0" y="18" fill="#66655f" font-size="12px">ONLINE: repeat at each sampler evaluation</text></svg>
</div>
<div class="workflow-online">

<div class="online-chain">
<div class="flow-node" :class="{focus:k===3}"><b>Trial potential θ</b><span>Chosen by the sampler</span></div><div class="flow-arrow">→</div>
<div class="flow-node" :class="{focus:k===3}"><b>Solve the small model</b><span>Milliseconds → dσ/dΩ</span></div><div class="flow-arrow">→</div>
<div class="flow-node" :class="{focus:k===4}"><b>Compare with the data</b><span>Fit to data, and which way to move θ<br>Back to the sampler ↶</span></div>
</div>
</div>
<div class="workflow-validation" :class="{focus:k===5}"><b>VALIDATE</b><span>Posterior points → reference solver → compare cross sections → enrich basis if needed</span></div>
<div class="workflow-caption">{{ captions[k] }}</div>
</div>
</template>
<style scoped>
.workflow-demo {display:flex;flex-direction:column;gap:8px;padding-top:7px}.workflow-title {font-size:11px;letter-spacing:.1em;color:#1b365d;margin-bottom:8px;font-weight:600}.workflow-title span {letter-spacing:0;font-weight:400;color:#66655f;margin-left:15px}.offline-chain,.online-chain {display:grid;grid-template-columns:1fr 25px 1fr 25px 1.15fr;align-items:center;gap:8px}.flow-node {padding:12px 13px;border:1px solid #d4d1c6;min-height:72px;background:#faf9f5;transition:background .2s,border-color .2s}.flow-node b {display:block;font-size:16px;color:#1b365d;margin-bottom:6px}.flow-node span {display:block;font-size:13px;line-height:1.35;color:#66655f}.flow-node.focus {border-color:#1b365d;background:#e4ecf5}.flow-arrow {text-align:center;color:#1b365d;font-size:24px}.workflow-online {padding-top:0}.online-title {margin:0}.operator-bridge {height:28px;margin-top:-5px}.operator-bridge svg {width:100%;height:28px}.workflow-validation {padding:10px 12px;background:#eeede5;font-size:13px;display:flex;gap:15px;align-items:center}.workflow-validation b {font-size:10px;color:#b53333;letter-spacing:.08em}.workflow-validation.focus {outline:1px solid #b53333;background:#f3e6e0}.workflow-caption {font-size:15px;color:#1b365d;line-height:1.35}
</style>
