import React, { useState, useEffect } from 'react';
import { FileText, Bot, RefreshCw, Settings, Quote, BookOpen, MoreHorizontal, ArrowRight, Lightbulb, Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Tag, MessageSquare, Database, AlertCircle, Loader2 } from 'lucide-react';

interface InsightViewProps {
  onNavigate: (view: string) => void;
  projectId?: number; // Optional prop to fetch specific project data
}

export default function InsightView({ onNavigate, projectId = 2 }: InsightViewProps) {
  const [insights, setInsights] = useState<any[]>([]);
  const [transcripts, setTranscripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New state for AI Analysis MVP workflow
  const [rawText, setRawText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [persona, setPersona] = useState<{ name: string, role: string } | null>(null);

  const handleAnalyze = async () => {
    if (!rawText.trim()) {
      setAnalysisError('请先输入访谈记录');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: rawText, projectId }),
      });

      let result;
      try {
        result = await response.json();
      } catch (e) {
        // Fallback if response is completely unparseable (e.g. 502 Bad Gateway HTML)
        throw new Error(`服务器响应格式异常 (状态码: ${response.status})`);
      }

      if (!response.ok) {
        // Handle specific API errors gracefully (like 402 Insufficient Balance)
        if (response.status === 402) {
          throw new Error('分析失败：API 余额不足，请检查 DeepSeek 账户余额');
        }
        throw new Error(result.error || `请求失败 (状态码: ${response.status})`);
      }

      if (result.success && result.data) {
        setInsights(result.data.insights || []);
        if (result.data.persona) {
          setPersona(result.data.persona);
        }
      } else {
        throw new Error('解析结构体失败或格式异常');
      }
    } catch (err: any) {
      console.error('AI Analysis failed:', err);
      setAnalysisError(err.message || '网络请求失败或解析出错，请重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

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
    <div className="flex h-full overflow-hidden bg-slate-50 relative">
      {/* Toast Notification */}
      {analysisError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-[60] animate-in fade-in slide-in-from-top-4 max-w-md w-full">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <div className="flex-1 pr-4">
            <h4 className="font-bold text-sm">分析异常</h4>
            <p className="text-[13px] mt-0.5 leading-snug">{analysisError}</p>
          </div>
          <button onClick={() => setAnalysisError(null)} className="absolute top-3 right-3 text-red-400 hover:text-red-700 transition-colors p-1 rounded-md hover:bg-red-100">×</button>
        </div>
      )}

      {/* Left Panel: Transcript & Media input */}
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

        {/* Data Input Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
            <label className="text-sm font-bold text-slate-800">原始数据输入区</label>
          </div>
          <p className="text-[13px] text-slate-500 mb-1 leading-relaxed">
            将单次访谈、工单记录或用户反馈直接粘贴在此处。UX-Insight AI 分析核心将依据大模型能力（DeepSeek），自动提取结构化洞察并保存至 Supabase 数据库。
          </p>
          <textarea
            className="flex-1 w-full p-4 rounded-xl border border-slate-200 shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all text-slate-700 leading-relaxed min-h-[400px]"
            placeholder="示例：&#10;您好，张睿，感谢今天参加。作为一名资深 UX 设计师，你认为目前使用的研究工具中最大的痛点是什么？&#10;&#10;说实话，最让我头疼的是整理素材的效率。每次访谈结束后，面对几个小时的视频素材，我经常感到无从下手..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            disabled={isAnalyzing}
          ></textarea>

          <div className="pt-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !rawText.trim()}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all text-[15px] active:scale-[0.99]"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center gap-2 pointer-events-none">
                  <Loader2 className="animate-spin" size={20} />
                  <span>核心大脑深度分析中 (这可能需要几秒钟)...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 pointer-events-none">
                  <Bot size={20} />
                  <span>提交并开始洞察</span>
                </div>
              )}
            </button>
          </div>
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
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-blue-200 transition-colors">
                <div key={persona ? 'persona-content' : 'persona-empty'} className="transition-all duration-300">
                  {persona ? (
                    <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                      <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-2xl overflow-hidden shadow-inner border border-blue-100 shrink-0">
                        {persona?.name?.charAt(0) || '?'}
                      </div>
                      <div className="text-center sm:text-left pt-1 flex-1">
                        <h4 className="text-lg font-bold text-slate-900">{persona?.name || '未知用户'}</h4>
                        <div className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 shadow-sm">
                          {persona?.role || '访谈对象'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400 text-sm gap-2">
                      <Bot className="text-slate-300 opacity-50" size={32} />
                      <span>等待提交原始数据，AI 将自动归纳用户画像...</span>
                    </div>
                  )}
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
                <div key={insights && insights.length > 0 ? 'insights-list' : 'insights-empty'} className="transition-all duration-300 w-full">
                  {insights && insights.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {insights.map((insight, index) => (
                        <div key={insight?.id || index} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:border-purple-300 transition-colors">
                          <div className="p-4 border-b border-slate-100 flex justify-between items-start">
                            <div className="flex gap-3">
                              <div className="mt-0.5 shrink-0">
                                <span className={`flex items-center justify-center px-2 py-0.5 rounded-md ${insight?.severity === 'red' ? 'bg-red-50 text-red-700 border-red-200' : insight?.severity === 'yellow' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'} font-bold text-xs border whitespace-nowrap`}>
                                  {insight?.type || 'Insight'}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-[15px] font-bold text-slate-900 leading-snug">{insight?.title || '未命名'}</h4>
                                {insight?.tags && insight.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {insight.tags.map((tag: string, i: number) => (
                                      <span key={i} className="text-[11px] font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors px-1.5 py-0.5 rounded border border-slate-200/60 leading-none"># {tag}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {insight?.quote && (
                            <div className="p-4 bg-amber-50/20">
                              <div className="flex gap-2.5 items-start">
                                <Quote className="text-amber-300 shrink-0 mt-0.5 fill-amber-300/20" size={16} />
                                <p className="text-sm text-slate-600 italic leading-relaxed">
                                  "{insight.quote}"
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <Lightbulb size={24} className="text-slate-300" />
                      </div>
                      <p className="text-sm font-medium text-slate-500 mb-1">暂无提炼的洞察数据</p>
                      <p className="text-xs text-slate-400">目前没有分析数据，请开始洞察之旅</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

