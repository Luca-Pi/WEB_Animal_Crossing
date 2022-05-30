<template>
  <q-header style="background-color:#9CCFC6;" elevated reveal>
    <q-toolbar class="row full-height">
      <div class="col-5 ">
        <RouterLink to="/" custom v-slot="{ navigate }">
          <div @click="navigate" class="cursor-pointer">
            <q-avatar>
              <img
                src="/images/svg/icon.svg"
                style="
                  margin-left: 0;
                  margin-right: 0;
                  width: 30px;
                "
              />
            </q-avatar>
            <span
              class="text-h5"
              style="font-size: medium; margin-left: 0; margin-right: 0"
              >Island Crossing</span
            >
          </div>
        </RouterLink>
      </div>

      <div class="col text-center" >
        <span
          class="text-h5"
          style="font-size: medium;margin: 2.5%;"
          >Profil</span
        >
        <span
          class="text-h5"
          style="font-size: medium; margin: 2.5%;"
          >Catégorie</span
        >
        <span
          class="text-h5"
          style="font-size: medium;margin: 2.5%;"
          >Anniversaire</span
        >
      </div>
    </q-toolbar>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/svg-with-js.min.css"
      integrity="sha512-T22AGZA32A7BJVwM85+3QTgGxP7lSHb88UwE3b19YtWs0mw6x27Pw5ea/60BQkcKO4vzzsXW230pxPdw6TthGQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </q-header>
</template>



<style scoped lang="scss">
.q-header {
  height: 80px;
}
</style>
