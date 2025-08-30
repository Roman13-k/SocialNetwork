import React from "react";

export function H1({ className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={`${className} text-text-primary text-[28px] min-md:text-[34px] min-lg:text-[36px] font-semibold`}
      {...props}>
      {children}
    </h1>
  );
}

export function H2({ className, children, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={`${className} text-text-primary text-[22px] min-sm:text-[24px] min-md:text-[26px] min-lg:text-[28px] font-medium`}
      {...props}>
      {children}
    </h2>
  );
}

export function H3({ className, children, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={`${className} text-text-primary text-[20px] min-md:text-[22px] min-lg:text-[24px] font-medium`}
      {...props}>
      {children}
    </h3>
  );
}

export function H4({ className, children, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      className={`${className} text-text-primary text-[] min-sm:text-[] min-md:text-[] min-lg:text-[22px] font-medium`}
      {...props}>
      {children}
    </h4>
  );
}

export function H5({ className, children, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      className={`${className} text-text-primary text-[18px] min-lg:text-[20px] font-medium`}
      {...props}>
      {children}
    </h5>
  );
}

export function H6({ className, children, ...props }: React.ComponentProps<"h6">) {
  return (
    <h6 className={`${className} text-text-primary text-[18px] min-lg:text-[20px]`} {...props}>
      {children}
    </h6>
  );
}
