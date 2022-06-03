<template>
  <q-parallax src="https://cdn.quasar.dev/img/mountains.jpg">
    <div class="flex absolute-top-left q-ma-sm q-gutter-sm">
      <q-btn
        :to="{ name: 'blog' }"
        color="primary"
        icon="fas fa-caret-square-left"
        fab
      />
    </div>
    <h1 class="text-white">Post {{ route.params.slug }}</h1>
  </q-parallax>
  <q-page padding>
      <!-- <div class="container" v-html="markedownTohtml">
        {{markedownTohtml}}
      </div> -->
    
    <q-card class="row items-center">
      <q-card-section class="col text-right">
        <img
          src="https://cdna.artstation.com/p/assets/images/images/028/368/304/large/charisse-smith-nh-icon-ellie.jpg?1594264084"
          alt="avatar"
          width="80"
        />
      </q-card-section>
      <q-card-section class="col">
        <div class="text-subtitle2">{{post.author}}</div>
        <div class="text-h6">"Post {{ route.params.slug }}"</div>
      </q-card-section>
    </q-card>

    <!-- <div class="row justify-center q-mt-lg">
      <div class="col-sm-4 col-lg-2">
        <q-card class="q-mr-lg-lg">
          <q-card-section>
            <div class="q-gutter-md">
              <div class="text-h6">Réactions</div>
              <q-list class="flex">
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-btn icon="fas fa-smile " color="blue" fab />
                  </q-item-section>
                  <q-item-section>
                    <span>37</span>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-btn icon="fas fa-heart " color="red" fab />
                  </q-item-section>
                  <q-item-section>
                    <span>128</span>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-btn icon="fas fa-sun " color="yellow" fab />
                  </q-item-section>
                  <q-item-section>
                    <span>17</span>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-8 col-lg-10">
        <q-card>
          <q-card-section v-html="markedownTohtml">
            {{markedownTohtml}}
          </q-card-section>
        </q-card>
      </div>
    </div> -->

    <!-- <div class="row justify-center q-mt-lg">
      <div class="col-sm-10 col-md-8">
        <h2 class="text-h4">Espace commentaires</h2>
        <q-card v-for="commentaire in commentaires" class="row q-mb-md">
          <q-card-section class="col-shrink">
            <img
              src="https://cdna.artstation.com/p/assets/images/images/028/368/304/large/charisse-smith-nh-icon-ellie.jpg?1594264084"
              alt="avatar"
              width="80"
              class="block"
            />
            <q-badge color="primary" label="John Doe" class="text-subtitle1" />
          </q-card-section>
          <q-card-section class="col">
            <p>
              {{commentaire.content}}
            </p>
            <div class="text-right text-italic text-grey">
              {{commentaire.posted_at}}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-sm-10 col-md-8">
        <h2 class="text-h4">Nouveau commentaire</h2>
        <q-form @submit="addComment" class="q-gutter-md">
          <q-input
            v-model="newComment"
            type="textarea"
            label="Votre message"
            rounded
            filled
          />
          <div>
            <q-btn
              label="Envoyer"
              type="submit"
              color="primary"
              class="full-width"
            />
          </div>
        </q-form>
      </div>
    </div> -->
  </q-page>
</template>

<script lang="ts">
import marked from "marked"

</script>