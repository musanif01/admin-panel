"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  ShoppingBag,
  Users,
  MessageSquare,
  Settings,
  Home,
  ChefHatIcon as Chef,
  AlertCircle,
  FileText,
  Video,
  Image,
  PieChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: NavItem[]
}

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Chefs",
      href: "/chefs",
      icon: <Chef className="h-5 w-5" />,
      submenu: [
        {
          title: "All Chefs",
          href: "/chefs",
          icon: <Chef className="h-4 w-4" />,
        },
        {
          title: "Verification Requests",
          href: "/chefs/verification",
          icon: <FileText className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "Menu Items",
      href: "/menu",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Complaints",
      href: "/complaints",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      title: "Content",
      href: "/content",
      icon: <Image className="h-5 w-5" />,
      submenu: [
        {
          title: "Videos",
          href: "/content/videos",
          icon: <Video className="h-4 w-4" />,
        },
        {
          title: "Advertisements",
          href: "/content/ads",
          icon: <Image className="h-4 w-4" />,
        },
      ],
    },
    // {
    //   title: "Analytics",
    //   href: "/analytics",
    //   icon: <BarChart className="h-5 w-5" />,
    //   submenu: [
    //     {
    //       title: "Usage",
    //       href: "/analytics/usage",
    //       icon: <PieChart className="h-4 w-4" />,
    //     },
    //     {
    //       title: "Performance",
    //       href: "/analytics/performance",
    //       icon: <BarChart className="h-4 w-4" />,
    //     },
    //   ],
    // },
    // {
    //   title: "Messages",
    //   href: "/messages",
    //   icon: <MessageSquare className="h-5 w-5" />,
    // },
    // {
    //   title: "Settings",
    //   href: "/settings",
    //   icon: <Settings className="h-5 w-5" />,
    // },
  ]

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isExpanded = expandedItems.includes(item.title)

    return (
      <li key={item.href} className={cn("mb-1", hasSubmenu && "flex flex-col")}>
        <Button
          asChild={!hasSubmenu}
          variant="ghost"
          className={cn(
            "w-full justify-start hover:bg-muted pl-3",
            isActive && "bg-muted font-semibold",
            hasSubmenu && "flex justify-between",
          )}
          onClick={hasSubmenu ? () => toggleSubmenu(item.title) : undefined}
        >
          {hasSubmenu ? (
            <>
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </div>
              <span className={cn("transition-transform", isExpanded ? "rotate-180" : "")}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 8.5L1.5 4L2.55 2.95L6 6.4L9.45 2.95L10.5 4L6 8.5Z" fill="currentColor" />
                </svg>
              </span>
            </>
          ) : (
            <Link href={item.href} className="flex items-center">
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          )}
        </Button>

        {hasSubmenu && isExpanded && (
          <ul className="pl-8 pt-1 flex flex-col space-y-1">
            {item.submenu?.map((subItem) => (
              <li key={subItem.href}>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start hover:bg-muted",
                    pathname === subItem.href && "bg-muted font-semibold",
                  )}
                >
                  <Link href={subItem.href} className="flex items-center">
                    {subItem.icon}
                    <span className="ml-2">{subItem.title}</span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className="hidden md:flex md:w-64 md:flex-col border-r border-gray-200 h-screen bg-white">
      <div className="flex flex-col h-full px-4 py-6">
        <div className="flex items-center justify-center mb-6">
          <span className="font-bold text-xl">Naanly Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">{navItems.map(renderNavItem)}</ul>
        </nav>
        <div className="pt-4 border-t">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">A</div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@naanly.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

