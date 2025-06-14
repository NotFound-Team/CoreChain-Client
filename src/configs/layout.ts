import { IoIosChatbubbles } from "react-icons/io";
import { GoProject } from "react-icons/go";
import { MdDashboard, MdOutlineFeedback, MdSettings } from "react-icons/md";
import { FaBox, FaRegUserCircle, FaUsersCog, FaUserShield } from "react-icons/fa";
import { BsBuildingFillLock } from "react-icons/bs";
import { PiBookOpenUserBold } from "react-icons/pi";
import { IconType } from "react-icons/lib";

type TListItem = {
  id: string;
  title: string;
  icon: IconType;
  href: string;
  permissions: string[];
};

export const listItem = (): TListItem[] => {
  return [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: MdDashboard,
      href: "/dashboard",
      permissions: [],
    },
    {
      id: "project",
      title: "Project",
      icon: GoProject,
      href: "/project",
      permissions: [],
    },
    {
      id: "chat",
      title: "Chat",
      icon: IoIosChatbubbles,
      href: "/chat",
      permissions: [],
    },
    {
      id: "role",
      title: "Role",
      icon: FaUserShield,
      href: "/role",
      permissions: [],
    },
    {
      id: "permission",
      title: "Permission",
      icon: BsBuildingFillLock,
      href: "/permission",
      permissions: [],
    },
    {
      id: "user-manager",
      title: "User Manager",
      icon: FaUsersCog,
      href: "/user-management",
      permissions: [],
    },
    {
      id: "position",
      title: "Position",
      icon: PiBookOpenUserBold,
      href: "/position",
      permissions: [],
    },
    {
      id: "department",
      title: "Department",
      icon: FaBox,
      href: "/department",
      permissions: [],
    },
    {
      id: "profile",
      title: "Profile",
      icon: FaRegUserCircle,
      href: "/profile",
      permissions: ["public"],
    },
    {
      id: "feedback",
      title: "Feedback",
      icon: MdOutlineFeedback,
      href: "/feedback",
      permissions: [],
    },
    {
      id: "setting",
      title: "Setting",
      icon: MdSettings,
      href: "/setting",
      permissions: ["public"],
    },
  ];
};
