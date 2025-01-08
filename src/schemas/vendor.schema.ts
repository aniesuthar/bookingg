import { z } from "zod";


export const createVendorSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  bio: z.string().min(1, "Vendor bio is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  phoneAlt: z.string().optional(),
  addressCity: z.string().optional(),
  addressPinCode: z.number().optional(),
  addressState: z.string().optional(),
  addressStreet: z.string().optional(),
  coverPhoto: z.string().url("Invalid URL").optional(),
  logo: z.string().url("Invalid URL").optional(),
  maxBookingWindow: z.number().optional(),
  minBookingWindow: z.number().optional(),
  googleMapUrl: z.string().url("Invalid URL").optional(),
  slug: z.string().min(1, "Slug is required"),
  startYear: z.number().optional(),
  showBusinessDetails: z.boolean().optional(),
});


// TypeScript type for createHospitalSchema
export type CreateVendorInput = z.infer<typeof createVendorSchema>;

// Define the input schema
export const updateVendorBankSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required."),
  bankName: z.string().min(1, "Bank name is required."),
  holderName: z.string().min(1, "Account holder name is required."),
  ifsc: z.string().min(1, "IFSC code is required."),
});
export type updateVendorBankInput = z.infer<typeof updateVendorBankSchema>;

// Define the input schema
const preferenceSchema = z.object({
  id: z.number().optional(), // id is optional, only present for existing preferences
  channel: z.enum(["WH","PH","EM"]), // Notification channels
  isActive: z.boolean(),
  dest: z.string(),
});

export const updateVendorNotificationPreferencesSchema = z.array(preferenceSchema);

