import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Department | Dashboard",
  description: "View and manage user Department and access control settings.",
};

type TProps = {
  children: React.ReactNode;
};

export default function LayoutDepartment({ children }: TProps) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
