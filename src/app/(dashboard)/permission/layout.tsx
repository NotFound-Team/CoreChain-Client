// import { Can } from "@casl/react";
import { Can } from "@/context/casl/AbilityContext";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Permission | Dashboard",
  description: "View and manage user permissions and access control settings.",
};

type TProps = {
  children: React.ReactNode;
  title: never;
};

export default function LayoutPermission({ children, title }: TProps) {
  return (
    <Can I="get" a="permissions">
      <div>
        {title}
        <div>{children}</div>
      </div>
    </Can>
  );
}
