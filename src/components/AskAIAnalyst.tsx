import React, { useState } from 'react';
import { Bot, Send, Sparkles, Database, CheckCircle2, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { Dataset, AIChatMessage } from '../types';

interface AskAIAnalystProps {
  dataset: Dataset | null;
}

export const AskAIAnalyst: React.FC<AskAIAnalystProps> = ({ dataset }) => {
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
      <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400">
        <p>No dataset selected. Select a dataset from the top bar to query Nharire AI.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
              Grounded AI Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Dataset: {dataset.name} ({dataset.rowCount} rows)
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-100 mt-1 flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-400" />
            <span>Ask Nharire AI Analyst</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict verification pipeline: Real mathematical aggregation executes first; AI explains verified results.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-emerald-400 shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-semibold">Zero-Hallucination Safe</span>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
          Suggested Analytical Inquiries
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sq)}
              disabled={loading}
              className="text-left p-2.5 rounded-lg bg-slate-900/40 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all flex items-center justify-between group"
            >
              <span className="line-clamp-1">{sq}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed space-y-3 ${
                m.sender === 'user'
                  ? 'bg-amber-600 text-slate-950 font-medium'
                  : 'bg-slate-950 border border-slate-800 text-slate-200'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              {/* Verified computation data badge */}
              {m.verifiedDataSnippet && (
                <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-amber-500/30 text-[11px] space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{m.verifiedDataSnippet.computedMetric}</span>
                    </span>
                    <span className="font-mono text-slate-300 font-bold">
                      {m.verifiedDataSnippet.value}
                    </span>
                  </div>

                  {m.verifiedDataSnippet.breakdown && m.verifiedDataSnippet.breakdown.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase text-slate-400 font-semibold block">
                        Verified Category Split:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                        {m.verifiedDataSnippet.breakdown.slice(0, 4).map((b, bIdx) => (
                          <div key={bIdx} className="flex justify-between bg-slate-950 px-2 py-1 rounded border border-slate-800">
                            <span className="truncate text-slate-300">{b.label}</span>
                            <span className="text-amber-300 font-bold ml-1">${b.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div
                className={`text-[10px] mt-1 ${
                  m.sender === 'user' ? 'text-amber-950/70 text-right' : 'text-slate-500'
                }`}
              >
                {m.timestamp}
              </div>
            </div>

            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-xs text-amber-400">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-slate-300">Calculating verified aggregations & synthesizing analyst response...</span>
            </div>
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder={`Ask about ${dataset.name} (e.g. "What is our average margin per category?")`}
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          className="flex-1 bg-transparent px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuestion.trim() || loading}
          className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
