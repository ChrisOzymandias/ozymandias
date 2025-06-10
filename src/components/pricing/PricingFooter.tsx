
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PricingFooterProps {
  monthlyPrice: number;
}

const PricingFooter = ({ monthlyPrice }: PricingFooterProps) => {
  return (
    <div className="mt-10">
      <a 
        href="#form" 
        className="block w-full bg-green-600 text-white hover:bg-green-700 transition-colors rounded-full font-medium text-center py-4 text-lg"
      >
        Créer Mon Site Gratuit
      </a>
      <p className="text-center text-sm text-gray-500 mt-4">
        Création gratuite • Sans engagement • Maintenance à partir de {monthlyPrice}€/mois
      </p>
      
      {/* Footnote */}
      <div className="mt-8 text-sm text-gray-500 flex items-start border-t pt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 mr-2 text-gray-400 cursor-help flex-shrink-0 mt-0.5" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>
                Création du site 100% gratuite, puis maintenance à {monthlyPrice}€/mois incluant hébergement, domaine, 
                mises à jour et support. Sans engagement après les 3 premiers mois.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p>
          Maintenance démarre après validation du site. Engagement minimum de 3 mois pour la maintenance. 
          Résiliation possible à tout moment après cette période.
        </p>
      </div>
    </div>
  );
};

export default PricingFooter;
