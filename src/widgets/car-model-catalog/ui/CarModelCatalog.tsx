'use client';

import { CarModel } from "@/entities/car-brand";
import { useCarModelCatalog } from "../model/useCarModelCatalog";
import Link from "next/link";
import { CarModelView } from "../../../entities/car-brand/ui/CarModelView";
import { useMemo } from "react";
import { SelectorPopular, typeSelectorPopular } from "../../../entities/car-brand/ui/SelectorPopular";
import { CatalogNavigation } from "@/features/ui/CatalogNavigation";

interface CarModelCatalogProps{
  brandId:number
}

export const CarModelCatalog = ({brandId}:CarModelCatalogProps) => {
  const { brand, popularModel, setPopularModel, search, setSearch, models:allModels, loading, error } = useCarModelCatalog(brandId);

  const filteredModels = useMemo(() => {
    if (!allModels) return [];
    
    let result = [...allModels];
    
    // Фильтрация по поиску
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(model => 
        model.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Фильтрация по популярности
    if (popularModel) {
      result = result.filter(model => model.status>=popularModel);
    }
    
    return result;
  }, [allModels, search, popularModel]);

  if (loading) {
    return <div className="text-center py-80 bg-gray-100 border-b-15 border-gray-200">Загрузка моделей...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="bg-gray-100 ">
      <div className="container px-4 mx-auto">
        <CatalogNavigation title={brand?.name} links={[{href:'/',title:brand?.name || ''}]}></CatalogNavigation>
        <div className='p-4 bg-white rounded-lg shadow-2xl border border-gray-200'>
          <SelectorPopular type={typeSelectorPopular.MODEL} search={search} setSearch={setSearch} popular={popularModel} setPopular={setPopularModel} searchList={filteredModels.map((model)=>model.name)}></SelectorPopular>
          {filteredModels?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Модели не найдены
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {filteredModels?.map((model: CarModel) => (
                <CarModelView 
                  key={model.id} 
                  brandName={brand?.name || ''} 
                  model={model}
                />
              ))}
            </div>
          )}
          </div>
      </div>
    </div>
  );
};