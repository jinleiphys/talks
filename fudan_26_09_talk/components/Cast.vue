<script setup>
/*
 * Terminal replay for the demo slides.
 *
 * A screen recording has its own clock: it will not wait for a question
 * from the floor, and at projector resolution the text goes soft. A cast
 * is text, so it stays sharp at any size, weighs kilobytes instead of
 * megabytes, and the presenter keeps the pacing.
 *
 * Pacing works through markers. The recording carries a marker at each
 * point worth talking over, asciinema-player pauses there, and the next
 * press of the clicker resumes it. Set `clicks:` in the slide frontmatter
 * to the number of markers so the deck allocates that many presses.
 *
 * The click count arrives as a PROP, not through useSlideContext(). This
 * deck's node_modules is a symlink, so importing @slidev/client from a
 * user component resolves a second copy of the client whose router is
 * never initialised, and the whole deck renders as a blank page with
 * "Cannot read properties of undefined (reading 'currentRoute')" thrown
 * from Slidev's own useNav. LiquidGlass.vue imports nothing but vue for
 * the same reason. Pass :clicks="$clicks" from the slide instead.
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as AsciinemaPlayer from 'asciinema-player'
import 'asciinema-player/dist/bundle/asciinema-player.css'

const props = defineProps({
  src: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  markers: { type: Array, default: () => [] },
  speed: { type: Number, default: 1.6 },
  idleTimeLimit: { type: Number, default: 1.2 },
  fontSize: { type: String, default: 'small' },
  /* The slide content box is 472 px tall. fit:'width' only constrains the
     width, so a 30-row cast renders 800 px tall and runs off the bottom;
     the height has to be pinned and the fit told to honour both axes. */
  height: { type: String, default: '430px' },
})

const host = ref(null)
let player = null

onMounted(() => {
  /* The overview and print routes render every slide at once; a player
     per thumbnail is pure cost and nobody watches a thumbnail play. */
  const route = location.pathname
  if (!host.value || route.startsWith('/overview') || route.startsWith('/print')) return
  player = AsciinemaPlayer.create(props.src, host.value, {
    autoPlay: false,
    preload: true,
    pauseOnMarkers: true,
    markers: props.markers.length ? props.markers : undefined,
    speed: props.speed,
    idleTimeLimit: props.idleTimeLimit,
    terminalFontSize: props.fontSize,
    fit: 'both',
    poster: 'npt:0:02',   /* frame 0 is an empty screen; 2 s has the prompt */
  })
})

/* Only a forward press resumes. Going back should not start playback. */
watch(() => props.clicks, (now, before) => {
  if (player && now > (before ?? 0)) player.play()
})

onBeforeUnmount(() => {
  try { player?.dispose?.() } catch { /* already torn down */ }
  player = null
})
</script>

<template>
  <div class="cast-card" :style="{ height }">
    <div ref="host" class="cast-host" />
  </div>
</template>

<style scoped>
/* The card only centres; the rounding and the shadow belong to the player
   itself, or a card wider than the terminal shows an empty frame around it. */
.cast-card { display: flex; justify-content: center; }
/* Both axes, or the flex child collapses to zero width and the player
   never appears; fit:'both' then scales the terminal inside it. */
.cast-host { width: 100%; height: 100%; }
.cast-card :deep(.ap-player) {
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 18px 44px rgba(20, 26, 43, .18);
}
.cast-card :deep(.ap-player) { border-radius: 14px; }
</style>
