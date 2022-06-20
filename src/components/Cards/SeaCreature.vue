<template>
  <div class="sea-creature" @click="goToDetailSeaCreature(id)">
    <div class="sea-creature-section-image">
      <q-img :src="image" class="sea-creature-image" fit="scale-down" />
      <div
        v-if="showItemCollection"
        :class="
          checkedSeaCreature ? 'sea-creature-leaf' : 'sea-creature-leaf sea-creature-not-in-collection'
        "
        @click.stop="addOrRemoveFromCollection(id)"
      ></div>
    </div>
    <div class="sea-creature-name">
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import router from "@/router";

import { useSeaCreaturesStore } from "@/stores/seaCreatures";

const seaCreaturesStore = useSeaCreaturesStore();

const props = defineProps({
  id: Number,
  name: String,
  image: String,
  showItemCollection: Boolean,
  hasSeaCreature: Boolean,
});

let checkedSeaCreature = ref(false);

async function goToDetailSeaCreature(id: number | undefined) {
  router.push({ name: "sea-creature", params: { id } });
}

function addOrRemoveFromCollection(id: number | undefined) {
  if (!id) return;
  if (checkedSeaCreature.value) {
    seaCreaturesStore.removeSeaCreatureFromCollection(id);
    checkedSeaCreature.value = false;
  } else {
    seaCreaturesStore.addSeaCreatureInCollection(id);
    checkedSeaCreature.value = true;
  }
}

onBeforeMount(async () => {
  checkedSeaCreature.value = props.hasSeaCreature;
});
</script>

<style scoped>
@import "@/assets/css/cards/sea-creature.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cards/sea-creature.scss";
</style>
