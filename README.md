# NextNote

一个基于 **Next.js 15+** 构建的现代化笔记应用，支持 **多语言国际化、文件上传、用户认证**，并结合 **Redis + MySQL (Prisma ORM)** 提供快速可靠的笔记管理体验。

## ✨ 特性

- ⚡ **极速体验**：基于 Next.js 15 App Router 构建，支持 SSR / SSG / ISR
- 🌍 **多语言国际化**：使用 **next-intl** 提供多语言切换
- 📂 **文件上传**：支持上传附件/图片，增强笔记内容
- 🗄️ **数据库支持**：Redis 用于缓存，MySQL 作为主存储（通过 Prisma 管理）
- 🔑 **用户认证**：基于 **NextAuth (Credentials)** 提供安全的身份认证
- 🎨 **现代化 UI**：Tailwind CSS + shadcn/ui + Radix UI
- 📱 **响应式设计**：完美适配桌面与移动设备
- 🔐 **全类型安全**：TypeScript + Zod 校验
- 🚀 **开发友好**：Turbopack 热重载、路径别名、ESLint + Prettier 配置

---

## 🛠 技术栈

- **框架**: [Next.js 15 (App Router)](https://nextjs.org)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui + Radix UI
- **数据库**:
  - Redis (缓存/会话)
  - MySQL (主存储，Prisma ORM)
- **认证**: NextAuth.js (Credentials Provider)
- **国际化**: next-intl
- **文件上传**: 基于 MIME 检测 & 可扩展存储（如本地 / 云服务）
- **工具**: ESLint, Zod, dayjs

---

## 🚀 快速开始

### 环境要求

- Node.js **18.17+**
- MySQL **8.0+**
- Redis **6.2+**
- npm / yarn / pnpm 包管理器

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/leongaooo/next-note.git
cd next-note
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

复制 `.env.example` 到 `.env` 并修改：

```bash
cp .env.example .env
```

环境变量示例：
```env
DATABASE_URL="mysql://user:password@localhost:3306/nextnote"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. **初始化数据库**

```bash
npx prisma migrate dev
npx prisma db seed   # 如果需要初始化数据
```

5. **启动 Redis 服务**

```bash
# macOS
brew services start redis
# Ubuntu/Debian
sudo systemctl start redis
# Docker
docker run -d -p 6379:6379 redis:alpine
```

6. **运行开发服务器**

```bash
npm run dev
```

服务运行于 [http://localhost:3000](http://localhost:3000)。

---

## 📦 可用脚本

- `npm run dev` - 启动开发服务器（Turbopack）
- `npm run build` - 构建生产版本
- `npm start` - 运行生产服务器
- `npm run lint` - 执行 ESLint
- `npx prisma studio` - 打开 Prisma Studio 管理数据库

---

## 📖 功能预览

- [x] 创建 / 编辑 / 删除笔记
- [x] 支持 Markdown 渲染 + 语法高亮
- [x] 多语言 UI（中英文切换）
- [x] 支持文件上传（图片 / 附件）
- [x] 用户登录 / 注册（凭证认证）
- [x] Redis 缓存加速查询
- [ ] ~~即将支持：标签管理 / 笔记分享 / 协同编辑~~

---

## 🤝 贡献指南

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详细步骤。

1. Fork 仓库
2. 创建新分支 (`git checkout -b feature/xxx`)
3. 提交更改并推送 (`git commit -m "feat: 添加 xxx 功能"`)
4. 发起 Pull Request

---

## ⭐ 鸣谢

- [Next.js](https://nextjs.org)
- [Prisma](https://www.prisma.io)
- [NextAuth.js](https://next-auth.js.org)
- [Redis](https://redis.io)

---

⭐ 如果这个项目对你有帮助，请帮忙点个 Star！