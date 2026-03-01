import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
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

// If credentials are empty, we handle it gracefully or throw warning
if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ SUPABASE_URL or SUPABASE_KEY is missing in .env file!');
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

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
