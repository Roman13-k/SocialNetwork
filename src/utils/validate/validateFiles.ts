import z from "zod";

interface ValidateFiles {
  error: string | null;
  files: File[];
}

const coutOfBites = 2 * 1024 * 1024;

const filesSchema = z
  .array(z.instanceof(File))
  .max(3, { error: "The number of files is not more than 3" })
  .refine((files) => files.reduce((acc, file) => acc + file.size, 0) <= coutOfBites, {
    error: "The total size of files must not exceed 2 MB.",
  })
  .refine((files) => files.every((file) => /\.(png|jpg|jpeg)$/i.test(file.name)), {
    error: "Only .png, .jpg, .jpeg files are allowed.",
  });

export const validateFiles = (e: React.ChangeEvent<HTMLInputElement>): ValidateFiles => {
  const defaultReturn: ValidateFiles = { error: null, files: [] };
  if (!e.target.files) return defaultReturn;
  const selectedFiles = Array.from(e.target.files);

  const result = filesSchema.safeParse(selectedFiles);

  if (!result.success) {
    const firstError = result.error.issues[0].message || "Unknown error";
    return { ...defaultReturn, error: firstError };
  }

  return { ...defaultReturn, files: result.data };
};
