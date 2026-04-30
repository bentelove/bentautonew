'use client';

import { CarModel } from "@/entities/car-brand";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from "react";
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
    align: 'start',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!model) return null;

  return (
    <div className="relative bg-white p-4 rounded-lg border border-gray-200 mb-4 ">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 ">
          {model.generations.map((gen) => (
            <div
              key={gen.id}
              onClick={()=>{setActiveGeneration(gen)}}
              className={`cursor-pointer flex-[0_0_300px] min-w-0 rounded-lg transition-shadow transition-bg border ${(activeGeneration?.id===gen.id?' border-gray-200 bg-gray-100':"border-white")} `}
            >
                {gen.image&&
                    <Image 
                        src={gen.image}
                        alt={`${model.brand?.name} ${model.name} ${gen.name}`}
                        className="object-cover rounded-t-lg"
                        width={300}
                        height={150}
                    />
                }
                {!gen.image&&
                    <div className="py-20 bg-gradient-to-tr from-gray-200 from-0% to-gray-50 rounded-t-lg">
                        <div className="text-xs text-center text-gray-400">Изображение отсутствует</div>
                    </div>
                }
                
                <div className="p-4">
                    <h3 className={`${(activeGeneration?.id===gen.id?'text-2xl':"text-lg")} font-semibold`}>
                        {model.brand?.name} {model.name}
                    </h3>
                    <p className={`text-gray-600 ${(activeGeneration?.id===gen.id?'text-lg':"text-xs")}`}>{gen.name}</p>
                    {activeGeneration?.id===gen.id&&<div className="text-rose-700 font-bold text-xs">Выбран</div>}
                </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute -left-12 cursor-pointer top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute -right-12 cursor-pointer top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-200"
      >
        <ChevronRight className="w-5 h-5 " />
      </button>
    </div>
  );
};