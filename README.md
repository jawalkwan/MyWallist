# MyWallist

<div align="center">

![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0.7-646CFF?logo=vite)
![Electron](https://img.shields.io/badge/Electron-33.3.1-47848F?logo=electron)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

**一款现代化的跨平台桌面壁纸管理软件**

基于 Vue 3 + TypeScript + Vite + Electron 构建

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [开发指南](#-开发指南) • [项目结构](#-项目结构)

</div>

---

## 📖 简介

MyWallist 是一款功能强大的跨平台桌面壁纸管理应用程序。它提供了直观的界面来浏览、管理和应用壁纸，支持多种壁纸来源和自定义设置，让您的桌面始终保持新鲜感和个性化。

### ✨ 核心功能

- 🖼️ **壁纸浏览** - 优雅的网格布局浏览本地和在线壁纸库
- 🎨 **智能分类** - 按颜色、分辨率、标签等多维度分类管理
- ⚡ **一键应用** - 快速切换桌面壁纸，支持多显示器配置
- 🔄 **自动轮换** - 定时自动更换壁纸，保持桌面新鲜感
- 📥 **批量导入** - 支持从文件夹批量导入壁纸资源
- 💾 **收藏管理** - 创建个人收藏夹，快速访问喜爱的壁纸
- 🔍 **智能搜索** - 通过关键词、标签快速查找壁纸
- 🌈 **颜色提取** - 自动提取壁纸主色调，方便主题搭配
- 📊 **使用统计** - 记录壁纸使用历史和应用频次
- 🎯 **个性推荐** - 基于使用习惯智能推荐壁纸

### 🎯 适用场景

- 💼 **办公桌面** - 定期更换壁纸，提升工作心情和效率
- 🎮 **游戏玩家** - 收集游戏主题壁纸，打造沉浸式体验
- 🎨 **设计师** - 管理灵感素材库，快速预览和应用
- 📸 **摄影爱好者** - 整理摄影作品，展示个人创作
- 🏠 **普通用户** - 美化桌面，展现个性风格

## 🛠️ 技术栈

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **前端框架** | Vue 3 | 3.5.13 | Composition API + 响应式系统 |
| **编程语言** | TypeScript | 5.7.2 | 类型安全的 JavaScript 超集 |
| **构建工具** | Vite | 6.0.7 | 极速的前端构建工具 |
| **桌面框架** | Electron | 33.3.1 | 跨平台桌面应用开发 |
| **路由管理** | Vue Router | 4.5.0 | Vue.js 官方路由管理器 |
| **状态管理** | Pinia | 2.3.0 | Vue 3 推荐的状态管理方案 |
| **HTTP 客户端** | Axios | 1.7.9 | 基于 Promise 的 HTTP 客户端 |
| **持久化插件** | pinia-plugin-persistedstate | 4.2.0 | Pinia 状态持久化 |

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 或 **yarn**: >= 1.22.0
- **操作系统**: Windows 10+ / macOS 10.15+ / Linux (主流发行版)

### 安装

```bash
# 克隆项目
git clone <your-repository-url>
cd mywallist

# 安装依赖
npm install
# 或
yarn install
```

### 开发模式

```bash
# 启动开发服务器（端口 5173）
npm run dev
```

这将同时启动：
- ⚡ Vite 开发服务器（支持 HMR 热更新）
- 🖥️ Electron 应用窗口

修改代码后会自动刷新，提供流畅的开发体验。

### 生产构建

```bash
# 构建并打包应用
npm run build
```

构建完成后，安装包将生成在 `release/` 目录：
- **Windows**: `.exe` 安装程序 (NSIS)
- **macOS**: `.dmg` 磁盘映像
- **Linux**: `.AppImage` 和 `.deb` 包

### 其他命令

```bash
# 仅进行 TypeScript 类型检查
npm run type-check

# 预览生产构建结果
npm run preview

# 仅构建 Electron 应用（跳过类型检查）
npm run electron:build

# 构建为目录格式（不打包）
npm run build:dir
```

## 📁 项目结构

```
mywallist/
├── electron/                 # Electron 主进程代码
│   ├── main/
│   │   └── index.ts         # 主进程入口（窗口管理、系统交互）
│   └── preload/
│       ├── index.ts         # 预加载脚本（安全暴露 API）
│       └── index.d.ts       # TypeScript 类型声明
├── src/
│   └── renderer/            # Vue 渲染进程（UI 界面）
│       ├── components/      # Vue 组件
│       │   ├── Wallpaper/   # 壁纸相关组件
│       │   ├── Settings/    # 设置页面组件
│       │   └── Common/      # 通用组件
│       ├── views/           # 页面视图
│       ├── router/          # 路由配置
│       ├── store/           # Pinia 状态管理
│       │   ├── wallpaper.ts # 壁纸状态
│       │   ├── settings.ts  # 设置状态
│       │   └── favorites.ts # 收藏状态
│       ├── services/        # 业务服务层
│       │   ├── wallpaper.ts # 壁纸管理服务
│       │   └── storage.ts   # 存储服务
│       ├── utils/           # 工具函数
│       ├── assets/          # 静态资源（图片、样式等）
│       ├── App.vue          # 根组件
│       └── main.ts          # 应用入口
├── public/                  # 公共静态资源
├── build/                   # 构建图标和资源
├── dist/                    # Vite 构建输出（Web 资源）
├── dist-electron/           # Electron 构建输出（主进程）
├── release/                 # 最终发布包（安装包）
├── index.html               # HTML 入口文件
├── vite.config.ts           # Vite 配置文件
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目配置和依赖
```

## 💡 开发指南

### 路径别名

项目配置了 `@` 路径别名，指向 `src/renderer` 目录：

```typescript
// 使用示例
import WallpaperGrid from '@/components/Wallpaper/Grid.vue'
import { useWallpaperStore } from '@/store/wallpaper'
```

### Electron API 访问

通过 Preload 脚本安全地暴露 Electron API，无需直接使用 `require`：

```typescript
// 在组件中使用
window.shell.openExternal('https://example.com')
window.ipcRenderer.send('set-wallpaper', imagePath)
```

### 静态资源处理

```typescript
// public 目录中的资源（直接引用）
<img src="/logo.png" alt="Logo" />

// src/assets 中的资源（需要导入）
import defaultWallpaper from '@/assets/default.jpg'
```

### 状态管理示例

使用 Pinia 管理壁纸状态：

```typescript
// stores/wallpaper.ts
import { defineStore } from 'pinia'

export const useWallpaperStore = defineStore('wallpaper', {
  state: () => ({
    wallpapers: [],
    currentWallpaper: null,
    favorites: []
  }),
  
  actions: {
    async loadWallpapers() {
      // 加载壁纸列表
    },
    
    async setWallpaper(path: string) {
      // 设置桌面壁纸
      await window.ipcRenderer.invoke('set-wallpaper', path)
      this.currentWallpaper = path
    },
    
    toggleFavorite(wallpaper: Wallpaper) {
      // 切换收藏状态
    }
  },
  
  persist: true // 启用持久化
})
```

### 壁纸服务集成

```typescript
// services/wallpaper.ts
export class WallpaperService {
  // 扫描本地文件夹
  async scanDirectory(path: string): Promise<Wallpaper[]> {
    // 实现逻辑
  }
  
  // 提取壁纸颜色
  async extractColors(imagePath: string): Promise<string[]> {
    // 实现逻辑
  }
  
  // 应用壁纸到桌面
  async applyToDesktop(imagePath: string, display?: number): Promise<void> {
    // 调用 Electron IPC
  }
}
```

## 🔧 配置说明

### Vite 配置

主要配置文件：`vite.config.ts`

```typescript
export default defineConfig({
  plugins: [vue(), electron({...})],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'),
    },
  },
  server: {
    port: 5173,  // 开发服务器端口
    strictPort: true,
  },
})
```

### TypeScript 配置

主要配置文件：`tsconfig.json`

- ✅ 严格模式：启用
- 📦 模块解析：bundler
- 🔗 路径映射：`@/*` → `./src/renderer/*`
- 🎯 目标版本：ES2020

### Electron Builder 配置

在 `package.json` 的 `build` 字段中配置：

```json
{
  "build": {
    "productName": "MyWallist",
    "appId": "org.mywallist.app",
    "directories": {
      "output": "release/${version}"
    },
    "win": {
      "target": ["nsis"],
      "icon": "build/icons/icon.ico"
    },
    "mac": {
      "target": ["dmg"],
      "icon": "build/icons/icon.icns"
    },
    "linux": {
      "target": ["AppImage", "deb"],
      "icon": "build/icons"
    }
  }
}
```

## 🎨 功能规划

### 📋 已完成
- ✅ 项目基础架构搭建
- ✅ Vue 3 + TypeScript + Vite 集成
- ✅ Electron 桌面应用框架
- ✅ 路由和状态管理配置
- ✅ 开发环境热更新

### 🚧 开发中
- 🔄 壁纸浏览和网格展示
- 🔄 本地文件夹扫描和导入
- 🔄 壁纸预览和详情查看

### 📅 计划中
- 📌 壁纸收藏和分类管理
- 📌 自动轮换和定时任务
- 📌 在线壁纸库集成
- 📌 多显示器支持
- 📌 壁纸编辑和裁剪
- 📌 主题和外观定制
- 📌 数据同步和备份

## ❓ 常见问题

### 端口被占用

如果 5173 端口被占用，修改 `vite.config.ts`：

```typescript
server: {
  port: 5174,  // 改为其他可用端口
}
```

### 依赖安装失败

```bash
# 清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install
```

### TypeScript 类型错误

```bash
# 查看详细错误信息
npm run type-check
```

### Electron 窗口无法打开

1. 检查终端是否有错误信息
2. 确认 `dist-electron/index.js` 已正确生成
3. 检查 `vite.config.ts` 中的路径配置

### 壁纸无法应用

- 确保图片格式受支持（JPG、PNG、WEBP 等）
- 检查文件路径是否正确
- 验证系统权限设置

### 性能优化建议

- 大量壁纸时使用虚拟滚动
- 对高分辨率图片生成缩略图
- 使用懒加载优化图片加载
- 定期清理缓存文件

## 📝 开发规范

### 代码风格

- ✅ 使用 TypeScript 编写所有新代码
- ✅ 遵循 Vue 3 Composition API 最佳实践
- ✅ 组件命名使用 PascalCase（如 `WallpaperGrid.vue`）
- ✅ 文件命名使用 kebab-case（如 `wallpaper-service.ts`）
- ✅ 使用 ESLint + Prettier 保持代码一致性

### Git 提交规范

建议使用语义化提交信息：

```
feat: 添加壁纸自动轮换功能
fix: 修复多显示器壁纸应用问题
docs: 更新安装和使用文档
style: 调整壁纸网格布局样式
refactor: 重构壁纸加载逻辑
test: 添加壁纸服务单元测试
chore: 更新依赖版本
```

### 分支管理

- `main` - 主分支，保持稳定
- `develop` - 开发分支
- `feature/*` - 功能分支
- `bugfix/*` - 修复分支
- `release/*` - 发布分支

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 贡献步骤

1. **Fork** 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 **Pull Request**

### 贡献内容

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- 🎨 优化用户界面
- 🌍 翻译和本地化

### 开发环境设置

```bash
# Fork 后克隆你的仓库
git clone https://github.com/YOUR_USERNAME/mywallist.git
cd mywallist

# 添加上游远程仓库
git remote add upstream https://github.com/ORIGINAL_OWNER/mywallist.git

# 创建新分支
git checkout -b feature/your-feature

# 开发完成后提交 PR
```

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) - 您可以自由使用、修改和分发本软件。

## 🙏 致谢

感谢以下开源项目和技术：

- **[Vue.js](https://vuejs.org/)** - 渐进式 JavaScript 框架
- **[Vite](https://vitejs.dev/)** - 下一代前端构建工具
- **[Electron](https://www.electronjs.org/)** - 跨平台桌面应用开发框架
- **[Pinia](https://pinia.vuejs.org/)** - Vue 的状态管理库
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript 的超集

特别感谢所有贡献者和用户的支持！

## 📞 联系方式

- 📧 Email: delayhsiao@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/mywallist/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/mywallist/discussions)

## 🌟 支持项目

如果您觉得 MyWallist 对您有帮助，请考虑：

- ⭐ 给项目一个 Star
- 📢 分享给您的朋友
- 🐛 报告遇到的问题
- 💡 提出改进建议
- 🔧 贡献代码

---

<div align="center">

**Made with ❤️ by delayhsiao**

让每一天的桌面都充满新鲜感 🖼️✨

[⬆ 返回顶部](#mywallist)

</div>
