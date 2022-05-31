<template>
  <q-page v-if="insect">
    <div class="row q-mt-xl">
      <div class="col flex items-end">
        <q-img :src="insect.image_url" class="detail-image" fit="contain" />
      </div>
      <div class="col flex items-end q-mb-xl">
        <Bubble :txt="insect.name">
          <div class="row">
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Phrase lors de la capture :</p>
              <p class="info text-center">{{ insect.catchphrase }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Lieu(x) pour l'attraper :</p>
              <p class="info text-center">{{ insect.location }}</p>
            </div>
            <div class="col-4 q-px-xs">
              <p class="text-bold tag">Prix de vente :</p>
              <p class="info text-center">{{ insect.sell_nook }}clochettes</p>
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
import { useInsectsStore, type Insect } from "@/stores/insects";

import Cliff from "@/components/Cliff.vue";
import Bubble from "@/components/Bubble.vue";

const route = useRoute();

const $q = useQuasar();
const insectsStore = useInsectsStore();

const insect = ref<Insect>({});

onBeforeMount(async () => {
  try {
    const id = parseInt(route.params.id as string);
    insect.value = await insectsStore.getInsect(id);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/insect.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/wiki/insect.scss";
</style>
