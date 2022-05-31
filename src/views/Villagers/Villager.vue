<template>
  <q-page  v-if="villager">
    <div class="row q-mt-xl">
      <div class="col flex items-end">
        <q-img :src="villager.image_url" class="detail-image" fit="contain" />
      </div>
      <div class="col flex items-end q-mb-xl">
        <Bubble :txt="villager.name">
          <div class="row">
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Espèce : </p>
              <p class="info text-center">{{ villager?.species?.name }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Personnalité : </p>
              <p class="info text-center">{{ villager?.personality?.name }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Date d'anniversaire : </p>
              <p class="info text-center">{{ villager.birthday_day }} {{ villager.birthday_month }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Signe astrologique : </p>
              <p class="info text-center">{{ villager.sign_id }}</p>
            </div>
            <div class="col-8 q-px-xs">
              <p class="text-bold tag">Phrase : </p>
              <p class="info">{{ villager.phrase }}</p>
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
import { useVillagersStore, type Villager } from "@/stores/villagers";

import Cliff from "@/components/Cliff.vue";
import Bubble from "@/components/Bubble.vue";

const route = useRoute();
const $q = useQuasar();
const villagersStore = useVillagersStore();

const villager = ref<Villager>({});

onBeforeMount(async () => {
  try {
    const id = parseInt(route.params.id as string);
    villager.value = await villagersStore.getVillager(id);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/villager.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/wiki/villager.scss";
</style>
