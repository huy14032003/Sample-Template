import { LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  permission?: string; // Optional permission required to view this sub-item
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  permission?: string; // Optional permission required to view this item
  items?: NavSubItem[];
}

export interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export interface TeamData {
  name: string;
  logo: LucideIcon;
  plan: string;
}
