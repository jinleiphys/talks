<script setup lang="ts">
// An animated Colorfigures scene embedded from public/<name>.html (built from figures/desk/<name>-scene.js):
// slide 2 the FDE site (name="fde"), slide 8 the repository and its two remotes (name="repo").
// The audience may drag to turn it. In PDF export a still is shown (public/<name>_0.png).
import { useNav } from '@slidev/client'
withDefaults(defineProps<{ height?: number; name?: string }>(), { height: 250, name: 'fde' })
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
</script>
<template>
<div class="fde-scene" :style="{ height: height + 'px' }">
<img v-if="isPrintMode" :src="`${base}${name}_0.png`" class="fde-still" alt="示意图" />
<iframe v-else :src="`${base}${name}.html?embed=1`" title="示意图"></iframe>
</div>
</template>
<style scoped>
.fde-scene { display: flex; }
.fde-scene iframe, .fde-scene .fde-still { flex: 1; width: 100%; min-height: 0; border: 0; background: #f5f4ed; object-fit: contain; }
</style>
