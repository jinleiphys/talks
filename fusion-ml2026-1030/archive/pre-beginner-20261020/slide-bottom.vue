<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage } = useNav()

// First slide of each part; section divider pages carry no running header.
const PARTS = [
  { start: 2, label: '今天要学会什么' },
  { start: 4, label: '01 · 明确任务' },
  { start: 7, label: '02 · 执行与复现' },
  { start: 12, label: '03 · 判断证据' },
  { start: 19, label: '把方法用到其他任务' },
  { start: 24, label: '写下你的第一份任务' },
  { start: 28, label: '带走三个问题' },
]
const part = computed(() => {
  const p = currentPage.value
  if (p < 2 || p > 29) return ''
  return [...PARTS].reverse().find(x => p >= x.start)?.label ?? ''
})
</script>

<template>
  <div v-if="part" class="slide-part">{{ part }}</div>
  <footer v-if="$page <= 30 && $page > 1" class="slide-page-number">
    {{ $page }} / 30
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
