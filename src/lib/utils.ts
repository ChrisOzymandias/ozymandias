
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction pour précharger les images critiques
export function preloadCriticalImages(imagePaths: string[]): void {
  if (typeof document !== "undefined") {
    imagePaths.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = path;
      document.head.appendChild(link);
    });
  }
}

// Optimisation pour les images avec détection de support WebP
export function getOptimizedImagePath(path: string): string {
  // Si c'est déjà une URL externe (unsplash, etc.), on la laisse telle quelle
  if (path.startsWith('http')) {
    return path;
  }
  
  // Pour les images locales, on pourrait implémenter une logique de sélection de format
  // en fonction du support du navigateur (WebP, AVIF, etc.)
  return path;
}
