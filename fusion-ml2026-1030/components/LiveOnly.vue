<script setup lang="ts">
// Mount the wrapped WebGL scene only while its slide is current (plus a short
// grace period for the fade), so the deck never holds more than a few contexts.
import { ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'

const active = useIsSlideActive()
const on = ref(active.value)
let timer: ReturnType<typeof setTimeout> | undefined
watch(active, (a) => {
  clearTimeout(timer)
  if (a) on.value = true
  else timer = setTimeout(() => { on.value = false }, 900)
})
</script>

<template>
  <slot v-if="on" />
</template>
