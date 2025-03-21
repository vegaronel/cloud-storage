import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";
export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-4 py-2">
        <SidebarTrigger />
        <div>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
