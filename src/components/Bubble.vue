<template>
  <div class="bubble--bg">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="983.667" height="382.504" viewBox="0 0 983.667 382.504">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="983.667" height="382.504" fill="#fffae4"/>
        </clipPath>
      </defs>
      <g id="Groupe_69" data-name="Groupe 69" transform="translate(0 0)">
        <g id="Groupe_48" data-name="Groupe 48" transform="translate(0 0)" clip-path="url(#clip-path)">
          <path id="Tracé_6" data-name="Tracé 6" d="M271.1,4.667s434.645-17,560.155,13.878,192.144,66.041,127.064,200.3c-9.3,23.445-5.424,70.33-5.424,70.33s14.721,75.657-75.928,78.855-671.721,30.9-768.568,0S36.35,252.948,36.35,252.948,5.479,243.09.222,136.8C-3.116,69.25,28.6,4.667,271.1,4.667" transform="translate(0 0)" fill="#fffae4"/>
        </g>
      </g>
    </svg>
    <span class="label">{{txt}}</span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  txt: String,
});
</script>

<style scoped>
@import "@/assets/css/bubble.css";
</style>

