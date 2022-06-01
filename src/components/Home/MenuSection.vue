<template>
  <section class="MenuSection">
    <div class="MenuSection__Menu" ref="menu">
      <router-link
        class="with-background MenuSection__Menu-item"
        v-for="menuItem in menuItems"
        :key="menuItem.label"
        :to="menuItem.to"
      >
        <span class="MenuSection__Menu-item-label">
          {{ menuItem.label }}
        </span>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string,
  to: string,
}

const menuItems: MenuItem[] = [
  {
    label: 'Personnages',
    to: '/characters',
  },
  {
    label: 'Villageois',
    to: '/villagers',
  },
  {
    label: 'Musiques',
    to: '/musics',
  },
  {
    label: 'Insectes',
    to: '/insects',
  },
  {
    label: 'Poissons',
    to: '/fishes',
  },
  {
    label: 'Lieux',
    to: '/',
  },
  {
    label: 'Créatures',
    to: '/sea-creatures',
  },
  {
    label: 'Fossiles',
    to: '/',
  },
  {
    label: 'To do',
    to: '/',
  },
]

</script>

<style scoped lang="scss">
.MenuSection {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #14AC7E;
  height: 120vh;
  border-radius: 0 0 110px 110px;
  z-index: 9;

  &__Menu {
    display: grid;
    width: 1200px;
    height: 100%;
    padding: 100px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 8px;



    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
      text-decoration: none;

      &-label {
        font-size: 1.5rem;
        color: #fff;
        font-family: "FinkHeavy Regular", sans-serif;
        padding: .5rem 1rem;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.4);
      }

      &:nth-child(1) {
        grid-area: 1 / 1 / 3 / 3;
        background-position: 0 0;

        &:hover {
          background: url("/images/home/menu_characters_background.jpg") 50% 10%;
        }
      }

      &:nth-child(2) {
        grid-area: 1 / 3 / 3 / 5;
        background-position: 50% 0;

        &:hover {
          background: url("/images/home/menu_villager_background.png") 50% 10%;
        }
      }

      &:nth-child(3) {
        grid-area: 1 / 5 / 3 / 6;
        background-position: 80% 0;

        &:hover {
          background: url("/images/home/menu_music_background.jpg");
        }
      }

      &:nth-child(4) {
        grid-area: 3 / 1 / 4 / 2;
        background-position: 0 45%;

        &:hover {
          background: url("/images/home/menu_insect_background.jpg") no-repeat;
          background-size: 300px;
        }
      }

      &:nth-child(5) {
        grid-area: 3 / 2 / 5 / 3;
        background-position: 20% 60%;


        &:hover {
          background: url("/images/home/menu_fishing_background.jpg") 40%;
        }
      }

      &:nth-child(6) {
        grid-area: 3 / 3 / 5 / 6;
        background-position: 66% 60%;

        &:hover {
          background: url("/images/home/menu_location_background.jpg");
        }
      }

      &:nth-child(7) {
        grid-area: 4 / 1 / 6 / 2;
        background-position: 0 92%;

        &:hover {
          background: url("/images/home/menu_creature_background.jpg");
        }
      }

      &:nth-child(8) {
        grid-area: 5 / 2 / 6 / 5;
        background-position: 33% 92%;

        &:hover {
          background: url("/images/home/menu_fossile_background.jpg") 50% 40% no-repeat;
          background-size: 800px;
        }
      }

      &:nth-child(9) {
        grid-area: 5 / 5 / 6 / 6;
        background-position: 80% 92%;
      }
    }
  }
}

.with-background {
  background: url("/images/home/menu_background.png") no-repeat 0 5%;
  background-size: 1200px;
}

</style>
