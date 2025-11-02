import { useState, useEffect } from 'react'
import { Building2, Handshake, TrendingUp, Users, Upload, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export function PartnershipPage() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    business_type: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const formAnimation = useScrollAnimation()
  const benefitsAnimation = useScrollAnimation()
  const successStoriesAnimation = useScrollAnimation()

  const businessTypes = [
    'Retail',
    'E-commerce',
    'Manufacturing',
    'Wholesale Distribution',
    'Technology/SaaS',
    'Food & Beverage',
    'Fashion & Apparel',
    'Healthcare',
    'Other'
  ]

  // Show popup automatically after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('partnerships').insert([formData])
      if (error) throw error
      setSubmitted(true)
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        business_type: '',
        message: ''
      })
    } catch (error) {
      alert('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-[#E0E1DD] dark:bg-[#0D1B2A] pt-20 pb-12 px-4 transition-colors">
      {/* Inline CSS for popup animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="relative bg-[#E0E1DD] dark:bg-[#1B263B] rounded-2xl shadow-2xl p-6 max-w-md w-[90%] border border-[#B3AF8F] text-center animate-fade-in">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-[#415A77] hover:text-[#0D1B2A] dark:text-[#E0E1DD] dark:hover:text-white transition"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mb-3">
              🤝 Partnership Opportunity
            </h2>
            <p className="text-[#1B263B] dark:text-[#E0E1DD] mb-4">
              We’re expanding our{" "}
              <span className="font-semibold text-[#415A77]">Partner Network</span> globally.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Become an official collaborator and unlock exclusive benefits.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 px-6 py-2 bg-[#415A77] hover:bg-[#1B263B] text-[#E0E1DD] rounded-lg font-medium transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mb-4">
            Partner With Us
          </h1>
          <p className="text-xl text-[#415A77] dark:text-[#B3AF8F] max-w-3xl mx-auto">
            Join our network of businesses leveraging AI forecasting to drive growth and efficiency.
          </p>
        </div>

        {/* Benefits Section */}
        <div
          ref={benefitsAnimation.ref}
          className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-700 ${
            benefitsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            {
              icon: <TrendingUp className="w-8 h-8 text-[#415A77]" />,
              title: 'Increase Revenue',
              desc: 'Partners see an average 25% increase in revenue within 6 months of implementation.'
            },
            {
              icon: <Building2 className="w-8 h-8 text-[#B3AF8F]" />,
              title: 'Reduce Waste',
              desc: 'Optimize inventory and reduce waste by up to 40% with AI-driven predictions.'
            },
            {
              icon: <Users className="w-8 h-8 text-[#1B263B]" />,
              title: 'Expert Support',
              desc: 'Dedicated account manager and 24/7 technical support for all partners.'
            }
          ].map((benefit, i) => (
            <div key={i} className="bg-white dark:bg-[#1B263B] rounded-xl p-8 shadow-lg text-center hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#E0E1DD] dark:bg-[#0D1B2A] rounded-full flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mb-3">{benefit.title}</h3>
              <p className="text-[#415A77] dark:text-[#B3AF8F]">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Form and Stories */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Partnership Form */}
          <div
            ref={formAnimation.ref}
            className={`transition-all duration-700 ${
              formAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="bg-white dark:bg-[#1B263B] rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Handshake className="w-8 h-8 text-[#415A77]" />
                <h2 className="text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD]">Partnership Application</h2>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mb-3">
                    Application Submitted!
                  </h3>
                  <p className="text-[#415A77] dark:text-[#B3AF8F] mb-6">
                    Thank you for your interest. Our team will contact you within 2–3 business days.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-[#415A77] hover:bg-[#1B263B] text-[#E0E1DD] rounded-lg transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Company Name *"
                    required
                    className="w-full px-4 py-3 border border-[#B3AF8F] rounded-lg bg-white dark:bg-[#0D1B2A] text-[#0D1B2A] dark:text-[#E0E1DD]"
                  />

                  <input
                    type="text"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    placeholder="Contact Person *"
                    required
                    className="w-full px-4 py-3 border border-[#B3AF8F] rounded-lg bg-white dark:bg-[#0D1B2A] text-[#0D1B2A] dark:text-[#E0E1DD]"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      required
                      className="w-full px-4 py-3 border border-[#B3AF8F] rounded-lg bg-white dark:bg-[#0D1B2A] text-[#0D1B2A] dark:text-[#E0E1DD]"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone *"
                      required
                      className="w-full px-4 py-3 border border-[#B3AF8F] rounded-lg bg-white dark:bg-[#0D1B2A] text-[#0D1B2A] dark:text-[#E0E1DD]"
                    />
                  </div>

                  <select
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#B3AF8F] rounded-lg bg-white dark:bg-[#0D1B2A] text-[#0D1B2A] dark:text-[#E0E1DD]"
                  >
                    <option value="">Select Business Type *</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your business..."
                    className="w-full px-4 py-3 border border-[#B3AF8F] rounded-lg bg-white dark:bg-[#0D1B2A] text-[#0D1B2A] dark:text-[#E0E1DD] resize-none"
                  />

                  <div className="border-2 border-dashed border-[#B3AF8F] rounded-lg p-6 text-center text-[#415A77] dark:text-[#E0E1DD] cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p>Attach Proposal (Optional)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX (Max 10MB)</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#415A77] hover:bg-[#1B263B] text-[#E0E1DD] font-semibold rounded-lg transition-all hover:scale-105 disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Partnership Application'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Success Stories Section */}
          <div
            ref={successStoriesAnimation.ref}
            className={`space-y-6 transition-all duration-700 ${
              successStoriesAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div>
              <h2 className="text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mb-6">Success Stories</h2>
            </div>

            <div className="bg-gradient-to-br from-[#415A77] to-[#1B263B] rounded-xl p-8 text-[#E0E1DD] shadow-lg">
              <h3 className="font-bold text-lg">RetailPro India</h3>
              <p className="text-[#E0E1DD]/90 mb-4 leading-relaxed">
                “Within 4 months of partnership, we reduced inventory costs by 35% and increased profit margins by 28%.”
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold">35%</p>
                  <p className="text-sm opacity-90">Cost Reduction</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">28%</p>
                  <p className="text-sm opacity-90">Profit Increase</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#B3AF8F] to-[#415A77] rounded-xl p-8 text-[#E0E1DD] shadow-lg">
              <h3 className="font-bold text-lg">ManuGlobal Ltd</h3>
              <p className="text-[#E0E1DD]/90 mb-4 leading-relaxed">
                “The AI forecasting system helped us optimize production schedules and reduce waste significantly.”
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold">40%</p>
                  <p className="text-sm opacity-90">Waste Reduction</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">3x</p>
                  <p className="text-sm opacity-90">ROI in Year 1</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1B263B] rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mb-4">Partnership Process</h3>
              <ol className="space-y-3 text-[#415A77] dark:text-[#B3AF8F]">
                <li>1️⃣ Application Review — 2–3 days</li>
                <li>2️⃣ Initial Consultation — 1 week</li>
                <li>3️⃣ Agreement & Onboarding — 2–3 weeks</li>
                <li>✅ Go Live — Start seeing results</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
