<template>
   <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input filled v-model="form.title" label="Title" hint="Title" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" />
      <q-input filled type="textarea" v-model="form.content" label="Content" lazy-rules :rules="[ val => val !== null && val !== '' || 'Please type something']"/>
      <q-input filled type="file" v-model="form.image" label="Image" lazy-rules :rules="[ val => val !== null && val !== '' || 'Please put something']"/>
      <q-select filled type="textarea" v-model="form.category_id" :options="category" label="Category" lazy-rules :rules="[ val => val !== null && val !== '' || 'Please enter something']"/>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>
</template>

<script lang="ts" setup>
import { reactive, ref,onBeforeMount } from "vue";
import { RouterLink } from "vue-router";
import { useBlogStore, type Article, type Category } from "@/stores/blog";
import { useQuasar } from "quasar";

const $q = useQuasar();
const blogStore = useBlogStore();
  const form = reactive({
    title: "",
    content: "",
    category_id:"",
    image:""
  });
const category = ref<Category[]>([])

onBeforeMount(async () => {
  try {
    category.value = await blogStore.getCategory();
    console.log(category)
  }
  catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    })
  }
})

const onSubmit = async () =>{
   try {
     await blogStore.postArticle(form);
  }
  catch (error) {
    $q.notify({
      message: "Une erreur est survenu. Veuillez conctacter un administrateur.",
      type: "negative",
    })
  }
}



</script>