
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenTool, LayoutDashboard, Plus, Settings, LogOut, Menu, X, Briefcase } from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Plus, label: "Create Post", path: "/create-post" },
    { icon: Briefcase, label: "Work Projects", path: "/work-management" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <PenTool className="h-8 w-8 text-blue-600 mr-2" />
            <span className="font-bold text-xl">WWC CMS</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={isActivePath(item.path) ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActivePath(item.path) ? "bg-blue-100 text-blue-700" : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {getUserDisplayName().charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{getUserDisplayName()}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome back, {getUserDisplayName()}
            </h2>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
