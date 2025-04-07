
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ShieldCheck } from 'lucide-react';
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
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
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
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions Légales</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Politique de Confidentialité</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Conditions Générales</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Politique des Cookies</a>
              </li>
              <li>
                <Link to="/admin/login" className="flex items-center text-gray-400 hover:text-ozy transition-colors">
                  <ShieldCheck className="h-4 w-4 mr-2" />
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
                <span className="text-gray-400">123 Rue de l'Innovation, 75000 Paris</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 text-ozy" />
                <span className="text-gray-400">+33 1 23 45 67 89</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-ozy" />
                <span className="text-gray-400">contact@ozymandias.fr</span>
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
