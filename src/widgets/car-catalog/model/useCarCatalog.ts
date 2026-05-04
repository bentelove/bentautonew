import { useState, useEffect } from 'react';
import { CarModel } from '@/entities/car-brand';
import { fetchCarModel } from '@/entities/car-brand/api/carBrandApi';



export const useCarModelCatalog = (modelId:number | null) => {
  const [model, setModel] = useState<CarModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    if(modelId){
        const loadBrands = async () => {
        try {
            setLoading(true);
            let data = await fetchCarModel(modelId);
            setModel({
              ...data,
              generations:data.generations
              .sort((gen1,gen2)=> gen2.startYear - gen1.startYear)
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить марки');
        } finally {
            setLoading(false);
        }
        };
        loadBrands();
    }

  }, [modelId]);

  return { model, year, setYear, loading, error};
};