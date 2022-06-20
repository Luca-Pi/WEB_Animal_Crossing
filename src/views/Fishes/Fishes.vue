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
      <section id="section-filters">
        <q-select
            v-model="filters.name"
            label="Nom du poisson"
            :options="fishes"
            class="field"
            option-value="name"
            emit-value
            option-label="name"
            @update:model-value="filtersFishes()"
            clearable
        />

        <q-select
            v-model="filters.period"
            label="Période de capture"
            :options="PERIODS"
            class="field"
            @update:model-value="filtersFishes()"
            clearable
        />

        <q-btn-toggle
            class="q-mt-lg"
            v-model="filters.hasFish"
            toggle-color="primary"
            :options="[
            {label: 'Les deux', value: null},
            {label: 'Pas dans ma collection', value: 'false'},
            {label: 'Dans ma collection', value: 'true'}
          ]"
            emit-value
            @update:model-value="filtersFishes()"
        />
      </section>

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
import { onBeforeMount, reactive, ref, computed } from "vue";

import FishCard from "@/components/Cards/Fish.vue";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";
import PERIODS from "@/consts";

import { useQuasar } from "quasar";
import { useFishesStore, type Fish } from "@/stores/fishes";

const $q = useQuasar();
const fishesStore = useFishesStore();

const fishes = ref<Fish[]>([]);

const currentPage = ref(1);
const maxItemsPerPage = ref(21);

const filters = reactive({
  name: "",
  hasFish: null,
  period: "",
});

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

async function filtersFishes() {
  let period = null
  if (filters.period) {
    period = filters.period['value']
  }

  let query =
    "&name=" +
    (filters.name || "") +
    "&hasFish=" +
    (filters.hasFish || "") +
    "&period=" +
    (period || "")
  fishes.value = await fishesStore.getFishesFiltered(query);
}
</script>

<style scoped>
@import "@/assets/css/wiki/listing.css";
</style>
