import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Permission | Dashboard",
  description: "View and manage user permissions and access control settings.",
};

type TProps = {
  children: React.ReactNode
  title: never;
};

export default function LayoutPermission({ children, title }: TProps) {
  return (
    <div>
      {title}
      <div>{children}</div>
    </div>
  );
}
