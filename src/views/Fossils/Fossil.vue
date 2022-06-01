<template>
  <q-page v-if="fossil">
    <div class="row q-mt-xl">
      <div class="col flex items-end">
        <q-img :src="fossil?.image_url" class="detail-image" fit="contain" />
      </div>
      <div class="col flex items-end q-mb-xl">
        <Bubble :txt="fossil?.name">
          <div class="row">
            <div class="col-12 col-lg-4 q-px-xs">
              <p class="text-bold tag">Prix de vente :</p>
              <p class="info text-center">{{ fossil?.price }} clochettes</p>
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
import { useFossilsStore, type Fossil } from "@/stores/fossils";
import Cliff from "@/components/Cliff.vue";
import Bubble from "@/components/Bubble.vue";

const route = useRoute();

const $q = useQuasar();
const fossilsStore = useFossilsStore();

const fossil = ref<Fossil>({});

onBeforeMount(async () => {
  try {
    const id = parseInt(route.params.id as string);
    fossil.value = await fossilsStore.getFossil(id);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/fossil.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/wiki/fossil.scss";
</style>
