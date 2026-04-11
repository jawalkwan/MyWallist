<template>
  <div>
    <div class="title">Information</div>
    <div class="items">
      <div class="item">
        <div class="name">Path:</div>
        <div class="value">{{ path }}</div>
      </div>
      <div class="item">
        <div class="name">Route Name:</div>
        <div class="value">{{ name }}</div>
      </div>
      <div class="item">
        <div class="name">Vue.js:</div>
        <div class="value">{{ vue }}</div>
      </div>
      <div class="item">
        <div class="name">Electron:</div>
        <div class="value">{{ electron }}</div>
      </div>
      <div class="item">
        <div class="name">Node:</div>
        <div class="value">{{ node }}</div>
      </div>
      <div class="item">
        <div class="name">Platform:</div>
        <div class="value">{{ platform }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'system-information',
  setup() {
    const route = useRoute()
    
    // 使用 ref 存储系统信息
    const electron = ref<string>('N/A')
    const node = ref<string>('N/A')
    const platform = ref<string>('N/A')
    
    // 组件挂载后通过 IPC 获取系统信息
    onMounted(async () => {
      try {
        // 通过 ipcRenderer 获取系统信息
        const systemInfo = await window.ipcRenderer.invoke('get-system-info')
        if (systemInfo) {
          electron.value = systemInfo.electron || 'N/A'
          node.value = systemInfo.node || 'N/A'
          platform.value = systemInfo.platform || 'N/A'
        }
      } catch (error) {
        console.error('Failed to get system info:', error)
      }
    })
    
    return {
      electron,
      name: route.name,
      node,
      path: route.path,
      platform,
      vue: '3.5.32' // Vue 3 version
    }
  }
})
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
