<template>
  <footer v-if="$nav.currentPage > 1 && $nav.currentPage <= 22" class="pn">{{ $nav.currentPage }} / 22</footer>
</template>
<style scoped>
.pn { position: fixed; bottom: 14px; right: 22px; z-index: 999; pointer-events: none;
  font-family: "Avenir Next", "PingFang SC", sans-serif; font-size: .7rem; letter-spacing: .1em; color: #5b6a80; }
</style>
