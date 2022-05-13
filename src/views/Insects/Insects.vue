<template>
  <q-page padding class="text-center">
    <q-card>
      <q-card-section>
        <h2>Les insectes des Jeux Animal Crossing</h2>
      </q-card-section>
      <q-card-section>
        <p>
          Que vous cherchiez à gagner quelques clochettes ou bien à compléter
          les différentes expositions du musée, il vous faudra vous lancer dans
          la chasse aux insectes. Alors armez-vous de votre filet et partez en
          quête pour trouver les 80 insectes différents présents dans Animal
          Crossing New Horizons.
        </p>
      </q-card-section>
    </q-card>

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
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";

import InsectCard from "@/components/Cards/Insect.vue";

import { useQuasar } from "quasar";
import { useInsectsStore, type Insect } from "@/stores/insects";

const $q = useQuasar();
const insectsStore = useInsectsStore();

const insects = ref<Array<Insect>>([]);

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
</script>

<style scoped>
@import "@/assets/css/wiki/listing.css";
</style>
