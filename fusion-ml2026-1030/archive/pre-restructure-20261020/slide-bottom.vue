<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage } = useNav()

// First slide of each part; section divider pages carry no running header.
const PARTS = [
  { start: 2, label: '导言' },
  { start: 5, label: '01 · 选工具' },
  { start: 10, label: '02 · 四个日常场景' },
  { start: 23, label: '03 · 让它越用越顺手' },
  { start: 28, label: '04 · 守住底线' },
  { start: 31, label: '05 · 回去怎么开始' },
  { start: 35, label: '' },
]
const DIVIDERS = [5, 10, 23, 28, 31]

const part = computed(() => {
  const p = currentPage.value
  if (p < 2 || p > 34 || DIVIDERS.includes(p)) return ''
  return [...PARTS].reverse().find(x => p >= x.start)?.label ?? ''
})
</script>

<template>
  <div v-if="part" class="slide-part">{{ part }}</div>
  <footer v-if="$page <= 35 && $page > 1" class="slide-page-number">
    {{ $page }} / 35
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
