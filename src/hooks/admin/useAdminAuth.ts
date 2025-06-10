
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const checkAdminStatus = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.log("No authenticated user found");
        setIsAdmin(false);
        setUser(null);
        return false;
      }

      setUser(user);

      // Check if user has admin role using the secure function
      const { data: adminCheck, error: adminError } = await supabase
        .rpc('is_admin');

      if (adminError) {
        console.error("Error checking admin status:", adminError);
        setIsAdmin(false);
        return false;
      }

      const hasAdminRole = Boolean(adminCheck);
      setIsAdmin(hasAdminRole);
      
      console.log("Admin status checked:", { userId: user.id, isAdmin: hasAdminRole });
      return hasAdminRole;

    } catch (error) {
      console.error("Unexpected error checking admin status:", error);
      setIsAdmin(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const requireAdmin = async () => {
    const hasAccess = await checkAdminStatus();
    if (!hasAccess) {
      console.log("Access denied - redirecting to login");
      navigate('/admin/login');
      return false;
    }
    return true;
  };

  useEffect(() => {
    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
        setUser(null);
        navigate('/admin/login');
      } else if (session?.user) {
        setUser(session.user);
        await checkAdminStatus();
      } else {
        setIsAdmin(false);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return {
    isAdmin,
    loading,
    user,
    checkAdminStatus,
    requireAdmin
  };
};
