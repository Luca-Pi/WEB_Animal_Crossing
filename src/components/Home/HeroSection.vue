<template>
  <div class="HeroSection">
    <img
      class="HeroSection__logo"
      src="/images/home/logo.png"
      alt="Island crossing logo"
    />
    <img
      class="HeroSection__villager"
      src="/images/home/villager.png"
      alt="A villager"
    />
  </div>
</template>

<style scoped lang="scss">
.HeroSection {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  height: 100vh;
  padding: 0 20%;
  gap: 20%;
  align-items: center;
  justify-items: center;
  background: url("/images/home/hero-background.png") no-repeat 50% bottom;
  object-fit: cover;

  &__logo {
  }

  &__villager {
    background: white;
    border-radius: 1000px;
  }
}
@media (max-width: $breakpoint-sm-max) {
  .HeroSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5%;
    padding: 0;
    z-index: 10;

    &__logo {
      max-width: 300px;
    }

    &__villager {
      max-width: 300px;
      max-height: 300px;
    }
  }
}
</style>
