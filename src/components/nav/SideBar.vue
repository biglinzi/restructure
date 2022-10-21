<template>
  <div  class="sidebar-wrap" :class="collapse == true ? 'sidebar-collapse' : ''">
      <el-menu  class="sidebar-el-menu" :class="collapse == true ? 'sidebar-collapse' : ''" :default-active="activeMenu" :collapse="collapse" unique-opened @select="handleSelect">

      </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

  let collapse = ref(false)

  let activeMenu =computed(()=>{
      let routeName = useRoute().name
      if(['toker-searchDetail','toker-detail'].includes(routeName)){
        return "toker-enterprise"
      }else if(routeName == "marketing-recommend-detail"){
        return "marketing-recommend"
      }else if(['marketing-park-list','marketing-search-list','marketing-company-list'].includes(routeName)){
        return "marketing-park"
      }else if(['marketing-enterpriseList','marketing-group'].includes(routeName)){
        return "toker-industry"
      }else if(['marketing-result'].includes(routeName)){
        return "marketing-label"
      }else if(['industry-detail'].includes(routeName)){//产品拓客子菜单打开菜单标记
        return 'toker-industry'
      }else{
        var { meta, name } = useRoute();
        if (meta.activeMenu) return meta.activeMenu;
        return name;
      }
    })

</script>

<style lang="less" scoped>

</style>
