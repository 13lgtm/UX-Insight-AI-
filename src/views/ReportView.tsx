import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Download, Share2, ChevronRight, Users, AlertTriangle, Lightbulb, TrendingUp, BarChart as BarChartIcon, ChevronDown, PersonStanding, Quote, Ban, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';

interface ReportViewProps {
  onNavigate: (view: string) => void;
  projectId?: number;
}

export default function ReportView({ onNavigate, projectId = 2 }: ReportViewProps) {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${projectId}/insights`)
      .then(res => res.json())
      .then(data => {
        setInsights(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch insights for report:', err);
        setLoading(false);
      });
  }, [projectId]);

  // Aggregate tags for the distribution chart
  const tagStats = useMemo(() => {
    const counts: Record<string, number> = {};
    let totalTags = 0;
    insights.forEach(insight => {
      if (insight.tags && Array.isArray(insight.tags)) {
        insight.tags.forEach((tag: string) => {
          counts[tag] = (counts[tag] || 0) + 1;
          totalTags++;
        });
      }
    });

    // Sort tags by frequency descending
    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalTags > 0 ? Math.round((count / insights.length) * 100) : 0 // relative to total insights
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4); // Top 4 tags
  }, [insights]);

  // Extract primary persona from insights
  const aggregatedPersona = useMemo(() => {
    if (insights.length === 0) return { name: '未知用户', role: '暂无访谈数据', quote: '目前没有足够的痛点数据进行归纳。' };
    const validInsights = insights.filter(i => i.personaName && i.personaName !== 'Unknown');
    if (validInsights.length === 0) return { name: '受访者集合', role: '多角色调研', quote: '用户在核心流程中表达了对效率和体验的关注。' };

    // Use the latest/first valid persona for MVP
    const p = validInsights[validInsights.length - 1];
    return {
      name: p.personaName,
      role: p.personaRole,
      quote: p.quote || '效率和体验依然是用户最关心的核心命题。'
    };
  }, [insights]);

  const topPainPoint = tagStats.length > 0 ? tagStats[0] : null;

  const exportToPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('report-export-area');
      if (!element) return;

      const filters = document.getElementById('report-filters-area');
      if (filters) filters.style.display = 'none';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f8fafc' // slate-50
      } as any);

      if (filters) filters.style.display = '';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('UX-Insight_Persona_Report.pdf');
    } catch (err: any) {
      console.error('PDF export failed:', err);
      setToastMessage(`❌ 导出PDF时发生异常：${err.message || '请刷新重试'}`);
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const copyFigmaJSON = useCallback(async () => {
    const figmaData = [
      {
        personaName: aggregatedPersona.name,
        tags: tagStats.map(t => t.name).join(', '),
        experience: '5-8 年',
        techSkill: '高',
        motives: ['简化重复的日常工作流程', '数据准确性优于速度'].map(m => `• ${m}`).join('\n'),
        frustrations: ['手动数据录入错误导致返工', '缺乏实时协作功能'].map(f => `• ${f}`).join('\n'),
        quote: aggregatedPersona.quote
      }
    ];

    try {
      await navigator.clipboard.writeText(JSON.stringify(figmaData, null, 2));
      setToastMessage('✅ Figma JSON 已复制到剪贴板，可直接在 Figma 插件中粘贴');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      console.error('Failed to copy to clipboard', err);
      setToastMessage(`❌ 复制失败：${err.message || '系统限制或请刷新重试'}`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  }, [aggregatedPersona, tagStats]);

  const copyHtmlToDesign = useCallback(async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('report-export-area');
      if (!element) return;

      const filters = document.getElementById('report-filters-area');
      const originalDisplay = filters ? filters.style.display : '';
      if (filters) filters.style.display = 'none';

      const clone = element.cloneNode(true) as HTMLElement;

      // Fix image URLs to be absolute
      const images = clone.querySelectorAll('img');
      images.forEach(img => {
        if (img.src) {
          img.src = new URL(img.getAttribute('src') || img.src, window.location.href).href;
        }
      });

      // Gather head styles to make sure Tailwind classes are applied
      const headNodes = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'));
      const stylesHtml = headNodes.map(node => {
        if (node.tagName.toLowerCase() === 'link') {
          const cloneLink = node.cloneNode() as HTMLLinkElement;
          cloneLink.href = new URL(cloneLink.getAttribute('href') || cloneLink.href, window.location.href).href;
          return cloneLink.outerHTML;
        }
        return node.outerHTML;
      }).join('\n');

      const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
${stylesHtml}
<style>
  body { background: #f8fafc; margin: 0; padding: 40px; font-family: system-ui, -apple-system, sans-serif; display: flex; justify-content: center; }
  #report-export-area { width: 100%; max-width: 1216px; box-shadow: none !important; border: none !important; }
</style>
</head>
<body class="antialiased text-slate-900 bg-slate-50 min-h-screen">
  ${clone.outerHTML}
</body>
</html>`;

      if (filters) filters.style.display = originalDisplay;

      await navigator.clipboard.writeText(fullHtml);
      setToastMessage('✅ 源码已提取！请在 Figma 打开 html.to.design 插件，选择 Import via Code 并按 Ctrl+V 粘贴代码');

      setTimeout(() => setToastMessage(null), 6000);
    } catch (err: any) {
      console.error('Failed to copy HTML: ', err);
      setToastMessage(`❌ 提取失败：${err.message || '请确保网站拥有剪贴板权限'}`);
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsExporting(false);
    }
  }, []);

  useEffect(() => {
    const handlePdfExport = () => exportToPDF();
    const handleFigmaExport = () => copyFigmaJSON();
    const handleHtmlExport = () => copyHtmlToDesign();

    window.addEventListener('global-export-pdf', handlePdfExport);
    window.addEventListener('global-export-figma', handleFigmaExport);
    window.addEventListener('global-export-html', handleHtmlExport);

    return () => {
      window.removeEventListener('global-export-pdf', handlePdfExport);
      window.removeEventListener('global-export-figma', handleFigmaExport);
      window.removeEventListener('global-export-html', handleHtmlExport);
    };
  }, [exportToPDF, copyFigmaJSON, copyHtmlToDesign]);

  if (loading) {
    return (
      <div className="flex-1 flex h-full w-full items-center justify-center bg-slate-50 text-slate-500 gap-2">
        <Loader2 className="animate-spin" size={20} />
        生成全局报告中...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 z-[100] animate-in fade-in slide-in-from-top-4">
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8" id="report-export-area">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <span className="cursor-pointer hover:text-blue-600" onClick={() => onNavigate('projects')}>项目</span>
              <ChevronRight size={12} />
              <span>金融 App 重构</span>
              <ChevronRight size={12} />
              <span className="text-slate-900 font-medium">全局报告</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">全局洞察汇总</h1>
            <div className="text-slate-500 text-sm mt-1">基于 {insights.length || 12} 场用户访谈汇总 • 最后更新于刚刚</div>
          </div>
          <div className="flex items-center gap-2" id="report-filters-area">
            <span className="text-sm text-slate-500 mr-2 hidden md:inline">筛选：</span>
            <div className="relative hidden md:block">
              <select className="appearance-none text-sm border border-slate-200 rounded-lg bg-white py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer">
                <option>所有角色</option>
                <option>产品经理</option>
                <option>设计师</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative hidden md:block">
              <select className="appearance-none text-sm border border-slate-200 rounded-lg bg-white py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer">
                <option>最近 30 天</option>
                <option>上个季度</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Global Export Loader State (optional display if we want) */}
            {isExporting && (
              <span className="ml-2 text-xs font-medium text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                <Loader2 size={12} className="animate-spin" /> 导出中...
              </span>
            )}
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              聚合用户画像
            </h3>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-sm">
                    <UserSearchIcon />
                  </div>
                  <span className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white" title="高置信度匹配"></span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{aggregatedPersona.name}</h2>
                <div className="text-sm text-slate-500 mt-1">{aggregatedPersona.role}</div>
                <div className="mt-6 w-full space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">平均经验</span>
                    <span className="font-medium text-slate-900">5-8 年</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">技术熟练度</span>
                    <span className="font-medium text-slate-900">高</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">主要设备</span>
                    <span className="font-medium text-slate-900">桌面端 / Mac</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                    <Lightbulb className="text-amber-500" size={20} />
                    目标与动机
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 ml-1">
                    <li>简化重复的日常工作流程。</li>
                    <li>数据准确性优于速度。</li>
                    <li>寻求不同工具之间的集成。</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
                    <Ban className="text-red-500" size={20} />
                    常见挫折
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 ml-1">
                    <li>手动数据录入错误导致返工。</li>
                    <li>缺乏实时协作功能。</li>
                    <li>新团队成员上手复杂。</li>
                  </ul>
                </div>
                <div className="md:col-span-2 relative pl-10 pr-4 py-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <Quote className="absolute left-3 top-3 text-blue-200" size={24} />
                  <div className="text-sm italic text-slate-700 whitespace-pre-line">
                    "{aggregatedPersona.quote}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BarChartIcon className="text-red-500" size={20} />
              痛点分布图
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">查看详细分析</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">按类别频率分布</h4>
              <div className="space-y-6">
                {tagStats.length > 0 ? tagStats.map((stat, i) => {
                  const colors = [
                    { bg: 'bg-red-500', track: 'bg-slate-100' },
                    { bg: 'bg-orange-500', track: 'bg-slate-100' },
                    { bg: 'bg-amber-400', track: 'bg-slate-100' },
                    { bg: 'bg-slate-400', track: 'bg-slate-100' },
                  ];
                  const color = colors[i % colors.length];

                  return (
                    <div key={stat.name} className="group cursor-pointer transition-all hover:opacity-90">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-sm font-medium text-slate-700">{stat.name}</span>
                        <span className="text-xs font-semibold text-slate-500">{stat.count} 次提及 ({stat.percentage}%)</span>
                      </div>
                      <div className={`w-full ${color.track} rounded-full h-4 overflow-hidden relative`}>
                        <div className={`${color.bg} h-full rounded-full transition-all duration-1000 ease-out`} style={{ width: `${stat.percentage}%` }}></div>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-sm text-slate-400 py-8 text-center flex flex-col items-center">
                    <BarChartIcon size={32} className="text-slate-200 mb-2" />
                    暂无可分析的标签数据
                  </div>
                )}
              </div>
            </div>
            <div className={`bg-gradient-to-br ${topPainPoint ? 'from-red-50 to-orange-50 border-red-100' : 'from-slate-50 to-slate-100 border-slate-200'} rounded-xl border p-6 flex flex-col justify-center`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full ${topPainPoint ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-500'}`}>
                  <AlertTriangle size={18} />
                </span>
                <span className={`text-xs font-bold ${topPainPoint ? 'text-red-800' : 'text-slate-500'} uppercase tracking-wide`}>高优先级痛点</span>
              </div>

              {topPainPoint ? (
                <>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">【 {topPainPoint.name} 】是关键瓶颈</h4>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    在本次调研中，“{topPainPoint.name}”的提及率高达 <strong>{topPainPoint.percentage}%</strong>。这是用户最迫切希望优化的核心环节，建议在下一阶段产研规划中优先解决。
                  </div>
                  <button className="mt-4 w-full py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                    进一步探索该标签 ( {topPainPoint.count} 条反馈 )
                  </button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <div className="text-sm text-slate-500">收集更多洞察以生成优先级建议</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="text-purple-600" size={20} />
              AI 战略建议
            </h3>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase rounded border border-purple-200 tracking-wider">由 GPT-4o 生成</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-1 bg-blue-500 w-full"></div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 mb-2">自动化摄取流程</h4>
                <div className="text-sm text-slate-600 mb-4 flex-1">
                  在上传流程中直接实施 OCR 和语音转文本，以解决排名第一的痛点。这可以将用户工作流程时间减少约 40%。
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <span className="text-xs font-medium text-slate-500">工作量: 高</span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">影响力: 高</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-1 bg-green-500 w-full"></div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 mb-2">统一仪表板视图</h4>
                <div className="text-sm text-slate-600 mb-4 flex-1">
                  用户很难看到“大局”。开发一个综合仪表板（如本仪表板），供最终用户可视化他们自己的项目健康状况。
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <span className="text-xs font-medium text-slate-500">工作量: 中</span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">影响力: 中</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="h-1 bg-purple-500 w-full"></div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900 mb-2">审查导出格式</h4>
                <div className="text-sm text-slate-600 mb-4 flex-1">
                  虽然提及频率较低，但导出问题是“高级用户”的阻碍。添加原始 JSON 和 CSV 导出以满足技术人员细分市场的需求。
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                  <span className="text-xs font-medium text-slate-500">工作量: 低</span>
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">影响力: 低</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-10"></div>
      </div>
    </div>
  );
}

function UserSearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="4" />
      <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
      <circle cx="17" cy="17" r="3" />
      <path d="m21 21-1.5-1.5" />
    </svg>
  );
}
