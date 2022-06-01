<template>
  <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
    </defs>
    <g class="parallax">
      <use xlink:href="#gentle-wave" x="48" y="0"/>
      <use xlink:href="#gentle-wave" x="48" y="3"/>
      <use xlink:href="#gentle-wave" x="48" y="5"/>
      <use xlink:href="#gentle-wave" x="48" y="7"/>
    </g>
  </svg>
</template>

<style scoped lang="scss">

.waves {
  z-index: 10;
  position: relative;
  margin-top: -60px;
  width: 100%;
  height: 5vh;
  min-height: 100px;
  max-height: 150px;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax > use:nth-child(1) {
  fill: rgba(#9CCFC6, 0.7);
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  fill: rgba(#9CCFC6, 0.5);
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  fill: rgba(#9CCFC6, 0.3);
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  fill: #9CCFC6;
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
}
</style>
