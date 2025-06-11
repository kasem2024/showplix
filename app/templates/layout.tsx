import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="overflow-x-hidden">
      <AppSidebar />
      <main>
         <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}