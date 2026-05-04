import { z } from "zod";

export const ccNameValidation = z
  .string()
  .min(1, "Card holder name is required")
  .min(2, "Name must be at least 2 characters");

export const ccNumberValidation = z
  .string()
  .min(1, "Card number is required")
  .min(16, "Card number must be at least 16 digits");

export const emailValidation = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

export const firstNameValidation = z
  .string()
  .min(1, "First name is required")
  .min(2, "First name must be at least 2 characters");

export const expirationValidation = z
  .string()
  .min(1, "Expiration is required")
  .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Enter expiration as MM/YY");

export const lastNameValidation = z
  .string()
  .min(1, "Last name is required")
  .min(2, "Last name must be at least 2 characters");

export const messageValidation = z.string().min(1, "Message is required");

export const nameValidation = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters");

export const reasonForContactValidation = z
  .string()
  .min(1, "Reason for contact is required");

export const securityCodeValidation = z
  .string()
  .min(1, "Security code is required")
  .min(3, "Must be at least 3 digits")
  .max(4, "Must be at most 4 digits");

export const streetAddressValidation = z
  .string()
  .min(1, "Street address is required");

export const cityValidation = z.string().min(1, "City is required");

export const zipCodeValidation = z.string().min(1, "Zip code is required");

export const countryValidation = z.string().min(1, "Country is required");

export const stateValidation = z.string().min(1, "State is required");

export const paymentMethodValidation = z
  .string()
  .min(1, "Payment method is required");

export const shippingAddressValidation = z
  .string()
  .min(1, "Default shipping consent is required");

/** Eight digits MMDDYYYY from `InputDate` (accepts any string; non-digits stripped). */
export const inputDateValidation = z
  .string()
  .transform((s) => s.replace(/\D/g, "").slice(0, 8))
  .superRefine((digits, ctx) => {
    if (digits.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of birth is required",
      });
      return;
    }
    if (digits.length !== 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter date of birth as MM/DD/YYYY",
      });
      return;
    }
    const mm = Number(digits.slice(0, 2));
    const dd = Number(digits.slice(2, 4));
    const yyyy = Number(digits.slice(4, 8));
    const parsed = new Date(yyyy, mm - 1, dd);
    if (
      parsed.getFullYear() !== yyyy ||
      parsed.getMonth() !== mm - 1 ||
      parsed.getDate() !== dd
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter a valid date of birth",
      });
    }
  });
