import { validateFiles } from "@/utils/validate/validateFiles";
import React, { Dispatch, SetStateAction } from "react";
import P from "../text/P";

interface FileInputProps {
  setFiles: Dispatch<SetStateAction<File[]>>;
  files: File[];
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

export default function FileInput({ setFiles, files, error, setError }: FileInputProps) {
  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error, files } = validateFiles(e);
    setFiles(files);
    setError(error);
  };

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='relative cursor-pointer w-full'>
        <span className='inline-flex h-9 w-full min-w-0 items-center bg-transparent text-sm font-medium text-text-primary placeholder:text-text-secondary border-border rounded-md border px-3 py-2 shadow-xs transition-[color,box-shadow]'>
          {files.length > 0 ? `${files.length} file(s) selected` : "Choose file"}
        </span>
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={validate}
          className='absolute top-0 left-0 w-full h-full opacity-0'
        />
      </label>
      {error && (
        <P variant={"error"} size={"xs"}>
          {error}
        </P>
      )}
    </div>
  );
}
