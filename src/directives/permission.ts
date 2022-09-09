function assertPermission(binding, menuList):string {
  return menuList.some(menu => {
    if (typeof binding.value === "string") {
      return binding.value === menu.name;
    }
    if (Array.isArray(binding.value)) {
      return binding.value.includes(menu.name);
    }
    if (
      Object.prototype.toString.call(binding.value) === "[object Object]"
    ) {
      return binding.value[binding.arg || "name"] === menu.name;
    }
  });
}
/**
 * 元素级权限配置
 * 权限验证时先经过路由，路由通过后在渲染页面过程中执行指令
 */
export default {
  inserted(el, binding, vnode) {
    let { menuList = [] } = vnode.context.$store.state.userData;
    let hasPermission = assertPermission(binding, menuList);
    if (!hasPermission) {
      if (binding.modifiers.nested) {
        el.parentNode.parentNode.removeChild(el.parentNode);
      } else el.parentNode.removeChild(el);
    }
  }
};
