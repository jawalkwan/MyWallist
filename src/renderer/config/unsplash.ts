// Unsplash API 配置
export const UNSPLASH_CONFIG = {
  // 请替换为你自己的 Unsplash Access Key
  // 获取方式: https://unsplash.com/developers
  ACCESS_KEY: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY',
  
  // API 基础 URL
  BASE_URL: 'https://api.unsplash.com',
  
  // 每页加载的图片数量
  PER_PAGE: 20,
  
  // 图片排序方式: 'latest' | 'popular' | 'oldest'
  ORDER_BY: 'latest'
}
