import * as React from "react";

import { cn } from "@/lib/utils";
import { validateNumberOfChars } from "@/utils/validate/validateNumberOfChars";

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onError"> {
  onValidateError?: (error: boolean) => void;
  maxChars?: number;
}

function Textarea({
  className,
  value = "",
  onChange,
  onValidateError,
  maxChars = 500,
  ...props
}: TextareaProps) {
  const [contentError, setContentError] = React.useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const isError = !validateNumberOfChars(val, maxChars);
    setContentError(isError);
    onValidateError?.(isError);
    onChange?.(e);
  };

  return (
    <label className='flex flex-col gap-1 w-full'>
      <textarea
        data-slot='textarea'
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        value={value}
        onChange={handleOnChange}
        {...props}
      />
      <span className={`${contentError ? "text-red-500" : "text-text-secondary"} text-sm ml-auto`}>
        {String(value).length + "/" + maxChars}
      </span>
    </label>
  );
}

export { Textarea };
