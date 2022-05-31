<template>
  <q-page v-if="character">
    <div class="row q-mt-xl">
      <div class="col flex items-end">
        <q-img :src="character.photoImage" class="detail-image" fit="contain" />
      </div>
      <div class="col flex items-end q-mb-xl">
        <Bubble :txt="character.name">
          <div class="row">
            <div class="col-12 col-lg-4 flex column justify-center q-px-xs">
              <p class="text-bold tag">Date d'anniversaire : </p>
              <p class="info text-center">{{ character?.birthday_day }} {{ character?.birthday_month }}</p>
            </div>
            <div class="col-12 col-lg-4 flex justify-center column q-px-xs">
              <p class="text-bold tag">Genre : </p>
              <p class="info text-center">{{ character?.gender?.name }}</p>
            </div>
            <div class="col-12 col-lg-4 flex column justify-center q-px-xs">
              <q-img :src="character?.iconImage" />
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
import { useCharactersStore, type Character } from "@/stores/characters";
import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

const route = useRoute();

const $q = useQuasar();
const charactersStore = useCharactersStore();

const character = ref<Character>({});

onBeforeMount(async () => {
  try {
    const id = parseInt(route.params.id as string);
    character.value = await charactersStore.getCharacter(id);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/wiki/character.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/wiki/character.scss";
</style>
