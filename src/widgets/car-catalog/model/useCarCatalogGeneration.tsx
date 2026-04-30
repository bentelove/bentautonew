import { fetchCarBrand, fetchCarGeneration } from "@/entities/car-brand/api/carBrandApi";
import { CarGeneration, CarModification } from "@/entities/car-brand/model/carBrand.types";
import { useEffect, useState } from "react";




export const useCarGenerationCatalog = (generationId:number | null) => {
  const [generation, setGeneration] = useState<CarGeneration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setGeneration(null);
    if(generationId){
        const loadBrands = async () => {
        try {
            setLoading(true);
            let data = await fetchCarGeneration(generationId);
            setGeneration({
              ...data,
              modifications:data.modifications
              .sort((gen1,gen2)=> gen1.enginePower - gen2.enginePower)
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось загрузить марки');
        } finally {
            setLoading(false);
        }
        };
        loadBrands();
    }

  }, [generationId]);

  return { generation, loading, error};
};