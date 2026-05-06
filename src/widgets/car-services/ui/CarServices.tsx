'use client';

import { CarModel } from "@/entities/car-brand";
import Link from "next/link";
import { CarModelView } from "../../../entities/car-brand/ui/CarModelView";
import { useMemo } from "react";
import { SelectorPopular, typeSelectorPopular } from "../../../entities/car-brand/ui/SelectorPopular";
import { CatalogNavigation } from "@/features/ui/CatalogNavigation";
import { useCarServicesCatalog } from "../model/useCarServices";
import Image from "next/image";

interface CarModelCatalogProps{
  modificationId:number
}

export const CarServices = ({modificationId}:CarModelCatalogProps) => {
    const {modification,loading,error} = useCarServicesCatalog(modificationId);

  if (loading) {
    return <div className="text-center py-80 bg-gray-100 border-b-15 border-gray-200">Загрузка моделей...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="bg-gray-100 ">
      <div className="container px-4 mx-auto py-8">

        <CatalogNavigation 
            title={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`} 
            links={
                [
                    {href:'/',title:modification?.generation?.model?.brand?.name || ''},
                    {href:'/brand/'+modification?.generation?.model?.brand?.id,title:modification?.generation?.model?.name || ''},
                    {href:'/model/'+modification?.generation?.model?.id,title:modification?.generation?.name || ''},
                    {href:'/model/'+modification?.generation?.model?.id,title:modification?.name || ''}
                ]}
        >
         </CatalogNavigation>
        <div className="flex gap-4">
            <div className="flex-1">
                {modification?.generation?.image&&<Image className="rounded-lg" width={400} height={300} alt={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`}  src={modification.generation.image} ></Image>}
            </div>
            <div className="flex-3"><h2 className="text-lg">Услуги для {`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name} ${modification?.generation?.name} ${modification?.name}`}</h2></div>
        </div>
      </div>
    </div>
  );
};