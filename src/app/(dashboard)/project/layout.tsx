import { Can } from "@/context/casl/AbilityContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Project | Dashboard",
  description: "View and manage your personal profile and account settings.",
};

export default function LayoutProject({ children }: { children: React.ReactNode }) {
  return (
    <Can I="get" a="projects">
      <div>
        <div>{children}</div>
      </div>
    </Can>
  );
}
