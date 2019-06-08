module.exports = {
  pages: {
    main: {
      // page 的入口
      entry: "src/pages/main/main.js",
      // 模板来源
      template: "src/pages/main/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "main Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "main"]
    },
    login: {
      // page 的入口
      entry: "src/pages/login/main.js",
      // 模板来源
      template: "src/pages/login/login.html",
      // 在 dist/index.html 的输出
      filename: "login.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "login Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "login"]
    }
  },
  // 开发环境配置
  devServer: {
    // 默认端口
    port: 8081,
    // 跨域代理设置
    proxy: {
      // 跨域请求相对路径，当以根路径发出请求，执行以下配置
      "/api": {
        // 目标地址，即开发测试时后端主机地址
        target: "http://localhost:8082/",
        // 修改请求header中来源为目标主机地址，实现跨域
        changeOrigin: true,
        // pathRewrite: {
        //   "^/api": ""
        // }
      }
    }
  },
  // 默认按部署在服务器根路径配置
  // 编译时资源按相对路径声明，可部署在任意路径
  publicPath: "./",
  // 编译时是否生成map映射文件
  productionSourceMap: false
};