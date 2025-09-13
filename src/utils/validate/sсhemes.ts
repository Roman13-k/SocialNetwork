import z from "zod";

export function phoneSchema(string: string) {
  return z
    .string()
    .regex(/^\+\d{10,15}$/)
    .safeParse(string).success;
}

export function emailSchema(string: string) {
  return z.email().safeParse(string).success;
}

export function linkSchema(string: string) {
  return z.url().safeParse(string).success;
}
