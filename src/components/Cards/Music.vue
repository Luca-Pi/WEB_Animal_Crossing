<template>
  <div class="music" @click="goToDetailMusic(id)">
    <q-img :src="image" class="music-image" fit="cover" />
    <div class="music-name">
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

async function goToDetailMusic(id: number | undefined) {
  router.push({ name: "music", params: { id } });
}
</script>

<style scoped>
@import "@/assets/css/cards/music.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cards/music.scss";
</style>
