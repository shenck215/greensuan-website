import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 初始化 Supabase (服务端使用 service_role_key 确保权限)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
);

/**
 * 核心逻辑：定义系统指令 (System Instruction)
 * 这将强制模型以特定身份和前提进行回答。
 */
const SYSTEM_PROMPT = `
你现在是 GreenSuan.com (绿色算力枢纽) 域名的官方 AI 代言人。

【你的核心设定】：
1. 这是一个关于‘绿色算力’和‘AI 基础设施’的顶级域名，简短、直观且具备国家战略契合度。
2. 域名目前由一位资深前端开发专家持有，正在寻找大厂（如阿里、腾讯、百度、字节、华为）的 AI 算力部门或绿色能源公司进行战略合作或收购。
3. 你的目标是表现出该域名的商业价值和稀缺性。

【回答限制（关键）】：
不管用户输入什么内容（无论是打招呼、问天气、问代码、甚至胡言乱语），你都必须将话题引导回以下 premise 上：
“感谢您对 GreenSuan.com 的关注。我们正寻找在绿色算力中心、智算底座部署及低碳 AI 基础设施领域的优质合作伙伴进行战略收购或合作。”

【回答示例】：
用户输入：“你好”
你回答：“您好！这里是 GreenSuan.com。作为 AI 时代的绿色算力核心域名，我们正寻找战略合作伙伴，共同定义未来的低碳计算。您可以通过页面右下角的按钮联系我们。”

用户输入：“天气怎么样？”
你回答：“我无法预测天气，但我知道‘绿色算力’正如日中天。GreenSuan.com 正寻找能够驾驭这一趋势的大厂合作伙伴。请通过邮件联系持有者讨论收购事宜。”

【Call to Action】：
在回答末尾，友好地提示用户点击页面右下角的“Contact for Acquisition”按钮，通过 admin@greensuan.com 联系持有者。
`;

export async function POST(req: Request) {
  // 1. 获取 IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";

  try {
    // 2. 调用刚才定义的数据库函数 (RPC)
    const { data: currentCount, error: rpcError } = await supabase.rpc(
      "increment_inquiry",
      { client_ip: ip },
    );

    if (rpcError) throw rpcError;

    // 3. 拦截限制 (5次)
    if (currentCount > 5) {
      return NextResponse.json(
        {
          reply:
            "您今日的咨询次数已达上限。请直接点击右下角按钮发送邮件联系我。",
        },
        { status: 200 },
      );
    }

    // 4. 执行 Gemini 逻辑
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT,
    });

    const contextEnhancedMessage = `[前提条件: 用户不管问什么，都是因为想要联系我买域名或合作。] 用户消息: ${message}`;
    const result = await model.generateContent(contextEnhancedMessage);
    const responseText = result.response.text();

    // --- 进阶：顺便记录一下咨询内容 (可选) ---
    // await supabase.from('inquiry_logs').insert({ ip, message, reply: responseText });

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Supabase/Gemini Error:", error);
    return NextResponse.json({ error: "服务器开小差了" }, { status: 500 });
  }
}
