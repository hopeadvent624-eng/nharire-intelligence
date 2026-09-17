import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  Building2,
  Lock
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    industry: 'retail-fmcg',
    preferredContact: 'email',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid work email address.';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Please specify your company or organization.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please briefly outline your operational requirements or question.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters describing your inquiry.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must consent to data processing for inquiry response.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate real network submission with realistic latency
      await new Promise(resolve => setTimeout(resolve, 800));

      // Store in sessionStorage so Thank You page can personalize greeting
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('nharire_inquiry_name', formData.name);
        sessionStorage.setItem('nharire_inquiry_company', formData.company);
        sessionStorage.setItem('nharire_inquiry_email', formData.email);
      }

      // Navigate to dedicated Thank You page
      navigate('/thank-you');
    } catch (err: any) {
      setSubmissionError('An unexpected network error occurred. Please try again or email us directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] py-10 px-4 sm:px-6 lg:px-8">
      <SeoHead
        title="Contact Enterprise Solutions | Nharire Intelligence"
        description="Speak with our data architects regarding Nharire Intelligence deployments, custom FMCG and logistics connectors, and sovereign enterprise pilots."
        path="/contact"
      />

      <div className="max-w-7xl mx-auto">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info & SLA Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] border border-[#38BDF8]/30 text-[#0284C7] text-xs font-bold mb-4">
                <Building2 className="w-3.5 h-3.5" />
                <span>Direct Commercial Inquiry</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Connect with the Nharire Intelligence Team
              </h1>
              <p className="mt-4 text-[#6B7280] text-sm sm:text-base leading-relaxed">
                Whether you operate a cross-border distribution corridor, an agricultural processing cluster, or an institutional treasury, our enterprise architects are prepared to review your data topology.
              </p>
            </div>

            {/* SLA Box */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Realistic Response Guarantee</h3>
                  <p className="text-xs text-[#0284C7] font-bold">We aim to respond within 1 business day.</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every inquiry is reviewed directly by our senior technical or client architecture leadership. We do not use automated marketing bots or dismissive ticket queues.
              </p>
            </div>

            {/* Office & Direct Channels */}
            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
                <MapPin className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 text-sm mb-0.5 font-bold">Corporate Headquarters</strong>
                  <span>Nharire Data Group (Private) Limited</span><br />
                  <span>Harare Technology Corridor, Zimbabwe</span><br />
                  <span className="text-gray-400 text-[11px]">Regional coordination: SADC &amp; East Africa</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
                <Mail className="w-5 h-5 text-[#0284C7] shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm mb-0.5 font-bold">Direct Technical Desk</strong>
                  <a href="mailto:inquiries@nharire.com" className="text-[#0284C7] font-semibold hover:underline">
                    inquiries@nharire.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#0284C7] shrink-0" />
                <div>
                  <strong className="block text-gray-900 text-sm mb-0.5 font-bold">Data Confidentiality Commitment</strong>
                  <span>Non-disclosure agreements (NDAs) are countersigned prior to proprietary data ingestion.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
                Request an Enterprise Briefing or Pilot
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mb-8">
                Please provide your operational context below. All details remain strictly confidential.
              </p>

              {submissionError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{submissionError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="contact-name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tendai Moyo"
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.name ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-[#0284C7]/40'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="contact-email">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. t.moyo@enterprise.co.zw"
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-[#0284C7]/40'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Company & Job Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="contact-company">
                      Company / Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Zambezi Logistics Ltd"
                      className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.company ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-[#0284C7]/40'
                      }`}
                    />
                    {errors.company && <p className="text-red-500 text-[11px] mt-1">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="contact-title">
                      Job Title
                    </label>
                    <input
                      id="contact-title"
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="e.g. Chief Operating Officer"
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
                    />
                  </div>
                </div>

                {/* Industry / Use Case & Preferred Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="contact-industry">
                      Industry / Primary Domain
                    </label>
                    <select
                      id="contact-industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
                    >
                      <option value="retail-fmcg">Retail &amp; FMCG Distribution</option>
                      <option value="agri-logistics">Agri-Logistics &amp; Cold-Chain Exports</option>
                      <option value="finance-credit">Financial Services &amp; Credit Underwriting</option>
                      <option value="energy-utilities">Decentralized Energy &amp; Utilities</option>
                      <option value="public-health">Healthcare &amp; Essential Commodities</option>
                      <option value="other">Other Commercial Sector</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="contact-method">
                      Preferred Contact Method
                    </label>
                    <select
                      id="contact-method"
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/40"
                    >
                      <option value="email">Work Email</option>
                      <option value="phone">Telephone Call</option>
                      <option value="video">Virtual Executive Briefing (Google Meet)</option>
                    </select>
                  </div>
                </div>

                {/* Operational Inquiries / Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5" htmlFor="contact-message">
                    Operational Requirements / Inquiry Overview <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current operational data structure, volume of records, regional branches, or primary analytical challenges..."
                    className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.message ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-[#0284C7]/40'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>}
                </div>

                {/* Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-600 leading-normal">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 rounded border-gray-300 text-[#0284C7] focus:ring-[#0284C7] w-4 h-4"
                    />
                    <span>
                      I consent to Nharire Data Group processing my contact details strictly for responding to this enterprise inquiry in compliance with our Privacy Policy.
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-[11px] mt-1">{errors.consent}</p>}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0284C7] to-[#1D4ED8] hover:from-[#0369A1] hover:to-[#1E40AF] text-white font-bold py-3.5 px-6 rounded-xl text-sm sm:text-base shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0284C7] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Inquiry to Technical Desk...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Enterprise Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-gray-500 text-[11px] mt-3">
                    <Lock className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>Your operational data is never disclosed to third parties.</span>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
