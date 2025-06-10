
import { Mail, MapPin, Facebook, Instagram, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/beba34e6-02d0-453b-83eb-2efd86d53196.png" 
                alt="Ozymandias" 
                className="h-10 w-10 mr-2" 
              />
              <span className="text-xl font-bold">Ozymandias</span>
            </div>
            <p className="text-gray-400 mb-6">
              Création de sites web professionnels avec un service tout compris pour tous vos besoins digitaux.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Ozymandias-Agency/61566502696408/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/ozymandias_agency/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@ozymandias.agency?lang=fr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  <path d="M15 8c0-2.21-1.79-4-4-4H9v12" />
                  <line x1="12" y1="16" x2="12" y2="8" />
                  <line x1="15" y1="12" x2="9" y2="12" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</a>
              </li>
              <li>
                <a href="#form" className="text-gray-400 hover:text-white transition-colors">Créer mon site</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informations Légales</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">Mentions Légales</Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors">Politique de Confidentialité</Link>
              </li>
              <li>
                <Link to="/conditions-generales" className="text-gray-400 hover:text-white transition-colors">Conditions Générales</Link>
              </li>
              <li>
                <Link to="/politique-cookies" className="text-gray-400 hover:text-white transition-colors">Politique des Cookies</Link>
              </li>
              <li>
                <Link to="/admin/login" className="flex items-center text-gray-400 hover:text-ozy transition-colors">
                  <Shield className="h-4 w-4 mr-2" />
                  Espace Admin
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contactez-nous</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-ozy" />
                <span className="text-gray-400">3 Place Karine Ruby, 27000 EVREUX</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-ozy" />
                <span className="text-gray-400">contact@ozymandias.agency</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Ozymandias. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
