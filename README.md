# MyWallist - Unsplash 图片浏览器

<div align="center">

![Vue](https://img.shields.io/badge/Vue-3.5.x-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)
![Electron](https://img.shields.io/badge/Electron-41.x-47848F?logo=electron)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

**一个基于 Electron + Vue 3 + TypeScript + Vite 的桌面图片浏览器应用，使用 Unsplash API 展示高质量图片。**

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [核心功能](#-核心功能说明) • [常见问题](#-常见问题)

</div>

---

## 📖 简介

MyWallist 是一款优雅的桌面图片浏览应用，集成了 Unsplash API。它提供了瀑布流布局、无限滚动加载和响应式设计，让用户能够流畅地浏览和欣赏全球摄影师分享的高质量图片。

### ✨ 功能特性

- ✨ **瀑布流布局** - 使用纯 CSS 实现优雅的瀑布流展示效果
- 🔄 **无限滚动加载** - 滚动到底部自动加载更多图片，无需手动翻页
- 📱 **响应式设计** - 根据窗口宽度自动调整列数（1-4 列自适应）
- 🖼️ **图片懒加载** - 优化性能，仅在图片进入视口时加载
- 🎨 **优雅交互** - 悬停显示图片信息和摄影师 attribution
- 📐 **窗口自适应** - 初始窗口大小为屏幕的 1/2，支持随意调整
- 🎯 **智能方向适配** - 根据屏幕方向（横屏/竖屏/方形）自动筛选合适的图片
- 🔍 **分辨率优化** - 根据当前窗口尺寸选择最优图片URL，提升加载速度

## 🛠️ 技术栈

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **框架** | Electron | 41.x | 跨平台桌面应用开发 |
| **前端** | Vue 3 | 3.5.x | Composition API + 响应式系统 |
| **语言** | TypeScript | 6.x | 类型安全 |
| **构建** | Vite | 8.x | 极速构建工具 |
| **状态** | Pinia | 3.x | 轻量级状态管理 |
| **路由** | Vue Router | 5.x | 官方路由管理器 |
| **请求** | Axios | 1.x | HTTP 客户端 |
| **API** | Unsplash API | - | 高质量图片源 |

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Unsplash API Key

#### 获取 Access Key

1. 访问 [Unsplash Developers](https://unsplash.com/developers)
2. 注册或登录 Unsplash 账号
3. 点击 "Become a Developer" 成为开发者
4. 创建新应用（New Application）
5. 接受 API 使用条款
6. 复制你的 **Access Key**

#### 配置 Access Key

有两种方式配置：

**方式一：使用环境变量文件（推荐）**

1. 复制 `.env.example` 为 `.env`：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，将 `your_access_key_here` 替换为你的实际 Access Key：
   ```env
   VITE_UNSPLASH_ACCESS_KEY=你的实际AccessKey
   ```

**方式二：直接修改配置文件**

编辑 `src/renderer/config/unsplash.ts` 文件：
```typescript
export const UNSPLASH_CONFIG = {
  ACCESS_KEY: '你的实际AccessKey',
  // ... 其他配置
}
```

### 3. 运行开发服务器

```bash
npm run dev
```

应用将自动启动，窗口大小为屏幕的 1/2。

### 4. 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
MyWallist/
├── electron/              # Electron 主进程代码
│   ├── main/             # 主进程
│   └── preload/          # 预加载脚本
├── src/
│   └── renderer/         # 渲染进程（Vue 应用）
│       ├── components/   # Vue 组件
│       │   ├── ImageGallery.vue  # 图片画廊组件（主要功能）
│       │   └── LandingPage.vue   # 着陆页（备用）
│       ├── config/       # 配置文件
│       │   └── unsplash.ts      # Unsplash API 配置
│       ├── router/       # 路由配置
│       ├── layout/       # 布局组件
│       └── App.vue       # 根组件
├── .env.example          # 环境变量示例
├── .gitignore            # Git 忽略文件配置
├── README.md             # 项目说明文档
├── UNSPLASH_CONFIG_GUIDE.md  # Unsplash 配置指南
├── SCREEN_RESOLUTION_FEATURE.md  # 屏幕分辨率适配功能说明
├── TESTING_GUIDE.md      # 测试指南
└── package.json
```

## 💡 核心功能说明

### 瀑布流布局

使用 CSS `columns` 属性实现纯 CSS 瀑布流，无需复杂的 JavaScript 计算：

```css
.masonry-grid {
  column-count: 4;  /* 根据窗口宽度动态调整 */
  column-gap: 20px;
}

.masonry-item {
  break-inside: avoid;  /* 防止卡片被分割 */
  margin-bottom: 20px;
}
```

### 响应式列数

根据窗口宽度自动调整列数：
- `< 600px`: 1 列
- `600-900px`: 2 列
- `900-1200px`: 3 列
- `>= 1200px`: 4 列

### 无限滚动加载

使用 `IntersectionObserver` API 监听页面底部：

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !loading.value && hasMore.value) {
      loadImages()  // 触发加载
    }
  },
  { rootMargin: '200px' }  // 提前 200px 触发
)
```

### 窗口 Resize 监听

监听窗口大小变化，自动调整布局：

```typescript
window.addEventListener('resize', handleResize)
```

### 🎯 智能屏幕方向适配

**这是本应用的核心特色功能！**

应用会自动检测当前窗口的屏幕方向，并向 Unsplash API 请求适合该方向的图片：

#### 方向检测逻辑

``typescript
// 根据宽高比判断方向
const ratio = window.innerWidth / window.innerHeight

if (ratio > 1.1) return 'landscape'  // 横屏（桌面模式）
if (ratio < 0.9) return 'portrait'   // 竖屏（移动模式）
return 'squarish'                     // 方形
```

#### API 请求优化

``typescript
// 根据屏幕方向筛选图片
const response = await axios.get('/photos', {
  params: {
    orientation: screenInfo.value.orientation,  // landscape | portrait | squarish
    // ... 其他参数
  }
})
```

#### 实时响应

- ✅ 监听窗口 resize 事件
- ✅ 500ms 防抖处理，避免频繁请求
- ✅ 检测到方向改变时自动重新加载合适的图片
- ✅ 悬停显示当前屏幕信息和方向状态

**优势：**
- 📉 **减少带宽**: 只加载适合当前屏幕的图片
- ⚡ **提升速度**: 选择合适的图片尺寸
- 🎨 **更佳体验**: 图片构图与屏幕方向匹配

详细文档请查看 [SCREEN_RESOLUTION_FEATURE.md](./SCREEN_RESOLUTION_FEATURE.md)

## ⚠️ API 限制

Unsplash API 有以下限制：
- 每小时最多 50 次请求
- 每次请求最多返回 30 张图片
- 需要正确的 Attribution（已在应用中显示摄影师信息）

## ❓ 常见问题

### Q: 图片无法加载？

A: 请检查：
1. Access Key 是否正确配置
2. 网络连接是否正常
3. 是否超过 API 请求限制（每小时 50 次）

### Q: 如何修改每页加载的图片数量？

A: 编辑 `src/renderer/config/unsplash.ts`，修改 `PER_PAGE` 的值（建议 10-30）。

### Q: 如何修改窗口初始大小？

A: 编辑 `electron/main/index.ts`，在 `createWindow()` 函数中修改：
```typescript
const windowWidth = Math.floor(screenWidth / 2)  // 修改除数
const windowHeight = Math.floor(screenHeight / 2)
```

### Q: 如何更改图片排序方式？

A: 编辑 `src/renderer/config/unsplash.ts`，修改 `ORDER_BY` 的值：
- `'latest'`: 最新上传
- `'popular'`: 最受欢迎
- `'oldest'`: 最早上传

### Q: 为什么调整窗口大小时会重新加载图片？

A: 这是智能方向适配功能。当检测到屏幕方向改变时（如从横屏变为竖屏），应用会自动重新请求适合新方向的图片，确保最佳展示效果。如果不希望此行为，可以移除 `handleResize` 中的方向检测逻辑。

### Q: 如何禁用方向自动适配？

A: 编辑 `ImageGallery.vue`，注释掉 `handleResize` 函数中的方向切换逻辑：
```typescript
// 注释掉这部分代码
// if (newOrientation !== lastOrientation && images.value.length > 0) {
//   reloadImagesForNewOrientation()
// }
```

## 📚 相关文档

- [Unsplash 配置指南](./UNSPLASH_CONFIG_GUIDE.md) - 详细讲解如何获取和配置 Access Key
- [屏幕分辨率适配功能](./SCREEN_RESOLUTION_FEATURE.md) - 深入了解智能方向适配的实现原理
- [测试指南](./TESTING_GUIDE.md) - 完整的测试流程和用例

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<div align="center">

**注意**: 请遵守 [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines) 使用 API。