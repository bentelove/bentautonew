import { useState, useEffect } from 'react';
import { fetchCarModification } from '@/entities/car-brand/api/carBrandApi';
import { CarModification } from '@/entities/car-brand/model/carBrand.types';



export const useCarServicesCatalog = (modificationId:number | null) => {
  const [modification, setModification] = useState<CarModification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if(modificationId){
        const loadBrands = async () => {
        try {
            setLoading(true);
            let data = await fetchCarModification(modificationId);
            setModification(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить марки');
        } finally {
            setLoading(false);
        }
        };
        loadBrands();
    }

  }, [modificationId]);

  return { modification, loading, error};
};