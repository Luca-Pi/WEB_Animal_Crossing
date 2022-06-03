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
    <q-card class="row items-center">
      <q-card-section class="col text-right">
        <img
          src="https://cdna.artstation.com/p/assets/images/images/028/368/304/large/charisse-smith-nh-icon-ellie.jpg?1594264084"
          alt="avatar"
          width="80"
        />
      </q-card-section>
      <q-card-section class="col">
        <div class="text-subtitle2">John Doe présente :</div>
        <div class="text-h6">"Post {{ route.params.slug }}"</div>
      </q-card-section>
    </q-card>

    <div class="row justify-center q-mt-lg">
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
          <q-card-section>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores omnis quae voluptas corporis eius sint, consectetur
              repellat architecto consequuntur vel iste quod itaque vero in
              quaerat possimus doloribus dignissimos illo! Expedita in
              architecto eius quas animi repellendus. Tenetur laboriosam
              repellat eligendi ea, temporibus doloribus quam accusantium
              excepturi, dicta iste consequuntur.
            </p>
            <p>
              Voluptates eligendi non, delectus quis soluta fugiat nisi minima,
              voluptate dolore vitae iure repellendus perspiciatis debitis,
              nesciunt optio magnam distinctio veritatis odio! Quibusdam quia
              beatae dolorem incidunt officiis, culpa laborum odit amet vel
              deleniti illo eligendi adipisci a corrupti architecto est
              repellendus corporis vero tenetur! Est tempora dignissimos
              doloremque sunt.
            </p>
            <p>
              Ullam corporis repellendus ducimus natus, dignissimos quam,
              repudiandae a vitae vel amet deserunt! Ab, voluptatem ea? Aliquid
              iure sapiente consectetur blanditiis! Commodi sed fugiat laborum
              ipsa voluptate, deleniti eaque voluptas aperiam dicta perferendis
              amet odit iure cum distinctio itaque impedit adipisci quae
              deserunt. Temporibus pariatur eum veniam, perspiciatis corporis
              dolores?
            </p>
            <p>
              Cumque pariatur excepturi perferendis voluptatem corrupti
              explicabo cupiditate placeat. Veritatis placeat fugiat reiciendis
              distinctio eligendi, optio obcaecati quia tempore, officia quod
              perferendis rem pariatur tempora numquam omnis dolorum
              voluptatibus! Hic quisquam facere vitae nam eveniet corrupti
              inventore mollitia quas possimus? Aliquam, ipsa ad laboriosam
              nulla iure nesciunt culpa delectus. Alias!
            </p>
            <p>
              Consequuntur dicta sequi minus, rem nesciunt possimus voluptas ea
              quod, repellat dignissimos deleniti voluptatem totam laboriosam
              illum quidem hic id aliquam inventore non. Ab facilis consectetur
              non, ducimus ad asperiores officia iusto nesciunt pariatur est
              inventore, cupiditate rerum officiis commodi consequuntur numquam
              aperiam tempore animi sunt nam perferendis reiciendis. Nisi?
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <div class="col-sm-10 col-md-8">
        <h2 class="text-h4">Espace commentaires</h2>
        <q-card v-for="i in 3" class="row q-mb-md">
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              vero aspernatur accusamus nisi veritatis ipsum ullam, voluptates
              voluptate quis necessitatibus voluptatum quia tempore unde omnis
              quas, dolore doloribus a sit aut? Totam error veniam sunt a non
              dolor asperiores quis esse! Earum deserunt, rerum iusto debitis
              facere dolor. Ipsam, error?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Repellendus corporis voluptatum officiis accusamus suscipit quasi
              tenetur quis, exercitationem porro optio?
            </p>
            <div class="text-right text-italic text-grey">
              Envoyé le 01/01/1900 à 00h00
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const newComment = ref("");

function addComment() {}
</script>
