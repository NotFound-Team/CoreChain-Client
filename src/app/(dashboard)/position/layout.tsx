import { Can } from "@/context/casl/AbilityContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Position | Dashboard",
  description: "View and manage user Position and access control settings.",
};

export default function LayoutPosition({ children }: { children: React.ReactNode }) {
  return (
    <Can I="get" a="positions">
      <div>
        <div>{children}</div>
      </div>
    </Can>
  );
}
