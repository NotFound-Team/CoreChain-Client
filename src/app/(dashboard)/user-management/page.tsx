import { Can } from "@/context/casl/AbilityContext";
import ButtonCreateUser from "./CreateUser";
import ListUser from "./ListUser";
import { Metadata } from "next";
import { UserManagementSummary } from "./UserManagementSummary";

export const metadata: Metadata = {
  title: "User Management | Dashboard",
  description: "User Management",
};

export default function UserManagement() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <UserManagementSummary />
          <ButtonCreateUser />
        </div>
        <Can I="get" a="users">
          <ListUser />
        </Can>
      </div>
    </>
  );
}
