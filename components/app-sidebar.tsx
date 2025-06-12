'use client'
import {  Home, BriefcaseBusiness ,LayoutPanelTop, ChevronUp, User2   } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Menu items.
const items = [
    {
    title: "templates",
    url: "/templates",
    icon: LayoutPanelTop,
  },
  {
    title: "portfolios",
    url: "/templates/myportfolio",
    icon: BriefcaseBusiness,
  },
]

export function AppSidebar() {
  const [username , setUserName] = useState()
  const  router =useRouter()
    useEffect(() => {
        const fetchUser = async () => {
          const res = await fetch('/api/auth/loginuser');
          if (res.ok) {
            const data = await res.json();
    
            setUserName(data.user?.username)
          }else{
            router.push("/login")
          }
        };
        fetchUser();
      }, []);

    const handleLogout = async()=>{
      const res = await fetch('/api/auth/logout',{
        method:"post",
      })
     router.push("/login")
    }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
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
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[200px]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="bg-rose-400 text-white bg-neutral-700">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}