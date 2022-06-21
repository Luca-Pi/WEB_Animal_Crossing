<template>
  <q-page padding>
    <div class="text-center">
      <h1 class="text-h4">~ Blog ~</h1>
    </div>
    <div class="row">
      <div v-for="i in 12" class="col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-ma-sm">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section class="row">
            <div class="col-shrink">
              <img
                src="https://cdna.artstation.com/p/assets/images/images/028/368/304/large/charisse-smith-nh-icon-ellie.jpg?1594264084"
                alt="avatar"
                width="80"
                class="block"
              />
              <q-badge
                color="primary"
                label="John Doe"
                class="text-subtitle1"
              />
            </div>
            <div class="col q-ml-lg">
              <div class="text-subtitle2">John Doe présente :</div>
              <div class="text-h6">"Post {{ i }}"</div>
              <p class="q-mt-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolore, repellendus odio nemo animi sunt suscipit ducimus, sint
                recusandae omnis dignissimos velit exercitationem debitis sit
                sapiente quod illo quia expedita amet....
                <router-link :to="{ name: 'blog-post', params: { slug: i } }" class="text-secondary">
                  Voir plus
                </router-link>
              </p>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
