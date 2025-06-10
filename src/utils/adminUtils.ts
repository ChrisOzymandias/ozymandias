
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

// Add admin role to a user (only existing admins can do this)
export const addAdminRole = async (userEmail: string): Promise<boolean> => {
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

    // Find the user by email (note: this requires the user to exist in auth.users)
    // In production, you might want to invite users first
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error fetching users:", userError);
      return false;
    }

    const targetUser = users.users.find(u => u.email === userEmail);
    if (!targetUser) {
      toast({
        title: "User Not Found",
        description: `No user found with email: ${userEmail}`,
        variant: "destructive"
      });
      return false;
    }

    // Add admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: targetUser.id,
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
      description: `Admin role added to ${userEmail}`,
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
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

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
