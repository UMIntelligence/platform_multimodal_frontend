# Building a Multimodal Platform with Vue

<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README_zh.md">简体中文</a> 
</p>
<div align="center">
  <br>
  <img src="https://github.com/UMIntelligence/platform_multimodal/blob/main/assets/7ccaf2c1-9b72-41ae-9a89-5688c94b7abe.png" alt="platform multimodal">
</div>

**Experience Address**: [https://ai.umi6.com](https://ai.umi6.com)

## Technology Stack
This project is built using the following technology stack:
- **Vue 2**: A progressive JavaScript framework for building user interfaces.
- **Vuex**: A state management pattern designed specifically for Vue.js applications.
- **Vue Router**: The official routing manager for Vue.js.
- **Webpack**: A module bundler used for project construction and optimization.
- **ES6/7**: Write code using the new features of ECMAScript 6 and 7.
- **Axios**: A Promise-based HTTP client for browsers and Node.js.
- **Element UI**: A desktop component library based on Vue 2.0 for developers, designers, and product managers.
- **Alibaba Iconfont**: Provides a rich resource of icons.

## Project Description
### Environment Requirements
It is recommended to use the Node.js environment `14.1.0` to run this project to ensure its stability and compatibility.

### CAPTCHA Login
The CAPTCHA login feature in this project integrates with Tencent Cloud's third - party sliding verification. You need to configure the `id TencentCaptcha` yourself. The specific configuration steps can be found in the official documentation of Tencent Cloud's sliding verification.

## Directory Structure
```bash
├── /build/          # Project build (webpack) related configurations
├── /config/         # Project development environment configurations
├── /src/            # Source code directory
│   ├── /api/        # Request interfaces
│   ├── /assets/     # Static resources (images) for components
│   ├── /components/ # Common components
│   ├── /router/     # Routing configurations
│   ├── /vuex/       # Vuex state management
│   ├── /views/      # Routing components (page level)
│   ├── /config/     # Interface configuration file (request addresses)
│   ├── App.vue      # Component entry
│   └── main.js      # Program entry
├── /static/         # Non - component static resources
├── .babelrc         # ES6 syntax compilation configuration
├── .editorconfig    # Defines code format
├── .eslintignore    # Files to be ignored by ES6 specification
├── .eslintrc.js     # ES6 syntax specification configuration
├── .gitignore       # Files to be ignored by Git
├── index.html       # Page entry
├── package.json     # Project dependencies
└── README.md        # Project documentation
```

## Running the Project
### Install Dependencies
```bash
npm install
```

### Run in Development Environment
Start the local development server with hot - reloading support. The access address is `http://localhost:8080`.
```bash
npm run dev
```

### Build for Production Environment
```bash
# Build the production version and compress the code
npm run build

# Build the production version and view the packaging analysis report
npm run build --report
```

### Testing
```bash
# Run unit tests
npm run unit

# Run end - to - end tests
npm run e2e

# Run all tests
npm test
```

## Module Navigation

### Repositories of Multi - Terminal and Functional Modules
| Module Type      | Module Name      | Code Repository Link                          | Description           |
|------------------|------------------|-----------------------------------------------|-----------------------|
| Front - end Platform | PC Front - end   | [platform_multimodal_frontend](https://github.com/UMIntelligence/platform_multimodal_frontend)       | PC front - end code repository |
|                  | Mini - Program   | [umi_platform_mini_program](https://github.com/ymzn3820/umi_platform_mini_program)    | WeChat mini - program code repository |
|                  | H5 Terminal      | [umi_platform_h5](https://github.com/ymzn3820/umi_platform_h5)                     | H5 mobile - end code repository |
| Back - end Functional Modules | Payment Module   | [umi_platform_pay_module](https://github.com/ymzn3820/umi_platform_pay_module)       | Core module of the payment system |
|                  | User Module      | [umi_platform_user_module](https://github.com/ymzn3820/umi_platform_user_module)       | User center service module |
|                  | Chat Module      | [platform_multimodal](https://github.com/UMIntelligence/platform_multimodal)      | Core module of instant messaging |

## License
This project uses the **BSD 3 - Clause License** open - source license. For details, see the [LICENSE](LICENSE) file.
