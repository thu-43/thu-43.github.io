import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: '/',

  lang: 'zh-CN',
  title: 'THU自43',
  description: 'THU自43的博客',
  head: [
    ['link', {rel: 'icon', href: '/assets/images/logo.png'}],
    ['link', {rel: 'shortcut icon', href: '/assets/images/logo.png'}],
    ['link', {rel: 'apple-touch-icon', href: '/assets/images/logo.png'}]
  ],
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
