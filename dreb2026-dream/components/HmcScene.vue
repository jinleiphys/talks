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
<div class="diagram-label">Schematic: each point is a parameter set, height = χ²; not the posterior of the calculation</div>
<img v-if="isPrintMode" :src="base + 'hmc_ridge_still.png'" class="still" alt="Carved posterior ridge with random-walk, HMC and NUTS samples" />
<iframe v-else ref="frame" :src="base + 'hmc_ridge.html?embed=1'" @load="send" title="Posterior ridge sampler demo"></iframe>
</div>
<div class="sampling-note"><div class="ui-label">{{ ['The landscape','Random-walk MCMC','Hamiltonian Monte Carlo (HMC)','No-U-turn sampler (NUTS)'][k] }}</div><h3>{{ ['Height = χ²','Jump blindly','Roll a ball','It decides how long to roll'][k] }}</h3><p>{{ ['Each point is one set of potential parameters. Good fits lie in a narrow, curved valley.','Jump in a random direction. In a narrow valley most jumps land on the wall and are thrown away (red crosses).','Give the ball a push and let it roll. It follows the valley floor and travels far. Rolling needs the slope of χ² at every step.','Too short and the ball barely moves; too long and it swings back. NUTS stops each roll when the path starts to turn back, then keeps one random point from it.'][k] }}</p><div class="gradient-expression"><span style="font-size:.6em;color:#66655f">slope:</span> ∂χ²/∂θ</div></div>
</div>
</template>
<style scoped>
.sampling-demo {display:grid;grid-template-columns:1.9fr 1fr;gap:25px;align-items:center}
.fig-col {height:100%;display:flex;flex-direction:column}
.fig-col iframe, .fig-col .still {flex:1;width:100%;min-height:0;border:0;background:#f5f4ed;object-fit:contain}
.sampling-note {padding-left:22px;border-left:1px solid #e0ddd2}.sampling-note h3 {font-size:23px;line-height:1.2;margin:8px 0 14px}.sampling-note p {font-size:15px;line-height:1.45}.gradient-expression {font-family:Georgia,serif;font-size:24px;color:#1b365d;margin:18px 0}
</style>
