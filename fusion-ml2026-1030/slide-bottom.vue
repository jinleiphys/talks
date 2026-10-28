<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage } = useNav()

// First slide of each part; section divider pages carry no running header.
const PARTS = [
  { start: 2, label: '为什么不只在网页里聊' },
  { start: 7, label: '我最近让它做的三件事' },
  { start: 13, label: '现场演示：一句话到实验对比' },
  { start: 19, label: '它也会错，而且错得很像对' },
  { start: 22, label: '把吃过的亏写下来' },
  { start: 27, label: '自己动手：权限与第一份任务' },
]
const part = computed(() => {
  const p = currentPage.value
  if (p < 2 || p > 30 || [6, 12, 18, 21].includes(p)) return ''
  return [...PARTS].reverse().find(x => p >= x.start)?.label ?? ''
})
</script>

<template>
  <div v-if="part" class="slide-part">{{ part }}</div>
  <footer v-if="$page <= 31 && $page > 1" class="slide-page-number">
    {{ $page }} / 31
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
