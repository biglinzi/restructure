<template>
  <div class="none-data">
    <img
      src="~@/assets/img/wushuju.png"
      srcset="~@/assets/img/wushuju@2x.png"
      alt=""
    /><span>{{ emptyText }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  emptyText: {
    type: String,
    default: '暂无数据',
  },
})
</script>

<style lang="less" scoped>
.none-data {
  text-align: center;
  padding-top: 10px;

  & > img {
    height: 80px;
    vertical-align: middle;
  }

  & > span {
    font-size: 12px;
    color: #999;
  }
}
</style>
