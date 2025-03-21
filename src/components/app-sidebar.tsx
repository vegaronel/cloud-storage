import {
  Home,
  Folder,
  UploadCloud,
  Share2,
  Trash2,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Logout from "./logout";

// Updated menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Files",
    url: "/my-files",
    icon: Folder,
  },
  {
    title: "Upload",
    url: "/upload",
    icon: UploadCloud,
  },
  {
    title: "Shared Files",
    url: "/shared",
    icon: Share2,
  },
  {
    title: "Trash",
    url: "/trash",
    icon: Trash2,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-screen flex flex-col justify-between">
          <div>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
          <Logout />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
