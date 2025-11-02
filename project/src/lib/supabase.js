import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// (TypeScript interfaces removed — not needed in plain JS)
// Data shape reference (for clarity):
// Appointment: { id, name, email, phone, company, appointment_date, appointment_time, purpose, status, created_at }
// Partnership: { id, company_name, contact_name, email, phone, business_type, message, document_url, status, created_at }
// Testimonial: { id, client_name, company, position, content, rating, image_url, is_featured, created_at }
// TeamMember: { id, name, role, expertise, fun_fact, image_url, display_order, created_at }
// CompanyStat: { id, label, value, suffix, icon, display_order, created_at }
