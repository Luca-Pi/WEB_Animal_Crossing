<template>
  <q-page>
    <div class="row justify-center items-center form--container">
      <q-form @submit="login" class="q-gutter-md">
        <Bubble txt="Connexion">
          <q-input
            v-model="form.email"
            type="email"
            label="Nom d'utilisateur"
            :rules="[val => !!val || 'Le champ email est requis']"
          />
          <q-input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            label="Mot de passe"
            :rules="[val => !!val || 'Le champ mot de passe est requis']"
            >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                class="cursor-pointer"
                @click="togglePassword"
              />
            </template>
          </q-input>
        </Bubble>
        <div class="text-center">
          <q-btn
            type="submit"
            label="Confirmer"
          />
        </div>
      </q-form>
    </div>
    <Cliff>
        <div class="link--container">
          <RouterLink to="/">Mot de passe oublié ?</RouterLink>
          <RouterLink to="/register">S'inscrire</RouterLink>
        </div>
    </Cliff>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";

import { useQuasar } from "quasar";
import { useUserStore } from "@/stores/user";

import Bubble from "@/components/Bubble.vue";
import Cliff from "@/components/Cliff.vue";

const $q = useQuasar();
const userStore = useUserStore();

const form = reactive({
  email: "",
  password: "",
});

async function login() {
  const { email, password } = form;

  try {
    await userStore.login({ email, password });
    router.push({ name: "profile" });

    $q.notify({
      message: `Bon retour parmi nous ${userStore.user.username} !`,
      type: "positive",
    });
  } catch (error: any) {
    $q.notify({
      message: error || "Une erreur est survenu lors de la connexion.",
      type: "negative",
    });
  }
}

const showPassword = ref(false);
function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>
<style lang="scss">
  @import "@/assets/scss/login_register.scss";
</style>