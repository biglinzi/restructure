<template>
  <div class="exact-marketing-wrapper">
    <side-bar v-if="menuState" :items="menuList"></side-bar>
    <div class="main-content-box">
      <router-view @menuState ="setMenuState" :key="(route.name as string)"></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {reactive, ref} from 'vue'
  import SideBar from "@/components/nav/SideBar.vue";
  import { useRoute, useRouter } from 'vue-router';
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
  let menuState = reactive({})
  let activeMenu = ref('marketing-overview')
  const router = useRouter()
  const route= useRoute()
  let key = route.params.key||''
  let suffix = key.length?("/"+key):'';
  activeMenu = ref((route.name as string) + suffix)

  const setMenuState =(state)=>{
    menuState = reactive(state)
  }
  const handleSelectMenu=(index)=>{
    let nameArr = index.split("/");
      if (nameArr.length === 1) {
        router.push({
          name: index
        })
      } else {
        router.push({
          name: nameArr[0],
          params: {
            key: nameArr[1]
          }
        })
      }
  }
</script>

<style lang="less" scoped>
@import url("~@/styles/theme.less");
.exact-marketing-wrapper {
  min-height: calc(100vh - 60px);
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  &>.el-menu {
    min-width: 200px;
    width: 200px;
    padding: 20px 0;
    .el-menu-item {
      height: 36px;
      line-height: 36px;
      margin-bottom: 5px;
      padding-left: 30px !important;
      font-size: 14px;
      &.is-active {
        background-color: rgba(38, 128, 202, 0.1);
        ;
        color: @color-primary;
        font-weight: bold;
      }
    }
    &>.el-submenu {
      .el-submenu__title {
        height: 36px;
        line-height: 36px;
        margin-bottom: 5px;
        padding-left: 30px !important;
        font-size: 14px;
      }
      &>.el-menu>.el-menu-item {
        padding-right: 10px;
        padding-left: 70px !important;
      }
    }
  }
  &>.main-content-box {
    flex: 1;
    padding: 20px 20px 0;
    width: 80%;
    position: relative;
  }
}
</style>
