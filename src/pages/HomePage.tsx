import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  BarChart3, 
  Layers, 
  Cpu, 
  Building2, 
  Zap, 
  Globe2, 
  Lock, 
  ChevronDown, 
  FileText, 
  Activity, 
  Users, 
  Bot, 
  HardHat, 
  Pickaxe, 
  Sprout, 
  ShoppingBag, 
  GraduationCap, 
  Landmark,
  Check,
  LineChart,
  GitBranch,
  Search,
  MessageSquareQuote,
  Star
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const industries = [
    { name: 'Construction', icon: HardHat, desc: 'Project telemetry & contractor risk' },
    { name: 'Mining', icon: Pickaxe, desc: 'Mineral yield & logistics monitoring' },
    { name: 'Agriculture', icon: Sprout, desc: 'Farm-gate yields & cold-chain telemetry' },
    { name: 'Retail', icon: ShoppingBag, desc: 'Informal trade & SKU stockout velocity' },
    { name: 'Education', icon: GraduationCap, desc: 'Enrollment & institutional analytics' },
    { name: 'Financial Services', icon: Landmark, desc: 'Alternative underwriting & risk scores' },
  ];

  const features = [
    {
      title: 'Data Intelligence',
      desc: 'Transform raw, fragmented operational data into clean, certified, actionable insights with automated health scoring.',
      icon: Database,
      badge: 'Automated Profiling',
    },
    {
      title: 'AI Analyst',
      desc: 'Ask questions in natural language. Powered by deterministic calculations for zero financial hallucinations.',
      icon: Sparkles,
      badge: 'Natural Language',
    },
    {
      title: 'Business Dashboards',
      desc: 'Monitor KPIs in real time with dynamic, synthesized multi-currency and regional channel visualizers.',
      icon: BarChart3,
      badge: 'Live Telemetry',
    },
    {
      title: 'Automation',
      desc: 'Reduce manual reporting cycles from weeks to seconds with automated boardroom briefing generation.',
      icon: Zap,
      badge: 'Workflow Automation',
    },
    {
      title: 'Predictive Analytics',
      desc: 'Forecast future inventory stockouts, revenue trends, and operational bottlenecks before they manifest.',
      icon: LineChart,
      badge: 'Predictive Models',
    },
    {
      title: 'Integrations',
      desc: 'Connect existing business systems including mobile money (EcoCash, M-Pesa), POS dumps, and ERPs seamlessly.',
      icon: GitBranch,
      badge: 'Sovereign APIs',
    },
  ];

  const solutions = [
    {
      title: 'Executive Intelligence',
      tagline: 'Strategic Boardroom Visibility',
      desc: 'Unified operational clarity for C-suites navigating multi-currency volatility and decentralized African distribution corridors.',
      metrics: 'Zero-hallucination executive briefings',
      icon: Building2,
    },
    {
      title: 'Operational Analytics',
      tagline: 'Route-to-Market & Depot Telemetry',
      desc: 'Granular tracking of warehouse inventories, distributor deliveries, and branch velocity across national and cross-border trade routes.',
      metrics: 'Sub-second provincial rollups',
      icon: Activity,
    },
    {
      title: 'Predictive Analytics',
      tagline: 'Demand & Risk Forecasting',
      desc: 'Machine-learning models calibrated for seasonal cash flow swings, agricultural harvest cycles, and market inflation shocks.',
      metrics: '34% reduction in stockout latency',
      icon: LineChart,
    },
    {
      title: 'AI Decision Support',
      tagline: 'Grounded Natural Language Inquiries',
      desc: 'Empower commercial leaders to query complex SQL and data warehouses without waiting for technical analyst backlogs.',
      metrics: '100% deterministic mathematical verification',
      icon: Bot,
    },
    {
      title: 'Data Automation',
      tagline: 'End-to-End Schema Cleansing',
      desc: 'Automate ingestion of non-standard CSVs, messy spreadsheets, handwritten POS exports, and mobile ledger statements.',
      metrics: 'Eliminates 90% of manual reconciliation',
      icon: Zap,
    },
    {
      title: 'Industry Intelligence',
      tagline: 'Vertical-Specific Domain Models',
      desc: 'Pre-configured analytical ontologies for mining extraction, horticulture cold-chains, and retail spaza networks.',
      metrics: 'Accelerates time-to-value from months to days',
      icon: Layers,
    },
  ];

  const caseStudies = [
    {
      title: 'Construction Intelligence Platform',
      category: 'Infrastructure & Heavy Projects',
      problem: 'A major infrastructure developer faced a 22-day delay in cost reconciliation across 14 remote sites, leading to budget creep and unmonitored supplier invoice duplications.',
      solution: 'Deployed Nharire Intelligence to ingest daily equipment telematics, fuel consumption manifests, and supplier invoices into automated deterministic profiling workflows.',
      outcome: 'Reduced material billing variance by 18.6%, saved 3 weeks per monthly cost audit, and established 100% auditable contractor telemetry.',
      badge: 'Infrastructure',
    },
    {
      title: 'Customer Churn Analytics',
      category: 'Fintech & Mobile Services',
      problem: 'A regional financial service provider struggled with rising merchant attrition in informal retail markets due to blind spots in daily transaction dormancy.',
      solution: 'Implemented Nharire Predictive Analytics to analyze mobile point-of-sale volume trends and flag merchant churn risk 21 days prior to account abandonment.',
      outcome: 'Decreased merchant churn by 27.4% and boosted retention of high-velocity informal market distributors by over 35%.',
      badge: 'Fintech & Banking',
    },
    {
      title: 'Retail Forecasting System',
      category: 'FMCG & Spaza Distribution',
      problem: 'Zambezi Retail & Logistics operated with 24% phantom inventory across 120 regional depots, creating recurrent stockouts during month-end consumer surges.',
      solution: 'Connected depot point-of-sale feeds and EcoCash receipt streams to Nharire Grounded AI Analyst and automated inventory buffer triggers.',
      outcome: 'Cut stockout latency by 34%, preserved +18.2% gross operating margin, and normalized dual-currency pricing across all 6 southern provinces.',
      badge: 'Retail & FMCG',
    },
  ];

  const testimonials = [
    {
      quote: 'Nharire Intelligence provided us with the first clear window into our informal retail distribution. The ability to ask plain-language questions and receive mathematically verified answers transformed our weekly executive decisions.',
      author: 'Managing Director',
      company: 'Southern African Consumer Brands Group',
      role: 'Enterprise FMCG Client',
    },
    {
      quote: 'Western enterprise software failed when we tried to reconcile multi-currency payments and erratic connectivity. Nharire was built for our exact reality — clean, reliable, and deeply sovereign.',
      author: 'Chief Operating Officer',
      company: 'Pan-African Agricultural Exports Consortium',
      role: 'Agri-Logistics Client',
    },
    {
      quote: 'The automated data profiling eliminated dozens of hours of manual spreadsheet wrangling every month. Our board reports are now produced in minutes with certified accuracy.',
      author: 'Head of Data & Digital Transformation',
      company: 'Regional Financial Services Group',
      role: 'Financial Institution Client',
    },
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      description: 'Ideal for growing organizations beginning their structured data intelligence and automated reporting journey.',
      features: [
        'Up to 5 data workspace connections',
        'Automated CSV & POS schema profiling',
        'Standard business telemetry dashboards',
        'Grounded AI natural language queries',
        'Email technical support (1 business day SLA)',
      ],
      cta: 'Contact Us',
      popular: false,
    },
    {
      name: 'Growth',
      description: 'Designed for scaling multi-branch enterprises requiring continuous operational monitoring and predictive alerts.',
      features: [
        'Unlimited workspace connections & datasets',
        'Real-time mobile money & POS connectors',
        'Advanced predictive stockout forecasting',
        'Automated executive boardroom reports',
        'Dedicated Solutions Architect',
        'Priority technical desk & custom onboarding',
      ],
      cta: 'Request Proposal',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Full sovereign deployment for banks, large conglomerates, mining corporations, and government institutions.',
      features: [
        'On-premise or sovereign private cloud deployment',
        'Custom ERP & proprietary database adapters',
        'Tailored grounded AI fine-tuning & ontology design',
        'Custom regulatory compliance guarantees (POPIA / GDPR)',
        '24/7 dedicated enterprise response SLA',
        'Executive board training & data governance consulting',
      ],
      cta: 'Book Consultation',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'What is Nharire Intelligence?',
      a: 'Nharire Intelligence is an African-first Data & AI Intelligence Platform created by Nharire Data Group. It helps organizations unlock insights, automate reporting, monitor real-time operational performance, and make smarter decisions using advanced data profiling, executive dashboards, and grounded generative AI.',
    },
    {
      q: 'Who is it for?',
      a: 'The platform is engineered for forward-thinking African organizations across Construction, Mining, Agriculture, Retail & FMCG, Financial Services, and Public Administration that need reliable intelligence despite multi-currency environments, informal market channels, and distributed operations.',
    },
    {
      q: 'How does the AI Analyst work?',
      a: 'Unlike generic AI tools that guess or hallucinate arithmetic, Nharire AI Analyst uses a deterministic two-tier architecture. All numerical aggregations, variances, and correlations are pre-calculated server-side. The AI then synthesizes strategic explanations grounded strictly in verified mathematical truths.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. Enterprise data security and African data sovereignty are fundamental to our architecture. All customer datasets are strictly partitioned in tenant-isolated environments and encrypted using AES-256 at rest and TLS 1.3 in transit. Your operational data is never used to train public foundation models.',
    },
    {
      q: 'Can it integrate with existing systems?',
      a: 'Yes. Nharire Intelligence supports automated ingestion of CSV/Excel files, point-of-sale (POS) dumps, mobile money transaction ledgers (e.g., EcoCash, M-Pesa), SQL databases (PostgreSQL, MySQL, SQL Server), and modern REST APIs.',
    },
    {
      q: 'Do you offer custom solutions?',
      a: 'Yes. Nharire Data Group partners with enterprise clients to engineer tailored data ingestion pipelines, on-premise private sovereign instances, custom domain ontologies, and specialized predictive forecasting models.',
    },
    {
      q: 'How do I get started?',
      a: 'You can explore our interactive Platform Workbench immediately or click "Get Started" to contact our solutions architecture team. We offer guided pilot deployments and feasibility assessments, with an initial response within 1 business day.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#111827]">
      <SeoHead
        title="Transform Data Into Decisions | Nharire Data Group"
        description="Nharire Data Group helps organizations unlock growth through Data Analytics, Business Intelligence, AI Solutions, Automation, and Custom Software Development."
        path="/"
      />

      {/* =========================================================================
          1. HERO SECTION: Clean, Focused High-Impact Headline & CTAs
         ========================================================================= */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 overflow-hidden bg-white border-b border-[#E5E7EB]">
        {/* Soft background green ambient gradients */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#DCFCE7]/60 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#DCFCE7]/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-7">
            
            {/* Badge */}
            <div id="hero-badge" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border border-[#22C55E]/30 text-[#0B5D3B] text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>African-First Data &amp; AI Company</span>
            </div>

            {/* Main Headline */}
            <h1 id="hero-headline" className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.08]">
              Transform Data Into <span className="text-[#0B5D3B]">Decisions</span>
            </h1>

            {/* Subheadline */}
            <p id="hero-subheadline" className="text-base sm:text-lg lg:text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto font-normal">
              Nharire Data Group helps organizations unlock growth through Data Analytics, Business Intelligence, AI Solutions, Automation, and Custom Software Development.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => navigate('/platform')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0B5D3B] hover:bg-[#08482e] text-white font-bold px-8 py-4 rounded-xl text-base shadow-md hover:shadow-lg hover:shadow-[#0B5D3B]/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/40 active:scale-[0.99]"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => navigate('/solutions')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-[#111827] bg-[#F8FAFC] hover:bg-gray-100 border border-[#E5E7EB] hover:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-2xs"
              >
                <span>Explore Solutions</span>
              </button>
            </div>

            {/* Trust Indicator */}
            <div id="hero-trust-statement" className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2.5 text-xs font-medium text-[#6B7280]">
              <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>Trusted by forward-thinking organizations across Africa.</span>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          2. TRUST SECTION: Trusted Across African Industries
         ========================================================================= */}
      <section className="py-14 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] mb-8">
            Trusted Across African Industries
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#22C55E]/50 rounded-2xl p-4 flex flex-col items-center justify-center group transition-all hover:shadow-md hover:bg-white"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#E5E7EB] group-hover:bg-[#DCFCE7] group-hover:border-[#22C55E]/40 flex items-center justify-center text-[#0B5D3B] mb-2.5 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-[#0B5D3B] transition-colors">
                    {ind.name}
                  </span>
                  <span className="text-[11px] text-[#6B7280] text-center mt-0.5 line-clamp-1">
                    {ind.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* =========================================================================
          3. FEATURES SECTION: 6 Premium Cards
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
              Powerful Capabilities for High-Velocity Decisions
            </h2>
            <p className="text-[#6B7280] text-base mt-3">
              Built from the ground up for the nuances of African business — multi-currency transactions, informal trade, and distributed logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#22C55E]/50 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] group-hover:bg-[#0B5D3B] group-hover:text-white transition-all shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-[#0B5D3B] bg-[#DCFCE7]/70 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#111827] mb-2 group-hover:text-[#0B5D3B] transition-colors">
                      {idx + 1}. {item.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-[#0B5D3B] group-hover:translate-x-1 transition-transform">
                    <span>Explore {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. STATISTICS SECTION: Dark Green (#0B5D3B) Impact Section
         ========================================================================= */}
      <section className="py-20 bg-[#0B5D3B] text-white relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#22C55E] bg-[#08482e] px-3 py-1 rounded-full border border-[#22C55E]/20">
              Proven Scale &amp; Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              Enterprise Performance Measured in Real Value
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base mt-2">
              Powering strategic data operations for enterprises, distributors, and agro-processors across Africa.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-[#08482e]/80 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xs">
              <div className="text-4xl sm:text-5xl font-black text-[#22C55E] tracking-tight">
                50+
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-2">
                Projects Delivered
              </div>
              <p className="text-xs text-emerald-200/70 mt-1">
                Across commercial &amp; sovereign sectors
              </p>
            </div>

            <div className="bg-[#08482e]/80 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xs">
              <div className="text-4xl sm:text-5xl font-black text-[#22C55E] tracking-tight">
                95%
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-2">
                Client Satisfaction
              </div>
              <p className="text-xs text-emerald-200/70 mt-1">
                Verified executive feedback
              </p>
            </div>

            <div className="bg-[#08482e]/80 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xs">
              <div className="text-4xl sm:text-5xl font-black text-[#22C55E] tracking-tight">
                100M+
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-2">
                Records Processed
              </div>
              <p className="text-xs text-emerald-200/70 mt-1">
                POS dumps, mobile money &amp; ledgers
              </p>
            </div>

            <div className="bg-[#08482e]/80 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xs">
              <div className="text-4xl sm:text-5xl font-black text-[#22C55E] tracking-tight">
                20+
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-2">
                Industries Served
              </div>
              <p className="text-xs text-emerald-200/70 mt-1">
                From FMCG to heavy infrastructure
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          5. SOLUTIONS SECTION: Professional Solution Cards
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
                Tailored Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
                Engineered for Enterprise Operational Demands
              </h2>
            </div>
            <button
              onClick={() => navigate('/solutions')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#0B5D3B] hover:text-[#08482e]"
            >
              <span>View All Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.title}
                  className="bg-white border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#22C55E]/50 transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#0B5D3B] uppercase tracking-wider block mb-1">
                      {sol.tagline}
                    </span>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                      {sol.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                      {sol.metrics}
                    </span>
                    <button
                      onClick={() => navigate('/solutions')}
                      className="text-[#0B5D3B] font-bold hover:underline"
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          6. CASE STUDIES SECTION: 3 Modern Cards (Problem, Solution, Outcome)
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
                Real Evidence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
                Case Studies &amp; Operational Benchmarks
              </h2>
            </div>
            <button
              onClick={() => navigate('/case-studies')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#0B5D3B] hover:text-[#08482e]"
            >
              <span>Explore All Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <div
                key={cs.title}
                className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:bg-white hover:border-[#22C55E]/50 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B5D3B] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                      {cs.badge}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">
                      {cs.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827]">
                    {cs.title}
                  </h3>

                  <div className="space-y-2.5 pt-2 text-xs leading-relaxed">
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                      <strong className="text-red-600 block mb-0.5">Problem:</strong>
                      <span className="text-gray-600">{cs.problem}</span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                      <strong className="text-[#0B5D3B] block mb-0.5">Solution:</strong>
                      <span className="text-gray-600">{cs.solution}</span>
                    </div>

                    <div className="bg-[#DCFCE7]/60 p-3.5 rounded-xl border border-[#22C55E]/30">
                      <strong className="text-[#0B5D3B] block mb-0.5">Outcome:</strong>
                      <span className="text-gray-800 font-medium">{cs.outcome}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <button
                    onClick={() => navigate('/case-studies')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5D3B] hover:text-[#08482e]"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="text-xs text-gray-500 hover:text-gray-800 font-medium"
                  >
                    Request Similar Pilot
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          7. TESTIMONIALS SECTION: 3 Elegant Enterprise Cards
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
              Enterprise Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
              What Operational Leaders Say
            </h2>
            <p className="text-[#6B7280] text-base mt-2">
              Feedback from executives relying on Nharire Intelligence for mission-critical decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#22C55E] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#0B5D3B] font-bold text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-gray-900">
                      {t.author}
                    </span>
                    <span className="block text-xs text-[#0B5D3B] font-medium">
                      {t.company}
                    </span>
                    <span className="block text-[11px] text-gray-400">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          8. PRICING / ENGAGEMENT SECTION: Starter, Growth, Enterprise
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
              Engagement Plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
              Flexible Deployment for Every Stage
            </h2>
            <p className="text-[#6B7280] text-base mt-2">
              Transparent, enterprise-grade onboarding tailored to your dataset volume and infrastructure needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  tier.popular
                    ? 'bg-[#F8FAFC] border-2 border-[#0B5D3B] shadow-xl relative'
                    : 'bg-white border border-[#E5E7EB] hover:shadow-lg'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0B5D3B] text-white text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                    Most Popular for Enterprises
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="my-6 py-4 border-y border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-3">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-2.5 text-xs text-gray-700">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigate('/contact')}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all shadow-sm ${
                      tier.popular
                        ? 'bg-[#0B5D3B] hover:bg-[#08482e] text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
                    }`}
                  >
                    {tier.cta}
                  </button>
                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    Response commitment within 1 business day
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          9. FAQ SECTION: Accordion Matching the Reference Design
         ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5D3B] bg-[#DCFCE7] px-3 py-1 rounded-full">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#6B7280] text-sm sm:text-base mt-2">
              Everything you need to know about Nharire Intelligence, data security, and enterprise integration.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus:bg-gray-50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-gray-900 text-base sm:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0B5D3B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0B5D3B]' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/faq')}
              className="text-sm font-bold text-[#0B5D3B] hover:text-[#08482e] inline-flex items-center gap-1.5"
            >
              <span>View Full FAQ &amp; Technical Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          10. FINAL CTA SECTION: Dark Green (#0B5D3B) Premium Section
         ========================================================================= */}
      <section className="py-20 lg:py-24 bg-[#0B5D3B] text-white text-center relative overflow-hidden">
        {/* Ambient glow in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08482e] border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nharire Data Group Enterprise Access</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Turn Data Into Decisions?
          </h2>

          <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Join forward-thinking African enterprises unlocking real-time operational insights, automated reports, and zero-hallucination AI decision support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/platform')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#0B5D3B] font-bold px-8 py-4 rounded-xl text-base shadow-lg transition-all active:scale-[0.99]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white bg-[#08482e] hover:bg-[#063b25] border border-emerald-500/30 transition-colors"
            >
              <span>Talk To Us</span>
            </button>
          </div>

          <p className="text-xs text-emerald-200/60 pt-2">
            No long-term lock-in • Rapid onboarding in under 1 business day
          </p>

        </div>
      </section>

    </div>
  );
};
