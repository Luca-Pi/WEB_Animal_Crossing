<template>
  <q-page class="text-center">
    <section id="section-welcome">
      <div id="section-trees-and-board">
        <div id="section-trees-left">
          <q-img class="trees" src="/images/arbre_ete.png" />
          <q-img class="trees" src="/images/arbre_automne.png" />
        </div>

        <div id="section-board">
          <q-img id="board" src="/images/tableau.png" />
        </div>

        <div id="section-trees-right">
          <q-img class="trees" src="/images/arbre_printemps.png" />
          <q-img class="trees" src="/images/arbre_ete.png" />
        </div>
      </div>

      <div id="section-absolute">
        <q-img id="balloon" src="/images/cadeau_ballon.png" />
      </div>
    </section>

    <section id="section-menu-wiki">
      <div class="item-menu" v-for="item in itemsMenu" :key="item.icon">
        <router-link
          v-if="item.route"
          class="item-menu-router"
          :to="{ name: item.route }"
        >
          <div class="item-menu-rounded">
            <q-img :src="'/images/menu/' + item.icon" fit="contain" />
          </div>
          <span class="item-menu-text">{{ item.text }}</span>
        </router-link>

        <div v-else class="item-menu-router">
          <div class="item-menu-rounded disabled grayscale">
            <q-img :src="'/images/menu/' + item.icon" fit="contain" />
          </div>
          <span class="item-menu-text">{{ item.text }} (Bientôt !)</span>
        </div>
      </div>
    </section>

    <section
      id="section-happy-birthday"
      v-if="villagersBirthdays && villagersBirthdays.length > 0"
    >
      <h2>Les anniversaires des habitants, le {{ dateNow }}</h2>
      <div id="happy-birthday-villager">
        <div id="happy-birthday-villager-card-and-icons">
          <q-card
            id="happy-birthday-villager-card"
            @click="goToFicheVillager(villagersBirthdays[birthdaySelected].id)"
          >
            {{ villagersBirthdays[birthdaySelected].name }} fête son
            anniversaire aujourd'hui !
          </q-card>
          <div
            id="happy-birthday-village-change-villager"
            v-if="villagersBirthdays.length > 1"
          >
            <q-icon
              class="icon-homepage"
              name="fas fa-caret-square-left"
              @click="getPreviousBirthday()"
            />
            <q-icon
              class="icon-homepage"
              name="fas fa-caret-square-right"
              @click="getNextBirthday()"
            />
          </div>
        </div>
        <q-img
          id="happy-birthday-villager-image"
          :src="villagersBirthdays[birthdaySelected].image_url"
          fit="contain"
        />
      </div>
    </section>

    <section id="section-last-publications">
      <h2>Articles publiées par les joueurs</h2>
      <div id="publications">
        <div
          class="publication"
          v-for="publication in publications"
          :key="publication.id"
        >
          <div class="publication-image">
            <q-img
              v-if="publication.image"
              alt="Bannière de la publication"
              :src="'/images/publications/' + publication.image"
            />
            <q-img
              v-else
              alt="Bannière de la publication"
              src="/images/publications/default_banner.png"
            />
          </div>
          <span class="publication-title">{{ publication.title }}</span>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, nextTick } from "vue";
import router from "@/router";
import { useRouter } from 'vue-router'

import moment from "moment";
import { useQuasar } from "quasar";

import { useVillagersStore, type Villager } from "@/stores/villagers";

interface Publication {
  id: number;
  title: string;
  image?: string;
}

interface ItemMenu {
  icon: string;
  text: string;
  route?: string;
}

const $q = useQuasar();
const $router = useRouter();

const dateNow = ref(moment().format("DD/MM"));
const villagersStore = useVillagersStore();

const itemsMenu = ref<Array<ItemMenu>>([
  {
    icon: "villager.png",
    text: "Villageois",
    route: "villagers",
  },
  {
    icon: "character.png",
    text: "Personnages",
    route: "characters",
  },
  {
    icon: "location.png",
    text: "Lieux",
  },
  {
    icon: "music.png",
    text: "Musiques",
    route: "musics",
  },
  {
    icon: "bug.png",
    text: "Insectes",
    route: "insects",
  },
  {
    icon: "fish.png",
    text: "Poissons",
    route: "fishes",
  },
  {
    icon: "creature.png",
    text: "Créatures",
    route: "sea-creatures",
  },
  {
    icon: "fossil.png",
    text: "Fossiles",
  },
]);

const publications = ref<Array<Publication>>([
  {
    id: 1,
    title: "Title 1",
  },
  {
    id: 2,
    title: "Title 2",
  },
  {
    id: 3,
    title: "Title 3",
  },
]);

const birthdaySelected = ref(0);

const villagersBirthdays = ref<Array<Villager>>([]);

function getPreviousBirthday() {
  if (birthdaySelected.value !== 0) {
    birthdaySelected.value--;
  } else {
    birthdaySelected.value = villagersBirthdays.value.length - 1;
  }
}

function getNextBirthday() {
  if (birthdaySelected.value === villagersBirthdays.value.length - 1) {
    birthdaySelected.value = 0;
  } else {
    birthdaySelected.value++;
  }
}

function goToFicheVillager(idVillager: number | undefined) {
  router.push({ name: "villager", params: { id: idVillager } });
}

onBeforeMount(async () => {
  try {
    villagersBirthdays.value = await villagersStore.getVillagersBirthdays();
    var section=$router.currentRoute.value.hash.replace("#", "");
  if (section) {
    nextTick(()=> window.document.getElementById(section).scrollIntoView());
  }
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    });
  }
});
</script>

<style scoped>
@import "@/assets/css/home.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
