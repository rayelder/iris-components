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
