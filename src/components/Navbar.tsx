
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/beba34e6-02d0-453b-83eb-2efd86d53196.png" 
            alt="Ozymandias" 
            className="h-10 w-10 mr-2" 
          />
          <span className="text-xl font-bold text-ozy">Ozymandias</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-gray-700 hover:text-ozy transition-colors">Services</a>
          <a href="#process" className="text-gray-700 hover:text-ozy transition-colors">Notre Approche</a>
          <a href="#pricing" className="text-gray-700 hover:text-ozy transition-colors">Tarifs</a>
          <a href="#form" className="btn-primary">Créer Mon Site</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg mt-2 py-4 px-6 absolute w-full">
          <div className="flex flex-col space-y-4">
            <a 
              href="#services" 
              className="text-gray-700 hover:text-ozy py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#process" 
              className="text-gray-700 hover:text-ozy py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Notre Approche
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 hover:text-ozy py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tarifs
            </a>
            <a 
              href="#form" 
              className="btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Créer Mon Site
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
