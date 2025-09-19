import {commentPlugin} from '@vuepress/plugin-comment'
import {defineUserConfig} from 'vuepress';

import theme from './theme.js';

export default defineUserConfig({
  base: '/',

  lang: 'zh-CN',
  title: 'THU自43的温馨博客',
  description: 'THU自43的温馨博客 - 记录我们一起走过的美好时光',
  head: [
    ['link', {rel: 'icon', href: '/assets/images/logo.png'}],
    ['link', {rel: 'shortcut icon', href: '/assets/images/logo.png'}],
    ['link', {rel: 'apple-touch-icon', href: '/assets/images/logo.png'}],
    ['meta', {name: 'theme-color', content: '#3498db'}],
    ['meta', {name: 'keywords', content: 'THU自43,清华大学,班级博客,同学生活'}],
    ['script', {src: '/js/birthday-countdown.js', defer: true}]
  ],
  theme,
  plugins: [
    commentPlugin({
      provider: 'Giscus',  // Artalk | Giscus | Waline | Twikoo
      // 服务商特定选项
      repo: 'thu-43/thu-43.github.io',     // Giscus 仓库
      repoId: 'R_kgDOPUsNFg',              // Giscus 仓库ID
      category: 'General',                 // Giscus 分类
      categoryId: 'DIC_kwDOPUsNFs4Cvn18',  // Giscus 分类ID
    }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
