<template>
  <div class="overview-top-card">
    <Card class="overview-left" :data="data.leftData"/>
    <Card class="overview-left" :data="data.rightData"/>
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
<style lang="less" scoped>
.overview-top-card {
  display: flex;
  width: 100%;
  height: 172px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(208, 216, 225, 0.69);
  border-radius: 8px;
  .overview-left {
    width: 49%;
    height: 100%;
    display: flex;
  }
  .content-left {
    width: 50%;
    height: 100%;
    text-align: center;
    padding: 18px;
    &>div {
      color: #666666;
      font-size: 14px;
    }
  }
  .content-right {
    width: 50%;
    height: 100%;
    text-align: center;
    padding: 18px;
    &>div {
      color: #666666;
      font-size: 14px;
    }
  }
  .content-span {
    margin-left: 15px;
  }
  .icon-arrow-up,
  .icon-arrow-down {
    width: 20px;
    height: 20px;
    transform: scale(.7) translateY(4px);
  }
  .icon-arrow-up {
    background-image: url(~@/assets/marketing/sprite.png);
    background-position: -184px -172px;
  }
  .icon-arrow-down {
    background-image: url(~@/assets/marketing/sprite.png);
    background-position: -192px -204px;
  }
  .overview-span {
    display: inline-block;
    width: 1px;
    height: 123px;
    opacity: 0.5;
    border: 0.5px solid #eee;
    margin-top: 25px;
  }
  .overview-right {
    width: 49%;
    height: 100%;
    display: flex;
  }
  .busine-total {
    font-size: 36px;
    font-weight: bold;
    color: #3A6DE6;
  }
  .total-all {
    margin: 10px 0 20px 0;
    font-size: 14px;
    color: #666666;
  }
}
</style>
