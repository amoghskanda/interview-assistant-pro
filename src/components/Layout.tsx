
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Users, 
  ClipboardCheck,
  LogOut,
  Menu,
  X,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Set sidebar state when switching between mobile and desktop
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/", 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      name: "Upload Resumes", 
      path: "/upload", 
      icon: <Upload className="w-5 h-5" /> 
    },
    { 
      name: "Job Descriptions", 
      path: "/jobs", 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      name: "Candidate Tests", 
      path: "/tests", 
      icon: <ClipboardCheck className="w-5 h-5" /> 
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="z-50"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        
        <h1 className="text-xl font-medium">Interview Assistant Pro</h1>
        
        <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarFallback className="bg-primary text-white">
            {user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:relative z-40 md:z-0 h-full md:h-screen w-64 transition-all duration-300 ease-in-out transform bg-white dark:bg-gray-900 border-r overflow-hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-xl font-medium flex items-center">
              <ClipboardCheck className="mr-2 h-6 w-6 text-primary" />
              Interview Assistant
            </h1>
          </div>
          
          <nav className="flex-1 pt-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "w-full flex items-center px-4 py-3 text-left rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800",
                      location.pathname === item.path && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback className="bg-primary text-white">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{user?.name || "User"}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email || "user@example.com"}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  // Handle settings
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:border-red-200"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        !sidebarOpen && "md:ml-0"
      )}>
        <div className="container max-w-6xl mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
