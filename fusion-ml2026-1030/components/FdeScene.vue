<script setup lang="ts">
// Slide 2: the FDE site (public/fde.html, built from figures/desk/fde-scene.js with the same Colorfigures engine
// as the desk). A static picture; the audience may drag to turn it. In PDF export a still is shown (public/fde_0.png).
import { useNav } from '@slidev/client'
withDefaults(defineProps<{ height?: number }>(), { height: 250 })
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
</script>
<template>
<div class="fde-scene" :style="{ height: height + 'px' }">
<img v-if="isPrintMode" :src="`${base}fde_0.png`" class="fde-still" alt="示意：飞机把工程师派到工地，工程师用 AI 干活" />
<iframe v-else :src="`${base}fde.html?embed=1`" title="FDE 示意"></iframe>
</div>
</template>
<style scoped>
.fde-scene { display: flex; }
.fde-scene iframe, .fde-scene .fde-still { flex: 1; width: 100%; min-height: 0; border: 0; background: #f5f4ed; object-fit: contain; }
</style>
