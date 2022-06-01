<template>
  <div class="fossil" @click="goToDetailFossil(id)">
    <div class="fossil-section-image">
      <q-img :src="image" class="fossil-image" fit="scale-down" />
    </div>
    <div class="fossil-name">
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

const props = defineProps({
  id: Number,
  name: String,
  image: String,
});

async function goToDetailFossil(id: number | undefined) {
  router.push({ name: "fossil", params: { id } });
}
</script>

<style scoped>
@import "@/assets/css/cards/fossil.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cards/fossil.scss";
</style>
