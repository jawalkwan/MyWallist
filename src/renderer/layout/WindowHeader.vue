<template>
  <div class="window-header">
    <!-- 左侧：图标和标题 -->
    <div class="header-left">
      <div class="app-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <span class="app-title">MyWallist</span>
    </div>

    <!-- 右侧：窗口控制按钮 -->
    <div class="header-right">
      <button 
        class="window-btn minimize-btn" 
        @click="handleMinimize"
        title="最小化"
      >
        <svg viewBox="0 0 10 1" width="10" height="1">
          <rect width="10" height="1" fill="currentColor"/>
        </svg>
      </button>
      
      <button 
        class="window-btn maximize-btn" 
        @click="handleMaximize"
        :title="isMaximized ? '还原' : '最大化'"
      >
        <svg v-if="!isMaximized" viewBox="0 0 10 10" width="10" height="10">
          <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/>
        </svg>
        <svg v-else viewBox="0 0 10 10" width="10" height="10">
          <rect x="2.5" y="0.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/>
          <rect x="0.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/>
        </svg>
      </button>
      
      <button 
        class="window-btn close-btn" 
        @click="handleClose"
        title="关闭"
      >
        <svg viewBox="0 0 10 10" width="10" height="10">
          <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" stroke-width="1.2"/>
          <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" stroke-width="1.2"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const isMaximized = ref(false)

// 检查窗口是否最大化
const checkMaximized = async () => {
  try {
    isMaximized.value = await window.windowControl.isMaximized()
  } catch (error) {
    console.error('Failed to check maximized state:', error)
  }
}

// 最小化窗口
const handleMinimize = async () => {
  try {
    await window.windowControl.minimize()
  } catch (error) {
    console.error('Failed to minimize window:', error)
  }
}

// 最大化/还原窗口
const handleMaximize = async () => {
  try {
    await window.windowControl.maximize()
    // 切换后更新状态
    await checkMaximized()
  } catch (error) {
    console.error('Failed to toggle maximize:', error)
  }
}

// 关闭窗口
const handleClose = async () => {
  try {
    await window.windowControl.close()
  } catch (error) {
    console.error('Failed to close window:', error)
  }
}

// 组件挂载时检查窗口状态
onMounted(() => {
  checkMaximized()
})
</script>

<style scoped>
.window-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  background-color: #2c3e50;
  color: #ffffff;
  -webkit-app-region: drag; /* 允许拖拽窗口 */
  user-select: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 12px;
  -webkit-app-region: no-drag; /* 禁止在内容区域拖拽 */
}

.app-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b983;
}

.app-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  height: 100%;
  -webkit-app-region: no-drag; /* 禁止在按钮区域拖拽 */
}

.window-btn {
  width: 46px;
  height: 32px;
  border: none;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  outline: none;
}

.window-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.window-btn:active {
  background-color: rgba(255, 255, 255, 0.15);
}

.close-btn:hover {
  background-color: #e81123;
}

.close-btn:active {
  background-color: #f1707a;
}

.window-btn svg {
  pointer-events: none;
}
</style>
