import { Can } from "@/context/casl/AbilityContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Role | Dashboard",
  description: "View and manage user roles and permissions within the system.",
};

export default function LayoutRole({ children }: { children: React.ReactNode }) {
  return (
    <Can I="get" a="roles">
      <div>
        <div>{children}</div>
      </div>
    </Can>
  );
}
