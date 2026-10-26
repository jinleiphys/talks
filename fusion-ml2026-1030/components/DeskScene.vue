<script setup lang="ts">
// Slides 3 and 4: the copy-paste desk (public/desk.html, built from figures/desk/ with the
// Colorfigures engine). mode="web": you carry code and errors between the chat and the terminal;
// mode="agent": the terminal reads, runs and edits the project folder itself. Each click is one
// step; the last click shows what the model can see. The audience may drag to turn the desk.
// In PDF export the live page is replaced by a still per click (public/desk_<mode>_<k>.png).
import { computed, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
const props = withDefaults(defineProps<{ mode: 'web' | 'agent'; step?: number; height?: number; cols?: string }>(), { step: 0, height: 300, cols: '1.35fr 1fr' })
const maxK = computed(() => (props.mode === 'web' ? 5 : 4))
const k = computed(() => Math.min(maxK.value, Math.max(0, props.step)))
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
const frame = ref<HTMLIFrameElement | null>(null)
const send = () => frame.value?.contentWindow?.postMessage({ desk: { mode: props.mode, k: k.value } }, '*')
watch(k, send)
</script>
<template>
<div class="desk-scene" :style="{ height: height + 'px', gridTemplateColumns: cols }">
<div class="desk-fig">
<img v-if="isPrintMode" :src="`${base}desk_${mode}_${k}.png`" class="desk-still" alt="书桌示意：网页聊天、终端和项目文件夹" />
<iframe v-else ref="frame" :src="`${base}desk.html?embed=1&mode=${mode}`" @load="send" title="书桌示意"></iframe>
</div>
<div class="desk-side"><slot :k="k" /></div>
</div>
</template>
<style scoped>
.desk-scene { display: grid; gap: 18px; align-items: center; }
.desk-fig { height: 100%; display: flex; }
.desk-fig iframe, .desk-fig .desk-still { flex: 1; width: 100%; min-height: 0; border: 0; background: #f5f4ed; object-fit: contain; }
</style>
