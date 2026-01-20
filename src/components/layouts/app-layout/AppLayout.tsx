import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { useEffect, useMemo } from "react";
import { Outlet, useLocation, Navigate, Link } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { toggleTheme } from "@/stores/slices/themeSlice";
import usePermission from "@/hooks/usePermission";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { NavItem } from "@/types/nav.type";
import { platformNavItems } from "@/configs/nav-config";
import { Globe, Languages, Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Convert path segment to readable title (e.g., "fee-management" -> "Fee Management")
type NavMap = Record<string, string>;

const buildNavTitleMap = (navItems: NavItem[]): NavMap => {
  const map: NavMap = {};

  navItems.forEach((nav) => {
    map[nav.url] = nav.title;
    nav.items?.forEach((item) => {
      map[item.url] = item.title;
    });
  });

  return map;
};
const formatPathSegment = (segment: string): string => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const NAV_TITLE_MAP = buildNavTitleMap(platformNavItems);

const getTitleFromPath = (path: string): string => {
  return NAV_TITLE_MAP[path] ?? formatPathSegment(path.split("/").pop() ?? "");
};

const AppLayout = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const { accessToken } = useAppSelector((state) => state.auth);
  const { isRouteAccessible } = usePermission();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const title = getTitleFromPath(location.pathname);

  const breadcrumbItems = useMemo(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length === 0) return [];

    const items = pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const label = getTitleFromPath(path);
      const isLast = index === pathSegments.length - 1;
      return { path, label, isLast };
    });

    // Nếu có 3 items trở lên, rút gọn thành: first > ... > last
    if (items.length >= 3) {
      return [
        // items[0], // First item
        { path: "", label: "...", isLast: false, isEllipsis: true }, // Ellipsis
        items[items.length - 1], // Last item
      ];
    }

    return items;
  }, [location.pathname]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (!accessToken) {
      window.location.href = "/auth/login";
    }
  }, [accessToken]);

  if (!isRouteAccessible) {
    return <Navigate to="/403" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b bg-background px-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <SidebarTrigger className="-ml-1 shrink-0" size="icon-lg" />
            <div className="min-w-0 overflow-hidden">
              <span className="font-medium text-primary block truncate">{title}</span>
              <Breadcrumb>
                <BreadcrumbList className="flex-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Flexpay</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbItems.map((item, index) => (
                    <BreadcrumbItem
                      key={item.path || index}
                      className="min-w-0 max-w-28 md:max-w-full"
                    >
                      <BreadcrumbSeparator />

                      {"isEllipsis" in item && item.isEllipsis ? (
                        <BreadcrumbEllipsis />
                      ) : item.isLast ? (
                        <BreadcrumbPage className="min-w-0">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="block truncate">
                                {item.label}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                to={item.path}
                                className="block max-w-28 md:max-w-full truncate"
                              >
                                {item.label}
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  ))}


                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3  text-gray-600 dark:text-white ">

            <button
              onClick={() => dispatch(toggleTheme())}
              className="rounded-full h-7 w-7 text-lg font-medium transition-all duration-300 cursor-pointer flex justify-center items-center  hover:text-gray-950  dark:hover:text-white">
              {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className=" hover:text-gray-950 cursor-pointer dark:hover:text-white">
              <Languages size={18} />
            </button>
          </div>
        </header>
        <main className="flex-1 flex flex-col gap-4 overflow-y-auto overflow-x-hidden p-4 bg-main min-w-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
