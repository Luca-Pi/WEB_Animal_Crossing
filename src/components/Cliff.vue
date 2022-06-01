<template>
    <div class="relative cliff--container">
        <q-img src="/images/svg/sapin.png" class="sapin" fit="contain"/>
        <section class="land">
            <slot></slot>
        </section>
        <q-img src="/images/svg/falaise.svg" class="cliff"/>
     </div>
</template>
<style lang="scss">
  @import "@/assets/scss/cliff.scss";
</style>