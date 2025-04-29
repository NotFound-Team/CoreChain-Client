import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Role | Dashboard",
  description: "View and manage user roles and permissions within the system.",
};

export default function LayoutProject({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
