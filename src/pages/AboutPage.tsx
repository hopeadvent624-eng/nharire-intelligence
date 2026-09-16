import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Compass, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  MapPin,
  TrendingUp,
  Cpu,
  Lock
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  const leadershipTeam = [
    {
      name: 'Asher Denhere',
      role: 'Founder & Chief Executive Officer',
      division: 'Nharire Data Group',
      bio: 'Enterprise technologist specializing in distributed data systems, sovereign AI infrastructure, and African market economics. Leads long-term strategy and architectural governance for Nharire Intelligence.',
      placeholderLabel: 'Asher Denhere — Founder & CEO',
      skills: ['Distributed Systems', 'Enterprise Strategy', 'African Data Sovereignty'],
    },
    {
      name: 'Head of AI & Machine Learning',
      role: 'Principal AI Architect',
      division: 'Applied Intelligence Engineering',
      bio: 'Researcher in grounded generative synthesis, structured schema inference, and deterministic verification layers. Directs the zero-hallucination mathematical engine behind Nharire AI Analyst.',
      placeholderLabel: 'Photo Placeholder: Principal AI Architect',
      skills: ['Grounded LLMs', 'Statistical Inference', 'Deterministic Verification'],
    },
    {
      name: 'Chief Data Systems Architect',
      role: 'Head of Sovereign Cloud & Security',
      division: 'Core Infrastructure',
      bio: 'Cloud security veteran directing multi-tenant isolation, cryptographic key management, and regulatory compliance across Southern and East African jurisdictions.',
      placeholderLabel: 'Photo Placeholder: Chief Data Systems Architect',
      skills: ['Multi-Tenancy', 'AES-256 Storage', 'POPIA / GDPR Compliance'],
    },
    {
      name: 'Director of Enterprise Solutions',
      role: 'Head of Client Architecture',
      division: 'Commercial Operations',
      bio: 'Over a decade leading logistics and FMCG data transformation across Zimbabwe, South Africa, and Kenya. Focuses on retail POS integration, mobile money reconciliation, and supply telemetry.',
      placeholderLabel: 'Photo Placeholder: Director of Enterprise Solutions',
      skills: ['FMCG Route-to-Market', 'Mobile Money POS', 'Executive Analytics'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-10 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="About Us | Nharire Data Group & Nharire Intelligence"
        description="Learn about Nharire Data Group and Nharire Intelligence: Our mission, vision, African-first technology positioning, and sovereign data leadership."
        path="/about"
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Header Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border border-[#22C55E]/30 text-[#0B5D3B] text-xs font-bold mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Nharire Data Group Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            The Sentinel of African Enterprise Intelligence
          </h1>
          <p className="mt-4 text-[#6B7280] text-base sm:text-lg leading-relaxed">
            In the Shona language, <em>Nharire</em> signifies the sentinel or watchtower — the vigilant guardian posted upon high ground to survey distant horizons, discern subtle patterns, and sound the alarm before events unfold.
          </p>
        </div>

        {/* Organization & Product Relationship */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xs hover:shadow-lg transition-all">
            <span className="text-xs uppercase tracking-widest text-[#0B5D3B] font-bold bg-[#DCFCE7] px-3 py-1 rounded-full">
              Parent Entity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-3">
              Nharire Data Group
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Nharire Data Group is an African-owned technology holding and applied intelligence corporation. We design sovereign data infrastructure, operational intelligence tools, and enterprise analytics frameworks engineered to thrive in the realities of African commerce.
            </p>
            <ul className="space-y-3 text-xs text-gray-600 border-t border-gray-100 pt-5">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Headquartered in Harare, Zimbabwe with regional operations across Southern &amp; East Africa</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Dedicated to data sovereignty and regional cloud control</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Strict zero-leakage enterprise governance standards</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-[#0B5D3B]/20 rounded-3xl p-8 sm:p-10 shadow-md hover:shadow-xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DCFCE7]/60 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            <span className="text-xs uppercase tracking-widest text-white font-bold bg-[#0B5D3B] px-3 py-1 rounded-full">
              Flagship SaaS Product
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-3">
              Nharire Intelligence
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Nharire Intelligence is our flagship enterprise SaaS data platform. It equips corporate leadership, FMCG distributors, agro-processors, and financial institutions with automated data health profiling, regional telemetry dashboards, and zero-hallucination AI analyst synthesis.
            </p>
            <ul className="space-y-3 text-xs text-gray-600 border-t border-gray-100 pt-5">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>Deterministic calculations before LLM natural-language generation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>Native multi-currency and informal retail reconciliation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B5D3B] shrink-0" />
                <span>Multi-tenant workspace isolation with AES-256 encryption</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To democratize high-precision data intelligence and sovereign AI analytics for African commercial and institutional leaders — transforming fragmented, noisy operational records into immediate, decisive strategic advantage.
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              An Africa where every enterprise, agricultural producer, and institutional policymaker possesses uncompromised real-time visibility into their markets, supply chains, and risks — governed by sovereign systems built for our continent's future.
            </p>
          </div>
        </div>

        {/* African-first Technology Positioning */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-12 mb-20 shadow-xs">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
              Strategic Positioning
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-3">
              Why African-First Technology Matters
            </h3>
            <p className="text-[#6B7280] text-sm sm:text-base mt-2">
              For decades, African enterprises have struggled with imported enterprise software suites that were conceived for homogenous Western markets. Here is how Nharire breaks the mold:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">
                Multi-Currency &amp; Inflation Dynamics
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Standard tools crash or corrupt analytics when transactions alternate between USD cash, local mobile money (EcoCash, M-Pesa), and bank swipe rates. Nharire normalizes currency variance without losing raw audit trails.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">
                Informal Retail &amp; Fragmented Corridors
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Up to 80% of consumer goods in Sub-Saharan Africa move through informal traders, tuckshops, and open-air markets. Nharire is built to clean, ingest, and reconcile non-standard CSVs and POS dumps.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-base mb-2">
                Sovereign Data Protection
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                African data belongs under African governance. Our strict tenancy model ensures enterprise data is encrypted, regionally contained, and never utilized to train generic foreign foundation models.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership & Engineering Team */}
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
              People &amp; Expertise
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-3">
              Leadership &amp; Applied Intelligence Team
            </h3>
            <p className="text-[#6B7280] text-sm mt-2">
              Our multidisciplinary team combines deep distributed systems engineering with on-the-ground operational expertise across African distribution networks.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  {/* Clean Photography Placeholder adhering strictly to prompt */}
                  <div className="w-full h-48 bg-[#F8FAFC] border-b border-gray-100 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#DCFCE7] border border-[#22C55E]/40 flex items-center justify-center text-[#0B5D3B] mb-2 shadow-xs">
                      <Users className="w-8 h-8" />
                    </div>
                    <span className="text-[11px] font-mono text-[#0B5D3B] font-bold">
                      [{member.placeholderLabel}]
                    </span>
                    <span className="text-[10px] text-gray-400 mt-1">
                      (Official portrait pending publication)
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 text-base">
                      {member.name}
                    </h4>
                    <div className="text-xs text-[#0B5D3B] font-semibold mb-1">
                      {member.role}
                    </div>
                    <div className="text-[11px] text-gray-400 mb-3">
                      {member.division}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ready to Engage Dark Green Section */}
        <div className="bg-[#0B5D3B] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#22C55E] bg-[#08482e] px-3 py-1 rounded-full border border-[#22C55E]/20">
              Enterprise Partnership
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Partner with Nharire Data Group
            </h3>
            <p className="text-emerald-100/90 text-sm mt-2 max-w-xl">
              Discover how our sovereign intelligence platform can empower your enterprise operations and analytical teams.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/platform')}
              className="bg-white hover:bg-gray-100 text-[#0B5D3B] font-bold px-6 py-3 rounded-xl text-sm shadow transition-colors"
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
