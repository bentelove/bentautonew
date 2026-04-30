import { useState, useEffect } from 'react';
import { CarBrand } from '@/entities/car-brand';
import { fetchCarBrand } from '@/entities/car-brand/api/carBrandApi';

export const useCarModelCatalog = (brandId:number | null) => {
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
            setBrand(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить марки');
        } finally {
            setLoading(false);
        }
        };
        loadBrands();
    }

  }, [brandId]);

  const getBrandUrl = (brandId: number) => {
    return `/brand/${brandId}`;
  };

  return { brand, popularModel, setPopularModel, search,setSearch, models:brand?.model || [], loading, error};
};