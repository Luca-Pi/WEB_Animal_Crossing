<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="col-12 col-md-10 col-lg-8">
        <q-card-section>
          <RouterLink :to="{ name: 'profile' }"
            >Revenir sur mon profil</RouterLink
          >
          <q-form @submit="updateProfile" class="q-gutter-md">
            <div class="row items-center q-gutter-md">
              <div class="col-shrink">
                <q-avatar size="100px">
                  <img
                    src="https://cdna.artstation.com/p/assets/images/images/028/368/304/large/charisse-smith-nh-icon-ellie.jpg?1594264084"
                    alt="avatar"
                  />
                </q-avatar>
              </div>
              <div class="col">
                <q-input
                  v-model="form.username"
                  type="text"
                  label="Nom d'utilisateur"
                />
              </div>
              <div class="col">
                <q-select
                  v-model="form.favoriteSerie"
                  :options="setFurnitures"
                  label="Série préférée"
                />
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-12 col-sm-10 col-md-8">
                <q-input
                  v-model="form.description"
                  type="textarea"
                  label="Description"
                />
              </div>
            </div>
            <div class="row justify-center">
              <div class="col-12 col-sm-8 col-md-6">
                <div class="text-center">Plateformes</div>
                <div
                  v-for="(platform, index) in platforms"
                  :key="platform.value"
                  class="row items-center"
                >
                  <div class="col-shrink q-mr-md">
                    <q-checkbox
                      v-model="platform.selected"
                      :label="platform.label"
                      @click="togglePlatform(index)"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      v-model="form.platforms[index].code"
                      :disable="!platform.selected"
                      type="text"
                      label="Code ami"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right">
              <q-btn label="Sauvegarder" type="submit" color="secondary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { RouterLink } from "vue-router";

import {
  useSetFurnituresStore,
  type SetFurniture,
} from "@/stores/setFurnitures";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import {useQuasar} from "quasar";
const setFurnituresStore = useSetFurnituresStore();

interface PlatformCode {
  platform: string;
  code: string;
}

const platforms = ref([
  { label: "DS", value: "ds", selected: false },
  { label: "Wii", value: "wii", selected: false },
  { label: "Switch", value: "switch", selected: false },
]);

const $q = useQuasar();
const setFurnitures = ref<SetFurniture[]>([]);
const userStore = useUserStore();

const form = reactive({
  username: "",
  description: "",
  favoriteSerie: "",
  platforms: [] as PlatformCode[],
});

onBeforeMount(async () => {
  platforms.value.forEach((platform) =>
    form.platforms.push({
      platform: platform.label,
      code: "",
    })
  );

  setFurnitures.value = await setFurnituresStore.getSetFurnitures();
});

async function updateProfile() {

  const {username, description, favoriteSerie} = form;

  try {
    await userStore.update({username, description, favoriteSerie});
    router.push({name: "update"});

    $q.notify({
      message: `Ton profil est a jour ${userStore.user.username} !`,
      type: "positive",
    });
  } catch (error: any) {
    $q.notify({
      message: error || "Une erreur est survenu lors de la mise a jour.",
      type: "negative",
    });
  }

}
function togglePlatform(index: number) {
  form.platforms[index].code = "";
}
</script>
