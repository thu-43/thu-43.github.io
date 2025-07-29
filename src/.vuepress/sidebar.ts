import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // 班级生活页面的侧边栏
  '/班级生活/': 'structure',

  // 党团活动页面的侧边栏
  '/党团活动/': 'structure',

  // 人物页面的侧边栏
  '/人物/': 'structure',

  // 实用工具页面的侧边栏
  '/实用工具/': 'structure',

  // 文章页面的侧边栏
  '/posts/': [
    '' /* /posts/ */,
    {
      text: '文章分享',
      icon: 'newspaper',
      children: 'structure',
    },
  ],

  // 回退侧边栏 - 必须最后定义
  '/': [
    '' /* / */,
    {
      text: '班级生活',
      icon: 'users',
      prefix: '班级生活/',
      link: '班级生活/',
      children: 'structure',
    },
    {
      text: '党团活动',
      icon: 'flag',
      prefix: '党团活动/',
      link: '党团活动/',
      children: 'structure',
    },
    {
      text: '人物介绍',
      icon: 'user',
      prefix: '人物/',
      link: '人物/',
      children: 'structure',
    },
    {
      text: '实用工具',
      icon: 'tools',
      prefix: '实用工具/',
      link: '实用工具/',
      children: 'structure',
    },
    'intro',
  ],
});
