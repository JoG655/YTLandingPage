import type { ComponentProps } from "react";

export type InputProps = ComponentProps<"input">;

export function Input({ ...rest }: InputProps) {
  return <input {...rest} />;
}
