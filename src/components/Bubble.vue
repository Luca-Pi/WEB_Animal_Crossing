<template>
  <div class="bubble--bg">
    <span v-if="txt" class="label">{{txt}}</span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  txt: String,
});
</script>

<style scoped>
@import "@/assets/css/bubble.css";
</style>

