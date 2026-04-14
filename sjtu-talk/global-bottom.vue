<template>
  <footer v-if="$nav.currentPage <= 24" class="slide-page-number">
    {{ $nav.currentPage }} / 24
  </footer>
</template>

<style scoped>
.slide-page-number {
  position: fixed;
  top: 12px;
  right: 20px;
  z-index: 999;
  pointer-events: none;
  font-family: 'Patrick Hand', 'Comic Neue', cursive;
  font-size: 0.85rem;
  color: #a08060;
  opacity: 0.6;
}
</style>
