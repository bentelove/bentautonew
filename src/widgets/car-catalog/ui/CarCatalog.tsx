'use client';

import { CarModel } from "@/entities/car-brand";
import { useCarModelCatalog } from "../model/useCarCatalog";
import { useEffect, useState, useRef } from "react";
import { CarCatalogGeneration } from "./CarCatalogGeneration";
import { CarCatalogCarousel } from "./CarCatalogCarousel";
import { CarGeneration } from "@/entities/car-brand/model/carBrand.types";
import { CatalogNavigation } from "@/features/ui/CatalogNavigation";
import { usePathname } from "next/navigation";

interface CarModelCatalogProps{
  modelId?:number,
  brandUrl?:string,
  modelUrl?:string,
  generationUrl?:string,
  serviceUrl?:string
}

export const CarCatalog = ({modelId,brandUrl,modelUrl,generationUrl,serviceUrl='all'}:CarModelCatalogProps) => {
  const { model, year, setYear, loading, error } = useCarModelCatalog(modelId,brandUrl,modelUrl,serviceUrl);
  const [activeGeneration, setActiveGeneration] = useState<CarGeneration | null>(null);
  const generationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false); // Флаг для предотвращения повторного скролла

  useEffect(() => {
    const foundGeneration = model?.generations.find(g=>g.url==generationUrl) || null;
    setActiveGeneration(foundGeneration);
    
    // Если есть generationUrl и модель загружена, скроллим к модификациям
    if (foundGeneration && model && !hasScrolled) {
      // Небольшая задержка для полной загрузки DOM
      setTimeout(() => {
        scrollToModifications();
        setHasScrolled(true); // Помечаем, что скролл уже выполнен
      }, 300);
    }
  }, [model, generationUrl]);

  // Функция для обновления URL без перезагрузки
  const updateGenerationUrl = (generation: CarGeneration) => {
    // Формируем правильный путь
    const newPath = `/service/${serviceUrl}/${model?.brand?.url}/${model?.url}/${generation.url}`;
    
    // Меняем URL без перезагрузки страницы
    window.history.replaceState(null, '', newPath);
  };

  // Функция для скролла к модификациям
  const scrollToModifications = () => {
    if (generationRef.current) {
      generationRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Обработчик выбора поколения
  const handleGenerationSelect = (generation: CarGeneration) => {
    setActiveGeneration(generation);
    updateGenerationUrl(generation);
    setTimeout(() => {
      scrollToModifications();
    }, 100);
  };

  // Слушаем кнопки назад/вперед
  useEffect(() => {
    const handlePopState = () => {
      const pathParts = window.location.pathname.split('/');
      const generationFromUrl = pathParts[pathParts.length - 1];
      const newGeneration = model?.generations.find(g => g.url === generationFromUrl);
      if (newGeneration) {
        setActiveGeneration(newGeneration);
        // При навигации назад/вперед тоже скроллим
        setTimeout(() => {
          scrollToModifications();
        }, 100);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [model]);

  // Формируем ссылки для хлебных крошек с учетом выбранного поколения
  const navigationLinks = [
    { href: `/service/${serviceUrl}`, title: model?.brand?.name || '' },
    { href: `/service/${serviceUrl}/${model?.brand?.url}`, title: model?.name || '' }
  ];

  // Добавляем ссылку на поколение, если оно выбрано
  if (activeGeneration && activeGeneration.name) {
    navigationLinks.push({
      href: `/service/${serviceUrl}/${model?.brand?.url}/${model?.url}/`,
      title: activeGeneration.name
    });
  }

  // Формируем заголовок с учетом поколения
  const pageTitle = activeGeneration && activeGeneration.name
    ? `${model?.brand?.name} ${model?.name} ${activeGeneration.name}`
    : `${model?.brand?.name} ${model?.name}`;

  if (loading) {
    return <div className="text-center py-8">Загрузка моделей...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <CatalogNavigation 
        title={pageTitle}
        links={navigationLinks}
      />
      
      <CarCatalogCarousel 
        activeGeneration={activeGeneration} 
        setActiveGeneration={handleGenerationSelect}
        model={model}
      />

      <div ref={generationRef}>
        <CarCatalogGeneration 
          serviceUrl={serviceUrl}
          activeGeneration={activeGeneration} 
          setActiveGeneration={setActiveGeneration} 
          model={model}
        />
      </div>
    </div>
  );
};