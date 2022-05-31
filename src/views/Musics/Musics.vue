<template>
  <q-page class="text-center">
    <section class="listing-bulle-header">
      <Bubble>
        <h2>Les musiques des Jeux Animal Crossing</h2>
        <p>
          Cette catégorie regroupe tous les musiques présentes dans les
          différents jeux animal crossing.
        </p>
      </Bubble>
    </section>

    <Cliff>
      <section id="section-list" class="section-list-villagers">
        <MusicCard
          v-for="music in musicsFiltered"
          :key="music.id"
          :id="music.id"
          :name="music.name"
          :image="music.image_url"
        />
      </section>

      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="musics.length > maxItemsPerPage"
          v-model="currentPage"
          color="#000"
          active-text-color="#000"
          active-color="secondary"
          :max="Math.ceil(musics.length/maxItemsPerPage)"
          :max-pages="10"
        />
      </div>
    </Cliff>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";

import MusicCard from "@/components/Cards/Music.vue";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

import { useQuasar } from "quasar";
import { useMusicsStore, type Music } from "@/stores/musics";

const $q = useQuasar();
const musicsStore = useMusicsStore();

const musics = ref<Music[]>([]);

const currentPage = ref(1);
const maxItemsPerPage = ref(21);

const musicsFiltered = computed(() => {
  return musics.value.slice(
    (currentPage.value - 1) * maxItemsPerPage.value,
    (currentPage.value - 1) * maxItemsPerPage.value + maxItemsPerPage.value
  )
});

onBeforeMount(async () => {
  try {
    musics.value = await musicsStore.getMusics();
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
