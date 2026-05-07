'use client';
import { SelectorPopular, typeSelectorPopular } from '@/entities/car-brand/ui/SelectorPopular';
import { useCarBrandCatalog } from '../model/useCarBrandCatalog';
import {BrandLink, CarBrand} from '@/entities/car-brand/';
import { useEffect, useMemo, useState } from 'react';
import { CatalogNavigation } from '@/features/ui/CatalogNavigation';

interface CarBrandCatalogProps{
  serviceName?:string
}

export const CarBrandCatalog = ({serviceName}:CarBrandCatalogProps) => {
  const { brands:allBrands, search, setSearch, popularBrands, setPopularBrands, loading, error, getBrandUrl } = useCarBrandCatalog();

  const filteredBrands = useMemo(() => {
      if (!allBrands) return [];
      
      let result = [...allBrands];
      
      // Фильтрация по поиску
      if (search.trim()) {
        const searchLower = search.toLowerCase();
        result = result.filter(model => 
          model.name.toLowerCase().includes(searchLower)
        );
      }
      
      if (popularBrands==2) {
        result = result.filter(brand => brand.status==2);
        if(result.length==0){
          setPopularBrands(1);
        }
      }
      if (popularBrands==1) {
        result = result.filter(brand => brand.status>0);
        if(result.length==0){
          setPopularBrands(0);
        }
      }
      
      return result;
    }, [allBrands,search, popularBrands]);
  

  if (loading) {
    return <div className="text-center py-80 bg-gray-100 border-b-15 border-gray-200">Загрузка марок...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }
  return (
    <div className='pb-12'>
      <CatalogNavigation serviceName={serviceName}></CatalogNavigation>
      <div className='p-4 bg-white rounded-lg shadow-2xl border border-gray-200'>
        <SelectorPopular type={typeSelectorPopular.BRAND} search={search} setSearch={setSearch} popular={popularBrands} setPopular={setPopularBrands} searchList={filteredBrands.map(brand=>brand.name)}></SelectorPopular>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {filteredBrands.map((brand) => (
            <BrandLink
                key={brand.id}
                brand={brand}
                variant='catalog'
                showLogo={true}
                showStatus={popularBrands<2}
                countModels={brand.countModel}
                href={getBrandUrl(brand.id)}
            />
            ))}
        </div>
      </div>
    </div>
  );
};