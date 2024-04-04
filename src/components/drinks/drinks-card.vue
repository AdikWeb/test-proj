<template>
  <router-link :to="to" class="drink-card">
    <lazy-img
      class="drink-card__image"
      :src="props.src"
    />
    <h4 class="drink-card__name">{{name}}</h4>
  </router-link>
</template>

<script setup lang="ts">
import LazyImg from "@/components/lazy-img.vue";

const props = defineProps<{
  id: string,
  src: string|null|undefined,
  to: string|null|undefined,
  name: string
}>()

</script>

<style scoped lang="scss">
@import "@/scss/common";
.drink-card{
  box-shadow: $box-shadow;
  position: relative;
  width: 220px;
  height: 200px;
  padding: 10px;
  display: block;
  text-decoration: none;
  color: #4d4d4d;
  &__image{
    width: 100%;
    height: 86%;
    &::v-deep(img){
      width: 100%;
      height: 100%;
    }
  }
  &__name{
    text-align: center;
    margin: 10px 0 0 0;
  }
}
</style>