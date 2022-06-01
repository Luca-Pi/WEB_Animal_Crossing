<template>
  <div class="fish" @click="goToDetailFish(id)">
    <div class="fish-section-image">
      <q-img :src="image" class="fish-image" fit="scale-down" />
      <div
        v-if="showItemCollection"
        :class="checkedFish ? 'fish-leaf' : 'fish-leaf fish-not-in-collection'"
        @click.stop="addOrRemoveFromCollection(id)"
      ></div>
    </div>
    <div class="fish-name">
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import router from "@/router";

import { useFishesStore } from "@/stores/fishes";

const fishesStore = useFishesStore();

const props = defineProps({
  id: Number,
  name: String,
  image: String,
  showItemCollection: Boolean,
  hasFish: Boolean,
});

let checkedFish = ref(false);

async function goToDetailFish(id: number | undefined) {
  router.push({ name: "fish", params: { id } });
}

function addOrRemoveFromCollection(id: number | undefined) {
  if (!id) return;
  if (checkedFish.value) {
    fishesStore.removeFishFromCollection(id);
    checkedFish.value = false;
  } else {
    fishesStore.addFishInCollection(id);
    checkedFish.value = true;
  }
}

onBeforeMount(async () => {
  checkedFish.value = props.hasFish;
});
</script>

<style scoped>
@import "@/assets/css/cards/fish.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cards/fish.scss";
</style>
