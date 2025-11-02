import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  User,
  Building,
  Mail,
  Phone,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    appointment_date: "",
    appointment_time: "",
    purpose: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFuturePlan, setShowFuturePlan] = useState(false);

  const formAnimation = useScrollAnimation();
  const timeSlotsAnimation = useScrollAnimation();

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const purposes = [
    "Product Demo",
    "Technical Consultation",
    "Partnership Discussion",
    "Custom Solution Inquiry",
    "Support & Training",
    "General Inquiry",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert([formData]);
      if (error) throw error;
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        appointment_date: "",
        appointment_time: "",
        purpose: "",
      });
    } catch (error) {
      alert("Error booking appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const minDate = new Date().toISOString().split("T")[0];

  // 👇 Show popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowFuturePlan(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 transition-colors">
      {/* Inline CSS for animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>

      {/* 👇 Future Plan Popup */}
      {showFuturePlan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-[#1B263B] rounded-2xl shadow-2xl p-6 max-w-md w-[90%] border border-[#B3AF8F] text-center animate-fade-in">
            <button
              onClick={() => setShowFuturePlan(false)}
              className="absolute top-3 right-3 text-[#415A77] hover:text-[#0D1B2A] dark:text-[#E0E1DD] dark:hover:text-white transition"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#0D1B2A] dark:text-[#E0E1DD] mb-3">
              🚧 Coming Soon
            </h2>
            <p className="text-[#1B263B] dark:text-[#E0E1DD] mb-4">
              The{" "}
              <span className="font-semibold text-[#415A77]">
                Appointment Booking
              </span>{" "}
              feature is part of our{" "}
              <span className="font-bold text-[#B3AF8F]">Future Plan</span>.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stay tuned — exciting updates are on the way!
            </p>

            <button
              onClick={() => setShowFuturePlan(false)}
              className="mt-5 px-6 py-2 bg-[#415A77] hover:bg-[#1B263B] text-[#E0E1DD] rounded-lg font-medium transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Book an Appointment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Schedule a personalized consultation with our AI experts
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
              title: "Flexible Scheduling",
              desc: "Choose from available time slots that work for you",
            },
            {
              icon: <User className="w-6 h-6 text-green-600 dark:text-green-400" />,
              title: "Expert Guidance",
              desc: "Meet with certified AI specialists",
            },
            {
              icon: <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
              title: "Free 30-Min Session",
              desc: "No commitment, no cost consultation",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg"
            >
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Form and Info */}
        <div className="grid md:grid-cols-5 gap-8">
          {/* Left - Form */}
          <div
            ref={formAnimation.ref}
            className={`md:col-span-3 transition-all duration-700 ${
              formAnimation.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Appointment Confirmed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    We've sent a confirmation email with meeting details.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    You'll receive a reminder 24 hours before your appointment.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Inputs */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-4 h-4" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <Mail className="w-4 h-4" /> Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <Phone className="w-4 h-4" /> Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Building className="w-4 h-4" /> Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4" /> Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleChange}
                        min={minDate}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <Clock className="w-4 h-4" /> Preferred Time *
                      </label>
                      <select
                        name="appointment_time"
                        value={formData.appointment_time}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Meeting Purpose *
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select purpose</option>
                      {purposes.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-all hover:scale-105 disabled:hover:scale-100 text-lg"
                  >
                    {isSubmitting ? "Booking..." : "Confirm Appointment"}
                  </button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    By booking, you agree to receive appointment reminders via
                    email and SMS.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right - Info Sections */}
          <div
            ref={timeSlotsAnimation.ref}
            className={`md:col-span-2 space-y-6 transition-all duration-700 ${
              timeSlotsAnimation.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Available Slots */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Available Time Slots
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Morning Sessions
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {timeSlots.slice(0, 6).map((time) => (
                    <div
                      key={time}
                      className="px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded text-center text-sm font-medium"
                    >
                      {time}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Afternoon Sessions
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.slice(6).map((time) => (
                    <div
                      key={time}
                      className="px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded text-center text-sm font-medium"
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expectation Info */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-3">What to Expect</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "30-minute personalized consultation",
                  "Live demo of our AI forecasting platform",
                  "Custom solution recommendations",
                  "Q&A with industry experts",
                  "Free trial access offer",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {[
                  "Have your business metrics ready for discussion",
                  "Prepare specific questions or challenges",
                  "Ensure stable internet for video call",
                  "Reschedule 24 hours in advance if needed",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
