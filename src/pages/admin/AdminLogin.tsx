
import { useState } from 'react';
import { Shield } from 'lucide-react';
import LoginForm from '@/components/admin/auth/LoginForm';
import RegisterForm from '@/components/admin/auth/RegisterForm';
import { useSessionRedirect } from '@/hooks/admin/useSessionRedirect';

const AdminLogin = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Vérifier si l'utilisateur est déjà connecté et le rediriger
  useSessionRedirect();

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
        
        {!isRegisterMode ? (
          <LoginForm switchToRegister={() => setIsRegisterMode(true)} />
        ) : (
          <RegisterForm switchToLogin={() => setIsRegisterMode(false)} />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
