<template>
  <q-page v-if="music">
    <div class="row q-mt-xl">
      <div class="col flex items-end">
        <q-img :src="music?.image_url" class="detail-image" fit="contain" />
        <audio class="audiofile" controls :src="music?.music_url" />
      </div>
      <div class="col flex items-end q-mb-xl">
        <Bubble :txt="music.name">
          <div class="row">
            <div class="col-12 col-lg-4 q-px-xs">
              <p class="text-bold tag">Prix d'achat :</p>
              <p class="info text-center">{{ music?.price }}</p>
            </div>
            <div class="col-12 col-lg-4 q-px-xs">
              <p class="text-bold tag">Prix de vente :</p>
              <p class="info text-center">{{ music?.sell_price }} clochettes</p>
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
import { useMusicsStore, type Music } from "@/stores/musics";

import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";
const route = useRoute();

const $q = useQuasar();
const musicsStore = useMusicsStore();

const music = ref<Music>({});

onBeforeMount(async () => {
  try {
    const id = parseInt(route.params.id as string);
    music.value = await musicsStore.getMusic(id);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/music.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/wiki/music.scss";
</style>
