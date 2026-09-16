import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  FileText, 
  Mail, 
  Building2, 
  CheckCircle2,
  Globe2,
  AlertCircle
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-10 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="Privacy Policy &amp; Sovereign Data Governance | Nharire Intelligence"
        description="Nharire Intelligence sovereign data privacy standards: Tenant isolation, AES-256 encryption, zero model-training on customer records, and POPIA/GDPR alignment."
        path="/privacy-policy"
      />

      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        {/* Hero Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border border-[#22C55E]/30 text-[#0B5D3B] text-xs font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sovereign Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Privacy Policy &amp; Data Protection
          </h1>
          <p className="mt-4 text-[#6B7280] text-sm sm:text-base leading-relaxed">
            Effective Date: March 2026 • Policy Version 1.2 • Published by Nharire Data Group (Private) Limited.
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 mb-12 space-y-4 shadow-xs">
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0B5D3B]" />
            <span>Our Sovereign Data Commitment in Brief</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 pt-2">
            <div className="flex items-start gap-2.5 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">Zero Model Training:</strong> Your organizational datasets are never used to train public generative or foundation models.</span>
            </div>
            <div className="flex items-start gap-2.5 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">Tenant Isolation:</strong> Data is strictly partitioned into tenant-specific encrypted workspaces with no cross-contamination.</span>
            </div>
            <div className="flex items-start gap-2.5 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">AES-256 Encryption:</strong> Ingestion feeds, profiled schemas, and generated briefings are encrypted at rest and in transit (TLS 1.3).</span>
            </div>
            <div className="flex items-start gap-2.5 bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span><strong className="text-gray-900">African Regulatory Alignment:</strong> Engineered to satisfy Zimbabwe Data Protection, SA POPIA, Kenya DPA, and European GDPR.</span>
            </div>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-gray-600 leading-relaxed bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-xs">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">1. Scope and Identity of Controller</h3>
            <p>
              This Privacy Policy explains how <strong>Nharire Data Group (Private) Limited</strong> ("Nharire", "we", "us", or "our") processes, stores, and protects information collected through the <strong>Nharire Intelligence</strong> platform (accessible via web applications and REST APIs) and associated corporate channels.
            </p>
            <p>
              When an enterprise customer ingests operational datasets into the Nharire Intelligence SaaS platform, the customer acts as the <em>Data Controller</em>, and Nharire acts strictly as a <em>Data Processor</em> under contractually defined terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">2. Categories of Information Collected</h3>
            <div className="space-y-2">
              <p><strong className="text-gray-900">A. Account &amp; Administrative Data:</strong> Name, work email address, job title, company designation, and authentication credentials provided during platform access or lead inquiries.</p>
              <p><strong className="text-gray-900">B. Enterprise Operational Datasets:</strong> Tabular records uploaded by authorized tenant users, including point-of-sale logs, distribution manifests, inventory levels, sensor telemetry, and mobile money transaction summaries.</p>
              <p><strong className="text-gray-900">C. Analytical Metadata &amp; Logs:</strong> Automated schema inferences, calculated column statistics (null percentages, health indices), query timestamps, and system audit logs.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">3. How Information is Processed</h3>
            <p>We process operational data strictly for the purpose of fulfilling enterprise services requested by our customers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Running automated statistical data health profiling (outlier detection, schema normalization).</li>
              <li>Rendering interactive visual dashboards and business velocity KPIs.</li>
              <li>Executing grounded, deterministic analytical queries requested by your team.</li>
              <li>Synthesizing executive boardroom briefings through sovereign AI synthesis pipelines.</li>
              <li>Ensuring platform reliability, tenant security, and malicious threat detection.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">4. AI Architecture &amp; Absolute Non-Training Guarantee</h3>
            <p>
              A cornerstone of our African-first architecture is data sovereignty. Customer operational data ingested into Nharire Intelligence is <strong>NEVER</strong> used to train, retrain, fine-tune, or adjust the weights of public foundation models or commercial large language models.
            </p>
            <p>
              Any contextual data transmitted to private language inference endpoints for executive synthesis is stateless, strictly ephemerally processed, and discarded immediately after generation of the requested briefing.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">5. Security, Tenancy, and Cryptographic Standards</h3>
            <p>
              Nharire implements multi-layered technical and organizational safeguards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong className="text-gray-900">Logical Tenant Isolation:</strong> Every customer's datasets, schemas, and reports reside in isolated tenant containers protected by cryptographic workspace identifiers.</li>
              <li><strong className="text-gray-900">Encryption:</strong> All persistent records are encrypted at rest using AES-256. All communications are encrypted in transit using TLS 1.3.</li>
              <li><strong className="text-gray-900">Audit Logging:</strong> Every dataset deletion, export, and user access is immutably logged for enterprise compliance verification.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">6. Data Retention and Deletion Rights</h3>
            <p>
              Customer organizations maintain full ownership of their data. When an enterprise dataset or workspace is deleted by an authorized administrator, it is immediately purged from active database tables and permanently deleted from backup storage within 30 days.
            </p>
            <p>
              Customers may at any time request an export of all proprietary datasets or a formal certificate of erasure upon contract termination.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">7. African Data Sovereignty &amp; Regulatory Alignment</h3>
            <p>
              Our governance principles are intentionally aligned with data privacy statutes across the African continent:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong className="text-gray-900">Zimbabwe:</strong> Cyber and Data Protection Act [Chapter 12:07].</li>
              <li><strong className="text-gray-900">South Africa:</strong> Protection of Personal Information Act (POPIA).</li>
              <li><strong className="text-gray-900">Kenya:</strong> Data Protection Act (DPA 2019).</li>
              <li><strong className="text-gray-900">International:</strong> European Union General Data Protection Regulation (GDPR).</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">8. Privacy Office &amp; Contact Information</h3>
            <p>
              For data protection questions, compliance verification, or Data Processing Addendum (DPA) requests, please contact our Data Governance Officer:
            </p>
            <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-gray-200 space-y-1.5 text-xs text-gray-700">
              <div><strong className="text-gray-900">Data Protection Officer:</strong> Nharire Data Group Governance Office</div>
              <div><strong className="text-gray-900">Email:</strong> <a href="mailto:privacy@nharire.com" className="text-[#0B5D3B] font-semibold hover:underline">privacy@nharire.com</a></div>
              <div><strong className="text-gray-900">Corporate Address:</strong> Nharire Data Group (Private) Limited, Harare Technology Corridor, Zimbabwe</div>
              <div><strong className="text-gray-900">Response window:</strong> 1 business day for commercial inquiries; 14 calendar days for formal statutory data requests.</div>
            </div>
          </section>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-500">
            © 2026 Nharire Data Group (Private) Limited. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="text-xs font-bold text-[#0B5D3B] hover:text-[#08482e]"
            >
              Talk to Privacy Officer
            </button>
            <button
              onClick={() => navigate('/platform')}
              className="bg-[#0B5D3B] hover:bg-[#08482e] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-xs"
            >
              Explore Platform
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
