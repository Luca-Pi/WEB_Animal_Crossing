<template>
  <div class="villager" @click="goToDetailVillager(id)">
    <div class="villager-section-image">
      <q-img :src="image" class="villager-image" fit="scale-down" />
    </div>
    <div class="villager-name">
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

async function goToDetailVillager(id: number | undefined) {
  router.push({ name: "villager", params: { id } });
}
</script>

<style>
@import "@/assets/css/cards/villager.css";
</style>

<style lang="scss">
@import "@/assets/scss/cards/villager.scss";
</style>
