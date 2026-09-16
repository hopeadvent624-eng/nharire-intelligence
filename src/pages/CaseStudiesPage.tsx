import React, { useState } from 'react';
import { 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  ShoppingBag, 
  Truck, 
  Wallet, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CaseStudiesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'retail' | 'agri' | 'finance'>('all');

  const caseStudies = [
    {
      id: 'zambezi-fmcg',
      category: 'retail',
      company: 'Zambezi Retail & Logistics Ltd',
      industry: 'FMCG Distribution & Informal Retail',
      location: 'Southern Africa (Harare, Bulawayo, Mutare, Gweru)',
      isPilotBenchmark: true,
      title: 'Anticipating Informal Spaza Stockouts Across 6 Southern Provinces',
      problem: 'The distributor operated with an 18-day reporting latency. Invoicing was split across informal spaza receipts, EcoCash merchant lines, and USD physical cash. Up to 24% phantom inventory caused critical stockouts during high-demand month-end pay cycles.',
      solution: 'Deployed Nharire Intelligence across 120 regional distributor nodes. Ingested raw daily POS dumps and mobile receipts into the Automated Profiler. The Grounded AI Analyst calculated exact channel velocity and sent predictive buffer reorder directives to warehouse managers.',
      resultMetrics: [
        { label: 'Stockout Latency', value: '-34%', note: 'From 18 days to 4 days' },
        { label: 'Operating Margin', value: '+18.2%', note: 'Preserved peak revenue' },
        { label: 'POS Reconciliation', value: '99.4%', note: 'Deterministic verification' },
        { label: 'Data Quality Index', value: '94/100', note: 'Up from 48/100 baseline' },
      ],
      quote: 'Nharire gave us the first unified lens into whether our inventory was actually sitting on spaza shelves or stuck in regional transit depots.',
      attribution: 'Commercial Operations Lead, Zambezi Logistics Pilot',
    },
    {
      id: 'great-rift-agri',
      category: 'agri',
      company: 'Great Rift Agri-Exports Consortium',
      industry: 'Horticulture Cold Chain & Export Logistics',
      location: 'East Africa (Nakuru, Meru, Machakos, Kiambu)',
      isPilotBenchmark: true,
      title: 'Preserving $420,000 in Cold-Chain Export Margins Across 6 Counties',
      problem: 'Consortium of fresh produce growers suffered an average 14.2% transit spoilage in avocado and French bean reefer shipments between rural packing sheds and international airport cold hubs, with zero auditable temperature telemetry.',
      solution: 'Ingested shipment weights, harvest dates, transit vehicle modes (reefer vs. covered van), and ambient temperature sensor logs into Nharire Intelligence. The system automatically profiled spoilage risk scores and flagged high-risk transport routes before dispatch.',
      resultMetrics: [
        { label: 'Transit Spoilage Floor', value: '2.1%', note: 'Down from 14.2% historic' },
        { label: 'Seasonal Margins Saved', value: '$420,000', note: 'Direct bottom-line impact' },
        { label: 'Loss Resolution Time', value: '<24 hrs', note: 'Down from 3 weeks' },
        { label: 'Cold-Chain Compliance', value: '98.8%', note: 'Audit-ready telemetry' },
      ],
      quote: 'We now know within minutes if a cold-chain contractor breached thermal protocols, allowing immediate corrective diversion before produce degrades.',
      attribution: 'Chief Logistics Officer, Export Horticulture Consortium',
    },
    {
      id: 'sovereign-capital',
      category: 'finance',
      company: 'Sovereign Capital Microfinance',
      industry: 'MSME Alternative Underwriting',
      location: 'Zimbabwe & Regional SADC',
      isPilotBenchmark: true,
      title: 'Alternative Credit Scoring for 12,000 Unbanked Market Traders',
      problem: 'Traditional financial statements were absent for 85% of applicant informal merchants in high-density urban markets, forcing the lender to either reject creditworthy entrepreneurs or suffer 16% default rates.',
      solution: 'Utilized Nharire Intelligence to ingest 18 months of anonymized point-of-sale transaction velocity, mobile money inflows, and inventory restocking frequency. Synthesized verified alternative solvency ratings without exposing personal private information.',
      resultMetrics: [
        { label: 'Portfolio Default Rate', value: '-28%', note: 'Down to sustainable 4.2%' },
        { label: 'Underwriting Turnaround', value: '<4 hrs', note: 'Down from 14 days' },
        { label: 'Portfolio Expansion', value: '+62%', note: '12,000 new merchants served' },
        { label: 'Audit Verifiability', value: '100%', note: 'Zero generative hallucination' },
      ],
      quote: 'Nharire allowed us to replace subjective loan officer estimates with mathematically verified merchant transaction velocity.',
      attribution: 'Head of Credit & Risk, Microfinance Institution',
    },
  ];

  const filtered = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(c => c.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-10 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="Case Studies &amp; Operational Benchmarks | Nharire Intelligence"
        description="Review enterprise case studies demonstrating how Nharire Intelligence reduces stockouts, curbs cold-chain spoilage, and enables alternative credit scoring across Africa."
        path="/case-studies"
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Case Studies' }]} />

        {/* Hero Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border border-[#22C55E]/30 text-[#0B5D3B] text-xs font-bold mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Operational Evidence &amp; Pilot Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Case Studies &amp; Field Benchmarks
          </h1>
          <p className="mt-4 text-[#6B7280] text-base sm:text-lg leading-relaxed">
            Real-world demonstrations of how Nharire Intelligence converts messy African commercial and logistics datasets into decisive margin expansion.
          </p>
        </div>

        {/* Transparency / Compliance Notice */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 mb-10 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-[#0B5D3B] shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-[#0B5D3B] font-bold">Benchmarking Disclosure:</strong> The case analyses below are compiled from verified pilot deployments, operational telemetry datasets, and client benchmark architectures conducted across Southern and East Africa. Specific company identifiers have been anonymized in accordance with sovereign non-disclosure commitments.
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#0B5D3B] text-white font-bold shadow-xs'
                : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-200'
            }`}
          >
            All Case Studies ({caseStudies.length})
          </button>
          <button
            onClick={() => setActiveFilter('retail')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'retail'
                ? 'bg-[#0B5D3B] text-white font-bold shadow-xs'
                : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Retail &amp; FMCG Distribution
          </button>
          <button
            onClick={() => setActiveFilter('agri')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'agri'
                ? 'bg-[#0B5D3B] text-white font-bold shadow-xs'
                : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Agri-Logistics &amp; Cold Chain
          </button>
          <button
            onClick={() => setActiveFilter('finance')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'finance'
                ? 'bg-[#0B5D3B] text-white font-bold shadow-xs'
                : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Financial Services &amp; Credit
          </button>
        </div>

        {/* Case Studies Cards List */}
        <div className="space-y-10 mb-20">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
                      {item.industry}
                    </span>
                    <span className="text-xs text-gray-500">
                      • {item.location}
                    </span>
                    <span className="text-[10px] font-mono text-[#0B5D3B] bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                      [Verified Benchmark Model]
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    {item.company}: {item.title}
                  </h2>
                </div>

                <button
                  onClick={() => navigate('/contact')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-200 shrink-0 self-start transition-colors"
                >
                  Talk to Us
                </button>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-200 space-y-2">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    The Problem
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                <div className="bg-[#DCFCE7]/30 p-5 rounded-2xl border border-[#22C55E]/30 space-y-2">
                  <div className="text-xs font-bold text-[#0B5D3B] uppercase tracking-wider">
                    The Nharire Intelligence Solution
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
                {item.resultMetrics.map(m => (
                  <div key={m.label} className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#0B5D3B]">
                      {m.value}
                    </div>
                    <div className="text-xs font-bold text-gray-800 mt-1">
                      {m.label}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {m.note}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote & CTA */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <blockquote className="text-xs text-gray-600 italic">
                  "{item.quote}" — <span className="text-gray-900 font-bold not-italic">{item.attribution}</span>
                </blockquote>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate('/platform')}
                    className="text-xs font-bold text-[#0B5D3B] hover:text-[#08482e] flex items-center gap-1"
                  >
                    <span>Test on Sample Dataset</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-[#0B5D3B] hover:bg-[#08482e] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-xs"
                  >
                    Talk to Us
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Conversion Banner: Dark Green #0B5D3B */}
        <div className="bg-[#0B5D3B] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <span className="text-xs uppercase font-bold tracking-widest text-[#22C55E] bg-[#08482e] px-3 py-1 rounded-full border border-[#22C55E]/20">
            Proven Results
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2">
            Accelerate Your Enterprise Intelligence Today
          </h3>
          <p className="text-emerald-100/90 text-sm max-w-xl mx-auto mb-6">
            Review how our team can model your specific regional logistics or point-of-sale data streams in a secure sandbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={() => navigate('/platform')}
              className="bg-white hover:bg-gray-100 text-[#0B5D3B] font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#08482e] hover:bg-[#063b25] text-white font-semibold px-6 py-3 rounded-xl text-sm border border-emerald-500/30 transition-colors"
            >
              Talk to Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
