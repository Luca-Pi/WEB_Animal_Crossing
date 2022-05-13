<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="text-center col-4">
        <q-card-section>
          <div class="text-h5 text-grey-8">Inscription</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="register" class="q-gutter-md">
            <q-input
              v-model="form.email"
              type="text"
              label="Adresse e-mail"
              :rules="[val => !!val || 'Le champ email est requis']"
            />
            <q-input
              v-model="form.username"
              type="text"
              label="Nom d'utilisateur"
              :rules="[val => !!val || 'Le champ pseudo est requis']"
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
            <q-input
              v-model="form.password_confirmation"
              :type="showPassword ? 'text' : 'password'"
              label="Confirmation du mot de passe"
              :rules="[val => rulesPassword(val)]"
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
              Déjà un compte ?
              <RouterLink to="/login">Se connecter</RouterLink>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
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
  username: "",
  password: "",
  password_confirmation: "",
});

async function register() {
  if (form.password === form.password_confirmation) {
    const { email, username, password, password_confirmation: password_confirmation } = form;

    try {
      await userStore.register({ email, username, password, password_confirmation });
      router.push({ name: "profile" });

      $q.notify({
        message: `Bienvenue parmi nous ${userStore.user.username} !`,
        type: "positive",
      });
    } catch (error: any) {
      $q.notify({
        message: error || "Une erreur est survenu lors de l'inscription.",
        type: "negative",
      });
    }
  }
}

function rulesPassword(value) {
  if (value.length === 0) {
    return 'Veuillez renseigner à nouveau le mot de passe';
  }
  if (value !== form.password) {
    return 'Les mots de passe ne sont pas identique';
  }
  return null;
}

const showPassword = ref(false);
function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>
