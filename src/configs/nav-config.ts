import { NavItem, TeamData, UserData } from "@/types/nav.type";
import { DASHBOARD, FEEMANAGEMENT, HOME, MERCHANTMANAGEMENT, ORDERMANAGEMENT } from "@/constants/route.constant";
import { Home, LayoutDashboard, Frame } from "lucide-react";

/**
 * Navigation items for the sidebar
 * - Items without 'permission' field are always visible
 * - Items with 'permission' field are only visible if user has that permission
 */
export const platformNavItems: NavItem[] = [
  {
    title: "Home",
    url: HOME,
    icon: Home,
    items: [
      {
        title: "Page 1",
        url: HOME+'/page_1',
      },
      // {
      //   title: "Page 2",
      //   url: HOME + '/abc',
      // },
    ],
  },
  {
    title: "Dashboard",
    url: DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý merchant",
    url: MERCHANTMANAGEMENT,
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý Order",
    url: ORDERMANAGEMENT,
    icon: LayoutDashboard,
  },
  {
    title: "Fee Management",
    url: FEEMANAGEMENT,
    icon: LayoutDashboard,
  },
];


// User data
export const userData: UserData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

// Team/Company data
export const teamData: TeamData = {
  name: "Acme Inc",
  logo: Frame,
  plan: "Enterprise",
};
