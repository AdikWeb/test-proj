<template>
  <div class="lazy-img">
    <LoadingIcon v-if="isLoading" />
    <img
      v-show="!isLoading"
      :src="src"
      :alt="alt"
      :class="`image__object-fit--${fit}`"
      @load="onImageLoaded"
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, toRefs, withDefaults } from "vue";
import LoadingIcon from "@/components/icons/loading-icon.vue";

interface iProps {
  src: string | null | undefined;
  alt?: string;
  fit?: string;
}

const props = withDefaults(defineProps<iProps>(), {
  alt: "",
  fit: "cover",
});

const { src } = toRefs<iProps>(props);
const isLoading = ref<boolean>(true);

watch(src, () => {
  isLoading.value = true;
});

function onImageLoaded(): void {
  isLoading.value = false;
}
</script>

<style scoped lang="scss">
.image{
  &__object-fit{
    &--cover{
      object-fit: cover;
    }
    &--contain{
      object-fit: contain;
    }
  }
}

.lazy-img{
  position: relative;
  display: flex;
  svg {
    position: absolute;
    left: calc(50% - 1.25rem/2);
    top: calc(50% - 1.25rem/2);
  }

  &__loading{
    width: 100%;
    height: 100%;
  }
}
</style>