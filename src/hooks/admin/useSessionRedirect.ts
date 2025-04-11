
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useSessionRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Erreur lors de la vérification de session:", error);
          return;
        }
        
        if (data.session) {
          console.log("Session existe, vérification des droits admin...");
          
          // Vérifier si l'utilisateur est admin
          const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('*')
            .eq('user_id', data.session.user.id)
            .single();
          
          if (adminError) {
            // Si erreur est "No rows found", l'utilisateur n'est pas admin
            if (adminError.code === 'PGRST116') {
              console.warn("Utilisateur connecté mais pas admin");
              await supabase.auth.signOut();
              return;
            }
            
            console.error("Erreur lors de la vérification admin:", adminError);
            return;
          }
          
          if (adminData) {
            console.log("Utilisateur admin confirmé, redirection vers le dashboard...");
            navigate('/admin/dashboard');
          } else {
            console.warn("Utilisateur connecté mais pas admin");
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error("Erreur inattendue:", error);
      }
    };
    
    checkSession();
  }, [navigate]);
};
