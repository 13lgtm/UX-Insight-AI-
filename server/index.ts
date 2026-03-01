import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Initialize OpenAI SDK (using DeepSeek base URL)
const deepseekApiKey = process.env.DEEPSEEK_API_KEY || '';
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: deepseekApiKey
});

// If credentials are empty, we handle it gracefully or throw warning
if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ SUPABASE_URL or SUPABASE_KEY is missing in .env file!');
}
if (!deepseekApiKey) {
    console.warn('⚠️ DEEPSEEK_API_KEY is missing in .env file! AI analysis will not work.');
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'UX Insight API is running' });
});

// GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        res.json(data || []);
    } catch (error: any) {
        console.warn('Fallback to mock projects data due to Supabase error:', error.message);
        // Mock data based on the frontend
        res.json([
            { id: 1, title: 'Q3 用户研究 - 移动端 App', desc: '针对 iOS 和 Android 新结算流程的可用性测试。', icon: 'Smartphone', iconBg: 'bg-blue-50 text-blue-600 border-blue-100', status: '已完成', statusColor: 'bg-green-100 text-green-800 border-green-200', interviews: '12 场访谈', date: '10月24日' },
            { id: 2, title: '电商结算流程', desc: '深入探究购物车放弃原因及支付摩擦点。', icon: 'ShoppingCart', iconBg: 'bg-purple-50 text-purple-600 border-purple-100', status: '分析中', statusColor: 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse', interviews: '处理中 (4/8)', date: '今天', isActive: true },
            { id: 3, title: 'B2B 仪表盘重设计', desc: '下周已安排与企业客户的访谈。', icon: 'LayoutDashboard', iconBg: 'bg-orange-50 text-orange-600 border-orange-100', status: '待处理', statusColor: 'bg-slate-100 text-slate-600 border-slate-200', interviews: '0/15 已安排', date: '11月12日' }
        ]);
    }
});

// POST a new project
app.post('/api/projects', async (req, res) => {
    try {
        const { title, desc, icon, iconBg, status, statusColor, interviews, date, isActive } = req.body;

        const { data, error } = await supabase
            .from('projects')
            .insert([
                { title, desc, icon, iconBg, status, statusColor, interviews, date, isActive }
            ])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error: any) {
        console.error('Error creating project:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// GET insights for a specific project
app.get('/api/projects/:id/insights', async (req, res) => {
    try {
        const projectId = req.params.id;
        const { data, error } = await supabase
            .from('insights')
            .select('*')
            .eq('project_id', projectId);

        if (error) throw error;
        res.json(data || []);
    } catch (error: any) {
        console.warn('Fallback to mock insights data.');
        res.json([
            { id: 1, project_id: 2, type: 'P0 痛点', severity: 'red', title: '手动标记耗时过长', tags: ['流程效率', '高频提及'], quote: '手动标记耗费了 70% 的时间...', personaName: '张睿', personaRole: '资深 UX 设计师' },
            { id: 2, project_id: 2, type: 'P1 痛点', severity: 'yellow', title: '跨工具查找语境困难', tags: ['工具割裂', '数据孤岛'], quote: '当我在写报告需要引用某段话时...', personaName: '张睿', personaRole: '资深 UX 设计师' }
        ]);
    }
});

// GET transcripts for a specific project
app.get('/api/projects/:id/transcripts', async (req, res) => {
    try {
        const projectId = req.params.id;
        const { data, error } = await supabase
            .from('transcripts')
            .select('*')
            .eq('project_id', projectId)
            .order('timestamp', { ascending: true });

        if (error) throw error;
        res.json(data || []);
    } catch (error: any) {
        console.warn('Fallback to mock transcripts data.');
        res.json([
            { id: 1, project_id: 2, speaker: '访谈员 (你)', timeGroup: '00:14', text: '您好，张睿，感谢今天参加。作为一名资深 UX 设计师，你认为目前使用的研究工具中最大的痛点是什么？' },
            { id: 2, project_id: 2, speaker: '张睿', timeGroup: '00:22', text: '说实话，最让我头疼的是整理素材的效率。每次访谈结束后，面对几个小时的视频素材，我经常感到无从下手。' }
        ]);
    }
});

// POST analyze unstructured text using DeepSeek AI
app.post('/api/analyze', async (req, res) => {
    try {
        const { text, projectId } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text input is required' });
        }

        if (!projectId) {
            return res.status(400).json({ error: 'projectId is required' });
        }

        console.log(`Starting AI analysis for project ${projectId}...`);

        const systemPrompt = `
你是 UX-Insight AI 的核心处理大脑，一位资深的用户研究专家与数据分析师。
请严格将原始文本拆解为结构化的用户画像、核心痛点和需求列表。

强制规范：
1. 必须使用 JSON 格式输出，且只能包含 JSON，不能包含其他前缀和后缀文本。
2. 绝对禁止幻觉：每一条提炼的结论，都必须在原始数据源中找到对应。
3. [极其重要] 溯源金句（quote）必须 100% 一字不差地从原始文本中复制（Verbatim 提取）。绝对不容许任何概括、缩写或是标点符号的改动！如果做不到一字不差，前端的溯源高亮功能将会彻底失败。

JSON 结构必须严格符合以下格式：
{
  "persona": {
    "name": "用户姓名",
    "role": "用户角色或职业"
  },
  "insights": [
    {
      "type": "痛点/需求类型 (例如: P0 痛点, 高优需求)",
      "severity": "严重程度 (必须选择其一: red, yellow, green)",
      "title": "简短的标题",
      "tags": ["标签1", "标签2"],
      "quote": "必须 100% 一字不差的原文溯源金句"
    }
  ]
}
`;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `请分析以下访谈记录:\n\n${text}` }
            ],
            model: "deepseek-chat",
            response_format: { type: "json_object" }, // Enforce JSON response if supported
            temperature: 0.1, // Low temperature to reduce hallucinations
        });

        const replyContent = completion.choices[0].message.content;

        if (!replyContent) {
            throw new Error("AI returned empty content");
        }

        let parsedData;
        try {
            parsedData = JSON.parse(replyContent);
        } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", replyContent);
            return res.status(500).json({ error: "AI response formatting error" });
        }

        console.log(`AI analysis completed successfully. Extracting ${parsedData.insights?.length || 0} insights.`);

        // Step 2: Save to Supabase
        if (parsedData.insights && Array.isArray(parsedData.insights)) {
            const insightsToInsert = parsedData.insights.map((insight: any) => ({
                project_id: projectId,
                type: insight.type || 'Insight',
                severity: insight.severity || 'blue',
                title: insight.title || 'Untitled',
                tags: insight.tags || [],
                quote: insight.quote || '',
                personaName: parsedData.persona?.name || 'Unknown',
                personaRole: parsedData.persona?.role || 'User'
            }));

            // Attempt to insert. If it fails due to table missing, we just log and return data anyway.
            const { error: insertError } = await supabase
                .from('insights')
                .insert(insightsToInsert);

            if (insertError) {
                console.error("Failed to save insights to Supabase (Mock mode or schema issue):", insertError.message);
                // We still return the parsed data to the frontend so the UI works
            } else {
                console.log(`Successfully saved insights to database.`);
            }
        }

        res.json({ success: true, data: parsedData });

    } catch (error: any) {
        console.error('Error in AI analysis endpoint:', error);

        // Forward OpenAI/DeepSeek API specific status codes (e.g. 402 Insufficient Balance, 401 Unauthorized)
        const status = error.status || error.response?.status || 500;
        const message = error.error?.message || error.message || 'Internal Server Error';

        res.status(status).json({ error: message, type: 'api_error' });
    }
});

// Start the server (only locally, Vercel will handle standard exports)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

export default app;
