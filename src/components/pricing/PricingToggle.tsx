
interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

const PricingToggle = ({ isYearly, onToggle }: PricingToggleProps) => {
  return (
    <div className="flex justify-center items-center space-x-4 mb-12">
      <span className={`text-lg ${!isYearly ? 'font-bold text-blue-600' : 'text-gray-600'}`}>Mensuel</span>
      <div className="relative">
        <button 
          className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition duration-300 focus:outline-none"
          onClick={() => onToggle(!isYearly)}
        >
          <div
            className={`absolute top-1 w-6 h-6 bg-blue-600 rounded-full shadow-md transform transition-transform duration-300 ${
              isYearly ? 'translate-x-8' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
      <span className={`text-lg ${isYearly ? 'font-bold text-blue-600' : 'text-gray-600'}`}>Annuel <span className="text-green-600 text-sm ml-1">-17%</span></span>
    </div>
  );
};

export default PricingToggle;
