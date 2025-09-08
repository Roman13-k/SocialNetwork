import z from "zod";

export const validateNumberOfChars = (value: string): boolean => {
  return z.string().min(1).max(500).safeParse(value).success;
};
