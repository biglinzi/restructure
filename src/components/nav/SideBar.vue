<template>
  <div  class="sidebar-wrap" :class="collapse == true ? 'sidebar-collapse' : ''">
      <el-menu  class="sidebar-el-menu" :class="collapse == true ? 'sidebar-collapse' : ''" :default-active="activeMenu" :collapse="collapse" unique-opened @select="handleSelect">
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu v-permission="item.name" :index="item.name" :key="item.name" :disabled="item.disabled">
              <template slot="title">
                <i  v-show="item.sidebarLoading" class="sidebar_loading el-icon-loading"></i>
                <svg-icon :name="'sidebar-' + item.name" class-name="sidebar-svg" />
                <span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu v-if="subItem.subs" :index="subItem.name" :key="subItem.name"  v-permission="subItem.name" >
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.name" :key="subItem.id" >{{subItem.title}}</el-menu-item>
              </template>
            </el-submenu>
            <template><hr class="separator-line" :key="item.name + '-hr'"></template>
          </template>
          <template v-else>
            <el-menu-item v-permission="item.name" :index="item.name" :key="item.name" :disabled="item.disabled">
              <i v-show="item.sidebarLoading" class="sidebar_loading el-icon-loading"></i>
              <svg-icon :name="'sidebar-' + item.name" class-name="sidebar-svg" />
              <span slot="title">{{ item.title }}</span>
              <svg-icon v-show="item.isIcon && !collapse" name="sidebar-new" class-name="sidebar-svg right-svg" />
            </el-menu-item>
          </template>
          <template><hr v-show="item.isLine" class="separator-line" :key="item.name + '-line'"></template>
        </template>
      </el-menu>
      <div class="silder-but svg-parent" :class="collapse == true ? 'sidebar-collapse' : ''" @click="handleCollapse">
        <svg-icon v-show="collapse" name="sidebar-expand" class-name="sidebar-svg" hover />
        <svg-icon v-show="!collapse" name="sidebar-collapse" class-name="sidebar-svg" hover />
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

  let collapse = ref(false)
  let props = defineProps({
    items:{
      type:Object,
      default:(()=>[])
    }
  })
  let activeMenu =computed(()=>{
      let routeName = useRoute().name
      if(['toker-searchDetail','toker-detail'].includes(routeName as string)){
        return "toker-enterprise"
      }else if(routeName == "marketing-recommend-detail"){
        return "marketing-recommend"
      }else if(['marketing-park-list','marketing-search-list','marketing-company-list'].includes(routeName as string)){
        return "marketing-park"
      }else if(['marketing-enterpriseList','marketing-group'].includes(routeName as string)){
        return "toker-industry"
      }else if(['marketing-result'].includes(routeName as string)){
        return "marketing-label"
      }else if(['industry-detail'].includes(routeName as string)){//产品拓客子菜单打开菜单标记
        return 'toker-industry'
      }else{
        var { meta, name } = useRoute();
        if (meta.activeMenu) return meta.activeMenu;
        return name;
      }
    })
    const handleCollapse = ()=>{
      collapse.value  = !collapse.value;
    }

</script>

<style lang="less" scoped>
  @import url("~@/styles/theme.less");
.sidebar-wrap {
  width: 200px;
  transition: width 0.2s;
  box-shadow: 2px 0px 8px rgba(52, 67, 96, 0.15);
}
.sidebar-el-menu{
  position: fixed;
  top: 55px;
  bottom: 44px;
  width: 200px;
  overflow: auto;
  transition: width 0.2s;
  background: #fff;
  padding-top: 20px;
  border: none;
  .el-menu-item, .el-submenu__title {
    height: 36px;
    line-height: 36px;
    color: @color-text-primary;
    border-left: 4px solid transparent;
    position: relative;
    margin: 0 0 6px;
    visibility: inherit !important;
    &.is-active, &:hover {
      color: @color-primary;
      font-weight: bold;
      background: #F1F7FF;
    }
    &.is-active {
      border-left-color: @color-primary;
    }
    i.icon {
      margin-right: 10px;
      vertical-align: top;
      margin-top: 8px;
    }
  }
  & > .el-submenu {
    margin: 0 0 6px;
    visibility: inherit !important;
  }
  & > .el-submenu .el-submenu__title{
    margin: 0;
  }
  & > .el-submenu .el-menu-item {
    padding-left: 60px !important;
    margin: 2px 0 0;
    width: auto;
    min-width: auto;
    color: #666;
    visibility: inherit !important;
    &.is-active, &:hover {
      color: @color-primary;
    }
  }
  .sidebar_loading {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  .el-submenu__title,
  .el-menu-item {
    display: flex;
    align-items: center;
    & > .el-tooltip {
      display: flex !important;
      align-items: center;
    }
  }
  .sidebar-svg {
    font-size: 20px;
    padding-right: 7px;
    &.right-svg {
      order: 5;
      padding: 0 0 0 7px;
    }
  }
}
.sidebar-collapse {
  width: 64px !important;
  transition: width 0.5s;
}
.silder-but {
  position: fixed;
  left: 0;
  bottom: 0px;
  z-index: 999;
  width: 200px;
  height: 44px;
  padding: 0 20px;
  transition: width 0.5s;
  background: #F8F8F8;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
}
.separator-line {
  margin: 10px 0;
  border: none;
  height: 1px;
  background-color: #eee;
}
</style>
