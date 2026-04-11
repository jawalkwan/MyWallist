<template>
  <div class="gallery-container">
    <!-- 加载状态 -->
    <div v-if="loading && images.length === 0" class="loading-state">
      <div class="spinner"></div>
      <p>正在加载图片...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="loadImages" class="retry-btn">重试</button>
    </div>

    <!-- 图片瀑布流 -->
    <div v-else class="masonry-grid" :style="{ columnCount: columnCount }">
      <div 
        v-for="image in images" 
        :key="image.id" 
        class="masonry-item"
      >
        <div class="image-card">
          <img 
            :src="image.urls.regular" 
            :alt="image.alt_description || 'Unsplash Photo'"
            loading="lazy"
            @load="onImageLoad"
          />
          <div class="image-overlay">
            <div class="image-info">
              <span class="photographer">📷 {{ image.user.name }}</span>
              <span class="likes">❤️ {{ image.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载更多指示器 -->
    <div ref="loadMoreTrigger" class="load-more-trigger">
      <div v-if="loading && images.length > 0" class="loading-more">
        <div class="spinner-small"></div>
        <p>加载更多...</p>
      </div>
      <div v-else-if="!hasMore && images.length > 0" class="no-more">
        <p>没有更多图片了</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import axios from 'axios'
import { UNSPLASH_CONFIG } from '@/config/unsplash'

// 响应式数据
const images = ref<any[]>([])
const page = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const error = ref('')
const loadMoreTrigger = ref<HTMLElement | null>(null)

// 计算列数（根据窗口宽度）
const columnCount = computed(() => {
  const width = window.innerWidth
  if (width < 600) return 1
  if (width < 900) return 2
  if (width < 1200) return 3
  return 4
})

// IntersectionObserver 实例
let observer: IntersectionObserver | null = null

// 加载图片
const loadImages = async () => {
  if (loading.value || !hasMore.value) return

  // 检查 Access Key 是否配置
  if (UNSPLASH_CONFIG.ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
    error.value = '请先配置 Unsplash Access Key。查看 src/renderer/config/unsplash.ts 文件'
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await axios.get(`${UNSPLASH_CONFIG.BASE_URL}/photos`, {
      params: {
        page: page.value,
        per_page: UNSPLASH_CONFIG.PER_PAGE,
        order_by: UNSPLASH_CONFIG.ORDER_BY
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_CONFIG.ACCESS_KEY}`
      }
    })

    const newImages = response.data
    
    if (newImages.length < UNSPLASH_CONFIG.PER_PAGE) {
      hasMore.value = false
    }

    images.value = [...images.value, ...newImages]
    page.value++
  } catch (err: any) {
    console.error('Failed to load images:', err)
    if (err.response?.status === 403) {
      error.value = 'API 访问被拒绝，请检查 Access Key 配置'
    } else if (err.response?.status === 429) {
      error.value = 'API 请求次数过多，请稍后再试（每小时限制50次）'
    } else if (err.code === 'ERR_NETWORK') {
      error.value = '网络连接失败，请检查网络设置'
    } else {
      error.value = '加载图片失败，请重试'
    }
  } finally {
    loading.value = false
  }
}

// 图片加载完成回调
const onImageLoad = () => {
  // 可以在这里添加图片加载完成的逻辑
}

// 设置 IntersectionObserver
const setupObserver = () => {
  if (!loadMoreTrigger.value) return

  observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0]
      if (target.isIntersecting && !loading.value && hasMore.value) {
        loadImages()
      }
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 0
    }
  )

  observer.observe(loadMoreTrigger.value)
}

// 处理窗口 resize
const handleResize = () => {
  // 窗口大小改变时，列数会自动通过 computed 属性更新
  // 这里可以添加其他需要的逻辑
}

// 生命周期钩子
onMounted(() => {
  loadImages()
  setupObserver()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.gallery-container {
  padding: 20px;
  min-height: 100%;
  background-color: #f5f7fa;
}

/* 加载状态 */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #666;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4fc08d;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.spinner-small {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4fc08d;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 20px;
  padding: 10px 30px;
  background-color: #4fc08d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.retry-btn:hover {
  background-color: #45a878;
}

/* 瀑布流布局 */
.masonry-grid {
  column-gap: 20px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
}

.image-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-card img {
  width: 100%;
  height: auto;
  display: block;
}

/* 图片悬停遮罩 */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 20px 15px 15px;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.image-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 13px;
}

.photographer {
  font-weight: 500;
}

.likes {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 加载更多触发器 */
.load-more-trigger {
  padding: 20px;
  text-align: center;
  min-height: 100px;
}

.loading-more,
.no-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

.no-more {
  color: #999;
  font-style: italic;
}
</style>
