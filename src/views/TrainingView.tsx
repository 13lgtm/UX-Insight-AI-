import React from 'react';
import { Search, Upload, FileText, FileJson, FileCode, MoreVertical, Plus, Book, Target, Shield, Database } from 'lucide-react';

export default function TrainingView() {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="px-8 py-6 pb-2 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI 训练数据</h1>
            <p className="text-slate-500 mt-1">上传行业术语、竞品资料和内部规范，提升 AI 解析的准确性与领域专业度。</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all font-medium">
            <Upload size={20} />
            上传训练数据
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 text-sm outline-none" placeholder="搜索训练文件..." type="text" />
          </div>
          <div className="flex items-center gap-2 pr-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 uppercase px-2 shrink-0">数据类型:</span>
            <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium shadow-sm transition-colors whitespace-nowrap">全部</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">行业术语</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">竞品资料</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">内部规范</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">历史报告</button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 pt-4">
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
            <Book size={16} className="text-blue-500" />
            行业术语库
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col relative">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <FileJson size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">金融科技词典_v2.json</h4>
                  <p className="text-xs text-slate-500">包含 1,240 个专业词汇</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">更新于 2 天前</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-wider border border-green-100">已生效</span>
              </div>
            </div>
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col relative">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">内部缩写对照表.csv</h4>
                  <p className="text-xs text-slate-500">包含 350 个公司内部黑话</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">更新于 上周</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-wider border border-green-100">已生效</span>
              </div>
            </div>
            <button className="group border-2 border-dashed border-slate-300 rounded-xl p-5 hover:border-blue-600 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center min-h-[120px]">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors mb-2">
                <Plus size={24} />
              </div>
              <h4 className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">添加术语库</h4>
            </button>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
            <Target size={16} className="text-orange-500" />
            竞品分析资料
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col relative">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">竞品A_产品功能矩阵.pdf</h4>
                  <p className="text-xs text-slate-500">用于 AI 识别竞品对比语境</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">更新于 1 个月前</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-wider border border-green-100">已生效</span>
              </div>
            </div>
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col relative">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">2023_行业竞品分析报告.pdf</h4>
                  <p className="text-xs text-slate-500">提供宏观市场背景知识</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">更新于 3 个月前</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200">处理中</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
            <Shield size={16} className="text-emerald-500" />
            内部设计规范
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all flex flex-col relative">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <FileCode size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Design_System_Guidelines.md</h4>
                  <p className="text-xs text-slate-500">指导 AI 提出符合规范的建议</p>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">更新于 2 周前</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-wider border border-green-100">已生效</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
}
