'use client';

import { CarModel } from "@/entities/car-brand";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarGeneration } from "@/entities/car-brand/model/carBrand.types";
import Image from "next/image";

interface CarCatalogCarouselProps {
    activeGeneration: CarGeneration | null;
    setActiveGeneration: (activeGeneration:CarGeneration)=>void;
    model: CarModel | null;
}

export const CarCatalogCarousel = ({activeGeneration,setActiveGeneration,model }: CarCatalogCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    breakpoints: {
      '(max-width: 768px)': {
        align: 'center',
      }
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Прокрутка к выбранному элементу
  useEffect(() => {
    if (emblaApi && activeGeneration && model?.generations) {
      const activeIndex = model.generations.findIndex(gen => gen.id === activeGeneration.id);
      if (activeIndex !== -1) {
        emblaApi.scrollTo(activeIndex, true);
      }
    }
  }, [emblaApi, activeGeneration, model]);

  if (!model) return null;

  return (
    <div className="relative bg-white rounded-lg border border-gray-200 mb-4">
      <h2 className="text-xl font-bold p-4 pb-0">Выберите Ваш {model.brand?.name} {model.name}</h2>
      
      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex">
          {model.generations.map((gen) => (
            <div
              key={gen.id}
              onClick={() => setActiveGeneration(gen)}
              className="cursor-pointer flex-[0_0_280px] md:flex-[0_0_300px] min-w-0 mx-2 transition-transform duration-300 hover:scale-105"
            >
              <div className={`rounded-lg transition-all border-2 ${
                activeGeneration?.id === gen.id 
                  ? 'border-red-500 bg-red-50 shadow-lg' 
                  : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md'
              }`}>
                <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                  {gen.image && (
                    <Image 
                      src={gen.image}
                      alt={`${model.brand?.name} ${model.name} ${gen.name}`}
                      className="object-cover rounded-t-lg"
                      fill
                      sizes="(max-width: 768px) 280px, 300px"
                    />
                  )}
                  {!gen.image && (
                    <Image 
                      src={'https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1652787845/lmcode/DLZGMi6I6U-l-DH6pf0JnQ/90384094.jpg'}
                      alt={`${model.brand?.name} ${model.name} ${gen.name}`}
                      className="object-cover rounded-t-lg"
                      fill
                      sizes="(max-width: 768px) 280px, 300px"
                    />
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className={`${activeGeneration?.id === gen.id ? 'text-xl' : 'text-lg'} font-semibold transition-all duration-300`}>
                    {model.brand?.name} {model.name}
                  </h3>
                  <p className={`text-gray-600 ${activeGeneration?.id === gen.id ? 'text-sm' : 'text-xs'} transition-all duration-300`}>
                    {gen.name}
                  </p>
                  {activeGeneration?.id === gen.id && (
                    <div className="mt-2">
                      <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Выбран
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки навигации */}
      {emblaApi && model.generations.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10"
            aria-label="Предыдущее поколение"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10"
            aria-label="Следующее поколение"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </>
      )}
    </div>
  );
};