<template>
  <!-- 具有异步设置的组件必须被Suspense 包含才能生效 -->
  <Suspense>
    <top-card></top-card>
  </Suspense>

</template>

<script lang="ts" setup>
import TopCard from './components/topCard/index.vue'
</script>

<style lang="scss" scoped>

</style>
