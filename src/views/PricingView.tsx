import React from 'react';
import { Check, ArrowLeft, Zap, Star, Building2, HelpCircle } from 'lucide-react';

interface PricingViewProps {
  onNavigate: (view: string) => void;
}

export default function PricingView({ onNavigate }: PricingViewProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            选择适合您的<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">研究加速方案</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10">所有方案均包含基础的 AI 访谈解析功能。随时可以升级或取消。</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-medium text-slate-500">月付</span>
            <button className="relative inline-flex h-7 w-14 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="translate-x-8 inline-block h-5 w-5 transform rounded-full bg-white transition-transform"></span>
            </button>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
              年付
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] uppercase tracking-wider">省 20%</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Zap size={80} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">基础版</h3>
            <p className="text-sm text-slate-500 mb-6 h-10">适合独立研究者和小型团队，满足基本的访谈整理需求。</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-900">免费</span>
            </div>
            <button onClick={() => onNavigate('projects')} className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors mb-8">
              当前方案
            </button>
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-900">包含功能：</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">每月 5 小时音视频解析</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">基础 AI 摘要与标签提取</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">最多 3 个活跃项目</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">单人账号使用</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-blue-400">
              <Star size={100} />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg uppercase tracking-wider">
              最受欢迎
            </div>
            <h3 className="text-xl font-bold text-white mb-2 mt-4">专业版</h3>
            <p className="text-sm text-slate-400 mb-6 h-10">为专业研究团队打造，提供深度的 AI 分析与协作功能。</p>
            <div className="mb-6 flex items-end gap-2">
              <span className="text-4xl font-extrabold text-white">¥299</span>
              <span className="text-slate-400 mb-1">/月</span>
            </div>
            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors mb-8 shadow-lg shadow-blue-900/50">
              升级到专业版
            </button>
            <div className="space-y-4">
              <p className="text-sm font-bold text-white">包含基础版所有功能，以及：</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-blue-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-300"><strong className="text-white">每月 50 小时</strong>音视频解析</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-300">高级 AI 结构化分析 (画像、痛点)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-300">一键生成全局洞察报告</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-300">支持最多 5 人团队协作</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-400 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-300">自定义模板库</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Building2 size={80} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">企业版</h3>
            <p className="text-sm text-slate-500 mb-6 h-10">为大型组织提供无限容量、高级安全与定制化 AI 模型。</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-900">定制</span>
            </div>
            <button className="w-full py-3 px-4 bg-white border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50 text-slate-900 font-bold rounded-xl transition-all mb-8">
              联系销售
            </button>
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-900">包含专业版所有功能，以及：</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">无限解析时长与项目数量</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">专属私有化 AI 模型微调</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">企业级 SSO 单点登录</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm text-slate-600">专属客户成功经理 (CSM)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center">
          <p className="text-slate-500 flex items-center justify-center gap-2">
            <HelpCircle size={18} />
            有特殊需求或疑问？ <a href="#" className="text-blue-600 font-medium hover:underline">查看常见问题</a> 或 <a href="#" className="text-blue-600 font-medium hover:underline">联系我们</a>
          </p>
        </div>
      </div>
    </div>
  );
}
