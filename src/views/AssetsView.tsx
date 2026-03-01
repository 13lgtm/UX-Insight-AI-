import React from 'react';
import { Search, Grid, List, Filter, ArrowUpDown, Folder, MoreVertical, FolderPlus, FileText, Image as ImageIcon, FileJson, FileCode, UserPlus, Upload } from 'lucide-react';

export default function AssetsView() {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="px-8 py-6 pb-2 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">团队资产库</h1>
            <p className="text-slate-500 mt-1">集中管理团队共享的研究报告、设计规范及归档资料。</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 mr-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">JD</div>
              <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-medium text-blue-600">AL</div>
              <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-xs font-medium text-green-600">MK</div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              <UserPlus size={18} />
              邀请成员
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all font-medium text-sm">
              <Upload size={20} />
              上传文件
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 text-sm outline-none" placeholder="搜索文件或文件夹..." type="text" />
          </div>
          <div className="flex items-center gap-2 pr-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 uppercase px-2 shrink-0">视图:</span>
            <button className="p-1.5 text-blue-600 bg-blue-50 rounded transition-colors">
              <Grid size={20} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
              <List size={20} />
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1 shrink-0"></div>
            <button className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1">
              <Filter size={16} />
              筛选
            </button>
            <button className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown size={16} />
              排序
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 pt-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">文件夹</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Folder size={28} className="fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">共享报告库</h4>
              <p className="text-xs text-slate-500 mt-0.5">24 个文件 · 刚刚更新</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Folder size={28} className="fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">品牌设计规范</h4>
              <p className="text-xs text-slate-500 mt-0.5">8 个文件 · 3天前</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <Folder size={28} className="fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">历史研究归档</h4>
              <p className="text-xs text-slate-500 mt-0.5">156 个文件 · 上周</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <button className="group border border-dashed border-slate-300 rounded-xl p-4 hover:border-blue-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600">
            <FolderPlus size={24} />
            <span className="font-medium text-sm">新建文件夹</span>
          </button>
        </div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">最近文件</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col h-full relative">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center h-32 bg-slate-50 rounded-lg mb-4 border border-slate-100 group-hover:bg-white transition-colors">
              <FileText size={48} className="text-red-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 truncate group-hover:text-blue-600 transition-colors">2024 Q3 用户洞察报告.pdf</h3>
            <p className="text-xs text-slate-500 mb-3">2.4 MB · 更新于 2小时前</p>
            <div className="mt-auto flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">JD</div>
              <span className="text-xs text-slate-400">由 Jason D. 上传</span>
            </div>
          </div>
          <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col h-full relative">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center h-32 bg-slate-50 rounded-lg mb-4 border border-slate-100 group-hover:bg-white transition-colors">
              <ImageIcon size={48} className="text-purple-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 truncate group-hover:text-blue-600 transition-colors">Design_System_v2.0.fig</h3>
            <p className="text-xs text-slate-500 mb-3">Link · 更新于 昨天</p>
            <div className="mt-auto flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">MK</div>
              <span className="text-xs text-slate-400">由 Mike K. 创建</span>
            </div>
          </div>
          <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col h-full relative">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center h-32 bg-slate-50 rounded-lg mb-4 border border-slate-100 group-hover:bg-white transition-colors">
              <FileJson size={48} className="text-yellow-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 truncate group-hover:text-blue-600 transition-colors">user_interview_raw_data.json</h3>
            <p className="text-xs text-slate-500 mb-3">156 KB · 更新于 3天前</p>
            <div className="mt-auto flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">AL</div>
              <span className="text-xs text-slate-400">由 Alice L. 上传</span>
            </div>
          </div>
          <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col h-full relative">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center h-32 bg-slate-50 rounded-lg mb-4 border border-slate-100 group-hover:bg-white transition-colors">
              <FileText size={48} className="text-blue-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 truncate group-hover:text-blue-600 transition-colors">Q4 访谈提纲草案.docx</h3>
            <p className="text-xs text-slate-500 mb-3">450 KB · 更新于 上周</p>
            <div className="mt-auto flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">JD</div>
              <span className="text-xs text-slate-400">由 Jason D. 编辑</span>
            </div>
          </div>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
}
