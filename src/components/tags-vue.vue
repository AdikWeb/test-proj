<template>
  <div class="tag">
    <slot/>
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss">
.tag{
  font-size: 0.75rem;
  background: #d1d1d1;
  border-radius: 5px;
  padding: 5px 10px;
  width: max-content;
}
</style>