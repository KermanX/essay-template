<script setup lang="ts">
defineProps(['caption'])
</script>

<template>
  <div relative text-center mb-4>
    <slot />
    <div mt--4 ml-8 style="font-family: KaTeX_Main, 'Times New Roman', serif;">
      <slot name="caption">{{ caption }}</slot>
    </div>
  </div>
</template>

<style scoped>
:deep(img) {
  margin: 0 auto;
  width: 100%;
}
</style>
