import React from 'react';
import { FolderOpen, Library, Database, Users, Gem } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: 'projects', icon: FolderOpen, label: '我的项目' },
    { id: 'templates', icon: Library, label: '模板库' },
    { id: 'training', icon: Database, label: 'AI 训练数据' },
    { id: 'assets', icon: Users, label: '团队资产' },
  ];

  return (
    <nav className="w-64 flex flex-col border-r border-slate-200 bg-white shrink-0">
      <div className="p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentView === item.id || (currentView === 'import' && item.id === 'projects') || (currentView === 'insight' && item.id === 'projects')
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-auto p-4 border-t border-slate-200">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
              <Gem size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">专业版计划</h4>
              <p className="text-xs text-slate-500 mt-0.5">已用 25/50 场访谈</p>
            </div>
          </div>
          <div className="mt-3 w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '50%' }}></div>
          </div>
          <button 
            onClick={() => setCurrentView('pricing')}
            className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            升级方案
          </button>
        </div>
      </div>
    </nav>
  );
}
