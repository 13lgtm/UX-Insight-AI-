import React from 'react';
import { Download, Share2, ChevronRight, Users, AlertTriangle, Lightbulb, TrendingUp, BarChart as BarChartIcon, ChevronDown, PersonStanding, Quote, Ban, Sparkles } from 'lucide-react';

interface ReportViewProps {
  onNavigate: (view: string) => void;
}

export default function ReportView({ onNavigate }: ReportViewProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <span className="cursor-pointer hover:text-blue-600" onClick={() => onNavigate('projects')}>项目</span>
              <ChevronRight size={12} />
              <span>金融 App 重构</span>
              <ChevronRight size={12} />
              <span className="text-slate-900 font-medium">全局报告</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">全局洞察汇总</h1>
            <p className="text-slate-500 text-sm mt-1">基于 12 场用户访谈汇总 • 最后更新于 2 小时前</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 mr-2">筛选：</span>
            <div className="relative">
              <select className="appearance-none text-sm border border-slate-200 rounded-lg bg-white py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer">
                <option>所有角色</option>
                <option>产品经理</option>
                <option>设计师</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none text-sm border border-slate-200 rounded-lg bg-white py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer">
                <option>最近 30 天</option>
                <option>上个季度</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              聚合用户画像
            </h3>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-sm">
                    <UserSearchIcon />
                  </div>
                  <span className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white" title="高置信度匹配"></span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">“效率追求者”</h2>
                <p className="text-sm text-slate-500 mt-1">基于 12 场访谈的综合画像</p>
                <div className="mt-6 w-full space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">平均经验</span>
                    <span className="font-medium text-slate-900">5-8 年</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">技术熟练度</span>
                    <span className="font-medium text-slate-900">高</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">主要设备</span>
                    <span className="font-medium text-slate-900">桌面端 / Mac</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                    <Lightbulb className="text-amber-500" size={20} />
                    目标与动机
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 ml-1">
                    <li>简化重复的日常工作流程。</li>
                    <li>数据准确性优于速度。</li>
                    <li>寻求不同工具之间的集成。</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                    <Ban className="text-red-500" size={20} />
                    常见挫折
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 ml-1">
                    <li>手动数据录入错误导致返工。</li>
                    <li>缺乏实时协作功能。</li>
                    <li>新团队成员上手复杂。</li>
                  </ul>
                </div>
                <div className="md:col-span-2 relative pl-10 pr-4 py-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <Quote className="absolute left-3 top-3 text-blue-200" size={24} />
                  <p className="text-sm italic text-slate-700">
                    "在 85% 的访谈中，参与者表达了强烈的愿望，希望通过自动化取代手动数据录入，并将其列为每周报告周期的主要瓶颈。"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BarChartIcon className="text-red-500" size={20} />
              痛点分布图
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">查看详细分析</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">按类别频率分布</h4>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-slate-700">手动录入数据</span>
                    <span className="text-xs font-semibold text-slate-500">10 次提及 (83%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden relative">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '83%' }}></div>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-slate-700">性能/速度</span>
                    <span className="text-xs font-semibold text-slate-500">7 次提及 (58%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-slate-700">导出选项</span>
                    <span className="text-xs font-semibold text-slate-500">4 次提及 (33%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-medium text-slate-700">移动端适配</span>
                    <span className="text-xs font-semibold text-slate-500">2 次提及 (16%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: '16%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100 p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600">
                  <AlertTriangle size={18} />
                </span>
                <span className="text-xs font-bold text-red-800 uppercase tracking-wide">高优先级</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">手动录入是关键痛点</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                “手动录入数据”的投诉频率比平均痛点高出 <strong>45%</strong>。这表明需要在 Q3 路线图中立即增加自动化功能。
              </p>
              <button className="mt-4 w-full py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                查看相关片段 (10)
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="text-purple-600" size={20} />
              AI 战略建议
            </h3>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase rounded border border-purple-200 tracking-wider">由 GPT-4o 生成</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-1 bg-blue-500 w-full"></div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 mb-2">自动化摄取流程</h4>
                <p className="text-sm text-slate-600 mb-4 flex-1">
                  在上传流程中直接实施 OCR 和语音转文本，以解决排名第一的痛点。这可以将用户工作流程时间减少约 40%。
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <span className="text-xs font-medium text-slate-500">工作量: 高</span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">影响力: 高</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-1 bg-green-500 w-full"></div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 mb-2">统一仪表板视图</h4>
                <p className="text-sm text-slate-600 mb-4 flex-1">
                  用户很难看到“大局”。开发一个综合仪表板（如本仪表板），供最终用户可视化他们自己的项目健康状况。
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <span className="text-xs font-medium text-slate-500">工作量: 中</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">影响力: 中</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-1 bg-purple-500 w-full"></div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 mb-2">审查导出格式</h4>
                <p className="text-sm text-slate-600 mb-4 flex-1">
                  虽然提及频率较低，但导出问题是“高级用户”的阻碍。添加原始 JSON 和 CSV 导出以满足技术人员细分市场的需求。
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <span className="text-xs font-medium text-slate-500">工作量: 低</span>
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">影响力: 低</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-10"></div>
      </div>
    </div>
  );
}

function UserSearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="4" />
      <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
      <circle cx="17" cy="17" r="3" />
      <path d="m21 21-1.5-1.5" />
    </svg>
  );
}
