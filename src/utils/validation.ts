
import { z } from 'zod';
import DOMPurify from 'dompurify';

// Sanitization utility
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim());
};

// Phone number validation regex (international format)
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// Enhanced form validation schema
export const websiteFormSchema = z.object({
  theme: z.string().min(1, "Theme is required").max(50, "Theme name too long"),
  profession: z.string().min(1, "Profession is required").max(100, "Profession name too long"),
  features: z.array(z.string().max(100, "Feature name too long")).max(20, "Too many features selected"),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long")
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, "Name contains invalid characters"),
  email: z.string()
    .email("Invalid email format")
    .max(254, "Email too long")
    .toLowerCase(),
  phone: z.string()
    .optional()
    .refine((val) => !val || phoneRegex.test(val.replace(/[\s\-\(\)]/g, '')), {
      message: "Invalid phone number format"
    }),
  companyName: z.string()
    .optional()
    .refine((val) => !val || val.length <= 200, {
      message: "Company name too long"
    }),
  hasExistingWebsite: z.string().optional(),
  websiteExpectation: z.string()
    .optional()
    .refine((val) => !val || val.length <= 1000, {
      message: "Website expectation too long"
    }),
  launchTimeline: z.string().optional()
});

export type ValidatedFormData = z.infer<typeof websiteFormSchema>;

// Sanitize and validate form data
export const validateAndSanitizeFormData = (formData: any): ValidatedFormData => {
  // Sanitize string fields
  const sanitized = {
    ...formData,
    name: sanitizeInput(formData.name || ''),
    email: sanitizeInput(formData.email || ''),
    phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
    companyName: formData.companyName ? sanitizeInput(formData.companyName) : undefined,
    websiteExpectation: formData.websiteExpectation ? sanitizeInput(formData.websiteExpectation) : undefined,
    theme: sanitizeInput(formData.theme || ''),
    profession: sanitizeInput(formData.profession || ''),
    features: Array.isArray(formData.features) 
      ? formData.features.map((f: string) => sanitizeInput(f)).filter(Boolean)
      : []
  };

  return websiteFormSchema.parse(sanitized);
};
