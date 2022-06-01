<template>
  <q-header style="background-color:#9CCFC6;" elevated reveal>
    <q-toolbar class="row full-height">
      <div class="col-5 ">
        <RouterLink to="/" custom v-slot="{ navigate }">
          <div @click="navigate" class="cursor-pointer">
            <q-avatar>
              <img
                src="/images/svg/icon.svg"
                style="
                  margin-left: 0;
                  margin-right: 0;
                  width: 30px;
                "
              />
            </q-avatar>
            <span
              class="text-h5"
              style="font-size: medium; margin-left: 0; margin-right: 0"
              >Island Crossing</span
            >
          </div>
        </RouterLink>
      </div>
      <q-list class="row text-center col" v-if="userStore.user.id">
        <q-item
          dense
          class="text-white "
          style="margin-left: 5%; margin-right: 5%"
          :to="{ name: 'profile' }"
          >Profile</q-item
        >
        <q-item
          dense
          class="text-white "
          style="margin-left: 5%; margin-right: 2.5%"
          :to="{ name: 'home' }+'/#section-menu-wiki'"
          >Catégorie   </q-item
        >
        <q-item
          dense
          style="margin-left: 2.5%; margin-right: 2.5%"
          v-if="$router.currentRoute.value.name !== 'home'"
          class="text-white "
          :to="{ name: 'home' } + '/#section-happy-birthday'"
        >
          Anniversaire
        </q-item>
        <q-item dense class="col" >
          <q-btn
            size="xs"
            color="red"
            text-color="white"
            @click="logout()"
            label="Deconnexion  "

          />
        </q-item>
      </q-list>
    </q-toolbar>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/svg-with-js.min.css"
      integrity="sha512-T22AGZA32A7BJVwM85+3QTgGxP7lSHb88UwE3b19YtWs0mw6x27Pw5ea/60BQkcKO4vzzsXW230pxPdw6TthGQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </q-header>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";
import { RouterLink } from "vue-router";

import { useQuasar } from "quasar";
import { useUserStore } from "@/stores/user";

const $q = useQuasar();
const userStore = useUserStore();

const audio_playing = ref(false);

async function logout() {
  try {
    $q.notify({
      message: `À très bientôt ${userStore.user.username} !`,
      type: "positive",
    });

    userStore.logout();
  } catch (error: any) {
    $q.notify({
      message: error || "Une erreur est survenu lors de la déconnexion.",
      type: "negative",
    });
  } finally {
    router.push({ name: "login" });
  }
}
</script>

<style scoped lang="scss">
.q-header {
  height: 80px;
}
</style>
