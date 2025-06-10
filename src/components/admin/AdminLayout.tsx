import { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, FileText, Settings, LogOut, Users, Menu, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdminAuth } from '@/hooks/admin/useAdminAuth';

const AdminLayout = () => {
  const { isAdmin, loading, user, requireAdmin } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin access on component mount
    requireAdmin();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
      // Force navigation even if sign out fails
      navigate('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ozy"></div>
      </div>
    );
  }

  // If not admin, don't render anything (redirect should happen via useAdminAuth)
  if (!isAdmin) {
    return null;
  }

  const navItems = [
    {
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={20} />,
      label: 'Tableau de bord'
    },
    {
      path: '/admin/requests',
      icon: <FileText size={20} />,
      label: 'Demandes'
    },
    {
      path: '/admin/clients',
      icon: <Users size={20} />,
      label: 'Clients'
    },
    {
      path: '/admin/settings',
      icon: <Settings size={20} />,
      label: 'Paramètres'
    }
  ];

  const NavItems = () => (
    <>
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              isActive 
                ? 'bg-ozy text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="py-6 flex flex-col h-full">
                  <div className="flex items-center px-4 mb-6">
                    <Shield className="h-6 w-6 text-ozy mr-2" />
                    <h2 className="text-xl font-bold">Admin</h2>
                  </div>
                  <nav className="flex-1 space-y-1 px-2">
                    <NavItems />
                  </nav>
                  <div className="px-4 py-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700" 
                      onClick={handleSignOut}
                    >
                      <LogOut size={20} className="mr-2" />
                      Se déconnecter
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-ozy" />
              <span className="ml-2 text-xl font-bold">Page Admin</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden md:inline-block">
                {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-1">
              <NavItems />
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
