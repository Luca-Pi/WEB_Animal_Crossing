<template>
  <q-page class="text-center">
    <BlogCard :v-if="posts?.length > 0" v-for="post in posts" :key="post.id" :post="post"/>
    <router-link to="/new-article">
      <q-btn color="primary" >
        Nouvelle article
      </q-btn>
    </router-link>
  </q-page>
</template>

<script setup lang="ts">
import { useBlogStore, type Article } from "@/stores/blog";
import { useQuasar } from "quasar";
import { onBeforeMount, ref } from '@vue/runtime-core';
import BlogCard from '@/components/Blog/BlogCard.vue';
import { RouterLink } from "vue-router";

const $q = useQuasar();
const blogStore = useBlogStore();

const posts = ref<Article[]>([])

onBeforeMount(async () => {
  try {
    posts.value = await blogStore.getArticles();
  }
  catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    })
  }
})
</script>
