import { IoIosChatbubbles } from "react-icons/io";
import { GoProject } from "react-icons/go";
import {
  MdAttachMoney,
  MdAutoGraph,
  MdCalculate,
  MdCalendarMonth,
  MdDashboard,
  MdFactCheck,
  MdHistory,
  MdPayments,
  MdSettings,
  MdVideoCall,
  MdVpnKey,
  MdWorkOutline,
} from "react-icons/md";
import { FaBox, FaFileContract, FaRegUserCircle, FaUserEdit, FaUsers, FaUsersCog, FaUserShield } from "react-icons/fa";
import { BsBuildingFillLock } from "react-icons/bs";
import { IconType } from "react-icons/lib";

export type TNavigationItem = {
  id: string;
  title: string;
  icon: IconType;
  href: string;
  permissions: string[];
  childrens?: TNavigationItem[];
};

export const NAVIGATION_ITEMS: TNavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
    permissions: [],
  },
  {
    id: "operation-group",
    title: "Operations",
    icon: GoProject,
    href: "#",
    permissions: [],
    childrens: [
      {
        id: "calendar",
        title: "Calendar",
        icon: MdCalendarMonth,
        href: "/operations/calendar",
        permissions: [],
      },
      { id: "project", title: "Project", icon: GoProject, href: "/project", permissions: [] },
      { id: "chat", title: "Chat", icon: IoIosChatbubbles, href: "/chat", permissions: [] },
      {
        id: "meeting",
        title: "Meetings",
        icon: MdVideoCall,
        href: "/operations/meetings",
        permissions: [],
      },
      {
        id: "feedback",
        title: "Feedback",
        icon: MdVpnKey,
        href: "/operations/feedback",
        permissions: [],
      },
    ],
  },
  // --- (CORE HR) ---
  {
    id: "hr-management",
    title: "HR Management",
    icon: FaUsers,
    href: "#",
    permissions: ["view_hr"],
    childrens: [
      {
        id: "personnel",
        title: "Personnel List",
        icon: FaUsers,
        href: "/hr/personnel",
        permissions: [],
      },
      {
        id: "working-hours",
        title: "Working Hours",
        icon: MdHistory,
        href: "/hr/working-hours",
        permissions: [],
      },
      {
        id: "adjustment",
        title: "Personnel Adjustments", // add adjustment api
        icon: FaUserEdit,
        href: "/hr/adjustments",
        permissions: [],
      },
      {
        id: "contract",
        title: "Contracts",
        icon: FaFileContract,
        href: "/hr/contracts",
        permissions: [],
      },
      {
        id: "organization",
        title: "Organization",
        icon: FaBox,
        href: "#",
        permissions: [],
        childrens: [
          { id: "dept", title: "Departments", icon: FaBox, href: "/hr/departments", permissions: [] },
          { id: "pos", title: "Positions", icon: MdWorkOutline, href: "/hr/positions", permissions: [] },
        ],
      },
    ],
  },
  // --- (FINANCE & PAYROLL) ---
  {
    id: "finance-management",
    title: "Finance & Payroll",
    icon: MdAttachMoney,
    href: "#",
    permissions: ["view_finance"],
    childrens: [
      {
        id: "payroll-calc",
        title: "Payroll Calculation",
        icon: MdCalculate,
        href: "/finance/payroll",
        permissions: [],
      },
      {
        id: "kpi-calc",
        title: "KPI Assessment",
        icon: MdAutoGraph,
        href: "/finance/kpi",
        permissions: [],
      },
      {
        id: "salary-advance",
        title: "Salary Advance",
        icon: MdPayments,
        href: "#",
        permissions: [],
        childrens: [
          {
            id: "adv-request",
            title: "Advance Requests",
            icon: MdHistory,
            href: "/finance/advance/requests",
            permissions: [],
          },
          {
            id: "adv-approve",
            title: "Approve Advance",
            icon: MdFactCheck,
            href: "/finance/advance/approve",
            permissions: [],
          },
        ],
      },
    ],
  },
  // --- SYSTEM ---
  {
    id: "system-control",
    title: "System Control",
    icon: FaUsersCog,
    href: "#",
    permissions: ["admin"],
    childrens: [
      { id: "users", title: "User Accounts", icon: FaRegUserCircle, href: "/system/users", permissions: [] },
      { id: "roles", title: "Roles", icon: FaUserShield, href: "/system/roles", permissions: [] },
      {
        id: "permissions",
        title: "Permissions",
        icon: BsBuildingFillLock,
        href: "/system/permissions",
        permissions: [],
      },
    ],
  },
  {
    id: "setting",
    title: "Settings",
    icon: MdSettings,
    href: "/settings",
    permissions: ["public"],
  },
];
