import { Can } from "@/context/casl/AbilityContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile | Dashboard",
  description: "View and manage your personal profile and account settings.",
};

export default function LayoutProfile({ children, title }: { children: React.ReactNode; title: React.ReactNode }) {
  return (
    <Can I="get" a="users/:id">
      <div>
        {title}
        <div>{children}</div>
      </div>
    </Can>
  );
}
