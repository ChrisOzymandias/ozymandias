
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useSessionRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          // Si l'utilisateur est connecté, on le redirige vers le dashboard
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de session:", error);
      }
    };
    
    checkSession();
  }, [navigate]);
};
