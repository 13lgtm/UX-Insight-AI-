import React from 'react';
import { Sparkles, ArrowRight, PlayCircle, BarChart3, LayoutDashboard, Folder, User, CheckSquare } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="bg-white text-slate-900 flex flex-col min-h-screen font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 group cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Sparkles size={20} />
            </div>
            <h2 className="text-lg font-bold tracking-tight">UX-Insight AI</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">产品功能</a>
            <a href="#" className="hover:text-blue-600 transition-colors">解决方案</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('pricing'); }} className="hover:text-blue-600 transition-colors">价格方案</a>
            <a href="#" className="hover:text-blue-600 transition-colors">关于我们</a>
          </nav>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('projects')}
              className="hidden sm:inline-block text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2"
            >
              登录
            </button>
            <button 
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
            >
              免费开始使用
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="absolute inset-0 bg-slate-50 opacity-50 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1152d4 0.5px, transparent 0.5px), radial-gradient(#1152d4 0.5px, #f8f9fc 0.5px)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-6 border border-blue-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                全新 2.0 版本现已发布
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                让 AI 洞察每一个<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">设计决策</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                基于大模型的自动化访谈分析，深度挖掘用户真实需求。告别繁琐的人工整理，让用户研究效率提升 10 倍。
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => onNavigate('projects')}
                  className="w-full sm:w-auto h-12 px-8 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  免费开始使用
                  <ArrowRight size={20} />
                </button>
                <button className="w-full sm:w-auto h-12 px-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors flex items-center justify-center gap-2">
                  <PlayCircle size={20} />
                  观看演示
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                无需信用卡 · 14 天免费试用 · 支持中文语境
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="ml-4 flex-1 h-6 bg-white rounded-md border border-slate-200 flex items-center px-3 text-xs text-slate-400 font-mono">
                    ux-insight.ai/dashboard/analysis
                  </div>
                </div>
                <div className="flex h-[500px] md:h-[600px] overflow-hidden bg-slate-50">
                  <div className="hidden md:flex w-16 flex-col items-center py-4 border-r border-slate-200 bg-white">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mb-6"><Sparkles size={24} /></div>
                    <div className="flex flex-col gap-4">
                      <div className="p-2 text-slate-400"><BarChart3 size={24} /></div>
                      <div className="p-2 text-blue-600 bg-blue-50 rounded-lg"><LayoutDashboard size={24} /></div>
                      <div className="p-2 text-slate-400"><Folder size={24} /></div>
                    </div>
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                    <div className="w-1/3 border-r border-slate-200 bg-white p-6 hidden lg:block">
                      <div className="h-4 w-24 bg-slate-200 rounded mb-6"></div>
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-50 rounded border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">U</div>
                            <div className="h-3 w-16 bg-slate-200 rounded"></div>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded mb-1"></div>
                          <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded border border-blue-100">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">AI</div>
                            <div className="h-3 w-20 bg-blue-200 rounded"></div>
                          </div>
                          <div className="h-2 w-full bg-blue-200/50 rounded mb-1"></div>
                          <div className="h-2 w-5/6 bg-blue-200/50 rounded mb-1"></div>
                          <div className="h-2 w-4/6 bg-blue-200/50 rounded"></div>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border border-slate-100 opacity-60">
                          <div className="h-2 w-full bg-slate-100 rounded mb-1"></div>
                          <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-8 bg-slate-50 flex flex-col items-center justify-center">
                      <div className="max-w-md w-full">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="text-blue-600" size={24} />
                            <h3 className="font-bold text-lg">AI 核心洞察</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                              <div className="space-y-1 w-full">
                                <div className="h-2.5 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-2 bg-slate-100 rounded w-full"></div>
                              </div>
                            </div>
                            <div className="flex gap-3 items-start">
                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                              <div className="space-y-1 w-full">
                                <div className="h-2.5 bg-slate-200 rounded w-1/2"></div>
                                <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="h-8 w-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center mb-2"><User size={16} /></div>
                            <div className="h-2 w-16 bg-slate-200 rounded"></div>
                          </div>
                          <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="h-8 w-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center mb-2"><CheckSquare size={16} /></div>
                            <div className="h-2 w-16 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
