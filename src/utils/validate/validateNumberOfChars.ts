import z from "zod";

export const validateNumberOfChars = (value: string, max: number = 500): boolean => {
  return z.string().min(1).max(max).safeParse(value).success;
};
