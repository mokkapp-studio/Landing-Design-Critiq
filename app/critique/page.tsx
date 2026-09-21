import type { Metadata } from "next";
import { CritiqueWorkspace } from "@/components/critique/critique-workspace";

export const metadata: Metadata = {
  title: "Mesa de revisión · Critiq",
  description: "Sube tu landing, marca cada problema con un pin numerado y repasa el registro de críticas.",
};

export default function CritiquePage() {
  return <CritiqueWorkspace />;
}
