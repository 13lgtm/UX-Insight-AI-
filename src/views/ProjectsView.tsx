import React, { useState, useEffect } from 'react';
import { Plus, Search, Grid, List, Smartphone, ShoppingCart, LayoutDashboard, PiggyBank, Accessibility } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  ShoppingCart,
  LayoutDashboard,
  PiggyBank,
  Accessibility
};

interface ProjectsViewProps {
  onNavigate: (view: string) => void;
}

export default function ProjectsView({ onNavigate }: ProjectsViewProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 py-6 pb-2 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">活跃研究项目</h1>
            <p className="text-slate-500 mt-1">管理您的访谈分析与洞察。</p>
          </div>
          <button
            onClick={() => onNavigate('import')}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all font-medium"
          >
            <Plus size={20} />
            新建项目
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜索项目..."
              className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 text-sm outline-none"
            />
          </div>
          <div className="flex items-center gap-2 pr-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 uppercase px-2 shrink-0">筛选:</span>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">状态</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">日期</button>
            <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">负责人</button>
            <div className="w-px h-4 bg-slate-300 mx-1 shrink-0"></div>
            <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
              <Grid size={20} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-12 flex justify-center text-slate-500">
              加载中...
            </div>
          ) : (
            projects.map(project => {
              const IconComponent = iconMap[project.icon] || LayoutDashboard;
              return (
                <div
                  key={project.id}
                  className={`group bg-white rounded-xl border p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col h-full ${project.isActive ? 'border-blue-200 ring-2 ring-blue-50' : 'border-slate-200'}`}
                  onClick={() => onNavigate('insight')}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${project.iconBg}`}>
                      <IconComponent size={24} />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{project.desc}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className={`flex items-center gap-1.5 ${project.isActive ? 'font-semibold text-blue-600' : ''}`}>
                      {project.interviews}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {project.date}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <button
            onClick={() => onNavigate('import')}
            className="group border-2 border-dashed border-slate-300 rounded-xl p-5 hover:border-blue-600 hover:bg-slate-50 transition-all flex flex-col items-center justify-center text-center h-full min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors mb-3">
              <Plus size={28} />
            </div>
            <h3 className="text-base font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">创建新项目</h3>
            <p className="text-xs text-slate-400 mt-1 px-4">从头开始或使用模板启动新的研究计划。</p>
          </button>
        </div>
      </div>
    </div>
  );
}
