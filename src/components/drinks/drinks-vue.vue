<template>
  <div v-if="drinksList && drinksList.length" class="drinks-cards__list">
    <drinks-card
      v-for="{idDrink, strDrinkThumb, strDrink} in drinksList"
      :key="idDrink"
      :id="idDrink"
      :src="strDrinkThumb"
      :name="strDrink"
      :to="`/${cocktailCode}/${idDrink}`"
    />
  </div>
  <div v-else-if="!drinksList" class="loading-indicator">Loading...</div>
  <div v-else class="no-data-message">No data available</div>
</template>

<script setup lang="ts">
import DrinksCard from "@/components/drinks/drinks-card.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useDrinksStore } from "@/store";
import { onMounted, ref } from "vue";
import { Cocktail } from "@/types/Drinks/Drinks.ts";

const route = useRoute();
const cocktailCode = ref<string>(route.params.cocktail_code as string);

const drinksStore = useDrinksStore();
const drinksList = ref<Cocktail[] | null>(null);

onBeforeRouteUpdate(async (to) => {
  cocktailCode.value = to.params.cocktail_code as string;
  await fetchCocktailData(cocktailCode.value);
});

onMounted(async () => {
  await fetchCocktailData(cocktailCode.value);
});

const fetchCocktailData = async (code: string) => {
  await drinksStore.fetchCocktails(code);
  drinksList.value = drinksStore.getDrinksByCode(code);
};
</script>

<style scoped lang="scss">
.drinks-cards {
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    .drink-card {
      flex-grow: 1;
    }
  }
}
</style>
