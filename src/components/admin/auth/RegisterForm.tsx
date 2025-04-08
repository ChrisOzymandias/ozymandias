
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  switchToLogin: () => void;
}

const RegisterForm = ({ switchToLogin }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        console.error("Erreur lors de l'insertion admin:", adminError);
        throw adminError;
      }

      toast({
        title: 'Compte créé avec succès',
        description: 'Votre compte administrateur a été créé. Veuillez vous connecter.',
      });
      
      // Connecter automatiquement l'utilisateur
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        console.warn("Création réussie mais erreur de connexion automatique:", signInError);
        switchToLogin();
        return;
      }
      
      console.log("Compte créé et connexion réussie, redirection...");
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 500);
      
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      setError(error.message || 'Une erreur s\'est produite lors de la création du compte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="register-email" className="sr-only">Adresse email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="register-email"
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
          <label htmlFor="register-password" className="sr-only">Mot de passe</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
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
          onClick={switchToLogin}
        >
          Retour à la connexion
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
