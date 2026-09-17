import React from 'react';
import { 
  Building2, 
  ShoppingBag, 
  Truck, 
  Wallet, 
  Zap, 
  HeartPulse, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  HardHat, 
  Pickaxe 
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const SolutionsPage: React.FC = () => {
  const { navigate } = useRouter();

  const solutions = [
    {
      id: 'retail-fmcg',
      title: 'Retail & FMCG Route-to-Market',
      tag: 'Distribution & Trade Velocity',
      icon: ShoppingBag,
      problem: 'Up to 80% of retail transactions flow through informal spazas, tuckshops, and market stalls. Brands suffer from 2-3 week reporting latency, dual-currency pricing distortions, and phantom inventory.',
      solution: 'Automated ingestion of distributor POS logs, mobile money (EcoCash, M-Pesa) streams, and depot invoices into unified regional telemetry. Pre-calculates SKU velocity, channel profitability, and stockout risk.',
      impact: '34% reduction in stockout latency; +18.2% gross operating margin preservation in regional FMCG corridors.',
      features: [
        'Dual-currency reconciliation (USD cash vs. mobile money)',
        'Informal vendor density and SKU reorder velocity mapping',
        'Automated duplicate detection on handwritten or offline receipts',
        'Grounded AI inventory buffer alerts',
      ],
    },
    {
      id: 'agri-logistics',
      title: 'Agri-Logistics & Cold-Chain Exports',
      tag: 'Post-Harvest Supply Integrity',
      icon: Truck,
      problem: 'High-value horticulture (avocados, macadamia, French beans) suffers 12–18% post-harvest spoilage across rural roads and border checkpoints due to unmonitored cold-chain temperature breaches.',
      solution: 'Correlates farm-gate harvest yields, transport mode (reefer vs. ambient van), transit transit times, and ambient temperature telemetry to pinpoint margin leakage points in real time.',
      impact: 'Reduced transit spoilage floor from 14.2% to 2.1%; saved over $420,000 in seasonal export margins for East African producers.',
      features: [
        'Farm-gate yield quality and tonnage profiling',
        'Reefer temperature deviation and spoilage correlation',
        'Export corridor transit time benchmarking',
        'Automated cold-chain compliance briefings',
      ],
    },
    {
      id: 'financial-services',
      title: 'Financial Services & Alternative Credit',
      tag: 'Micro-Lending & Risk Telemetry',
      icon: Wallet,
      problem: 'Over 70% of high-potential informal traders lack audited balance sheets, resulting in prohibitive credit scoring models and unmanageable non-performing loans (NPLs).',
      solution: 'Extracts verifiable alternative underwriting signals from daily commercial velocity, inventory turnover frequency, and mobile money transaction patterns without requiring formal collateral.',
      impact: 'Decreased default rates by 28% while accelerating loan approval turnaround from 14 days to under 4 hours.',
      features: [
        'Transaction regularity and velocity scoring',
        'Cash-flow volatility and seasonal buffer estimation',
        'Merchant default propensity profiling',
        'Zero-hallucination underwriting audit trails',
      ],
    },
    {
      id: 'construction-mining',
      title: 'Construction & Mining Site Telematics',
      tag: 'Resource & Heavy Logistics Telemetry',
      icon: HardHat,
      problem: 'Remote extraction pits, infrastructure projects, and quarries face 20+ day delays reconciling diesel consumption, equipment maintenance logs, and sub-contractor billings.',
      solution: 'Ingests telematics data from heavy machinery, automated weighbridge logs, and fuel sensor outputs into real-time operational reconciliation workflows.',
      impact: 'Eliminated 18.6% in unverified fuel and billing variances; reduced cost-audit cycles from 3 weeks to 2 hours.',
      features: [
        'Weighbridge and excavator payload verification',
        'Fuel burn anomaly detection and theft alerting',
        'Sub-contractor invoice audit trail generation',
        'Multi-site executive consolidated reporting',
      ],
    },
    {
      id: 'energy-infrastructure',
      title: 'Decentralized Energy & Infrastructure',
      tag: 'Off-Grid & Utility Operations',
      icon: Zap,
      problem: 'Solar mini-grid operators and telecom tower companies face remote power degradation, revenue leakage on Pay-As-You-Go tokens, and unpredictable battery lifecycle costs.',
      solution: 'Ingests generation metrics, battery storage telemetry, and customer micro-payment intervals to optimize dispatch schedules and identify commercial theft or line degradation.',
      impact: 'Recovered 16.4% in unbilled token revenue and extended remote battery bank operational life by 2.2 years.',
      features: [
        'Mini-grid load profiling and peak demand forecasting',
        'Pay-As-You-Go token redemption analysis',
        'Battery depth-of-discharge risk alerts',
        'Preventative maintenance scheduling',
      ],
    },
    {
      id: 'public-sector-health',
      title: 'Healthcare & Essential Commodities',
      tag: 'Public Distribution Assurance',
      icon: HeartPulse,
      problem: 'Ministries of health and humanitarian agencies struggle with stockouts of vital antiretrovirals, vaccines, and antimalarials at remote rural district clinics.',
      solution: 'Audits provincial warehouse shipments against last-mile clinic consumption logs, flagging stock divergences and expiration risks weeks before shortages manifest.',
      impact: '98.6% medicine availability achieved across monitored rural districts with zero unaccounted stock divergence.',
      features: [
        'Provincial depot-to-clinic reconciliation',
        'Batch shelf-life and expiry risk monitoring',
        'Epidemic spike demand forecasting',
        'Tamper-evident sovereign distribution logs',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-10 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="Enterprise Solutions | Nharire Intelligence"
        description="African-first data intelligence solutions for FMCG retail distribution, agricultural cold chains, alternative credit scoring, and off-grid utilities."
        path="/solutions"
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Solutions' }]} />

        {/* Hero Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] border border-[#38BDF8]/30 text-[#0284C7] text-xs font-bold mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Targeted Industry Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Enterprise Solutions for African Market Realities
          </h1>
          <p className="mt-4 text-[#6B7280] text-base sm:text-lg leading-relaxed">
            Every African industry faces unique operational nuances — multi-currency fluctuations, informal supply chains, and distributed networks. We build custom intelligence workflows to solve these exact constraints.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-10 mb-20">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 hover:shadow-xl hover:border-[#38BDF8]/40 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Solution Identity & Context */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-[#0284C7]">
                          {item.tag}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
                        <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                          The Operational Problem
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.problem}
                        </p>
                      </div>

                      <div className="bg-[#E0F2FE]/60 p-4 rounded-2xl border border-[#38BDF8]/40">
                        <div className="text-xs font-bold text-[#0284C7] uppercase tracking-wider mb-1">
                          The Nharire Intelligence Solution
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {item.solution}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs font-bold text-gray-900 mb-2">Key Technical Capabilities:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                        {item.features.map(feat => (
                          <div key={feat} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Measurable Impact & Action */}
                  <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between h-full space-y-6">
                    <div>
                      <div className="text-[11px] uppercase font-bold text-[#6B7280] tracking-wider mb-2">
                        Demonstrated Commercial Impact
                      </div>
                      <div className="text-base font-extrabold text-[#0284C7] leading-snug">
                        {item.impact}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-2">
                        Benchmark compiled from operational pilot telemetry across Southern &amp; East Africa.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200 space-y-2.5">
                      <button
                        onClick={() => navigate('/contact')}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-sm transition-all"
                      >
                        <span>Talk to Us About {item.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigate('/platform')}
                        className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors"
                      >
                        Explore in Platform Sandbox
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Enterprise Solutions Callout: Cyber Navy #0A1128 */}
        <div className="bg-[#0A1128] border border-[#1E293B] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl relative z-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#00D2FF] bg-[#0F1D40] px-3 py-1 rounded-full border border-[#00D2FF]/30">
              Bespoke Engineering
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Need a Custom African Enterprise Data Workflow?
            </h3>
            <p className="text-sky-100/90 text-sm mt-2 leading-relaxed">
              Our engineering team deploys dedicated ingestion adapters, on-premise sovereign instances, and customized grounded LLM fine-tunings for high-compliance institutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto relative z-10">
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto bg-white hover:bg-sky-50 text-[#0F172A] font-bold px-6 py-3.5 rounded-xl text-sm shadow-md shadow-[#00D2FF]/20 transition-colors"
            >
              Talk to Us
            </button>
            <button
              onClick={() => navigate('/platform')}
              className="w-full sm:w-auto bg-[#0F1D40] hover:bg-[#162752] text-white font-semibold px-6 py-3.5 rounded-xl text-sm border border-[#38BDF8]/40 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
