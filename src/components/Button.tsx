import type { VariantProps } from "class-variance-authority";

import type { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { buttonStyle } from "../styles/buttonStyle";

export type ButtonProps = VariantProps<typeof buttonStyle> &
  ComponentProps<"button">;

export function Button({ variant, content, className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(buttonStyle({ variant, content }), className)}
      {...rest}
    ></button>
  );
}
