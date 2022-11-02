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
import { reactive,ref,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Routers } from "@/router/router";
// import { getMessage } from '@api/personal.api'
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
let router = useRouter()
const handleRouterChange=(route)=>{
  let { menuList = [] } = perissionStore//userData;
  let { name = '' } = userStore.userData

  // any  待解决处
  let submenus:any[]=[];
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
  console.log(route)
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
}
watch(route, route=>handleRouterChange(route),{immediate:true})

const goToMessage = ()=>{
  (router as unknown as Routers).$open({ name: "personal-message", })
}
let messageList = []
let messageTotal =0
// const loadMessage = ()=>{
//   getMessage({
//     status:1,
//     pageSize:5,
//     pageNum:1,
//     systemCode:'octopus'
//   }).then(res=>{
//     messageList = reactive(Array.isArray(res.list) ? res.list : [])
//     messageTotal = ref(res.totalCount)
//   })
// }


</script>

<style lang="less" scoped>
@import url("~@/styles/theme.less");

.header-nav-wrapper {
  position: fixed;
  top: 0;
  height: @height-header;
  width: 100%;
  padding: 0 20px 0 0;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 2px 6px 0px rgba(52, 67, 96, 0.1);
  z-index: 999;
  .header-nav-title {
    display: inline-block;
    line-height: 60px;
    font-size: 24px;
    font-weight: 700;
    color: #3a6de6;
    &>i {
      display: inline-block;
      margin: 3px 15px 0 0px;
      vertical-align: text-top;
      border-left: 1px solid #e9e9e9;
      height: 30px;
      vertical-align: text-bottom;
    }
    &>span {
      font-size: 16px;
      margin-left: 15px;
      color: #344360;
    }
  }
  .header-nav-custom {
    display: inline-block;
    width: 100px;
    height: 60px;
    float: right;
    position: relative;
    right: 12px;
    cursor: pointer;
    &>h2 {
      line-height: 60px;
      font-size: 16px;
      text-align: right;
      &>i {
        width: 19px;
        height: 19px;
        display: inline-block;
        background: url("~@/assets/marketing/expand_user@2x.png") no-repeat;
        background-size: 19px 19px;
        position: absolute;
        top: 21px;
        right: 69px;
      }
    }
  }
  .header-nav-official {
    width: 200px;
    height: 60px;
    float: right;
    position: absolute;
    right: 240px;
    top: 10px;
  }
  &>a {
    float: left;
    height: @height-header;
    line-height: @height-header;
    text-decoration: none;
    font-size: 18px;
    color: @color-text-module;
    &.logo {
      width: 200px;
      text-align: center;
      background: transparent !important;
      &>img {
        height: 36px;
        vertical-align: middle;
      }
    }
    &.about {
      float: right;
      padding: 0 12px;
    }
    &.router-link-exact-active {
      font-weight: bold;
      color: @color-text-nav;
      background-color: @color-primary-background;
    }
  }
  .ka-platform {
    float: right;
    margin-right: 12px;
    font-size: 16px;
    font-weight: bolder;
  }
  &>.nav-menu--header {
    float: left;
  }
  &>.nav-menu--user {
    float: right !important;
    .el-submenu .el-submenu__title {
      &>a {
        padding: 0 10px;
        font-size: 15px;
        &.router-link-active {
          font-weight: normal;
          color: @color-primary;
          background: #fff;
          i[class^="el-icon"] {
            color: @color-primary;
          }
        }
      }
    }
  }
  &>.message-popover {
    float: right;
    .el-popover__reference {
      position: relative;
      margin-top: 13px;
      padding: 3px 0;
      font-size: 22px;
      .reference-box {
        cursor: pointer;
      }
      .reference-box>.el-icon-message-solid {
        color: @color-text-secondary;
      }
      .reference-box>span {
        position: absolute;
        right: 0;
        top: 2px;
        font-size: 12px;
        border-radius: 50%;
        background: #e05454;
        color: #ffffff;
        font-weight: bold;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        pointer-events: none;
      }
    }
  }
}

.el-popover.message-list-popover {
  padding: 0;
  .message-list {
    .message-list-header {
      height: 40px;
      line-height: 40px;
      color: #344360;
      font-weight: bold;
      padding: 0 15px;
      font-size: 16px;
      border-bottom: 1px solid #eeeeee;
      span {
        color: @color-text-regular;
        font-size: 14px;
        i {
          color: #e05454;
          font-style: normal;
        }
      }
    }
    ul {
      li {
        border-bottom: 1px solid #eeeeee;
        padding: 15px 15px;
        cursor: pointer;
        .type-title {
          color: @color-text-regular;
          margin-bottom: 10px;
          font-size: 14px;
          span {
            float: right;
            font-size: 12px;
            color: @color-text-secondary;
          }
        }
        .message-desc {
          color: @color-text-regular;
          font-size: 12px;
          .message-desc-ent,
          .message-desc-signal {
            font-weight: bold;
            margin-right: 5px;
          }
        }
      }
      li:hover {
        background-color: #edf3fb;
      }
    }
    .message-bottom {
      text-align: center;
      background: #f8f8f8;
      height: 37px;
    }
  }
}

.nav-menu-popup--user {
  .el-menu-item.divider {
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
  }
}

.knowlegene-center-wrapper {
  h3 {
    padding: 5px 0 6px;
    margin-bottom: 14px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  max-width: 350px;
  .app-link {
    display: inline-block;
    margin: 10px;
    width: 60px;
    text-align: center;
    color: #666;
    img {
      width: 36px;
    }
    span {
      display: block;
    }
    &.disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
</style>
