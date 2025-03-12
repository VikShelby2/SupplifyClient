"use client"

import * as React from "react"
import {InboxArrowDownIcon} from '@heroicons/react/24/solid'
import { Link, NavLink, useLocation } from "react-router-dom";
import 
{ 
   AnalisticsIcon, 
   CostumersIcon, 
   FileIcon, 
   GlobeIcon, 
   HomeIcon,  
   LineIcon,  
   MarketingIcon,
   OrderIcon, 
   ProductIcon, 
   RightArrowIcon, 
   SearchIconSec, 
   TeamIcon 
} 
from "../../ui/dashboard/icon";
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  House ,
  BaggageClaim  ,
  Trash2,
  Store,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../ui/shadcn/avatar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/shadcn/collabseble"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../../ui/shadcn/sidebar"
import { useRecoilValue } from "recoil";
import { storeAtom } from "../../../context/atoms/storeAtom";
import SelectTeam from "./selectTeam";

export default function SidebarComponent({isActive , open}) {
  const store = useRecoilValue(storeAtom)
  const currentUrl = window.location.pathname;

  const [data, setData] = React.useState({
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
      { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
      { name: "Evil Corp.", logo: Command, plan: "Free" },
    ],
    navMain: [
      {
        title: "Home",
        url: `/store-panel/home`,
        icon: House,
        isActive:isActive || false,
      },
      {
        title: "Orders",
        url: "#",
        icon: OrderIcon,
        isCollapsible: true,
        items: [
          { title: "Genesis", url: "#" },
          { title: "Explorer", url: "#" },
          { title: "Quantum", url: "#" },
        ],
      },
      {
        title: "Products",
        url: `/store-panel/products`,
        addUrl: `/store-panel/products/add`,
        invUrl: `/store-panel/products/inventory` ,
        icon: ProductIcon,
        isCollapsible: true,
        isActive:isActive ||  false,
        items: [
          { title: "Inventory", url: `/store-panel/products/inventory` , isActive: false },
          { title: "Collection", url: `/store-panel/collections` , isActive: false  },
          { title: "Track orders", url: "#" },
          { title: "Gift card", url: "#" },
        ],
      },
      {
        title: "Customers",
        url: "#",
        icon: CostumersIcon,
        isCollapsible: true,
        items: [
          { title: "General", url: "#" },
          { title: "Team", url: "#" },
          { title: "Billing", url: "#" },
          { title: "Limits", url: "#" },
        ],
      },
      { title: "Analytics", url: "#", icon: AnalisticsIcon, isActive: false },
      { title: "Marketing", url: "#", icon: MarketingIcon, isActive: false },
      { title: "File", url: "#", icon: FileIcon, isActive: false },
    ],
    projects: [
      { name: "Online Store",  url: `/store-panel/theme`, icon: Store },
      { name: "POS", url: "#", icon: PieChart },
      { name: "Teams", url: "#", icon: Map },
    ],
  });
  
  React.useEffect(() => {
    const updateActiveState = () => {
      const updatedNav = data.navMain.map((item) => {
        // Check if the main URL, addUrl, or invUrl matches the current URL
        const mainActive =
          item.url === currentUrl ||
          item.addUrl === currentUrl 
  
        // Check if any subitem URL matches the current URL
        const subActive = item.items?.some((subItem) => subItem.url === currentUrl);
  
        return {
          ...item,
          isActive: mainActive  , // Set isActive based on main or subitem match
          items: item.items?.map((subItem) => ({
            ...subItem,
            isActive: subItem.url === currentUrl, // Mark subitems individually
          })),
        };
      });
     
      setData((prevData) => ({ ...prevData, navMain: updatedNav }));
    };
  
    updateActiveState();
  }, [currentUrl]);
  
  
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0])
  React.useEffect(()=> {console.log(data)} , [data])
  return (
   <SidebarProvider className="absolute w-[16rem] ">
      <Sidebar variant="floating" collapsible={open} className='mt-[2px] '>
       
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
  {data.navMain.map((item) =>
    item.isCollapsible ? (
      <Collapsible
        key={item.title}
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
          <Link to={item.url}>

            <SidebarMenuButton tooltip={item.title} className={`${item.isActive ? 'bg-[#101010] text-white hover:bg-black hover:text-white' : ''}`}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight
                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </Link>
            
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton className={`${subItem.isActive ? 'bg-[#101010] text-white hover:bg-black hover:text-white' : ''}`}  asChild>
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
      <SidebarMenuItem key={item.title}>
      <Link to={item.url}>
        <SidebarMenuButton className={`${item.isActive ? 'bg-[#101010] text-white hover:bg-black hover:text-white' : ''}`} tooltip={item.title}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </SidebarMenuButton></Link>
      
      </SidebarMenuItem>
    )
  )}
</SidebarMenu>

          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Store</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild  className={`${item.isActive ? 'bg-[#101010] text-white hover:bg-black hover:text-white' : ''}`}>
                    <Link to={item.url}>
                      <item.icon className={` ${item.name === 'Online Store' ? 'text-violet-500' :''}`} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
     
        <SidebarRail />
      </Sidebar></SidebarProvider>
     
   
  )
}
