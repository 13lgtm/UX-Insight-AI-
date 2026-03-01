import React from 'react';
import { Search, Settings2, Bookmark, MousePointerClick, ShoppingBag, Smartphone, Mic, Smile, ShieldCheck, UserSearch, Map, Plus } from 'lucide-react';

interface TemplatesViewProps {
  onNavigate?: (view: string) => void;
}

export default function TemplatesView({ onNavigate }: TemplatesViewProps) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="px-8 py-6 pb-2 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">模板库</h1>
            <p className="text-slate-500 mt-1">探索并应用经过验证的研究框架，快速启动您的项目。</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg shadow-sm transition-all font-medium">
            <Settings2 size={20} />
            管理自定义模板
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 text-sm outline-none" placeholder="搜索模板..." type="text" />
          </div>
          <div className="flex items-center gap-2 pr-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 uppercase px-2 shrink-0">类别筛选:</span>
            <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium shadow-sm transition-colors whitespace-nowrap">全部</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">电商零售</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">金融科技</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">SaaS/企业</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">通用</button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 pt-4">
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">可用性测试</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                  <MousePointerClick size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">标准可用性测试模板</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">包含任务完成度、错误率统计及 SUS 问卷的标准流程，适用于大多数产品核心功能测试。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 border border-pink-100">
                  <ShoppingBag size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">电商结账流程优化</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">专注于购物车放弃率和支付流程摩擦点的深度测试框架。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 border border-teal-100">
                  <Smartphone size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">跨平台体验一致性</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">比较 Web 端与移动端 App 在关键用户旅程中的体验差异。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">用户访谈</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                  <Mic size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">深度用户访谈 (IDI)</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">探索用户动机、行为模式及潜在需求的半结构化访谈指南。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                  <Smile size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">客户流失原因调查</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">针对已取消订阅或长期不活跃用户的专项回访话术。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                  <ShieldCheck size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">新功能需求验证</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">在开发前验证解决方案是否匹配用户真实痛点。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
            <button className="group border-2 border-dashed border-slate-300 rounded-xl p-5 hover:border-blue-600 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center h-full min-h-[220px]">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors mb-3">
                <Plus size={28} />
              </div>
              <h3 className="text-base font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">创建自定义模板</h3>
              <p className="text-xs text-slate-400 mt-1 px-4">保存您独特的研究方法论以供团队复用。</p>
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">用户画像与策略</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                  <UserSearch size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">用户画像构建 (Persona)</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">系统化收集人口统计学、心理特征及行为数据，构建精准用户模型。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100">
                  <Map size={24} />
                </div>
                <Bookmark size={20} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">用户旅程地图 (CJM)</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-3">全渠道接触点分析，识别用户情绪曲线低谷与机会点。</p>
              <div className="mt-auto">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 rounded-lg transition-colors text-sm font-medium border border-slate-200 group-hover:border-blue-600">
                  使用此模板
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
}
