# GreenSuan.com - 绿色算力枢纽

GreenSuan.com 是一个展示绿色算力与 AI 基础设施生态系统的门户网站。本项目旨在通过极简、现代的设计展示域名的商业价值，并集成 AI 助手引导潜在合作伙伴。

## 核心功能

- **AI 智能助手**: 集成 Google Gemini (gemini-1.5-flash-preview)，提供关于域名价值的即时咨询。
- **价值展示**: 直观呈现“算力底座”、“稀缺资源”及“极简语义”三大核心卖点。
- **现代视觉**: 使用 Tailwind CSS 4 构建的深色模式、动态网格背景及流畅交互。
- **反垃圾机制**: 集成 Supabase RPC 记录 IP 咨询频率，防止 API 滥用。

## 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **底层**: [React 19](https://react.dev/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **后端服务**: [Supabase](https://supabase.com/) (用于 IP 访问限频)
- **图标**: [Lucide React](https://lucide.dev/)

## 开始使用

### 环境配置

在根目录创建 `.env.local` 文件并配置以下变量：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

### 开发启动

安装依赖并运行：

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可查看效果。

## 部署

推荐部署至 [Vercel](https://vercel.com)。记得在 Vercel 项目设置中配置上述环境变量。
