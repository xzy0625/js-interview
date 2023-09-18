export default {
  title: "前端积累", // 博客的标题
  description: "前端积累", // 博客的介绍
  base: "/js-interview/", // 根路径,如果想用github.io访问这个必填，需和github仓库名字一致 【https://vitejs.cn/vitepress/guide/deploy.html#github-pages-%E5%92%8C-travis-ci】
  lastUpdated: true, // 开启最后更新时间
  themeConfig: {
    logo: "/images/logo.png", // 页面上显示的logo
    algolia: {
      apiKey: 'your_api_key', // 这里是algolia的key和indexName，请自行前往申请
      indexName: 'index_name'
    },
    nav: [
      // 页面右上角的导航
      { text: "javascript知识点", link: "/js/" },
      { text: "javascript手写", link: "/hand/" },
      { text: "react", link: "/react/" },
      { text: "vue", link: "/vue/" },
      {
        text: "其他",
        items: [
          // 可以配置成下拉
          { text: "Changelog", link: "/others/changelog" },
          { text: "Contribution", link: "/others/contribution" },
        ],
      },
    ],
    sidebar: {
      "/js/template/": [
        {
          text: "模版",
          items: [
            {
              text: "封装一个localStorage",
              link: "/js/template/localStorage",
            },
            {
              text: "封装一个logger日志类",
              link: "/js/template/logger",
            },
          ],
        },
      ],
      // 侧边栏，可以分组
      // 当用户在 `array` 目录页面下将会展示这个侧边栏
      "/hand/array/": [
        {
          text: "数组",
          items: [
            {
              text: "index",
              link: "/hand/array/",
            },
            {
              text: "fisrt",
              link: "/hand/array/first",
            },
            {
              text: "second",
              link: "/hand/array/second",
            },
          ],
        },
      ],
      "/hand/function/": [
        {
          text: "数组",
          items: [
            {
              text: "index",
              link: "/hand/function/array/",
            },
            {
              text: "fisrt",
              link: "/hand/function/first",
            },
            {
              text: "second",
              link: "/hand/function/second",
            },
          ],
        },
      ],
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present js-interview'
    },
    lastUpdatedText: "最近更新时间",
    // 编辑连接
    editLink: {
      pattern: "https://github.com/xzy0625/js-interview/tree/master/docs/:path", // 这里换成自己的github连接
      text: 'Edit this page on GitHub'
    },
    socialLinks: [{ icon: "github", link: "https://github.com/xzy0625/js-interview" }], // 可以连接到 github
  },
};
