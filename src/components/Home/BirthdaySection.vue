<template>
  <section
    class="BirthdaySection"
    v-if="villagersBirthdays && villagersBirthdays.length > 0"
  >
    <h2>Les anniversaires des habitants, le {{ dateNow }}</h2>
    <div class="BirthdaySection__details">
      <img
        src="/images/home/cocotier.png"
        class="BirthdaySection__details-illu"
      />
      <div
        class="BirthdaySection__details-date"
      >
        {{ villagersBirthdays[birthdaySelected].name }} fête son
        anniversaire aujourd'hui !
        <button
          @click="goToVillagerDetails(villagersBirthdays[birthdaySelected].id)"
        >
          En savoir plus
        </button>
      </div>
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
    <div class="BirthdaySection__image">
      <img
        :src="villagersBirthdays[birthdaySelected].image_url"
        class="BirthdaySection__image-villager"
      />
      <img
        src="/images/confetti.png"
        class="BirthdaySection__image-confetti"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import router from "@/router"

import moment from "moment"
import { useQuasar } from "quasar"

import { useVillagersStore } from "@/stores/villagers"
import type { Villager } from "@/stores/villagers"

interface Publication {
  id: number;
  title: string;
  image?: string;
}

const $q = useQuasar()

const dateNow = ref(moment().format("DD/MM"))
const villagersStore = useVillagersStore()

const birthdaySelected = ref(0)

const villagersBirthdays = ref<Array<Villager>>([])

function getPreviousBirthday() {
  if (birthdaySelected.value !== 0) {
    birthdaySelected.value--
  }
  else {
    birthdaySelected.value = villagersBirthdays.value.length - 1
  }
}

function getNextBirthday() {
  if (birthdaySelected.value === villagersBirthdays.value.length - 1) {
    birthdaySelected.value = 0
  }
  else {
    birthdaySelected.value++
  }
}

function goToVillagerDetails(villagerId: number) {
  router.push({ name: "villager", params: { id: villagerId } })
}

onBeforeMount(async () => {
  try {
    villagersBirthdays.value = await villagersStore.getVillagersBirthdays()
  }
  catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    })
  }
})
</script>


<style scoped lang="scss">
.BirthdaySection {
  background: #FECE77;
  height: 120vh;
  display: grid;
  margin-top: -10%;
  padding: 12% 50px 50px 50px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 150px 1fr;
  align-content: center;
  justify-items: center;
  z-index: 5;

  h2 {
    grid-column: 1 / 3;
    grid-row: 1 / 1;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
  }

  &__details {
    position: relative;
    height: min-content;

    &-illu {
      width: 70%;
    }

    &-date {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      position: absolute;
      font-size: 1.5rem;
      color: white;
      margin-left: 10px;
      right: -100px;
      bottom: 25%;

      button {
        border: none;
        color: white;
        font-weight: normal;
        padding: .5rem 3rem;
        font-family: "FinkHeavy Regular";
        border-radius: 50px;
        background: #369734;
      }
    }
  }

  &__image {
    max-width: 300px;
    height: min-content;
    position: relative;

    &-villager {
      z-index: 1;
    }

    &-confetti {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
  }
}

@media (max-width: $breakpoint-sm-max) {
  .BirthdaySection {
    display: flex;
    flex-direction: column;
  }
}
</style>
