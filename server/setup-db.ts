import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
    console.log('Setting up Supabase database...');

    // Note: Using the Supabase JS client to create tables requires specific RPC or raw SQL access
    // which is typically done via migrations or the Supabase dashboard SQL editor.
    // Since we don't have direct SQL access through standard API with anon keys, 
    // we will instruct the user or assume tables are created if this fails, 
    // or we will try to insert and catch the error to guide the user.

    const initialProjects = [
        { id: 1, title: 'Q3 用户研究 - 移动端 App', desc: '针对 iOS 和 Android 新结算流程的可用性测试。', icon: 'Smartphone', iconBg: 'bg-blue-50 text-blue-600 border-blue-100', status: '已完成', statusColor: 'bg-green-100 text-green-800 border-green-200', interviews: '12 场访谈', date: '10月24日', isActive: false },
        { id: 2, title: '电商结算流程', desc: '深入探究购物车放弃原因及支付摩擦点。', icon: 'ShoppingCart', iconBg: 'bg-purple-50 text-purple-600 border-purple-100', status: '分析中', statusColor: 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse', interviews: '处理中 (4/8)', date: '今天', isActive: true },
        { id: 3, title: 'B2B 仪表盘重设计', desc: '下周已安排与企业客户的访谈。', icon: 'LayoutDashboard', iconBg: 'bg-orange-50 text-orange-600 border-orange-100', status: '待处理', statusColor: 'bg-slate-100 text-slate-600 border-slate-200', interviews: '0/15 已安排', date: '11月12日', isActive: false },
        { id: 4, title: '金融科技入职研究', desc: 'KYC 流程流失率分析。', icon: 'PiggyBank', iconBg: 'bg-teal-50 text-teal-600 border-teal-100', status: '已完成', statusColor: 'bg-green-100 text-green-800 border-green-200', interviews: '24 场访谈', date: '9月15日', isActive: false },
        { id: 5, title: '2023 无障碍审计', desc: '与视障用户的屏幕阅读器兼容性测试。', icon: 'Accessibility', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100', status: '分析中', statusColor: 'bg-blue-100 text-blue-800 border-blue-200 animate-pulse', interviews: '处理中 (2/6)', date: '昨天', isActive: true }
    ];

    const initialInsights = [
        { id: 1, project_id: 2, type: 'P0 痛点', severity: 'red', title: '手动标记耗时过长', tags: ['流程效率', '高频提及'], quote: '手动标记耗费了 70% 的时间...', personaName: '张睿', personaRole: '资深 UX 设计师' },
        { id: 2, project_id: 2, type: 'P1 痛点', severity: 'yellow', title: '跨工具查找语境困难', tags: ['工具割裂', '数据孤岛'], quote: '当我在写报告需要引用某段话时...', personaName: '张睿', personaRole: '资深 UX 设计师' },
        { id: 3, project_id: 2, type: '高优需求', severity: 'green', title: '自动提取关键信息与标签', tags: ['AI 赋能', '自动化'], quote: '我希望它能自动提取关键信息并打上标签...', personaName: '张睿', personaRole: '资深 UX 设计师' }
    ];

    const initialTranscripts = [
        { id: 1, project_id: 2, speaker: '访谈员 (你)', timeGroup: '00:14', text: '您好，张睿，感谢今天参加。作为一名资深 UX 设计师，你认为目前使用的研究工具中最大的痛点是什么？', timestamp: 14 },
        { id: 2, project_id: 2, speaker: '张睿', timeGroup: '00:22', text: '说实话，最让我头疼的是整理素材的效率。每次访谈结束后，面对几个小时的视频素材，我经常感到无从下手。', timestamp: 22 },
        { id: 3, project_id: 2, speaker: '张睿', timeGroup: '00:45', text: '具体来说，手动标记耗费了 70% 的时间。感觉我只是在浪费几个小时把便签转录到数字工具中。而且当我在写报告需要引用某段话时，跨工具查找原始语境极其困难，往往要重新翻看好几个视频。', timestamp: 45 },
        { id: 4, project_id: 2, speaker: '访谈员 (你)', timeGroup: '01:12', text: '如果有一个理想的工具，你希望它能帮你解决什么问题？', timestamp: 72 },
        { id: 5, project_id: 2, speaker: '张睿', timeGroup: '01:18', text: '我希望它能自动提取关键信息并打上标签，最好能直接生成结构化的洞察。这样我就可以把精力放在分析和策略上，而不是做搬运工。', timestamp: 78 }
    ];

    console.log('Attempting to seed projects...');
    const { error: projectsError } = await supabase.from('projects').upsert(initialProjects);
    if (projectsError) {
        console.error('❌ Error seeding projects (Tables might not exist):', projectsError.message);
        console.log('\n=========================================');
        console.log('🚨 PLEASE CREATE THE FOLLOWING TABLES IN SUPABASE:');
        console.log(`
1. Table 'projects':
   columns: id (int8/serial), title (text), desc (text), icon (text), iconBg (text), status (text), statusColor (text), interviews (text), date (text), isActive (boolean)

2. Table 'insights':
   columns: id (int8/serial), project_id (int8), type (text), severity (text), title (text), tags (jsonb/text[]), quote (text), personaName (text), personaRole (text)

3. Table 'transcripts':
   columns: id (int8/serial), project_id (int8), speaker (text), timeGroup (text), text (text), timestamp (int8)
`);
        console.log('=========================================\n');
        process.exit(1);
    } else {
        console.log('✅ Projects seeded successfully.');

        console.log('Attempting to seed insights...');
        await supabase.from('insights').upsert(initialInsights);

        console.log('Attempting to seed transcripts...');
        await supabase.from('transcripts').upsert(initialTranscripts);

        console.log('🎉 Database setup complete!');
    }
}

setupDatabase().catch(console.error);
