export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Profile {
  id: string
  email: string
  full_name: string | null
  company_name: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  phone: string | null
  siret: string | null
  vat_number: string | null
  logo_url: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_plan: 'free' | 'starter' | 'pro' | null
  subscription_status: 'active' | 'canceled' | 'past_due' | null
  invoice_prefix: string
  invoice_counter: number
  created_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  vat_number: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  client_id: string
  title: string
  description: string | null
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  budget: number | null
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
  client?: Client
}

export interface LineItem {
  description: string
  quantity: number
  unit_price: number
  vat_rate: number
}

export interface Quote {
  id: string
  user_id: string
  client_id: string
  project_id: string | null
  quote_number: string
  title: string
  line_items: LineItem[]
  subtotal: number
  vat_amount: number
  total: number
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  valid_until: string | null
  notes: string | null
  created_at: string
  updated_at: string
  client?: Client
  project?: Project
}

export interface Invoice {
  id: string
  user_id: string
  client_id: string
  project_id: string | null
  quote_id: string | null
  invoice_number: string
  title: string
  line_items: LineItem[]
  subtotal: number
  vat_amount: number
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  due_date: string | null
  paid_at: string | null
  stripe_payment_link: string | null
  notes: string | null
  created_at: string
  updated_at: string
  client?: Client
  project?: Project
}

export interface DashboardStats {
  revenue_month: number
  revenue_year: number
  unpaid_total: number
  active_projects: number
  pending_quotes: number
  overdue_invoices: number
}
