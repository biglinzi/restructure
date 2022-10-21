<template>
  <div class="exact-marketing-wrapper">
    <side-bar :items="menuList"></side-bar>
    <div class="main-content-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
import SideBar from "@/components/nav/SideBar.vue";
const menuList = reactive([
  {
    name: "toker-overview",
    title: "工作台",
    isLine: true,
  },
  {
    name: "toker-enterprise",
    title: "企业拓客",
  },
  {
    name: "toker-business",
    title: "商机拓客",
  },
  {
    name: "customers-new",
    title: "关联拓客",
    isIcon: true,
  },
  {
    name: "toker-industry",
    title: "产业获客",
    isIcon: true,
  },
  {
    name: "marketing-park",
    title: "园区拓客"
  },
  {
    name: "marketing-map",
    title: "地图拓客",
    isLine: true,
  },

  {
    name: "advanced-search",
    title: "高级筛选",
    isIcon: true,
  },
  {
    name: "marketing-admin",
    title: "营销方案",
  },
  {
    name: "business-follow",
    title: "商机跟进",
    isLine: true,
  },
  {
    name: "follow-enterprise",
    title: "关注企业"
  },
  {
    name: "recycle-bin",
    title: "回收站"
  },
])


</script>

<style lang="scss" scoped>

</style>
