import { cookies } from "next/headers";
import { BASE_URL, CONFIG_API } from "@/configs/api";
import DashboardClient from "./DashboardClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your dashboard.",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const [projects, tasks, users] = await Promise.all([
    fetch(`${BASE_URL}${CONFIG_API.PROJECT}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
    fetch(`${BASE_URL}${CONFIG_API.TASK}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
    fetch(`${BASE_URL}${CONFIG_API.USER.INDEX}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
  ]);

  return <DashboardClient data={{ projects, tasks, users }} />;
}
