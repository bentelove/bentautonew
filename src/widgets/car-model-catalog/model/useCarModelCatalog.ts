import { useState, useEffect } from 'react';
import { CarBrand, CarModel } from '@/entities/car-brand';
import { fetchCarBrand, fetchCarBrandByUrl } from '@/entities/car-brand/api/carBrandApi';

export const useCarModelCatalog = (brandId?:number,brandUrl?:string,serviceUrl:string='all') => {
  const [brand, setBrand] = useState<CarBrand | null>(null);
  const [popularModel,setPopularModel] = useState<number>(2);
  const [search,setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(brandId){
        const loadBrands = async () => {
        try {
            setLoading(true);
            const data = await fetchCarBrand(brandId);
            setBrand(
              {
                ...data,
                model: data.model.map((model:CarModel)=>({...model,images:model.images.filter((image:string)=>(image && image.trim()!==''))}))
              }
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить марки');
        } finally {
            setLoading(false);
        }
        };
        loadBrands();
    }
    if(brandUrl){
        const loadBrands = async () => {
        try {
            setLoading(true);
            const data = await fetchCarBrandByUrl(brandUrl);
            setBrand(
              {
                ...data,
                model: data.model.map((model:CarModel)=>({...model,images:model.images.filter((image:string)=>(image && image.trim()!==''))}))
              }
            );
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить марки');
        } finally {
            setLoading(false);
        }
        };
        loadBrands();
    }

  }, [brandId,brandUrl]);


  const getModelUrl = (brandUrl: string,modelUrl:string) => {
    return `/service/${serviceUrl}/${brandUrl}`;
  };

  return { brand, popularModel, setPopularModel, search,setSearch, models:brand?.model || [],getModelUrl, loading, error};
};