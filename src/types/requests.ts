
export interface WebsiteRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  project_details: string;
  theme: string;
  profession: string;
  features: string[] | null;
  status: string;
  quote_sent?: boolean;
  quote_accepted?: boolean;
  followup_date?: string;
  created_at: string;
}
