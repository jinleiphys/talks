<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage } = useNav()

// First slide of each part; section divider pages carry no running header.
const PARTS = [
  { start: 3, label: '为什么不只在网页里聊' },
  { start: 9, label: '我最近让它做的三件事' },
  { start: 16, label: 'FUSION 辅助科研：一个真实案例' },
  { start: 23, label: '把错误经验写下来' },
  { start: 28, label: '知识库：从 RAG 到 wiki' },
  { start: 34, label: '把错误经验写下来' },
  { start: 36, label: '给自己的课题当 FDE' },
]
const part = computed(() => {
  const p = currentPage.value
  if (p < 3 || p > 38 || [8, 15, 22].includes(p)) return ''
  return [...PARTS].reverse().find(x => p >= x.start)?.label ?? ''
})
</script>

<template>
  <div v-if="part" class="slide-part">{{ part }}</div>
  <footer v-if="$page <= 39 && $page > 1" class="slide-page-number">
    {{ $page }} / 39
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
