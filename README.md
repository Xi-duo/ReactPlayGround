# React + TypeScript + Vite

## 项目概述

### 1. TypeScript 网页编辑器
- 使用 `@monaco-editor/react` 实现了一个网页版的 TypeScript 编辑器。
- 集成了自动类型导入功能。

### 2. Babel 编译
- 通过 `@babel/standalone` 实现了浏览器端的文件编译。
- 编写了一个 Babel 插件，用于动态修改 `import` 的源地址。

### 3. 模块导入与预览功能
- 使用 Blob URL 内联引入模块代码，通过 `import maps` 引入第三方库，如 `react` 和 `react-dom`。
- 实现了一个基于 iframe 的预览功能，用于实时运行代码。
- 使用 `postMessage` 在 iframe 与父窗口之间进行错误信息传递。

### 4. 主题切换
- 基于 CSS 变量和 React Context 实现了主题切换功能。

### 5. 文件编码与解码
- 使用 `fflate` 和 `btoa` 进行文件内容的编码与解码。
- 通过链接分享代码，支持文件内容的编码。

### 6. 性能优化
- 分析了性能瓶颈并识别出长任务（long tasks）。
- 将编译逻辑拆分到 Web Worker 中，优化了性能，消除了长任务。


