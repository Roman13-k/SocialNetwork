import z from "zod";

export const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password must not exceed 25 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|<>?,./`~])\S+$/,
      "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and no spaces",
    ),
});
