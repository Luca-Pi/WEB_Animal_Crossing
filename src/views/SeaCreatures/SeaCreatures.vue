<template>
  <q-page class="text-center">
    <section class="listing-bulle-header">
      <Bubble>
        <h2>Les créatures marines des Jeux Animal Crossing</h2>
        <p>
          Avec la mise à jour 1.3.0 d’Animal Crossing New Horizons, Nintendo a
          ajouté la nage et la plongée. Mais on y retrouve également de
          nouvelles prises à réaliser avec les créatures marines qui s’ajoutent
          donc au bébêtopédie. Voici tout ce qu’il faut savoir sur leur capture
          et la liste complète des 40 créatures marines.
        </p>
      </Bubble>
    </section>

    <Cliff>
      <section id="section-filters">
        <q-select
            v-model="filters.name"
            label="Nom de la créature marine"
            :options="seaCreatures"
            class="field"
            option-value="name"
            emit-value
            option-label="name"
            @update:model-value="filtersSeaCreatures()"
            clearable
        />

        <q-select
            v-model="filters.period"
            label="Période de capture"
            :options="periods"
            class="field"
            option-value="value"
            option-label="label"
            @update:model-value="filtersSeaCreatures()"
            clearable
        />

        <q-btn-toggle
            class="q-mt-lg"
            v-model="filters.hasSeaCreatures"
            toggle-color="primary"
            :options="[
            {label: 'Les deux', value: null},
            {label: 'Pas dans ma collection', value: 'false'},
            {label: 'Dans ma collection', value: 'true'}
          ]"
            emit-value
            @update:model-value="filtersSeaCreatures()"
        />
      </section>
      <section id="section-list">
        <SeaCreatureCard
          v-for="seaCreature in seaCreaturesFiltered"
          :key="seaCreature.id"
          :id="seaCreature.id"
          :name="seaCreature.name"
          :image="seaCreature.image_url"
          :show-item-collection="true"
          :has-sea-creature="seaCreature.hasSeaCreature"
        />
      </section>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="seaCreatures.length > maxItemsPerPage"
          v-model="currentPage"
          color="#000"
          active-text-color="#000"
          active-color="secondary"
          :max="Math.ceil(seaCreatures.length/maxItemsPerPage)"
          :max-pages="10"
        />
      </div>
    </Cliff>
  </q-page>
</template>

<script setup lang="ts">
import {onBeforeMount, ref, computed, reactive} from "vue";

import SeaCreatureCard from "@/components/Cards/SeaCreature.vue";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

import { useQuasar } from "quasar";
import { useSeaCreaturesStore, type SeaCreature } from "@/stores/seaCreatures";

const $q = useQuasar();
const seaCreaturesStore = useSeaCreaturesStore();

const seaCreatures = ref<SeaCreature[]>([]);
const filters = reactive({
  name: "",
  hasSeaCreature: null,
  period: "",
});

const periods = reactive([
  {
    label: 'Toute l\'année',
    value: 'All year',
  },
  {
    label: 'Janvier',
    value: 'Jan',
  },
  {
    label: 'Février',
    value: 'Feb',
  },
  {
    label: 'Mars',
    value: 'Mar',
  },
  {
    label: 'Avril',
    value: 'Apr',
  },
  {
    label: 'Mai',
    value: 'May',
  },
  {
    label: 'Juin',
    value: 'Jun',
  },
  {
    label: 'Juillet',
    value: 'Jul',
  },
  {
    label: 'Août',
    value: 'Aug',
  },
  {
    label: 'Septembre',
    value: 'Sep',
  },
  {
    label: 'Octobre',
    value: 'Oct',
  },
  {
    label: 'Novembre',
    value: 'Nov',
  },
  {
    label: 'Décembre',
    value: 'Dec',
  },
]);

const currentPage = ref(1);
const maxItemsPerPage = ref(21);

const seaCreaturesFiltered = computed(() => {
  return seaCreatures.value.slice(
    (currentPage.value - 1) * maxItemsPerPage.value,
    (currentPage.value - 1) * maxItemsPerPage.value + maxItemsPerPage.value
  )
});

onBeforeMount(async () => {
  try {
    seaCreatures.value = await seaCreaturesStore.getSeaCreatures();
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});

async function filtersSeaCreatures() {
  let query =
      "&name=" +
      (filters.name || "") +
      "&hasSeaCreature=" +
      (filters.hasSeaCreature || "") +
      "&period=" +
      (filters.period['value'] || "")
  seaCreatures.value = await seaCreaturesStore.getSeaCreaturesFiltered(query);
}
</script>

<style scoped>
@import "@/assets/css/wiki/listing.css";
</style>
