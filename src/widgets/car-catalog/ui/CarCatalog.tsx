'use client';

import { CarModel } from "@/entities/car-brand";
import { useCarModelCatalog } from "../model/useCarCatalog";
import Link from "next/link";
import { CarModelView } from "../../../entities/car-brand/ui/CarModelView";
import { useEffect, useMemo, useState } from "react";
import { SelectorPopular, typeSelectorPopular } from "../../../entities/car-brand/ui/SelectorPopular";
import { CarCatalogGeneration } from "./CarCatalogGeneration";
import { CarCatalogCarousel } from "./CarCatalogCarousel";
import { CarGeneration } from "@/entities/car-brand/model/carBrand.types";
import { CatalogNavigation } from "@/features/ui/CatalogNavigation";

interface CarModelCatalogProps{
  modelId:number
}

export const CarCatalog = ({modelId}:CarModelCatalogProps) => {
  const { model, year, setYear, loading, error } = useCarModelCatalog(modelId);
  const [activeGeneration,setActiveGeneration] = useState<CarGeneration | null>(null)

  useEffect(()=>{
    setActiveGeneration(model?.generations[0] || null)
  },[model])


  if (loading) {
    return <div className="text-center py-8">Загрузка моделей...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <CatalogNavigation links={[{href:'/',title:model?.brand?.name || ''},{href:'/brand/'+model?.brand?.id,title:model?.name || ''}]}></CatalogNavigation>
      <CarCatalogCarousel activeGeneration={activeGeneration} setActiveGeneration={setActiveGeneration} model={model}></CarCatalogCarousel>

      <CarCatalogGeneration activeGeneration={activeGeneration} setActiveGeneration={setActiveGeneration} model={model}></CarCatalogGeneration>
    </div>
  );
};