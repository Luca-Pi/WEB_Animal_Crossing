<template>
  <q-page class="text-center">
    <section class="listing-bulle-header">
      <Bubble>
        <div>
          <h2>Les personnages des Jeux Animal Crossing</h2>
          <p>Cette catégorie regroupe tous les personnages qui ne sont pas villageois à part entière et qui ont un rôle particulier.</p>
        </div>
      </Bubble>
    </section>

    <Cliff>
      <q-card-section id="section-filters">
        <q-select
          v-model="filters.name"
          label="Nom de l'habitant"
          :options="villagers"
          class="field"
          option-value="name"
          emit-value
          option-label="name"
          @update:model-value="filtersVillagers()"
          clearable
        />
        <q-select
          v-model="filters.species"
          label="Espèce de l'habitant"
          :options="species"
          class="field"
          option-value="code"
          emit-value
          option-label="name"
          @update:model-value="filtersVillagers()"
          clearable
        />
        <q-select
          v-model="filters.personalities"
          label="Personnalité de l'habitant"
          :options="personalities"
          class="field"
          option-value="code"
          emit-value
          option-label="name"
          @update:model-value="filtersVillagers()"
          clearable
        />
      </q-card-section>
      <section id="section-list">
        <VillagerCard
          v-for="villager in villagersFiltered"
          :key="villager.id"
          :id="villager.id"
          :name="villager.name"
          :image="villager.image_url"
        />
      </section>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="villagers.length > maxItemsPerPage"
          v-model="currentPage"
          color="#000"
          active-text-color="#000"
          active-color="secondary"
          :max="Math.ceil(villagers.length/maxItemsPerPage)"
          :max-pages="10"
        />
      </div>
    </Cliff>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, computed } from "vue";

import { useQuasar } from "quasar";

import VillagerCard from "@/components/Cards/Villager.vue";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

import { useVillagersStore, type Villager } from "@/stores/villagers";
import { useSpeciesStore, type Specie } from "@/stores/species";
import {
  usePersonalitiesStore,
  type Personality,
} from "@/stores/personalities";

const $q = useQuasar();
const villagersStore = useVillagersStore();
const speciesStore = useSpeciesStore();
const personalitiesStore = usePersonalitiesStore();

const filters = reactive({
  name: "",
  species: "",
  personalities: "",
});

const species = ref<Specie[]>([]);

const personalities = ref<Personality[]>([]);

const villagers = ref<Villager[]>([]);

const currentPage = ref(1);
const maxItemsPerPage = ref(25);

const villagersFiltered = computed(() => {
  return villagers.value.slice(
    (currentPage.value - 1) * maxItemsPerPage.value,
    (currentPage.value - 1) * maxItemsPerPage.value + maxItemsPerPage.value
  )
});

onBeforeMount(async () => {
  try {
    villagers.value = await villagersStore.getVillagers();
    species.value = await speciesStore.getSpeciesNames();
    personalities.value = await personalitiesStore.getPersonalitiesNames();
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});

async function filtersVillagers() {
  let query =
    "&name=" +
    (filters.name || "") +
    "&species=" +
    (filters.species || "") +
    "&personalities=" +
    (filters.personalities || "");
  villagers.value = await villagersStore.getVillagersFiltered(query);
}
</script>

<style scoped>
@import "@/assets/css/wiki/listing.css";
</style>
