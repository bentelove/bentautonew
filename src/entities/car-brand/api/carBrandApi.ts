import { apiClient, API_ENDPOINTS } from '@/shared/api';
import type { CarBrand, CarBrandsResponse, CarGeneration, CarModel } from '../model/carBrand.types';

export const fetchCarBrands = async (): Promise<CarBrand[]> => {
  return apiClient.get(API_ENDPOINTS.CAR_BRANDS);
};

export const fetchAllCarBrands = async (): Promise<CarBrand[]> => {
  const brands = await fetchCarBrands();
  return brands;
};
export const fetchActiveCarBrands = async (): Promise<CarBrand[]> => {
  const brands = await fetchCarBrands();
  return brands.filter(brand => brand.status !== 0);
};
export const fetchPopularCarBrands = async (): Promise<CarBrand[]> => {
  let brands = await fetchCarBrands();


  return brands.filter(brand => brand.status == 2);
};
export const fetchTestCarBrands = async (type:number): Promise<CarBrand[]> => { //Тестовое API с использованием подменного количества моделей и логотипов
  let brands = await fetchCarBrands();

  return brands.map(brand => {
    const count = Math.floor(Math.random()*100);
    const logo = (Math.random()>0.7?'ff':null)
    return {...brand,countModel:count,logo:logo}
  });
};
export const fetchCarBrand = async (brandId:number): Promise<CarBrand> => {
    return apiClient.get(API_ENDPOINTS.CAR_BRAND+brandId);
}
export const fetchCarModel = async (modelId: number): Promise<CarModel> =>{
  return apiClient.get(API_ENDPOINTS.CAR_MODEL+modelId+'');
}
export const fetchCarGeneration = async (generationId: number): Promise<CarGeneration> =>{
  return apiClient.get(API_ENDPOINTS.CAR_GENERATION+generationId+'');
}