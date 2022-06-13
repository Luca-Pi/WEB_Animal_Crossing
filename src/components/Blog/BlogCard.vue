<template>
  <router-link :to="`/blog/${post.id}`">
    <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <!-- <img :src="props..icon"> -->
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{props?.post?.title}}</q-item-label>
          <q-item-label caption>{{props?.post?.author}}</q-item-label>
        </q-item-section>
      </q-item>
       <!-- <img :src="props?.post?.img_url" /> -->
    </q-card>
  </router-link>
</template>
<script lang="ts" setup>
import {ref} from "vue"
import { RouterLink } from "vue-router";
import type {Article} from "@/stores/blog"

 
const props = defineProps<{
  post: Article
}>()


</script>