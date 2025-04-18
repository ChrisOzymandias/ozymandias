
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  switchToRegister: () => void;
}

const LoginForm = ({ switchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
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
      
      // Redirection vers le dashboard
      navigate('/admin/dashboard');
      
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      setError(error.message || 'Une erreur s\'est produite lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
          onClick={switchToRegister}
        >
          Créer un compte admin
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
