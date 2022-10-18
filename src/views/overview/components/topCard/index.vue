<template>
  <Card :data="data.leftData"/>
  <Card :data="data.rightData"/>
</template>
<script lang="ts" setup>
import Card from './card.vue'
import {reactive} from 'vue'
import {getStatistics} from '@api/networks/marking.api'

  let data
  getStatistics<getStatisticsResType>({}).then(res=>{
      // data = res.data
      console.log(res)

      // data =reactive({
      //   leftData:
      //   rightData:
      // })
  })
</script>
<style lang="scss" scoped>
</style>
