import type { Plugin } from 'vite';

export default function Monitor(): Plugin {
  return {
    name: 'vite-plugin-monitor',
    apply: 'serve',
    config(userConfig, env) {
      console.log(userConfig);
      console.log(env)
      // 可以做进一步的修改，会自动合入当前的配置
      // return
    },
  };
}