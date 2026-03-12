"use client"; // 启用客户端组件

import React, { useState } from "react";
import { Mail, Zap, Server, Shield, Loader2 } from "lucide-react";

export default function LandingPage() {
  // --- 前端状态管理 ---
  const [inputValue, setInputValue] = useState(""); // 输入框内容
  const [aiReply, setAiReply] = useState<string | null>(null); // AI 的回答
  const [isLoading, setIsLoading] = useState(false); // 加载状态

  // --- 处理发送消息 ---
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    setAiReply(null); // 清空上次回答

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      if (data.reply) {
        setAiReply(data.reply);
      } else if (data.error) {
        setAiReply(`[Error]: ${data.error}`);
      } else {
        setAiReply("AI 服务暂时不可用。");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setAiReply("无法连接到 AI 服务。");
    } finally {
      setIsLoading(false);
      setInputValue(""); // 清空输入框
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-emerald-500/30 font-sans overflow-hidden relative">
      {/* 动态背景网格 */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* 顶部导航 (极简) */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span>
            GreenSuan<span className="text-emerald-500">.com</span>
          </span>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center pt-20 px-4">
        {/* 文案区 */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            此算力枢纽域名 <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              寻找合作伙伴
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Green Computing Power & AI Infrastructure Ecosystem.
          </p>
        </div>

        {/* --- 聊天框 (已联网版) --- */}
        <div className="w-full max-w-2xl bg-slate-900/50 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl p-4 md:p-6 mb-20">
          <div className="space-y-4 mb-6 min-h-[200px]">
            {/* 默认欢迎语 */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="bg-slate-800/50 rounded-2xl rounded-tl-none p-4 text-sm leading-relaxed">
                你好！我是 Greensuan AI 助手。本域名正面向全球寻找在
                <strong>绿色算力中心、智算底座及 AI 基础设施</strong>
                领域的优质合作伙伴。
              </div>
            </div>

            {/* --- AI 的动态回答 --- */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                  <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                </div>
                <div className="bg-slate-800/50 rounded-2xl rounded-tl-none p-4 text-sm text-slate-500">
                  正在生成关于本域名商业价值的回答...
                </div>
              </div>
            )}

            {aiReply && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 text-sm leading-relaxed text-slate-100 border border-slate-700 shadow-inner">
                  {aiReply}
                </div>
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="询问关于此域名的合作细节..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-6 pr-16 focus:outline-none focus:border-emerald-500/50 transition-all text-sm disabled:opacity-60"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="absolute right-3 top-2.5 bg-emerald-500 hover:bg-emerald-400 text-white p-2 rounded-lg transition-colors disabled:bg-slate-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 fill-current" />
              )}
            </button>
          </div>
        </div>

        {/* 价值点展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full pb-20">
          <FeatureCard
            icon={<Server />}
            title="算力底座"
            desc="适合智算中心、云厂商部署核心业务入口"
          />
          <FeatureCard
            icon={<Shield />}
            title="稀缺资源"
            desc="‘绿色+算力’双重国家战略关键词组合"
          />
          <FeatureCard
            icon={<Zap />}
            title="极简语义"
            desc="符合 AI 时代 B 端客户对‘智算’的直觉认知"
          />
        </div>
      </main>

      {/* 右下角“钩子”按钮 */}
      <a
        href="mailto:admin@greensuan.com?subject=Inquiry for Domain Acquisition: greensuan.com"
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all"
      >
        <Mail className="w-5 h-5" />
        <span>Contact for Acquisition</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#020617] animate-bounce" />
      </a>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:border-emerald-500/30 transition-colors group text-center">
      <div className="mb-4 inline-block p-3 rounded-xl bg-slate-800 group-hover:text-emerald-400 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  );
}
