<template>
  <q-page class="text-center">
    <section class="listing-bulle-header">
      <Bubble>
        <h2>Les personnages des Jeux Animal Crossing</h2>
        <p>
          Cette catégorie regroupe tous les personnages qui ne sont pas
          villageois à part entière et qui ont un rôle particulier.
        </p>
      </Bubble>
    </section>

    <Cliff>
      <section id="section-list">
        <CharacterCard
          v-for="character in charactersFiltered"
          :key="character.id"
          :id="character.id"
          :name="character.name"
          :image="character.photoImage"
        />
      </section>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="characters.length > maxItemsPerPage"
          v-model="currentPage"
          color="#000"
          active-text-color="#000"
          active-color="secondary"
          :max="Math.ceil(characters.length/maxItemsPerPage)"
          :max-pages="10"
        />
      </div>
    </Cliff>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";

import CharacterCard from "@/components/Cards/Character.vue";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

import { useQuasar } from "quasar";
import { useCharactersStore, type Character } from "@/stores/characters";

const $q = useQuasar();
const charactersStore = useCharactersStore();

const characters = ref<Character[]>([]);

const currentPage = ref(1);
const maxItemsPerPage = ref(21);

const charactersFiltered = computed(() => {
  return characters.value.slice(
    (currentPage.value - 1) * maxItemsPerPage.value,
    (currentPage.value - 1) * maxItemsPerPage.value + maxItemsPerPage.value
  )
});

onBeforeMount(async () => {
  try {
    characters.value = await charactersStore.getCharacters();
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
