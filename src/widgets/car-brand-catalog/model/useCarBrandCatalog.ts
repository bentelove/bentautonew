import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchActiveCarBrands, type CarBrand } from '@/entities/car-brand';
import { fetchAllCarBrands, fetchCarBrands, fetchPopularCarBrands, fetchTestCarBrands } from '@/entities/car-brand/api/carBrandApi';

export const useCarBrandCatalog = (serviceUrl:string) => {
  const router = useRouter();
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [popularBrands,setPopularBrands] = useState<number>(0);
  const [search,setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeBrand,setTypeBrand] = useState<number>(2);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true);
        const data = await fetchCarBrands();
        // Сортируем по имени
        const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setBrands(sorted);
        setPopularBrands(2);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить марки');
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  const getBrandUrl = (brandUrl: string) => {
    return `/service/${serviceUrl}/${brandUrl}`;
  };

  return { brands, popularBrands,setPopularBrands, search, setSearch, loading, error, getBrandUrl, typeBrand, setTypeBrand };
};