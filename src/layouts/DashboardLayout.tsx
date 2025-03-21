import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router";
export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="px-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
