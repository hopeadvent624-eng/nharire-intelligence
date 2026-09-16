import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ArrowRight, 
  Search, 
  MessageSquare,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const FaqPage: React.FC = () => {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    0: true, // open first by default
  });

  const faqs = [
    {
      q: 'What is Nharire Intelligence?',
      a: 'Nharire Intelligence is an African-first enterprise Data & AI SaaS platform developed by Nharire Data Group. It ingests messy operational datasets, automatically evaluates schema quality with a 0–100 Data Health Index, synthesizes executive dashboards, and provides zero-hallucination AI analyst briefings grounded in server-side deterministic calculations.',
    },
    {
      q: 'Who is it for?',
      a: 'It is built for commercial enterprises, FMCG distributors, agro-processors, logistics operators, financial institutions, and public agencies across Africa that operate in complex multi-currency environments with informal retail channels and fragmented supply chains.',
    },
    {
      q: 'What types of data can be analyzed?',
      a: 'The platform ingests structured tabular data including point-of-sale (POS) records, mobile money transactions (EcoCash, M-Pesa, swipe/POS logs), ERP invoice exports, agricultural harvest weights, cold-chain temperature telemetry, logistics shipment manifests, and custom CSV or JSON datasets.',
    },
    {
      q: 'Can organizations use it?',
      a: 'Yes. Nharire is built with an enterprise multi-tenant architecture. Organizations can manage multiple isolated departmental workspaces (e.g. Commercial Intelligence, Agri-Logistics, Treasury) with role-based access control and strict data partitioning.',
    },
    {
      q: 'How does the AI Analyst work?',
      a: 'Unlike generic chatbots that guess calculations, Nharire AI Analyst operates on a deterministic two-tier pipeline. Our analytical engine computes exact numeric metrics (sums, margins, averages, segment distributions) server-side FIRST. Only verified ground truths are provided to the language model, completely eliminating mathematical hallucinations.',
    },
    {
      q: 'Is data secure?',
      a: 'Extremely secure. All customer datasets are isolated within tenant containers and encrypted using AES-256 at rest and TLS 1.3 in transit. Data is never pooled, shared, or utilized to train external public foundation models. We comply with Zimbabwe Cyber & Data Protection laws, South Africa POPIA, Kenya DPA, and European GDPR standards.',
    },
    {
      q: 'Can teams collaborate?',
      a: 'Yes. Team members can be invited to organizations and assigned to specific workspaces. Teams collaborate on shared datasets, view synchronized KPI dashboards, review AI analyst query threads, and export unified boardroom briefings.',
    },
    {
      q: 'Can Nharire Intelligence integrate with existing systems?',
      a: 'Yes. Nharire provides automated file ingestion adapters (CSV/JSON/Excel dumps), database synchronization connectors for PostgreSQL, MySQL, and SQL Server, and webhooks for mobile money merchant APIs and ERP systems.',
    },
    {
      q: 'Is there an API?',
      a: 'Yes. The Nharire Core REST API supports programmatic dataset uploading, asynchronous data profiling, KPI query retrieval, and automated business report generation for integration with enterprise ERPs and custom internal dashboards.',
    },
    {
      q: 'How can I get started?',
      a: 'You can immediately launch our Live Workbench in the Platform section to test the profiling engine and sample datasets. For organizational pilots, custom connectors, or sovereign cloud deployment, contact our enterprise solutions team via the Contact page.',
    },
  ];

  const toggleItem = (idx: number) => {
    setOpenItems(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
         f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-10 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="Frequently Asked Questions (FAQ) | Nharire Intelligence"
        description="Clear answers about Nharire Intelligence: platform capabilities, grounded zero-hallucination AI, security, data integrations, and enterprise onboarding."
        path="/faq"
      />

      {/* Embedded Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: 'FAQ' }]} />

        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border border-[#22C55E]/30 text-[#0B5D3B] text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base &amp; Specifications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-[#6B7280] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Nharire Intelligence, our African-first architecture, grounded AI analyst, and enterprise security standards.
          </p>

          {/* Quick Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. AI Analyst, security, API)..."
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/40 shadow-xs"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-xs">
              <p className="text-gray-500 text-sm">No questions matched your query.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-[#0B5D3B] text-xs font-bold hover:underline"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = !!openItems[idx];
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden transition-all hover:border-gray-300 shadow-xs"
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0B5D3B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-[#0B5D3B] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#08482e] border border-emerald-500/30 flex items-center justify-center text-white mx-auto mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Have a technical question not answered here?
          </h3>
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-lg mx-auto mb-6">
            Our data systems architects are available to answer inquiries regarding customized ERP connectors, on-premise deployments, or data residency protocols.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white hover:bg-gray-100 text-[#0B5D3B] font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
            >
              Talk to Our Engineers
            </button>
            <button
              onClick={() => navigate('/platform')}
              className="bg-[#08482e] hover:bg-[#063b25] text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm border border-emerald-500/30 transition-colors"
            >
              Explore the Platform
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
