
-- First, drop all existing policies to start clean
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.website_requests;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.website_requests;
DROP POLICY IF EXISTS "Admins can view all requests" ON public.website_requests;
DROP POLICY IF EXISTS "Admins can update all requests" ON public.website_requests;
DROP POLICY IF EXISTS "Enable insert for admins" ON public.admins;
DROP POLICY IF EXISTS "Enable read access for admins" ON public.admins;

-- Create user_roles table for proper role-based access control
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role text NOT NULL CHECK (role IN ('admin', 'moderator', 'user')),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, role_name text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = has_role.user_id 
    AND user_roles.role = role_name
  );
$$;

-- Create function to check if user is admin (replaces email-based check)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- Clean, secure RLS policies for website_requests
CREATE POLICY "Anonymous users can submit requests"
ON public.website_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view all requests"
ON public.website_requests
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update requests"
ON public.website_requests
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete requests"
ON public.website_requests
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- RLS policies for admins table
CREATE POLICY "Admins can view admin records"
ON public.admins
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can insert admin records"
ON public.admins
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Add some indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_website_requests_status ON public.website_requests(status);
CREATE INDEX IF NOT EXISTS idx_website_requests_created_at ON public.website_requests(created_at);
