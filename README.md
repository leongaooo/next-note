# NextNote

一个基于 Next.js 15+ 构建的现代化笔记应用，使用 Redis 作为数据库存储，提供快速、可靠的笔记管理体验。

## 项目简介

NextNote 是一个简洁高效的笔记应用，具有以下特点：

- ⚡ **极速体验**：基于 Next.js 15 App Router 构建，支持 SSR/SSG/ISR
- 🗄️ **Redis 存储**：使用 Redis 作为数据库，提供高性能的数据读写
- 🎨 **现代化 UI**：Tailwind CSS + shadcn/ui 组件库
- 📱 **响应式设计**：完美适配桌面和移动设备
- 🔐 **类型安全**：完整的 TypeScript 支持
- 🚀 **开发友好**：热重载、路径别名、ESLint + Prettier 配置

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **数据库**: Redis
- **缓存**: Next.js 缓存 + Redis
- **部署**: Vercel (推荐)

## 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- Redis 6.2 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/leongaooo/next-note.git
cd next-note
```

2. **安装依赖**

```bash
npm install
# 或者使用 yarn
yarn install
```

4. **启动 Redis 服务**

确保本地 Redis 服务已启动：

```bash
# macOS (使用 Homebrew)
brew services start redis

# Ubuntu/Debian
sudo systemctl start redis

# Windows (使用 WSL2 或 Docker)
# Docker 方式
docker run -d -p 6379:6379 redis:alpine
```

5. **运行开发服务器**

```bash
npm run dev
# 或者
yarn dev
```

开发服务器将在 [http://localhost:3000](http://localhost:3000) 启动。

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查

## 贡献指南

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。


⭐ 如果这个项目对你有帮助，请给个星星！