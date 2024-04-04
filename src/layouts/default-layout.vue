<template>
  <div class="default-layout">
    <nav-side/>
    <div class="default-layout__content">
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavSide from "@/components/nav-side.vue";

</script>

<style scoped lang="scss">
.default-layout {
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  min-height: 100vh;

  &__content {
    padding: 10px;
    width: 100%;
  }

  .nav-side{
    max-width: 300px;
    width: 100%;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    .nav-side{
      max-width: 100%;
    }
    &__content {
      padding: 10px;
      width: auto;
    }
  }
}

</style>