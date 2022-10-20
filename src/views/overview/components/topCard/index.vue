<template>
  <div>
    <Card :data="data.leftData"/>
    <Card :data="data.rightData"/>
  </div>
</template>
<script lang="ts" setup>
import Card from './card.vue'
import {reactive} from 'vue'
import {getStatistics} from '@api/networks/marking.api'

  let data = await getStatistics<getStatisticsResType>({}).then(res=>{
    let {dayRate,weekRate,totals,weekAddRate,dayAddRate,todayTotals,areaTotals,weekAreaRate,weekAddAreaRate,todayAreaTotals,dayAddAreaRate,dayAreaRate} = res.data
    let type = '全国',types = '管辖客户'

    let data = reactive({
      leftData:{
        leftItemData:{dayRate,weekRate,totals,type},
        rightItemData:{weekAddRate,dayAddRate,todayTotals,type}
      },
      rightData:{
        leftItemData:{'dayRate':dayAreaRate,'weekRate':weekAreaRate,'totals':areaTotals,type},
        rightItemData:{'dayAddRate':dayAddAreaRate,'weekAddRate':weekAddAreaRate,'todayTotals':todayAreaTotals,types}
      }
    })
    return data
  })
</script>
<style lang="scss" scoped>
</style>
