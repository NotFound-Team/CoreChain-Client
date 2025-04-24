import { BASE_URL, CONFIG_API } from "@/configs/api";
import UserDetails from "@/components/UserDetails";
import { cookies } from "next/headers";
import { UserResponse } from "@/types/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Detail User | User Management | Dashboard",
  description: "User Management",
};

export default async function PageUser({ params }: { params: { userId: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const { userId } = await params;
  try {
    const response = await fetch(`${BASE_URL}${CONFIG_API.USER.INDEX}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    // Fetch data from API in Server Component
    const user: UserResponse = response.data;

    console.log(response);

    if (!user) {
      return <div>User not found</div>;
    }

    return (
      <div>
        <UserDetails user={user} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return <div>Error loading user data!</div>;
  }
}
