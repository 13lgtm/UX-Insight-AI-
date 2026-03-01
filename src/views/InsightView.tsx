import React, { useState, useEffect } from 'react';
import { FileText, Bot, RefreshCw, Settings, Quote, BookOpen, MoreHorizontal, ArrowRight, Lightbulb, Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Tag, MessageSquare, Database } from 'lucide-react';

interface InsightViewProps {
  onNavigate: (view: string) => void;
  projectId?: number; // Optional prop to fetch specific project data
}

export default function InsightView({ onNavigate, projectId = 2 }: InsightViewProps) {
  const [insights, setInsights] = useState<any[]>([]);
  const [transcripts, setTranscripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch insights and transcripts concurrently
    Promise.all([
      fetch(`/api/projects/${projectId}/insights`).then(res => res.json()),
      fetch(`/api/projects/${projectId}/transcripts`).then(res => res.json())
    ])
      .then(([insightsData, transcriptsData]) => {
        setInsights(insightsData);
        setTranscripts(transcriptsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch insight data:', err);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-500">
        加载中...
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden bg-slate-50">
      {/* Left Panel: Transcript & Media */}
      <div className="w-full md:w-1/2 flex flex-col border-r border-slate-200 bg-white shadow-sm z-10">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">数据接入</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-slate-500 text-xs">P01 - 张睿 (资深 UX 设计师)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-md border border-green-200">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              解析完成: 100%
            </span>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Media Player Placeholder */}
        <div className="p-4 border-b border-slate-200 bg-slate-900 text-white shrink-0 flex flex-col gap-3">
          <div className="relative w-full h-32 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            <div className="flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 overflow-hidden">
                <img src="https://picsum.photos/seed/interviewer/100/100" alt="Interviewer" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-600 border-2 border-blue-400 overflow-hidden shadow-lg shadow-blue-900/50">
                <img src="https://picsum.photos/seed/avatar1/200/200" alt="Participant" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="absolute bottom-2 left-3 flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              00:14:22 / 00:45:00
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white transition-colors"><SkipBack size={18} /></button>
              <button className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center hover:scale-105 transition-transform"><Play size={16} className="ml-0.5" /></button>
              <button className="text-slate-400 hover:text-white transition-colors"><SkipForward size={18} /></button>
            </div>
            <div className="flex-1 mx-6">
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden cursor-pointer relative">
                <div className="absolute top-0 left-0 h-full bg-blue-500 w-1/3"></div>
                {/* Highlight markers on timeline */}
                <div className="absolute top-0 left-[15%] h-full w-1 bg-yellow-400"></div>
                <div className="absolute top-0 left-[28%] h-full w-1 bg-red-400"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <button className="hover:text-white transition-colors"><Volume2 size={18} /></button>
              <button className="hover:text-white transition-colors"><Maximize2 size={16} /></button>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-100 flex-1"></div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">00:00 - 访谈开场与背景介绍</span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          {transcripts.map((transcript, index) => (
            <div key={transcript.id || index} className="flex gap-4 group">
              <div className="flex flex-col items-center gap-2 min-w-[48px]">
                <div className={`w-10 h-10 rounded-full ${transcript.speaker === '访谈员 (你)' ? 'bg-slate-100 border-slate-200' : 'bg-blue-50 border-blue-100 shadow-sm'} border overflow-hidden`}>
                  <img src={transcript.speaker === '访谈员 (你)' ? "https://picsum.photos/seed/interviewer/100/100" : "https://picsum.photos/seed/avatar1/200/200"} alt={transcript.speaker} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-sm font-semibold ${transcript.speaker === '访谈员 (你)' ? 'text-slate-900' : 'text-blue-700'}`}>{transcript.speaker}</span>
                  <span className="text-xs text-slate-400 font-mono">{transcript.timeGroup}</span>
                </div>
                <p className="text-slate-700 text-[15px] leading-relaxed">{transcript.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: AI Insights */}
      <div className="hidden md:flex w-1/2 flex-col bg-slate-50 border-l border-slate-200">
        <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
              <Bot size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900">AI 结构化分析</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onNavigate('report')} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
              <FileText size={16} />
              生成全局报告
            </button>
            <div className="w-px h-8 bg-slate-200 mx-1"></div>
            <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-slate-100">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto space-y-6">

            {/* Persona Card */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="inline-block w-1 h-4 bg-blue-500 rounded-full"></span>
                  用户画像提取
                </h3>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-blue-200 transition-colors">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex flex-col items-center sm:items-start gap-3 sm:w-1/3 sm:border-r border-slate-100 sm:pr-5">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-100">
                      <img src="https://picsum.photos/seed/avatar1/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="text-base font-bold text-slate-900">张睿</h4>
                      <p className="text-xs text-slate-500 mt-0.5">资深 UX 设计师</p>
                      <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">效率驱动</span>
                        <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">工具重度用户</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <div className="flex items-center gap-1.5 mb-2 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                        <Bot className="text-blue-500" size={14} /> 核心动力
                      </div>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
                          <span className="text-blue-500 mt-0.5">•</span> 提升研究素材整理效率
                        </li>
                        <li className="flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
                          <span className="text-blue-500 mt-0.5">•</span> 保持洞察与原始语境的关联
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <div className="flex items-center gap-1.5 mb-2 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                        <Lightbulb className="text-amber-500" size={14} /> 心理预期
                      </div>
                      <ul className="space-y-1.5">
                        <li className="flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
                          <span className="text-amber-500 mt-0.5">•</span> 自动化标签与信息提取
                        </li>
                        <li className="flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
                          <span className="text-amber-500 mt-0.5">•</span> 减少无意义的"搬运"工作
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Needs Pool */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="inline-block w-1 h-4 bg-purple-500 rounded-full"></span>
                  需求与痛点池
                </h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">共发现 3 项</span>
              </div>

              <div className="flex flex-col gap-4">
                {insights.map((insight, index) => (
                  <div key={insight.id || index} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:border-purple-300 transition-colors">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="mt-0.5">
                          <span className={`flex items-center justify-center px-1.5 py-0.5 rounded ${insight.severity === 'red' ? 'bg-red-50 text-red-700 border-red-200' : insight.severity === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'} font-bold text-[10px] border`}>
                            {insight.type}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{insight.title}</h4>
                          <div className="flex gap-2 mt-1">
                            {insight.tags?.map((tag: string, i: number) => (
                              <span key={i} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                    {insight.quote && (
                      <div className="p-4 bg-slate-50/50 space-y-3">
                        <div className="flex gap-2 items-start">
                          <Quote className="text-slate-300 shrink-0 mt-0.5" size={16} />
                          <p className="text-sm text-slate-600 italic leading-relaxed">
                            "{insight.quote}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

