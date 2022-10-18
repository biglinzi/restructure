<template>
  <p class="busine-total" style="color:#E07878">{{data.todayTotals}}</p>
  <p class="total-all">新增商机（{{data.type}}）</p>
  <div>
    <span>周同比</span>
    <i class="icon-arrow-up"></i>
    <span>{{data.weekAddRate}}</span>
    <span class="content-span">日环比</span>
    <i class="icon-arrow-down"></i>
    <span>{{data.dayAddRate}}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    data:rightItemData
  }>()
</script>

<style scoped>

</style>
