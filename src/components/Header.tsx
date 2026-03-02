import React, { useState } from 'react';
import { Sparkles, ChevronDown, Share, Bell, Download } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView?: string;
}

export default function Header({ onNavigate, currentView }: HeaderProps) {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleExport = (type: 'pdf' | 'figma') => {
    setIsExportMenuOpen(false);
    window.dispatchEvent(new CustomEvent(`global-export-${type}`));
  };
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200 shrink-0 h-16 z-20">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg text-blue-600">
          <Sparkles size={20} />
        </div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">UX-Insight AI</h2>
      </div>
      <div className="hidden md:flex items-center">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-600">
          <span className="flex items-center gap-2">
            行业模板: 通用 <ChevronDown size={16} />
          </span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {currentView === 'report' ? (
            <div className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                <Share size={16} />
                <span className="hidden sm:inline">导出</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isExportMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isExportMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsExportMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                    <button
                      onClick={() => handleExport('pdf')}
                      className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                    >
                      <span className="text-lg">📄</span>
                      <span className="font-medium">导出为 PDF <span className="text-slate-400 text-xs font-normal block mt-0.5">单页 Persona 视图</span></span>
                    </button>
                    <div className="h-px bg-slate-100 my-1 mx-2"></div>
                    <button
                      onClick={() => handleExport('figma')}
                      className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                    >
                      <span className="text-lg">🎨</span>
                      <span className="font-medium">复制为 Figma JSON <span className="text-slate-400 text-xs font-normal block mt-0.5">开发剪贴板友好数据</span></span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors">
              <Share size={16} />
              <span className="hidden sm:inline">导出</span>
            </button>
          )}
          <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <Bell size={18} />
          </button>
        </div>
        <div className="w-px h-6 bg-slate-200 mx-1"></div>
        <button className="flex items-center gap-2 group" onClick={() => onNavigate('profile')}>
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </button>
      </div>
    </header>
  );
}
