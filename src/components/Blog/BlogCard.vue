<template>
  <div class="col-4">
    <router-link :to="`/blog/${post.id}`">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section>
            {{ props?.post?.content }}
          </q-card-section>
  
          <q-img
            class="col-5"
             :src="'http://localhost:8000'+props?.post?.image_url"
          />
        </q-card-section>
      </q-card>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue"
import { RouterLink } from "vue-router";
import type {Article} from "@/stores/blog"

 
const props = defineProps<{
  post: Article
}>()


</script>