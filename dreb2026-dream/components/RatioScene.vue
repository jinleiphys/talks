<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{step?: number; height?: number}>(), {step: 0, height: 356})
const k = computed(() => Math.min(3, Math.max(0, props.step)))
</script>

<template>
  <div class="extraction" :style="{height: height + 'px'}">
    <div class="diagram-label">Illustrative normalization at one angle, same reaction and beam energy</div>
    <div class="ratio-flow">
      <div class="quantity"><div class="ui-label">Measured cross section</div><div class="quantity-value">100 <small>μb/sr</small></div><p>Fixed experimental input</p></div>
      <div class="math-symbol">÷</div>
      <div class="quantity" :class="{active: k >= 1}"><div class="ui-label">Calculated for S = 1</div><div class="quantity-value">{{ k >= 3 ? '100' : '125' }} <small>μb/sr</small></div><p>{{ k >= 3 ? 'Optical potential B' : 'Optical potential A' }}</p></div>
      <div class="math-symbol">=</div>
      <div class="quantity result" :class="{active: k >= 2}"><div class="ui-label">Extracted normalization</div><div class="quantity-value">S = {{ k >= 3 ? '1.00' : '0.80' }}</div><p>Dimensionless</p></div>
    </div>
    <div class="normalization">dσ<sub>exp</sub>/dΩ = S × dσ<sub>calc</sub>(S = 1)/dΩ</div>
    <div class="explanation"><b>{{ ['Start with the measured cross section.', 'Compute the cross section for unit spectroscopic factor.', 'Fit the normalization S.', 'Change only the optical potential.'][k] }}</b><span>{{ ['The experiment supplies the numerator.', 'The denominator depends on the reaction model.', 'In practice, fit the angular distribution, rather than a single point.', 'The measurement stays fixed; the extracted S changes from 0.80 to 1.00.'][k] }}</span></div>
    <div class="diagram-label">S denotes a spectroscopic factor here. Numbers illustrate the dependence; they are not a calculation for this talk.</div>
  </div>
</template>

<style scoped>
.extraction {display:flex;flex-direction:column;gap:17px;padding-top:10px}
.ratio-flow {display:grid;grid-template-columns:1fr 32px 1fr 32px 1fr;align-items:center;margin-top:10px;gap:10px}
.quantity {border-top:2px solid #aaa89e;padding:16px 0;opacity:.45;transition:opacity .2s}
.quantity:first-child,.quantity.active {opacity:1}.quantity.result {border-color:#1b365d}.quantity-value {font-size:32px;color:#1b365d;white-space:nowrap;letter-spacing:-.04em}.quantity-value small {font-size:17px;color:#66655f;letter-spacing:0}.quantity p {font-size:14px;margin:8px 0 0}.math-symbol {font-size:28px;color:#66655f}.normalization {font-family:Georgia,serif;font-size:25px;text-align:center;padding:12px;background:#eeede5}.explanation {display:flex;flex-direction:column;gap:7px;font-size:16px}.explanation span {font-size:15px;color:#66655f}
</style>
