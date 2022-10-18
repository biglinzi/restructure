<template>
  <CardLeftItem :data="leftData"></CardLeftItem>
  <CardRightItem :data="rightData"></CardRightItem>
</template>

<script lang="ts" setup>
import CardLeftItem from './cardLeftItem.vue'
import CardRightItem from './cardRightItem.vue'
  const props = defineProps<{
    data:cardData
  }>();
  const  {dayRate,weekRate,totals,type,dayAddRate,weekAddRate,todayTotals} = props.data
  const leftData = {dayRate,weekRate,totals,type}
  const rightData = {dayAddRate,weekAddRate,todayTotals,type}
</script>
<style lang="scss" scoped>
</style>
