<template>
  <q-page class="text-center">
    <HeroSection />
    <MenuSection />
    <BirthdaySection />
    <Waves />
  </q-page>
</template>

<script setup lang="ts">
import HeroSection from "@/components/Home/HeroSection.vue"
import MenuSection from "@/components/Home/MenuSection.vue"
import BirthdaySection from "@/components/Home/BirthdaySection.vue"
import Waves from "@/components/Home/Waves.vue"
</script>

<style scoped>
@import "@/assets/css/home.css";
</style>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
