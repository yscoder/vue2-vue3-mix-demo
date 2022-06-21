# vue2-vue3-mix

在一个项目中同时使用 vue2 和 vue3。

## 思路

1. 同时安装 `vite-plugin-vue2`、`@vitejs/plugin-vue`，并基于一个新的插件，匹配 vue2 代码文件，有选择的执行某个插件的勾子函数
2. 由于依赖中不能多个 Vue 版本共存，Vue2 使用静态脚本全局依赖，并修改模块全局导出名 `global.Vue2 = factory()`，放到 `public` 目录中
3. 以路由为分界点，把 Vue2 的视图组件使用 Vue3 组件包装一下，[src/wrap-vue2.ts](./src/wrap-vue2.ts)
4. 根据控制台错误，排查 Vue2、3 全局变量冲突的地方进行修改，主要是 HMR 的实现：[vite-plugin-vue2+2.0.1.patch](./patches/vite-plugin-vue2%2B2.0.1.patch)
