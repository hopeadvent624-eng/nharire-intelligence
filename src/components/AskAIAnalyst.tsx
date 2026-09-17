import React, { useState } from 'react';
import { Bot, Send, Sparkles, Database, CheckCircle2, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { Dataset, AIChatMessage } from '../types';
import { useTheme } from '../context/ThemeContext';

interface AskAIAnalystProps {
  dataset: Dataset | null;
}

export const AskAIAnalyst: React.FC<AskAIAnalystProps> = ({ dataset }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello, I am Nharire AI — your grounded intelligence analyst. I never invent numbers; all metrics, percentages, and summaries are calculated by our verified analytics engine before I explain them.\n\nHow can I help you analyze **${dataset?.name || 'your dataset'}** today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    'What is our highest-volume product category and its percentage of total revenue?',
    'Which region shows the highest performance vs data quality warnings?',
    'Where are the biggest operational losses or margin leakages?',
    'Synthesize an executive growth action plan grounded in these numbers.',
  ];

  const handleSend = async (questionText?: string) => {
    const q = questionText || inputQuestion;
    if (!q.trim() || !dataset || loading) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetId: dataset.id,
          question: q,
          chatHistory: messages.map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          verifiedDataSnippet: data.verifiedDataSnippet,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errMsg: AIChatMessage = {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to compute analytics query. Please verify dataset schema.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!dataset) {
    return (
      <div
        className={`p-12 text-center rounded-xl border transition-colors ${
          isDark
            ? 'bg-slate-900/40 border-slate-800 text-slate-400'
            : 'bg-white border-gray-200 text-gray-500 shadow-xs'
        }`}
      >
        <p>No dataset selected. Select a dataset from the top bar to query Nharire AI.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div
        className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
          isDark
            ? 'bg-slate-900/70 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                isDark
                  ? 'text-[#00D2FF] bg-[#00D2FF]/10 border-[#00D2FF]/30'
                  : 'text-[#0284C7] bg-[#E0F2FE] border-[#38BDF8]/40'
              }`}
            >
              Grounded AI Engine
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Dataset: {dataset.name} ({dataset.rowCount} rows)
            </span>
          </div>
          <h1 className={`text-lg font-bold mt-1 flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
            <Bot className={`w-5 h-5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`} />
            <span>Ask Nharire AI Analyst</span>
          </h1>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            Strict verification pipeline: Real mathematical aggregation executes first; AI explains verified results.
          </p>
        </div>

        <div
          className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border shrink-0 font-semibold ${
            isDark
              ? 'bg-slate-950 border-[#00D2FF]/30 text-[#00D2FF]'
              : 'bg-sky-50 border-[#38BDF8]/40 text-[#0284C7]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Zero-Hallucination Safe</span>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="space-y-1.5">
        <span className={`text-[11px] font-semibold uppercase tracking-wider block px-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          Suggested Analytical Inquiries
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sq)}
              disabled={loading}
              className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between group ${
                isDark
                  ? 'bg-slate-900/40 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  : 'bg-white hover:bg-slate-50 border-gray-200 hover:border-gray-300 text-gray-700 shadow-xs'
              }`}
            >
              <span className="line-clamp-1">{sq}</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-colors shrink-0 ml-2 ${isDark ? 'text-slate-500 group-hover:text-[#00D2FF]' : 'text-gray-400 group-hover:text-[#0284C7]'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div
        className={`border rounded-xl p-5 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4 transition-colors ${
          isDark
            ? 'bg-slate-900/50 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'assistant' && (
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-1 ${
                  isDark
                    ? 'bg-[#00D2FF]/10 border-[#00D2FF]/30 text-[#00D2FF]'
                    : 'bg-[#E0F2FE] border-[#38BDF8]/40 text-[#0284C7]'
                }`}
              >
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed space-y-3 ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] text-white font-medium shadow-xs'
                  : isDark
                    ? 'bg-slate-950 border border-slate-800 text-slate-200'
                    : 'bg-slate-50 border border-gray-200 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              {/* Verified computation data badge */}
              {m.verifiedDataSnippet && (
                <div
                  className={`mt-3 p-3 rounded-lg border text-[11px] space-y-2 ${
                    isDark
                      ? 'bg-slate-900/90 border-[#00D2FF]/30'
                      : 'bg-white border-[#38BDF8]/40 shadow-xs'
                  }`}
                >
                  <div className={`flex items-center justify-between pb-1.5 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
                    <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{m.verifiedDataSnippet.computedMetric}</span>
                    </span>
                    <span className={`font-mono font-bold ${isDark ? 'text-slate-100' : 'text-gray-900'}`}>
                      {m.verifiedDataSnippet.value}
                    </span>
                  </div>

                  {m.verifiedDataSnippet.breakdown && m.verifiedDataSnippet.breakdown.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className={`text-[10px] uppercase font-semibold block ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        Verified Category Split:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                        {m.verifiedDataSnippet.breakdown.slice(0, 4).map((b, bIdx) => (
                          <div
                            key={bIdx}
                            className={`flex justify-between px-2 py-1 rounded border ${
                              isDark
                                ? 'bg-slate-950 border-slate-800'
                                : 'bg-slate-50 border-gray-200'
                            }`}
                          >
                            <span className={`truncate ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{b.label}</span>
                            <span className={`font-bold ml-1 ${isDark ? 'text-[#00D2FF]' : 'text-[#0284C7]'}`}>
                              ${b.value.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div
                className={`text-[10px] mt-1 ${
                  m.sender === 'user'
                    ? 'text-sky-100 text-right'
                    : isDark ? 'text-slate-500' : 'text-gray-400'
                }`}
              >
                {m.timestamp}
              </div>
            </div>

            {m.sender === 'user' && (
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-1 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-gray-100 border-gray-200 text-gray-600'
                }`}
              >
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-xs">
            <div
              className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                isDark
                  ? 'bg-[#00D2FF]/10 border-[#00D2FF]/30 text-[#00D2FF]'
                  : 'bg-[#E0F2FE] border-[#38BDF8]/40 text-[#0284C7]'
              }`}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div
              className={`p-3 rounded-xl border flex items-center gap-2 ${
                isDark
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-slate-50 border-gray-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#00D2FF]' : 'bg-[#0284C7]'}`} />
              <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>
                Calculating verified aggregations & synthesizing analyst response...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <div
        className={`p-2 rounded-xl border flex items-center gap-2 transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-gray-200 shadow-xs'
        }`}
      >
        <input
          type="text"
          placeholder={`Ask about ${dataset.name} (e.g. "What is our average margin per category?")`}
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          className={`flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none ${
            isDark ? 'text-slate-100 placeholder-slate-500' : 'text-gray-900 placeholder-gray-400'
          }`}
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuestion.trim() || loading}
          className="p-2.5 rounded-lg bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] disabled:opacity-40 text-white font-bold transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
