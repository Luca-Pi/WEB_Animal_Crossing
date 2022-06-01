<template>
  <q-page class="text-center">
    <section class="listing-bulle-header">
      <Bubble>
        <h2>Les poissons des Jeux Animal Crossing</h2>
        <p>
          Parmi les principales activités à réaliser dans Animal Crossing New
          Horizons, la pèche est indéniablement l’un des gros morceaux. On pèche
          pour avoir de nouveaux poissons, pour en revendre certains à prix
          d’or, on jongle entre la mer et la rivière, et on enchaîne les cannes
          à pèche. Loin d’être une simple composante, la pèche est une activité
          majeure.
        </p>
      </Bubble>
    </section>

    <Cliff>
      <section id="section-list">
        <FishCard
          v-for="fish in fishesFiltered"
          :key="fish.id"
          :id="fish.id"
          :name="fish.name"
          :image="fish.image_url"
          :has-fish="fish.hasFish"
          :show-item-collection="true"
        />
      </section>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="fishes.length > maxItemsPerPage"
          v-model="currentPage"
          color="#000"
          active-text-color="#000"
          active-color="secondary"
          :max="Math.ceil(fishes.length/maxItemsPerPage)"
          :max-pages="10"
        />
      </div>
    </Cliff>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";

import FishCard from "@/components/Cards/Fish.vue";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

import { useQuasar } from "quasar";
import { useFishesStore, type Fish } from "@/stores/fishes";

const $q = useQuasar();
const fishesStore = useFishesStore();

const fishes = ref<Fish[]>([]);

const currentPage = ref(1);
const maxItemsPerPage = ref(21);

const fishesFiltered = computed(() => {
  return fishes.value.slice(
    (currentPage.value - 1) * maxItemsPerPage.value,
    (currentPage.value - 1) * maxItemsPerPage.value + maxItemsPerPage.value
  )
});

onBeforeMount(async () => {
  try {
    fishes.value = await fishesStore.getFishes();
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/listing.css";
</style>
