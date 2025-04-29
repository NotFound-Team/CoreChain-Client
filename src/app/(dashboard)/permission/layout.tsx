import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Permission | Dashboard",
  description: "View and manage user permissions and access control settings.",
};

export default function LayoutProfile({ children, title }: { children: React.ReactNode; title: React.ReactNode }) {
  return (
    <div>
      {title}
      <div>{children}</div>
    </div>
  );
}
