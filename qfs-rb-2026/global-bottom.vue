<script setup>
// Page number over the main talk only: the talk ends at "Thank you", the slide before the first `backup: true`
// slide (a blank separator). Backup slides and the separator show no number.
import { computed } from 'vue'
import { useNav } from '@slidev/client'
const nav = useNav()
const firstBackup = computed(() => {
  const i = nav.slides.value.findIndex(r => r.meta?.slide?.frontmatter?.backup)
  return i < 0 ? nav.total.value + 1 : i + 1          // 1-based page number of the separator
})
const mainTotal = computed(() => firstBackup.value - 2)   // pages before "Thank you"
</script>

<template>
  <footer v-if="nav.currentPage.value <= mainTotal" class="slide-page-number">
    {{ nav.currentPage.value }} / {{ mainTotal }}
  </footer>
</template>

<style scoped>
.slide-page-number {
  position: fixed; bottom: 14px; right: 22px; z-index: 999; pointer-events: none;
  font-family: 'Inter', -apple-system, 'PingFang SC', sans-serif;
  font-weight: 500; font-size: 0.72rem; letter-spacing: 0.08em;
  color: #87867f; opacity: 0.85;
}
</style>
