<template>
  <nav class="nav-side">
    <router-link
      v-for="item in navSideItems"
      :key="item"
      :to="`/${item}`"
      class="nav-side__item"
      :class="{ 'active': isActive(item) }">
      {{item}}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDrinksStore } from "@/store";
import { useRoute } from "vue-router";

const drinksStore = useDrinksStore();
const navSideItems = ref<string[]>(drinksStore.cocktailsCategory);
const route = useRoute();

const isActive = (item: string) => {
  return route.params.cocktail_code === item;
};
</script>

<style scoped lang="scss">
@import "@/scss/common";
.nav-side {
  padding: 10px;
  box-shadow: $box-shadow;
  &__item {
    margin-bottom: 5px;
    padding: 5px 10px;
    display: block;
    text-decoration: none;
    color: #4d4d4d;
    border-radius: 5px;
    background-color: lightgrey;
    transition: background-color, color;
    transition-duration: 300ms;
    &:hover {
      background-color: #7e7e7e;
      color: #fff;
    }
  }
  &__item.active {
    background-color: #4d4d4d;
    color: #fff;
  }
}
</style>
