"use client";

import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    ChevronRight,
    ChevronsUpDown,
    LogOut,
    Settings,
} from "lucide-react";
import { useLogoutMutation } from "@/features/auth/services/auth.api";
import { useAppDispatch } from "@/stores/hooks";
import { logout } from "@/stores/slices/authSlice";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { platformNavItems, userData } from "../../../configs/nav-config";
import { NavItem, NavSubItem } from "../../../types/nav.type";
import usePermission from "@/hooks/usePermission";

// Team switcher data

// Team Switcher Component
function TeamSwitcher() {
    const { state, isMobile } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <span className="flex justify-center items-center">
                    {isCollapsed && !isMobile ? (
                        <div className="flex aspect-square size-16 items-center justify-center rounded-lg">
                            <img src="/icon.svg" alt="Icon" className="size-8" />
                        </div>
                    ) : (
                        <div className="flex-1 text-center flex justify-center items-center">
                            <img src="/logo.png" alt="Logo" className="h-16" />
                        </div>
                    )}
                </span>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

function NavMain({ items }: { items: NavItem[] }) {
    const { pathname } = useLocation();
    const { filterNavItems } = usePermission();

    // Filter items based on user permissions
    const visibleItems = filterNavItems(items);

    const isParentActive = (item: NavItem) => {
        if (item.items) {
            return item.items.some((subItem: NavSubItem) => pathname === subItem.url || pathname.startsWith(subItem.url + "/"));
        }
        return pathname === item.url || pathname.startsWith(item.url + "/");
    };

    // Check if a specific sub-item is active
    const isSubItemActive = (url: string) => {
        return pathname === url || pathname.startsWith(url + "/");
    };

    return (
        <SidebarGroup>
            <SidebarMenu>
                {visibleItems.map((item) =>
                    item.items && item.items.length > 0 ? (
                        // Collapsible item with nested sub-items
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isParentActive(item)}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title} isActive={isParentActive(item)}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items.map((subItem: NavSubItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild isActive={isSubItemActive(subItem.url)}>
                                                    <Link to={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        // Simple link item without nested items
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} isActive={isSubItemActive(item.url)}>
                                <Link to={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

// Nav User Component (Footer)
function NavUser({ user }: { user: { name: string; email: string; avatar: string } }) {
    const { isMobile } = useSidebar();
    const [postLogout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await postLogout({}).unwrap();
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            // Luôn xóa cookies và redirect dù API có lỗi hay không
            dispatch(logout());
            navigate("/auth/login");
        }
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">
                                    {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}>
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Settings />
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

// Main App Sidebar Component
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={platformNavItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
