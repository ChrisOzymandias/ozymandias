
import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    price: string;
    icon: LucideIcon;
    description: string;
    features: string[];
    why: string;
    note?: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const IconComponent = service.icon;

  return (
    <Card className="relative group hover:shadow-xl transition-all duration-300 border-2 hover:border-ozy/20">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ozy-light flex items-center justify-center group-hover:bg-ozy group-hover:text-white transition-colors">
          <IconComponent size={32} />
        </div>
        <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
        <div className="text-3xl font-bold text-ozy mb-2">{service.price}</div>
        {service.note && (
          <div className="text-sm text-gray-500">{service.note}</div>
        )}
        <CardDescription className="text-base">{service.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-ozy">Inclus :</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-ozy mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-ozy-light/30 p-4 rounded-lg mb-6">
          <h5 className="font-semibold text-ozy mb-2">Pourquoi c'est essentiel :</h5>
          <p className="text-sm text-gray-700">{service.why}</p>
        </div>
        
        <Button className="w-full bg-ozy hover:bg-ozy-dark">
          Choisir ce service <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
