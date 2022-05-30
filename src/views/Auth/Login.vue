<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="card--form">
        <q-form @submit="login" class="q-gutter-md">
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
          <div>
            <q-btn
              type="submit"
              label="Confirmer"
              color="primary"
              class="full-width"
            />
          </div>
          <div>
            <RouterLink to="/">Mot de passe oublié ?</RouterLink>
          </div>
          <div>
            Pas de compte ?
            <RouterLink to="/register">S'inscrire</RouterLink>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";

import { useQuasar } from "quasar";
import { useUserStore } from "@/stores/user";

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
