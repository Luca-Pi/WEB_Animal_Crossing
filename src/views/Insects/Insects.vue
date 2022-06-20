<template>
  <q-page class="text-center">
    <section class="listing-bulle-header">
      <Bubble>
        <h2>Les insectes des Jeux Animal Crossing</h2>
        <p>
          Que vous cherchiez à gagner quelques clochettes ou bien à compléter
          les différentes expositions du musée, il vous faudra vous lancer dans
          la chasse aux insectes. Alors armez-vous de votre filet et partez en
          quête pour trouver les 80 insectes différents présents dans Animal
          Crossing New Horizons.
        </p>
      </Bubble>
    </section>

    <Cliff>
      <section id="section-filters">
        <q-select
            v-model="filters.name"
            label="Nom de l'insecte"
            :options="insects"
            class="field"
            option-value="name"
            emit-value
            option-label="name"
            @update:model-value="filtersInsects()"
            clearable
        />

        <q-select
            v-model="filters.period"
            label="Période de capture"
            :options="PERIODS"
            class="field"
            option-value="value"
            option-label="label"
            @update:model-value="filtersInsects()"
            clearable
        />

        <q-btn-toggle
            class="q-mt-lg"
            v-model="filters.hasInsect"
            toggle-color="primary"
            :options="[
            {label: 'Les deux', value: null},
            {label: 'Pas dans ma collection', value: 'false'},
            {label: 'Dans ma collection', value: 'true'}
          ]"
            emit-value
            @update:model-value="filtersInsects()"
        />
      </section>
      <section id="section-list">
        <InsectCard
          v-for="insect in insectsFiltered"
          :key="insect.id"
          :id="insect.id"
          :name="insect.name"
          :image="insect.image_url"
          :show-item-collection="true"
          :has-insect="insect.hasInsect"
        />
      </section>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="insects.length > maxItemsPerPage"
          v-model="currentPage"
          color="#000"
          active-text-color="#000"
          active-color="secondary"
          :max="Math.ceil(insects.length/maxItemsPerPage)"
          :max-pages="10"
        />
      </div>  
    </Cliff>
  </q-page>
</template>

<script setup lang="ts">
import {onBeforeMount, ref, computed, reactive} from "vue";

import InsectCard from "@/components/Cards/Insect.vue";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";
import PERIODS from "@/consts";

import { useQuasar } from "quasar";
import { useInsectsStore, type Insect } from "@/stores/insects";

const $q = useQuasar();
const insectsStore = useInsectsStore();

const insects = ref<Array<Insect>>([]);

const filters = reactive({
  name: "",
  hasInsect: null,
  period: "",
});

const currentPage = ref(1);
const maxItemsPerPage = ref(21);

const insectsFiltered = computed(() => {
  return insects.value.slice(
    (currentPage.value - 1) * maxItemsPerPage.value,
    (currentPage.value - 1) * maxItemsPerPage.value + maxItemsPerPage.value
  )
});

onBeforeMount(async () => {
  try {
    insects.value = await insectsStore.getInsects();
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});

async function filtersInsects() {
  let query =
      "&name=" +
      (filters.name || "") +
      "&hasInsect=" +
      (filters.hasInsect || "") +
      "&period=" +
      (filters.period['value'] || "")
  insects.value = await insectsStore.getInsectsFiltered(query);
}
</script>

<style scoped>
@import "@/assets/css/wiki/listing.css";
</style>
