
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, Settings, PieChart, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Analytics', href: '/analytics', icon: PieChart },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex relative">
      {/* Mobile menu button - positioned on right when menu is closed, inside sidebar when open */}
      {isSidebarOpen ? (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden absolute top-4 right-4 z-50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed top-4 right-4 z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Main content wrapper */}
      <div className="flex-1">
        {/* Sidebar */}
        <div
          className={cn(
            "w-64 bg-card border-r border-border fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="h-full px-3 py-4 flex flex-col">
            <div className="mb-4 px-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Finance App</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <nav className="space-y-1 flex-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="min-h-screen pt-16 lg:pt-0">
          {children}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
