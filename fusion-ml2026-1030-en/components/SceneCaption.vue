<script setup lang="ts">
export type Beat = { title: string; text: string; verdict: string; tone?: 'ok' | 'bad' }
defineProps<{ beats: Beat[]; index: number }>()
</script>

<template>
  <div class="scene-caption">
    <div class="scene-step">点击继续 · {{ index + 1 }} / {{ beats.length }}</div>
    <Transition name="cap" mode="out-in">
      <div :key="index">
        <h3>{{ beats[index].title }}</h3>
        <p>{{ beats[index].text }}</p>
        <div class="scene-verdict" :class="beats[index].tone">{{ beats[index].verdict }}</div>
      </div>
    </Transition>
    <div class="scene-beats"><span v-for="(_, i) in beats" :key="i" :class="{ on: i <= index }" /></div>
  </div>
</template>

<style scoped>
.scene-caption { display: flex; flex-direction: column; justify-content: center; padding-left: 22px; border-left: 1px solid #dedbcf; }
.scene-step { font: 600 11px Inter, 'PingFang SC', sans-serif; letter-spacing: .14em; color: #2D5A8A; margin-bottom: 12px; }
h3 { font-family: 'Songti SC', serif; font-weight: 700; font-size: 22px; line-height: 1.3; margin: 0 0 10px; color: #1d1c1a; }
p { font-family: 'PingFang SC', sans-serif; font-size: 16px; line-height: 1.6; margin: 0 0 12px; color: #3d3d3a; }
.scene-verdict { font-family: 'Songti SC', serif; font-weight: 700; font-size: 17px; line-height: 1.45; color: #1B365D; padding: 8px 12px; background: #e6ecf3; border-radius: 6px; }
.scene-verdict.bad { color: #a83a32; background: #f6ebe6; }
.scene-verdict.ok { color: #48683a; background: #ecefe0; }
.scene-beats { display: flex; gap: 6px; margin-top: 16px; }
.scene-beats span { flex: 1; height: 3px; border-radius: 2px; background: #dedbcf; transition: background .4s; }
.scene-beats span.on { background: #1B365D; }
.cap-enter-active, .cap-leave-active { transition: opacity .25s, transform .25s; }
.cap-enter-from { opacity: 0; transform: translateY(6px); }
.cap-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
