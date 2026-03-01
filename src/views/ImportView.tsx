import React from 'react';
import { UploadCloud, ArrowRight, RefreshCw, Settings, Bot, Lightbulb, UserCircle, ListChecks } from 'lucide-react';

interface ImportViewProps {
  onNavigate?: (view: string) => void;
}

export default function ImportView({ onNavigate }: ImportViewProps) {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-full md:w-5/12 flex flex-col border-r border-slate-200 bg-white">
        <div className="p-5 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <UploadCloud className="text-blue-600" size={24} />
            <h1 className="text-xl font-bold text-slate-900">导入数据</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">上传访谈文本或视频日志开始分析。</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="group relative flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-600 transition-all cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-4 rounded-full bg-white shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="text-blue-600" size={32} />
              </div>
              <p className="mb-2 text-sm text-slate-700 font-medium text-center">
                <span className="font-bold text-blue-600">点击上传</span>或将文件拖拽至此
              </p>
              <p className="text-xs text-slate-500">
                支持 PDF, DOCX, TXT (最大 50MB)
              </p>
            </div>
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">或粘贴文本</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <label className="block mb-2 text-sm font-medium text-slate-700">原始文本</label>
            <textarea 
              className="block p-4 w-full h-full min-h-[200px] text-sm text-slate-900 bg-white rounded-lg border border-slate-200 focus:ring-blue-600 focus:border-blue-600 resize-none placeholder-slate-400 font-mono leading-relaxed outline-none" 
              placeholder="[00:00:00] 采访者：你好，感谢你今天参加我们的访谈..."
            ></textarea>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => onNavigate && onNavigate('insight')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                开始分析
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex w-7/12 flex-col bg-slate-50">
        <div className="p-5 border-b border-slate-200 bg-white flex justify-between items-center shrink-0 opacity-50 pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <Bot className="text-purple-600" size={24} />
            <h1 className="text-xl font-bold text-slate-900">AI 分析与洞察</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 text-slate-500 rounded-md">
              <RefreshCw size={20} />
            </button>
            <button className="p-1.5 text-slate-500 rounded-md">
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full">
          <div className="max-w-md mx-auto space-y-6">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <div className="absolute inset-0 bg-blue-600/5 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-blue-600/10 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot className="text-blue-600/40" size={80} />
              </div>
              <div className="absolute top-2 right-4 p-2 bg-white rounded-lg shadow-sm border border-slate-200 rotate-12">
                <Lightbulb className="text-amber-500" size={20} />
              </div>
              <div className="absolute bottom-4 left-2 p-2 bg-white rounded-lg shadow-sm border border-slate-200 -rotate-6">
                <UserCircle className="text-purple-500" size={20} />
              </div>
              <div className="absolute top-1/2 -right-6 p-2 bg-white rounded-lg shadow-sm border border-slate-200 rotate-3">
                <ListChecks className="text-green-500" size={20} />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900">准备好开启洞察了吗？</h2>
            <p className="text-slate-500 text-lg">
              在左侧上传您的访谈数据，启动 AI 分析引擎。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-left">
              <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-purple-100 rounded text-purple-600">
                    <UserCircle size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">用户画像提取</h3>
                </div>
                <p className="text-xs text-slate-500">自动识别用户角色、经验水平和核心驱动因素。</p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-amber-100 rounded text-amber-600">
                    <ListChecks size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm">需求列表</h3>
                </div>
                <p className="text-xs text-slate-500">检测痛点和用户需求，将其转化为按优先级排序的故事。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
