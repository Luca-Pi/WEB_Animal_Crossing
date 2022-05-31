<template>
  <div class="insect" @click="goToDetailInsect(id)">
    <div class="insect-section-image">
      <q-img :src="image" class="insect-image" fit="scale-down" />
      <div
        v-if="showItemCollection"
        :class="
          checkedInsect ? 'insect-leaf' : 'insect-leaf insect-not-in-collection'
        "
        @click.stop="addOrRemoveFromCollection(id)"
      ></div>
    </div>
    <div class="insect-name">
      <span>{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import router from "@/router";

import { useInsectsStore } from "@/stores/insects";

const insectsStore = useInsectsStore();

const props = defineProps({
  id: Number,
  name: String,
  image: String,
  showItemCollection: Boolean,
  hasInsect: Boolean,
});

let checkedInsect = ref(false);

async function goToDetailInsect(id: number | undefined) {
  router.push({ name: "insect", params: { id } });
}

function addOrRemoveFromCollection(id: number | undefined) {
  if (!id) return;
  if (checkedInsect.value) {
    insectsStore.removeInsectFromCollection(id);
    checkedInsect.value = false;
  } else {
    insectsStore.addInsectInCollection(id);
    checkedInsect.value = true;
  }
}

onBeforeMount(async () => {
  checkedInsect.value = props.hasInsect;
});
</script>

<style scoped>
@import "@/assets/css/cards/insect.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/cards/insect.scss";
</style>
