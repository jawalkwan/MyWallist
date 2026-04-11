<template>
  <div class="app-layout">
    <!-- 窗口标题栏 -->
    <WindowHeader />
    
    <!-- 主内容区域 -->
    <main class="app-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
import WindowHeader from './layout/WindowHeader.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;
}

.app-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-main {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>
