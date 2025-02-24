
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, Settings, PieChart, Menu, X, Moon, Sun, LogOut, Phone, Info, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LocalizationProvider } from "@/contexts/LocalizationContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { session } = useAuth();
  const navigate = useNavigate();

  const publicNavigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const privateNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', href: '/analytics', icon: PieChart },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const navigation = session ? privateNavigation : publicNavigation;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Error logging out");
    }
  };

  return (
    <LocalizationProvider>
      <div className="min-h-screen bg-background">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-3 right-3 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        <div className="flex h-full">
          <div
            className={cn(
              "w-64 bg-card border-r border-border fixed lg:sticky top-0 h-screen transition-transform duration-200 ease-in-out z-40",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}
          >
            <div className="h-full px-3 py-4 flex flex-col">
              <div className="mb-4 px-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold">Finance App</Link>
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
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
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
              <div className="pt-2">
                {session ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Link to="/" className="w-full block">
                    <Button variant="default" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <main className={cn(
              "min-h-screen",
              "pt-10 lg:pt-0",
              "px-3 sm:px-4 lg:px-6"
            )}>
              {children}
            </main>
          </div>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </LocalizationProvider>
  );
};

export default Layout;
