# Unsplash API 配置指南

## 如何获取 Unsplash Access Key

### 步骤 1: 注册 Unsplash 账号

1. 访问 https://unsplash.com
2. 点击右上角的 "Join" 注册账号，或使用已有账号登录

### 步骤 2: 成为开发者

1. 访问 https://unsplash.com/developers
2. 点击 "Become a Developer" 按钮
3. 填写开发者信息（如实填写即可）

### 步骤 3: 创建应用

1. 在开发者控制台点击 "New Application"
2. 接受 API 使用条款
3. 填写应用信息：
   - **Application Name**: MyWallist（或你喜欢的名称）
   - **Description**: A desktop wallpaper browser application（简要描述）
   - **Website URL**: 可以填写你的 GitHub 仓库地址或留空
4. 点击 "Create application"

### 步骤 4: 获取 Access Key

1. 创建应用后，你会看到应用详情页面
2. 找到 "Keys" 部分
3. 复制 **Access Key**（一串随机字符）

**重要提示**: 
- ⚠️ 不要将 Access Key 公开分享或提交到公共代码仓库
- ⚠️ Access Key 应该保密，仅在你的应用中使用

### 步骤 5: 配置到你的项目

#### 方法一：使用 .env 文件（推荐）

1. 在项目根目录创建 `.env` 文件：
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   
   # 或者手动创建
   ```

2. 编辑 `.env` 文件：
   ```env
   VITE_UNSPLASH_ACCESS_KEY=你的AccessKey粘贴在这里
   ```

3. **重要**: 确保 `.env` 文件已添加到 `.gitignore`，避免泄露密钥

#### 方法二：直接修改配置文件

编辑 `src/renderer/config/unsplash.ts`：

```typescript
export const UNSPLASH_CONFIG = {
  ACCESS_KEY: '将你的AccessKey粘贴在这里',
  BASE_URL: 'https://api.unsplash.com',
  PER_PAGE: 20,
  ORDER_BY: 'latest'
}
```

### 步骤 6: 验证配置

1. 运行应用：
   ```bash
   npm run dev
   ```

2. 如果配置正确，你应该能看到图片正常加载
3. 如果看到错误提示 "API 访问被拒绝"，请检查 Access Key 是否正确

## 常见问题

### Q: 提示 "API 访问被拒绝"？

A: 可能原因：
1. Access Key 复制不完整（确保没有多余空格）
2. Access Key 配置位置错误
3. 应用被 Unsplash 暂停（检查开发者控制台）

### Q: 提示 "API 请求次数过多"？

A: Unsplash API 限制每小时 50 次请求。解决方法：
1. 等待一段时间后重试
2. 减少刷新频率
3. 考虑升级到付费计划

### Q: 图片加载很慢？

A: 可能原因：
1. 网络连接问题
2. Unsplash 服务器响应慢
3. 图片尺寸较大（可以调整配置使用较小尺寸）

### Q: 如何在生产环境中安全地使用 Access Key？

A: 最佳实践：
1. 使用环境变量，不要硬编码在代码中
2. 确保 `.env` 文件在 `.gitignore` 中
3. 对于公开发布的应用，考虑使用后端代理转发请求

## API 使用规范

根据 Unsplash 的要求，使用 API 时需要：

1. ✅ **显示摄影师署名**（应用中已实现）
2. ✅ **提供指向原图的链接**（可选）
3. ✅ **遵守每小时 50 次请求限制**
4. ❌ **不要缓存图片超过 24 小时**
5. ❌ **不要批量下载图片**

详细信息请参考：https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines

## 技术支持

如遇到其他问题，请查看：
- Unsplash API 文档: https://unsplash.com/documentation
- Unsplash 开发者论坛: https://forums.unsplash.com/
