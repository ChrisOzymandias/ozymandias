
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Shield, LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté et le rediriger
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log("Session existe, redirection vers le dashboard...");
        navigate('/admin/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  const isValidEmail = () => {
    return email.endsWith('@ozymandias.agency');
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return false;
    }
    
    if (!isValidEmail()) {
      setError('Seules les adresses email @ozymandias.agency sont autorisées');
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) throw signInError;
      
      toast({
        title: 'Connexion réussie',
        description: 'Vous êtes maintenant connecté à l\'espace administrateur',
      });
      
      // Redirection explicite avec un léger délai pour s'assurer que le toast est visible
      setTimeout(() => {
        console.log("Redirection vers le dashboard après connexion...");
        navigate('/admin/dashboard');
      }, 500);
      
    } catch (error: any) {
      setError(error.message || 'Une erreur s\'est produite lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // 1. Créer le compte d'utilisateur
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) throw signUpError;
      
      if (!signUpData.user) {
        throw new Error('Une erreur s\'est produite lors de la création du compte');
      }
      
      // 2. Ajouter l'utilisateur à la table admins directement
      const { error: adminError } = await supabase
        .from('admins')
        .insert([{ user_id: signUpData.user.id }]);
        
      if (adminError) {
        throw adminError;
      }

      toast({
        title: 'Compte créé',
        description: 'Votre compte administrateur a été créé. Veuillez vous connecter.',
      });
      
      setIsRegisterMode(false);
    } catch (error: any) {
      setError(error.message || 'Une erreur s\'est produite lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-ozy" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Espace Administrateur</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegisterMode ? 'Créez votre compte administrateur' : 'Connectez-vous pour accéder au tableau de bord'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Adresse email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {email && !isValidEmail() && (
                <p className="mt-1 text-xs text-red-600">
                  Seules les adresses email @ozymandias.agency sont autorisées
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-10"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {!isRegisterMode ? (
              <>
                <Button
                  type="submit"
                  className="w-full bg-ozy hover:bg-ozy-dark"
                  disabled={loading}
                >
                  {loading ? 'Chargement...' : 'Se connecter'}
                  <LogIn className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="text-center">
                  <span className="text-gray-500">ou</span>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsRegisterMode(true);
                    setError(null);
                  }}
                >
                  Créer un compte admin
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  className="w-full bg-ozy hover:bg-ozy-dark"
                  disabled={loading}
                >
                  {loading ? 'Chargement...' : 'Créer un compte'}
                </Button>
                
                <div className="text-center">
                  <span className="text-gray-500">ou</span>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsRegisterMode(false);
                    setError(null);
                  }}
                >
                  Retour à la connexion
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
