import { Can } from "@/context/casl/AbilityContext";
import ButtonCreateUser from "./CreateUser";
import ListUser from "./ListUser";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Dashboard",
  description: "User Management",
};

export default function UserManagement() {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">User Management</div>
          <ButtonCreateUser />
        </div>
        <Can I="get" a="users">
          <ListUser />
        </Can>
      </div>
    </>
  );
}
