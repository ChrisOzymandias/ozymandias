
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WebsiteRequest } from '@/types/requests';

// Liste des fonctionnalités disponibles pour la sélection
const AVAILABLE_FEATURES = [
  { value: 'contact-form', label: 'Formulaire de contact' },
  { value: 'blog', label: 'Blog' },
  { value: 'gallery', label: 'Galerie photos' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'shop', label: 'Boutique en ligne' },
  { value: 'testimonials', label: 'Témoignages' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'booking', label: 'Réservations' },
  { value: 'faq', label: 'FAQ' },
];

// Options de thème pour les sites web
const THEME_OPTIONS = [
  { value: 'business', label: 'Site d\'entreprise' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'one-page', label: 'Page unique' },
];

// Options de statut pour les demandes de site web
const STATUS_OPTIONS = [
  { value: 'new', label: 'Nouveau' },
  { value: 'contacted', label: 'Contacté' },
  { value: 'quote_sent', label: 'Devis envoyé' },
  { value: 'quote_accepted', label: 'Devis accepté' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'completed', label: 'Terminé' },
  { value: 'lost', label: 'Perdu' },
];

// Schéma de validation du formulaire
const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  company_name: z.string().optional(),
  profession: z.string().min(2, "La profession doit être spécifiée"),
  theme: z.string().min(1, "Sélectionnez un thème"),
  project_details: z.string().min(10, "Décrivez le projet en quelques mots"),
  status: z.string().default("new"),
  quote_amount: z.union([z.number().int().positive().optional(), z.literal("")])
    .transform(val => val === "" ? undefined : typeof val === "string" ? parseInt(val, 10) : val),
  features: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  onSuccess: () => void;
  initialData?: WebsiteRequest;
}

const ClientForm = ({ onSuccess, initialData }: ClientFormProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initialData?.features || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing client data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      quote_amount: initialData.quote_amount || undefined,
    } : {
      name: "",
      email: "",
      phone: "",
      company_name: "",
      profession: "",
      theme: "",
      project_details: "",
      status: "new",
      quote_amount: undefined,
      features: [],
    },
  });

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(current => 
      current.includes(feature)
        ? current.filter(f => f !== feature)
        : [...current, feature]
    );
    
    // Update form value
    const updatedFeatures = form.getValues().features || [];
    if (updatedFeatures.includes(feature)) {
      form.setValue('features', updatedFeatures.filter(f => f !== feature));
    } else {
      form.setValue('features', [...updatedFeatures, feature]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Set features from state
      data.features = selectedFeatures;

      let result;
      
      if (initialData?.id) {
        // Update existing client
        result = await supabase
          .from('website_requests')
          .update({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            company_name: data.company_name || null,
            profession: data.profession,
            theme: data.theme,
            project_details: data.project_details,
            status: data.status,
            features: data.features,
            quote_amount: data.quote_amount,
            updated_at: new Date().toISOString(),
          })
          .eq('id', initialData.id);
          
        if (result.error) throw result.error;
        toast({
          title: "Client mis à jour",
          description: `Les informations de ${data.name} ont été mises à jour avec succès`,
        });
      } else {
        // Create new client
        result = await supabase
          .from('website_requests')
          .insert({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            company_name: data.company_name || null,
            profession: data.profession,
            theme: data.theme,
            project_details: data.project_details,
            status: data.status,
            features: data.features,
            quote_amount: data.quote_amount,
            created_at: new Date().toISOString(),
          });
          
        if (result.error) throw result.error;
        toast({
          title: "Client ajouté",
          description: `${data.name} a été ajouté avec succès`,
        });
      }
      
      // Reset form and call success callback
      form.reset();
      setSelectedFeatures([]);
      onSuccess();
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement :", error);
      toast({
        title: "Erreur",
        description: `Échec de l'enregistrement : ${error.message || "Une erreur est survenue"}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jean.dupont@exemple.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="06 12 34 56 78" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="Entreprise SAS" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input placeholder="Consultant, Restaurateur, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thème du site</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un thème" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {THEME_OPTIONS.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="quote_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant du devis (€)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="450" 
                    {...field}
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? "" : Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <div>
            <FormLabel>Fonctionnalités requises</FormLabel>
            <div className="flex flex-wrap gap-2 mt-2">
              {AVAILABLE_FEATURES.map((feature) => (
                <Badge
                  key={feature.value}
                  variant={selectedFeatures.includes(feature.value) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-secondary/80 transition-colors"
                  onClick={() => toggleFeature(feature.value)}
                >
                  {selectedFeatures.includes(feature.value) && (
                    <CheckIcon className="mr-1 h-3 w-3" />
                  )}
                  {feature.label}
                </Badge>
              ))}
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="project_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Détails du projet</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Décrivez brièvement le projet et les besoins spécifiques..."
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : initialData ? "Mettre à jour le client" : "Ajouter le client"}
        </Button>
      </form>
    </Form>
  );
};

export default ClientForm;
