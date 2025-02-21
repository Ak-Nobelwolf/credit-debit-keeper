
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, Settings, PieChart, Menu, X, Moon, Sun, LogOut, Phone, Info } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { session } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/', icon: Home, public: true },
    { name: 'About Us', href: '/about', icon: Info, public: true },
    { name: 'Contact', href: '/contact', icon: Phone, public: true },
    { name: 'Dashboard', href: '/dashboard', icon: PieChart, public: false },
    { name: 'Analytics', href: '/analytics', icon: PieChart, public: false },
    { name: 'Profile', href: '/profile', icon: User, public: false },
    { name: 'Settings', href: '/settings', icon: Settings, public: false },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error: any) {
      toast.error("Error logging out");
    }
  };

  // Filter navigation items based on authentication status
  const filteredNavigation = navigation.filter(item => 
    session ? true : item.public
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 right-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Layout container */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div
          className={cn(
            "w-64 bg-card border-r border-border fixed lg:sticky top-0 h-screen transition-transform duration-200 ease-in-out z-40",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="h-full px-3 py-4 flex flex-col">
            <div className="mb-6 px-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Finance App</h2>
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
            <nav className="space-y-2 flex-1">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
              {session && (
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              )}
            </nav>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <main className={cn(
            "min-h-screen",
            session ? "pt-16 lg:pt-0" : "pt-16 lg:pt-0"
          )}>
            {children}
          </main>
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
