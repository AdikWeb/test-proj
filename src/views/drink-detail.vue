<template>
  <div v-if="!isLoading && detailData" class="drink-detail">
    <div class="drink-detail__grid">
      <div class="drink-detail__info">
        <h1>{{ detailData?.strDrink }}</h1>
        <p class="description">{{ detailData?.strInstructions }}</p>
        <ul class="ingredients">
          <li v-for="(item, index) in detailData.ingredients" :key="index">
            {{item.ingredient}}{{item.measure && `: ${item.measure}`}}
          </li>
        </ul>
        <div class="tags">
          <Tags v-for="tag in tags" :key="tag">{{tag}}</Tags>
        </div>
      </div>
      <lazy-img class="drink-detail__img" :src="detailData?.strDrinkThumb" fit="cover"/>
    </div>
  </div>
  <div v-else-if="isLoading" class="loading-indicator">Loading...</div>
  <div v-else class="no-data-message">No data available</div>
</template>

<script setup lang="ts">
import LazyImg from "@/components/lazy-img.vue";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {useDrinksStore} from "@/store";
import {CocktailFormatted} from "@/types/Drinks/Drinks.ts";
import Tags from "@/components/tags-vue.vue";

const drinksStore = useDrinksStore();
const route = useRoute();

const cocktailCode = route.params.cocktail_code as string;
const drinkId = route.params.id as string;

const detailData = ref<CocktailFormatted|null>(null);
const tags = ref<string[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  await drinksStore.fetchCocktails(cocktailCode);
  detailData.value = drinksStore.getDrinksObjectByID(cocktailCode, drinkId);
  if(detailData.value){
    tags.value = detailData.value.strTags ? detailData.value.strTags.split(',') : [];
  }
  isLoading.value = false;
});
</script>

<style scoped lang="scss">
.drink-detail{
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-flow: row;
    grid-gap: 20px;
  }

  &__info{
    margin-bottom: 10px;
    .description, .ingredients{
      font-size: 0.875rem;
    }
    .ingredients{
      padding-left: 16px;
    }
    .tags{
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
  }
  &__img{
    &::v-deep(img){
      width: 100%;
      height: 100%;
    }
  }
}
</style>