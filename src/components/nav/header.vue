<template>
  <header>
    <router-link to="/" class="logo">
      <img src="~@/assets/toker/know-logo.svg" alt="logo" />
    </router-link>

    <!-- 导航菜单 -->
    <h2 class="header-nav-title">
      <i></i>
      <span>金融版</span>
    </h2>
    <!-- <NotificationBanner /> -->
    <slot name="search"></slot>
    <!-- 用户 -->
    <slot name="user">
      <nav-menu :menu-list="userMenuList" class="nav-menu--user" popper-class="nav-menu-popup--user"></nav-menu>
    </slot>
  </header>
</template>

<script setup lang="ts">
import { useUserStore, usePerissionStore } from '@/stores';
import { reactive,watch } from 'vue';
import { useRoute } from 'vue-router';
interface submenuItemType{
    name:string,
    title:string
  }
const userMenuList =reactive([
  {
    name: "personal-home",
    title: "用户名",
    icon: "el-icon-user",
    children: [
      {
        name: "logout",
        title: "退出登录",
      },
    ],
  },
]) ;
const perissionStore = usePerissionStore()
const userStore = useUserStore()
const route = useRoute()
watch(route, (route) => {
  let { menuList = [] } = perissionStore//userData;
  let { name = '' } = userStore.userData

  let submenus:keys=[];
  // 企业中心
  if (menuList.some((item) => item.name === "org-admin")) {
    if (/^\/admin/.test(route.path)) {
      submenus.push({
        name: "home",
        title: "回到应用"
      });
    } else {
      submenus.push({
        title: "企业中心",
        name: "org-admin",
      });
    }
  }
  // 商机管理
  // if (menuList.some((item) => item.name === "business-admin")) {
  //   submenus.push({
  //     title: "商机管理",
  //     name: "business-admin",
  //   });
  // }

  if (/^\/personal/.test(route.path)) {
    submenus.unshift({
      name: "home",
      title: "回到应用"
    });
  }

  submenus.push({
    name: "logout",
    title: "退出登录",
  });
  // 显示用户名
  userMenuList[0].title= name;
  userMenuList[0].children=submenus;
})


</script>

<style scoped>

</style>
