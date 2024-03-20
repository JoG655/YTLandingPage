import { cva } from "class-variance-authority";

export const buttonStyle = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary",
      ],
      ghost: ["hover:bg-gray-100"],
    },
    content: {
      default: ["rounded", "p-2"],
      icon: [
        "flex",
        "size-10",
        "items-center",
        "justify-center",
        "rounded-full",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    content: "default",
  },
});
