
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

// Add admin role to a user by their user ID (only existing admins can do this)
export const addAdminRole = async (userId: string): Promise<boolean> => {
  try {
    // First, check if the current user is an admin
    const { data: isCurrentUserAdmin, error: adminCheckError } = await supabase
      .rpc('is_admin');

    if (adminCheckError || !isCurrentUserAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can add admin roles.",
        variant: "destructive"
      });
      return false;
    }

    // Add admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin'
      });

    if (roleError) {
      console.error("Error adding admin role:", roleError);
      toast({
        title: "Error",
        description: "Failed to add admin role.",
        variant: "destructive"
      });
      return false;
    }

    toast({
      title: "Success",
      description: `Admin role added successfully`,
    });

    return true;

  } catch (error) {
    console.error("Unexpected error adding admin role:", error);
    return false;
  }
};

// Check if a user has a specific role
export const checkUserRole = async (userId: string, role: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .rpc('has_role', { user_id: userId, role_name: role });

    if (error) {
      console.error("Error checking user role:", error);
      return false;
    }

    return Boolean(data);
  } catch (error) {
    console.error("Unexpected error checking user role:", error);
    return false;
  }
};

// Get all roles for the current user
export const getCurrentUserRoles = async (): Promise<UserRole[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error("Error fetching user roles:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching user roles:", error);
    return [];
  }
};

// Get all users with their roles (admin only)
export const getAllUsersWithRoles = async (): Promise<any[]> => {
  try {
    // Check if the current user is an admin
    const { data: isCurrentUserAdmin, error: adminCheckError } = await supabase
      .rpc('is_admin');

    if (adminCheckError || !isCurrentUserAdmin) {
      toast({
        title: "Access Denied",
        description: "Only administrators can view user roles.",
        variant: "destructive"
      });
      return [];
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('*');

    if (error) {
      console.error("Error fetching all user roles:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching all user roles:", error);
    return [];
  }
};
