<template>
  <q-page padding>
    <div class="row justify-center row-profil">
      <q-card class="text-center col-4">
        <q-card-section>
          <span>Bonjour {{ user.username }} 👋</span>
          <div class="text-h5 text-grey-8">
            <strong>Mon profil</strong>
          </div>
          <div class="float-right">
            <img src="/images/menu/villager.png" alt="" />
            <div class="bg-brown pseudo-profile">
              {{ user.username }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="text-justify">
          <p v-if="user.description">{{ user.description }}</p>
          <p v-else>Aucune description.</p>
        </q-card-section>
        <q-card-section v-if="user.setFurniture">
          <div class="text-left">
            <strong>Série préféré : </strong> {{ user.setFurniture }}
          </div>
        </q-card-section>
      </q-card>
      <div class="text-center col-4 console-reaction q-mt-md q-mb-lg">
        <div
          class="platform"
          v-for="platform in listPlatforms"
          :key="platform.platform"
        >
          <div class="q-mr-lg invisible platform-code">{{ platform.code }}</div>
          <q-btn
            class="q-mr-lg"
            color="secondary"
            :label="platform.name"
          ></q-btn>
        </div>
        <div class="reaction" v-show="false">
          <strong>Réaction la plus utilisée : </strong>
        </div>
      </div>
      <div class="text-center col-4 q-ma-lg-sm">
        <q-btn
          :to="{ name: 'profile-update' }"
          rounded
          color="accent"
          label="Modifier mon profil"
          text-color="black"
        />
      </div>
      <q-card
        class="text-center col-4 q-ma-lg bg-accent"
        v-if="listInsect && listInsect.length > 0"
      >
        <q-card-section>
          <div class="text-left text-bold">Insectes capturés</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            navigation
            :pagination="{ clickable: true }"
            :space-between="5"
          >
            <swiper-slide v-for="insect in listInsect" :key="insect.id">
              <router-link
                :to="{ name: 'insect', params: { id: insect.id } }"
              >
                <img class="img-insect-swiper" :src="insect.image_url" />
              </router-link>
              <span>{{ insect.name }}</span>
            </swiper-slide>
          </swiper>
        </q-card-section>
      </q-card>
      <q-card
        class="text-center col-4 q-ma-lg bg-accent"
        v-if="listFish && listFish.length > 0"
      >
        <q-card-section>
          <div class="text-left text-bold">Poissons capturés</div>
          <swiper
            :modules="modules"
            :slides-per-view="3"
            navigation
            :pagination="{ clickable: true }"
            :space-between="5"
          >
            <swiper-slide v-for="fish in listFish" :key="fish.id">
              <router-link
                :to="{ name: 'fish', params: { id: fish.id } }"
              >
                <img class="img-fish-swiper" :src="fish.image_url" />
              </router-link>
              <span>{{ fish.name }}</span>
            </swiper-slide>
          </swiper>
        </q-card-section>
      </q-card>
      <q-card
        class="text-center col-4 q-ma-lg bg-accent"
        v-if="listSeaCreature && listSeaCreature.length > 0"  
      >
        <q-card-section>
          <div class="text-left text-bold">
            Créatures marines capturés
          </div>
          <swiper
              :modules="modules"
              :slides-per-view="3"
              navigation
              :pagination="{ clickable: true }"
              :space-between="5"
          >
            <swiper-slide v-for="creature in listSeaCreature" :key="creature.id">
              <router-link
                :to="{ name: 'sea-creature', params: { id: creature.id } }"
              >
                <img class="img-creatures-swiper" :src="creature.image_url">
              </router-link>
              <span>{{ creature.name }}</span>
            </swiper-slide>
          </swiper>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { Navigation, Pagination } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useUserStore } from "@/stores/user";
import { useInsectsStore, type Insect } from "@/stores/insects";
import { useFishesStore, type Fish } from "@/stores/fishes";
import { useSeaCreaturesStore, type SeaCreature } from "@/stores/seaCreatures";

const modules = [Navigation, Pagination];

const { user } = useUserStore();
const fishesStore = useFishesStore();
const insectsStore = useInsectsStore();
const seaCreaturesStore = useSeaCreaturesStore();

interface Platform {
  name: string;
  code: string;
  platform: string;
}

const listPlatforms = ref<Platform[]>([
  {
    platform: "DS",
    name: "DS",
    code: "1234567",
  },
  {
    platform: "Wii",
    name: "Wii",
    code: "6895930928",
  },
  {
    platform: "Switch",
    name: "Switch",
    code: "94948382",
  },
]);

let listInsect = ref<Insect[]>([]);

let listFish = ref<Fish[]>([]);

let listSeaCreature = ref<SeaCreature[]>([]);

onBeforeMount(async () => {
  listInsect.value = await insectsStore.getInsectsUser();
  listFish.value = await fishesStore.getFishesUser();
  listSeaCreature.value = await seaCreaturesStore.getSeaCreaturesUser();
});
</script>

<style lang="scss">
@import "@/assets/scss/profile.scss";
</style>
