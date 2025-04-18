# Vue 搭建多模态平台

<p align="center">
  <a href="./README_cn.md">English</a> |
  <a href="./README.md">简体中文</a> 
</p>
<div align="center">
  <br>
  <img src="https://github.com/UMIntelligence/platform_multimodal/blob/main/assets/7ccaf2c1-9b72-41ae-9a89-5688c94b7abe.png" alt="platform multimodal">
</div>

**体验地址**：[https://ai.umi6.com](https://ai.umi6.com)

## 技术栈
本项目采用以下技术栈进行构建：
- **Vue 2**：一个用于构建用户界面的渐进式 JavaScript 框架。
- **Vuex**：专门为 Vue.js 应用程序设计的状态管理模式。
- **Vue Router**：Vue.js 官方的路由管理器。
- **Webpack**：模块打包工具，用于项目的构建和优化。
- **ES6/7**：使用 ECMAScript 6 和 7 的新特性编写代码。
- **Axios**：基于 Promise 的 HTTP 客户端，适用于浏览器和 Node.js。
- **Element UI**：一套基于 Vue 2.0 的桌面端组件库，为开发者、设计师和产品经理提供便利。
- **阿里图标 iconfont**：提供丰富的图标资源。

## 项目说明
### 环境要求
建议使用 Node.js 环境 `14.1.0` 来运行此项目，以确保项目的稳定性和兼容性。

### 验证码登录
项目中的验证码登录功能接入了第三方腾讯云滑块验证，你需要自行配置 `id TencentCaptcha`。具体的配置步骤可参考腾讯云滑块验证的官方文档。

## 目录结构
```bash
├── /build/          # 项目构建(webpack)相关配置
├── /config/         # 项目开发环境配置
├── /src/            # 源码目录
│   ├── /api/        # 请求接口
│   ├── /assets/     # 组件静态资源(图片)
│   ├── /components/ # 公共组件
│   ├── /router/     # 路由配置
│   ├── /vuex/       # vuex状态管理
│   ├── /views/      # 路由组件(页面维度)
│   ├── /config/     # 接口配置文件（请求地址）
│   ├── App.vue      # 组件入口
│   └── main.js      # 程序入口
├── /static/         # 非组件静态资源
├── .babelrc         # ES6语法编译配置
├── .editorconfig    # 定义代码格式
├── .eslintignore    # ES6规范忽略文件
├── .eslintrc.js     # ES6语法规范配置
├── .gitignore       # git忽略文件
├── index.html       # 页面入口
├── package.json     # 项目依赖
└── README.md        # 项目文档
```

## 运行项目
### 安装依赖
```bash
npm install
```

### 开发环境运行
启动本地开发服务器，支持热更新，访问地址为 `http://localhost:8080`。
```bash
npm run dev
```

### 生产环境构建
```bash
# 构建生产环境版本并进行代码压缩
npm run build

# 构建生产环境版本并查看打包分析报告
npm run build --report
```

### 测试
```bash
# 运行单元测试
npm run unit

# 运行端到端测试
npm run e2e

# 运行所有测试
npm test
```

## 🎉 Stay Tuned

⭐️ Star our repository to stay up-to-date with exciting new features and improvements! Get instant notifications for new
releases! 🌟

<div align="center" style="margin-top:20px;margin-bottom:20px;">
<img src="https://github.com/UMIntelligence/platform_multimodal_frontend/blob/main/assets/3ed4e296-fbf2-4618-9011-8eca26fe3462.gif" width="1200"/>
</div>



## 模块导航

### 多端及功能模块仓库
| 模块类型       | 模块名称       | 代码仓库链接                          | 说明                  |
|----------------|----------------|---------------------------------------|-----------------------|
| 前端平台       | PC 端前端      | [platform_multimodal_frontend](https://github.com/UMIntelligence/platform_multimodal_frontend)        | PC 端前端代码仓库     |
|                | 小程序端       | [umi_platform_mini_program](https://github.com/ymzn3820/umi_platform_mini_program)    | 微信小程序代码仓库    |
|                | H5 端          | [umi_platform_h5](https://github.com/ymzn3820/umi_platform_h5)                     | H5 移动端代码仓库     |
| 后端功能模块   | 支付模块       | [umi_platform_pay_module](https://github.com/ymzn3820/umi_platform_pay_module)       | 支付系统核心模块      |
|                | 用户模块       | [umi_platform_user_module](https://github.com/ymzn3820/umi_platform_user_module)       | 用户中心服务模块      |
|                | Chat 模块      | [umi_platform_chat_module](https://github.com/ymzn3820/umi_platform_chat_module)      | 即时通讯核心模块      |


## 许可证
本项目采用 **BSD 3 - Clause License** 开源协议，详情见 [LICENSE](LICENSE) 文件。

