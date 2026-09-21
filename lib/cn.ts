import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Enseña a tailwind-merge las escalas propias de tokens.md para que no descarte clases válidas.
const merge = extendTailwindMerge<"typography">({
  extend: {
    classGroups: {
      "font-size": [{ text: ["xs", "sm", "base", "lg", "xl", "2xl", "display"] }],
      typography: ["type-display", "type-title", "type-label", "type-numeral", "type-annotation", "type-meta"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return merge(clsx(inputs));
}
