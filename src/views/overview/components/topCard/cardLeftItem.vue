<template>
  <p class="busine-total">{{data.totals}}</p>
  <p class="total-all">商机总数（{{data.type}}）</p>
  <div>
    <span>周同比</span>
    <i class="icon-arrow-up"></i>
    <span>{{data.weekRate}}</span>
    <span class="content-span">日环比</span>
    <i class="icon-arrow-down"></i>
    <span>{{data.dayRate}}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    data:leftItemData
  }>()
</script>

<style scoped>

</style>
