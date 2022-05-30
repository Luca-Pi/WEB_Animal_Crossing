<template>
  <q-footer class="footer">
    <section id="first-section-footer">
      <div class="list-footer">
        <span class="text-white">Island Crossing</span>
        <q-list v-if="userStore.user.id">
          <q-item dense class="text-white" :to="{ name: 'profile' }">Profile</q-item>
          <q-item dense v-if="$router.currentRoute.value.name !== 'home'" class="text-white" :to="{ name: 'home' }+ '/#section-happy-birthday'">Anniversaire</q-item>
        </q-list>
      </div>
      <div class="fish-section">
        <q-img class="fish-icon" src="/images/svg/poisson.svg" fit="contain"/>
      </div>
    </section>
    <q-toolbar class="text-center">
      <q-toolbar-title>
        <span>Island Crossing - Tous droits réservés</span>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const $router = useRouter();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/footer.scss";
</style>
