<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage } = useNav()

// First slide of each part; section divider pages carry no running header.
const PARTS = [
  { start: 3, label: 'WHY NOT JUST CHAT ON THE WEB' },
  { start: 7, label: 'THREE RECENT JOBS' },
  { start: 14, label: 'FUSION IN RESEARCH: A REAL CASE' },
  { start: 21, label: 'WRITING DOWN WHAT WENT WRONG' },
  { start: 26, label: 'KNOWLEDGE BASE: FROM RAG TO WIKI' },
  { start: 32, label: 'WRITING DOWN WHAT WENT WRONG' },
  { start: 34, label: 'BE THE FDE OF YOUR OWN RESEARCH' },
]
const part = computed(() => {
  const p = currentPage.value
  if (p < 3 || p > 36 || [6, 13, 20].includes(p)) return ''
  return [...PARTS].reverse().find(x => p >= x.start)?.label ?? ''
})
</script>

<template>
  <div v-if="part" class="slide-part">{{ part }}</div>
  <footer v-if="$page <= 37 && $page > 1" class="slide-page-number">
    {{ $page }} / 37
  </footer>
</template>

<style scoped>
.slide-part {
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 999;
  pointer-events: none;
  font-family: Inter, 'PingFang SC', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #2D5A8A;
  opacity: 0.75;
}
.slide-page-number {
  position: absolute;
  bottom: 14px;
  right: 24px;
  z-index: 999;
  pointer-events: none;
  font-family: Inter, 'PingFang SC', sans-serif;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #9a998f;
}
</style>
