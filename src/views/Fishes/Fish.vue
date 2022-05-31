<template>
  <q-page class="text-center" v-if="fish">
    <div class="row q-mt-xl">
      <div class="col flex items-end">
        <q-img :src="fish.image_url" class="detail-image" fit="contain" />
      </div>
      <div class="col flex items-end q-mb-xl">
        <Bubble :txt="fish.name">
          <div class="row">
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Lieu de capture :</p>
              <p class="info text-center">{{ fish.place }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Période de capture :</p>
              <p class="info text-center">{{ fish.period }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Heures de capture :</p>
              <p class="info text-center">{{ fish.hours }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Taille du poisson :</p>
              <p class="info text-center">{{ fish.size }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Prix de vente :</p>
              <p class="info text-center">{{ fish.price }} clochettes</p>
            </div>
          </div>
        </Bubble>
      </div>
    </div>
    <Cliff />
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

import { useQuasar } from "quasar";
import { useFishesStore, type Fish } from "@/stores/fishes";

import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";
const route = useRoute();

const $q = useQuasar();
const fishesStore = useFishesStore();

const fish = ref<Fish>({});

onBeforeMount(async () => {
  try {
    const id = parseInt(route.params.id as string);
    fish.value = await fishesStore.getFish(id);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/fish.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/wiki/fish.scss";
</style>
