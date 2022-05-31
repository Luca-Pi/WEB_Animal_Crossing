<template>
  <div class="sea-creature" @click="goToDetailSeaCreature(id)">
    <div class="sea-creature-section-image">
      <q-img :src="image" class="sea-creature-image" fit="scale-down" />
    </div>
    <div class="sea-creature-name">
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

async function goToDetailSeaCreature(id: number | undefined) {
  router.push({ name: "sea-creature", params: { id } });
}
</script>

<style scoped>
@import "@/assets/css/cards/sea-creature.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cards/sea-creature.scss";
</style>
