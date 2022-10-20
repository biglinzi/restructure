<template>
  <CardLeftItem :data="leftItemData"></CardLeftItem>
  <CardRightItem :data="rightItemData"></CardRightItem>
</template>

<script lang="ts" setup>
import CardLeftItem from './cardLeftItem.vue'
import CardRightItem from './cardRightItem.vue'
  const props = defineProps<{
    data:cardData
  }>();
  const {leftItemData,rightItemData} = props.data
</script>
<style lang="scss" scoped>
</style>
