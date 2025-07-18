"use client";

import {
  BookOpenIcon,
  InfoIcon,
  LifeBuoyIcon,
  LogOut,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

import Logo from "@/components/navbar-components/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getApiUrl } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = getApiUrl("categories");
        const response = await fetch(url);
        const categoriesData: Category[] = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const navigationLinks = [
    { href: "/", label: "Home" },
    {
      label: "Categorias",
      submenu: true,
      type: "description",
      items: categories.map((category) => ({
        href: `/categorias/${category.slug}`,
        label: category.name,
        description: "",
      })),
    },
    {
      label: "Sobre",
      submenu: true,
      type: "icon",
      items: [{ href: "#", label: "Sobre Nós", icon: "InfoIcon" }],
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-64 p-1 md:hidden bg-white shadow-lg border border-blue-100"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      {link.submenu ? (
                        <>
                          <div className="text-blue-600 px-2 py-1.5 text-xs font-medium">
                            {link.label}
                          </div>
                          <ul>
                            {link.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink
                                  href={item.href}
                                  className="py-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                  {item.label}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <NavigationMenuLink
                          href={link.href}
                          className="py-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      )}
                      {/* Add separator between different types of items */}
                      {index < navigationLinks.length - 1 &&
                        // Show separator if:
                        // 1. One is submenu and one is simple link OR
                        // 2. Both are submenus but with different types
                        ((!link.submenu &&
                          navigationLinks[index + 1].submenu) ||
                          (link.submenu &&
                            !navigationLinks[index + 1].submenu) ||
                          (link.submenu &&
                            navigationLinks[index + 1].submenu &&
                            link.type !== navigationLinks[index + 1].type)) && (
                          <div
                            role="separator"
                            aria-orientation="horizontal"
                            className="bg-blue-200 -mx-1 my-1 h-px w-full"
                          />
                        )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu viewport={false} className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    {link.submenu ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5 transition-colors">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1 bg-white shadow-xl border border-blue-100">
                          <ul
                            className={cn(
                              link.type === "description"
                                ? "min-w-64"
                                : "min-w-48"
                            )}
                          >
                            {link.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink
                                  href={item.href}
                                  className="py-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                  {/* Display icon if present */}
                                  {link.type === "icon" && "icon" in item && (
                                    <div className="flex items-center gap-2">
                                      {item.icon === "BookOpenIcon" && (
                                        <BookOpenIcon
                                          size={16}
                                          className="text-blue-600"
                                          aria-hidden="true"
                                        />
                                      )}
                                      {item.icon === "LifeBuoyIcon" && (
                                        <LifeBuoyIcon
                                          size={16}
                                          className="text-blue-600"
                                          aria-hidden="true"
                                        />
                                      )}
                                      {item.icon === "InfoIcon" && (
                                        <InfoIcon
                                          size={16}
                                          className="text-blue-600"
                                          aria-hidden="true"
                                        />
                                      )}
                                      <span>{item.label}</span>
                                    </div>
                                  )}

                                  {/* Display label with description if present */}
                                  {link.type === "description" &&
                                  "description" in item ? (
                                    <div className="space-y-1">
                                      <div className="font-medium">
                                        {item.label}
                                      </div>
                                      <p className="text-gray-600 line-clamp-2 text-xs">
                                        {item.description}
                                      </p>
                                    </div>
                                  ) : (
                                    // Display simple label if not icon or description type
                                    !link.type ||
                                    (link.type !== "icon" &&
                                      link.type !== "description" && (
                                        <span>{item.label}</span>
                                      ))
                                  )}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={link.href}
                        className="text-gray-700 hover:text-blue-600 py-1.5 font-medium transition-colors"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            // Loading state
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ) : isAuthenticated && user ? (
            // User is logged in
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">{user.name}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48">
                  <div className="space-y-2">
                    <div className="px-2 py-1 border-b">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            // User is not logged in
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                <a href="/login">Login</a>
              </Button>
              <Button
                asChild
                size="sm"
                className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm"
              >
                <a href="/login/register">Criar Conta</a>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
