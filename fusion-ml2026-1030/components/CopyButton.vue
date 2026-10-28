<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ text: string, label?: string }>()
const done = ref(false)
async function copy() {
  try { await navigator.clipboard.writeText(props.text) }
  catch {
    const a = document.createElement('textarea'); a.value = props.text
    document.body.appendChild(a); a.select(); document.execCommand('copy'); document.body.removeChild(a)
  }
  done.value = true; setTimeout(() => (done.value = false), 1600)
}
</script>

<template>
  <button class="copy-btn" :class="{ done }" @click.stop="copy">{{ done ? '已复制' : (label || '复制') }}</button>
</template>

<style scoped>
.copy-btn { font: 600 14px/1 Inter, 'PingFang SC', sans-serif; color: #fff; background: #1B365D; border: 0; border-radius: 8px; padding: 9px 16px; cursor: pointer; }
.copy-btn.done { background: #4a6b3a; }
</style>
