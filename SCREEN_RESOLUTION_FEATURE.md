# 屏幕分辨率适配功能说明

## 📐 功能概述

MyWallist 现已支持根据当前屏幕分辨率和方向自动筛选和加载适合的 Unsplash 图片，提供更佳的视觉体验和性能优化。

## ✨ 核心特性

### 1. 智能屏幕方向检测

应用会自动检测当前窗口的屏幕方向：

- **🖥️ 横屏 (Landscape)**: 宽度 > 高度 × 1.1
  - 适合桌面显示器、横向窗口
  - API 筛选 `orientation=landscape` 的图片
  
- **📱 竖屏 (Portrait)**: 高度 > 宽度 × 1.1
  - 适合手机、平板竖屏、纵向窗口
  - API 筛选 `orientation=portrait` 的图片
  
- **⬜ 方形 (Squarish)**: 宽高比接近 1:1
  - 适合正方形窗口布局
  - API 筛选 `orientation=squarish` 的图片

### 2. 动态图片URL选择

根据屏幕方向选择最优的图片尺寸：

```typescript
// 横屏：使用常规尺寸 (1080px)
image.urls.regular

// 竖屏：优先使用竖屏优化版本
image.urls.portrait || image.urls.regular

// 方形：使用常规尺寸
image.urls.regular
```

### 3. 实时响应窗口变化

- ✅ 监听窗口 resize 事件
- ✅ 500ms 防抖处理，避免频繁请求
- ✅ 检测到方向改变时自动重新加载合适的图片
- ✅ 显示当前屏幕信息和方向状态

### 4. 性能优化

- **减少带宽消耗**: 只加载适合当前屏幕方向的图片
- **提升加载速度**: 选择合适的图片尺寸，避免加载过大图片
- **智能缓存**: 方向不变时不会重复请求

## 🔧 技术实现

### 屏幕信息追踪

```typescript
const screenInfo = ref({
  width: window.innerWidth,      // 当前窗口宽度
  height: window.innerHeight,    // 当前窗口高度
  orientation: getScreenOrientation()  // 当前方向
})
```

### 方向检测算法

```typescript
function getScreenOrientation(): 'landscape' | 'portrait' | 'squarish' {
  const ratio = window.innerWidth / window.innerHeight
  if (ratio > 1.1) return 'landscape'  // 横屏
  if (ratio < 0.9) return 'portrait'   // 竖屏
  return 'squarish'                     // 方形
}
```

### API 请求参数

```typescript
const response = await axios.get(`${UNSPLASH_CONFIG.BASE_URL}/photos`, {
  params: {
    page: page.value,
    per_page: UNSPLASH_CONFIG.PER_PAGE,
    order_by: UNSPLASH_CONFIG.ORDER_BY,
    orientation: screenInfo.value.orientation  // 关键参数
  },
  headers: {
    'Authorization': `Client-ID ${UNSPLASH_CONFIG.ACCESS_KEY}`
  }
})
```

### Resize 监听与防抖

```typescript
const handleResize = debounce(() => {
  const newOrientation = getScreenOrientation()
  
  // 更新屏幕信息
  screenInfo.value = {
    width: window.innerWidth,
    height: window.innerHeight,
    orientation: newOrientation
  }
  
  // 如果方向改变，重新加载图片
  if (newOrientation !== lastOrientation && images.value.length > 0) {
    reloadImagesForNewOrientation()
  }
}, 500) // 500ms 防抖
```

## 📊 使用场景示例

### 场景 1: 桌面横屏模式
- 窗口大小: 1920×1080
- 方向检测: landscape (横屏)
- API 参数: `orientation=landscape`
- 结果: 加载横向构图的风景、建筑等图片

### 场景 2: 移动竖屏模式
- 窗口大小: 375×812
- 方向检测: portrait (竖屏)
- API 参数: `orientation=portrait`
- 结果: 加载竖向构图的人像、植物等图片

### 场景 3: 用户调整窗口
1. 用户从横屏拖拽为竖屏
2. 触发 resize 事件
3. 检测到方向变化 (landscape → portrait)
4. 自动清空当前图片
5. 重新请求竖屏图片
6. 无缝切换展示

## 🎨 UI 展示

每张图片悬停时会显示：

```
┌─────────────────────────┐
│                         │
│      [图片内容]          │
│                         │
├─────────────────────────┤
│ 📷 John Doe    ❤️ 1.2k │  ← 摄影师和点赞数
│ 📐 1920×1080  🖥️ 横屏 │  ← 屏幕信息和方向
└─────────────────────────┘
```

## ⚙️ 配置选项

在 `src/renderer/config/unsplash.ts` 中可以调整：

```typescript
export const UNSPLASH_CONFIG = {
  // 每页加载数量（影响每次请求的图片数）
  PER_PAGE: 20,
  
  // 排序方式
  ORDER_BY: 'latest',  // latest | popular | oldest
  
  // 方向阈值（修改此值可调整方向判定灵敏度）
  // 当前: ratio > 1.1 为横屏, ratio < 0.9 为竖屏
}
```

## 🔍 API 参数说明

Unsplash API 的 `orientation` 参数：

| 参数值 | 说明 | 适用场景 |
|--------|------|----------|
| `landscape` | 横向图片 | 桌面显示器、宽屏设备 |
| `portrait` | 竖向图片 | 手机、平板竖屏 |
| `squarish` | 近方形图片 | 正方形布局、网格展示 |

## 💡 最佳实践

### 1. 合理设置 PER_PAGE
- 小屏幕 (< 768px): 建议 10-15 张
- 中等屏幕 (768-1440px): 建议 15-20 张
- 大屏幕 (> 1440px): 建议 20-30 张

### 2. 注意 API 限制
- 每小时最多 50 次请求
- 方向切换会触发新的请求
- 防抖时间设置为 500ms，避免频繁切换

### 3. 用户体验优化
- 首次加载显示 loading 状态
- 方向切换时平滑过渡
- 提供清晰的屏幕信息提示

## 🐛 故障排除

### Q: 方向检测不准确？

A: 可以调整阈值：
```typescript
// 在 ImageGallery.vue 中修改
if (ratio > 1.2) return 'landscape'  // 提高横屏阈值
if (ratio < 0.8) return 'portrait'   // 降低竖屏阈值
```

### Q: 窗口调整时频繁刷新？

A: 增加防抖时间：
```typescript
const handleResize = debounce(() => {
  // ...
}, 800) // 从 500ms 增加到 800ms
```

### Q: 某些方向没有图片？

A: 可能原因：
1. Unsplash 该方向图片较少
2. 尝试切换 `ORDER_BY` 为 `popular`
3. 检查网络连接和 API Key

## 📈 性能指标

- **初始加载**: ~1-2 秒（取决于网络）
- **方向切换**: ~500ms 防抖 + 1-2 秒加载
- **内存占用**: 每张图片约 200-500KB
- **API 调用**: 每次方向改变 1 次请求

## 🚀 未来优化方向

1. **图片预加载**: 预测用户可能的方向变化，提前加载
2. **本地缓存**: 缓存已加载的图片，避免重复请求
3. **渐进式加载**: 先加载缩略图，再加载高清图
4. **自定义阈值**: 允许用户在设置中调整方向判定阈值

---

**提示**: 此功能充分利用了 Unsplash API 的 orientation 参数，确保为用户展示最适合当前屏幕布局的高质量图片。
