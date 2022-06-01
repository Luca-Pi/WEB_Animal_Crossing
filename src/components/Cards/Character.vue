<template>
  <div class="character" @click="goToDetailCharacter(id)">
    <div class="character-section-image">
      <q-img :src="image" class="character-image" fit="scale-down" />
    </div>
    <div class="character-name">
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

async function goToDetailCharacter(id: number | undefined) {
  router.push({ name: "character", params: { id } });
}
</script>

<style scoped>
@import "@/assets/css/cards/character.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cards/character.scss";
</style>
