<template>
  <q-page v-if="seaCreature">
    <div class="row q-mt-xl">
        <div class="col flex items-end">
          <q-img :src="seaCreature.image_url" class="detail-image" fit="contain" />
        </div>
        <div class="col flex items-end q-mb-xl">
          <Bubble :txt="seaCreature.name">
            <div class="row">
              <div class="col-4 q-px-xs">
                <p class="text-bold tag">Période :</p>
                <p class="info text-center">{{ seaCreature.period }}</p>
              </div>
              <div class="col-4 q-px-xs">
                <p class="text-bold tag">Heures :</p>
                <p class="info text-center">{{ seaCreature.hours }}</p>
              </div>
              <div class="col-4 q-px-xs">
                <p class="text-bold tag">Lieu :</p>
                <p class="info text-center">{{ seaCreature.place }}</p>
              </div>
              <div class="col-4 q-px-xs">
                <p class="text-bold tag">Mouvement :</p>
                <p class="info text-center">{{ seaCreature.movement }}</p>
              </div>
              <div class="col-4 q-px-xs">
                <p class="text-bold tag">Prix de vente :</p>
                <p class="info text-center">{{ seaCreature.price }} clochettes</p>
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
import { useSeaCreaturesStore, type SeaCreature } from "@/stores/seaCreatures";

import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

const route = useRoute();

const $q = useQuasar();
const seaCreaturesStore = useSeaCreaturesStore();

const seaCreature = ref<SeaCreature>({});

onBeforeMount(async () => {
  try {
    const id = parseInt(route.params.id as string);
    seaCreature.value = await seaCreaturesStore.getSeaCreature(id);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/sea-creature.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/wiki/sea-creature.scss";
</style>
