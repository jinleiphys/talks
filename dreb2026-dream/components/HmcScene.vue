<script setup lang="ts">
// Interactive version of RidgeScene: the posterior ridge as a carved block, height = -log p,
// with a puck that runs random-walk, HMC and NUTS (public/hmc_ridge.html, built from
// figures/hmc_ridge/). Each click drives one sampler; the audience can also drag to turn it.
// In PDF export the live page is replaced by a still (figures/hmc_ridge/hmc_ridge_still.png).
import { computed, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
const props = withDefaults(defineProps<{ step?: number; height?: number }>(), { step: 0, height: 322 })
const k = computed(() => Math.min(3, Math.max(0, props.step)))
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
const frame = ref<HTMLIFrameElement | null>(null)
const send = () => frame.value?.contentWindow?.postMessage({ hmcStep: k.value }, '*')
watch(k, send)
</script>
<template>
<div class="sampling-demo" :style="{ height: height + 'px' }">
<div class="fig-col">
<div class="diagram-label">Schematic posterior, height = −log p(θ | data); not the fitted 18-parameter result</div>
<img v-if="isPrintMode" :src="base + 'hmc_ridge_still.png'" class="still" alt="Carved posterior ridge with random-walk, HMC and NUTS samples" />
<iframe v-else ref="frame" :src="base + 'hmc_ridge.html?embed=1'" @load="send" title="Posterior ridge sampler demo"></iframe>
</div>
<div class="sampling-note"><div class="ui-label">{{ ['Correlated parameters','Random-walk proposals','Hamiltonian Monte Carlo','No-U-turn sampler'][k] }}</div><h3>{{ ['Many combinations fit similarly','An arbitrary step can leave the band','A puck sliding on −log p','Stop when the path turns back'][k] }}</h3><p>{{ ['The data favor a narrow, curved region. Moving one parameter alone can spoil the fit.','Low-density proposals are often rejected (red crosses). Shorter steps can improve acceptance but explore slowly.','Momentum plus the local slope carry the state along the ridge. Every step needs the gradient; an acceptance check still follows.','NUTS doubles the trajectory, forward or backward in time, until it turns back, then draws one state from it. Every step needs the gradient.'][k] }}</p><div class="gradient-expression">∇<sub>θ</sub> log p(θ | data)</div><div class="diagram-label">Illustration of geometry, not a benchmark of sampler efficiency.</div></div>
</div>
</template>
<style scoped>
.sampling-demo {display:grid;grid-template-columns:1.9fr 1fr;gap:25px;align-items:center}
.fig-col {height:100%;display:flex;flex-direction:column}
.fig-col iframe, .fig-col .still {flex:1;width:100%;min-height:0;border:0;background:#f5f4ed;object-fit:contain}
.sampling-note {padding-left:22px;border-left:1px solid #e0ddd2}.sampling-note h3 {font-size:23px;line-height:1.2;margin:8px 0 14px}.sampling-note p {font-size:15px;line-height:1.45}.gradient-expression {font-family:Georgia,serif;font-size:24px;color:#1b365d;margin:18px 0}
</style>
