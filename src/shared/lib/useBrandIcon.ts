'use client';

import { useState, useEffect } from 'react';

// Маппинг названий брендов из API на имена файлов в библиотеке
const brandToFileName: Record<string, string> = {
    // Европейские бренды
    'Audi': 'audi.svg',
    'BMW': 'bmw.svg',
    'Volkswagen': 'volkswagen.svg',
    'Mercedes-Benz': 'mercedes-benz.svg',
    'Porsche': 'porsche.svg',
    'Opel': 'opel.svg',
    'Peugeot': 'peugeot.svg',
    'Citroen': 'citroen.svg',
    'Renault': 'renault.svg',
    'Skoda': 'skoda.svg',
    'Volvo': 'volvo.svg',
    'Fiat': 'fiat.svg',
    'Alfa Romeo': 'alfa-romeo.svg',
    'Ferrari': 'ferrari.svg',
    'Lamborghini': 'lamborghini.svg',
    'Maserati': 'maserati.svg',
    'Jaguar': 'jaguar.svg',
    'Land Rover': 'land-rover.svg',
    'Aston Martin': 'aston-martin.svg',
    'Bentley': 'bentley.svg',
    'Rolls-Royce': 'rolls-royce.svg',
    'Mini': 'mini.svg',
    'Smart': 'smart.svg',
    
    // Японские бренды
    'Toyota': 'toyota.svg',
    'Honda': 'honda.svg',
    'Nissan': 'nissan.svg',
    'Mazda': 'mazda.svg',
    'Subaru': 'subaru.svg',
    'Mitsubishi': 'mitsubishi.svg',
    'Suzuki': 'suzuki.svg',
    'Lexus': 'lexus.svg',
    'Infiniti': 'infiniti.svg',
    
    // Корейские бренды
    'Hyundai': 'hyundai.svg',
    'Kia': 'kia.svg',
    'Genesis': 'genesis.svg',
    
    // Американские бренды
    'Ford': 'ford.svg',
    'Chevrolet': 'chevrolet.svg',
    'Cadillac': 'cadillac.svg',
    'Jeep': 'jeep.svg',
    'Dodge': 'dodge.svg',
    'Chrysler': 'chrysler.svg',
    'Tesla': 'tesla.svg',
    
    // Китайские бренды
    'Geely': 'geely.svg',
    'Chery': 'chery.svg',
    'Great Wall': 'great-wall.svg',
    'BYD': 'byd.svg',
    'Haval': 'haval.svg',
    'Changan': 'changan.svg',
    'GAC': 'gac.svg',
    'Lifan': 'lifan.svg',
    'Zotye': 'zotye.svg',
    'Baic': 'baic.svg',
    'Brilliance': 'brilliance.svg',
    'Dongfeng': 'dongfeng.svg',
    'Foton': 'foton.svg',
    'JAC': 'jac.svg',
    
    // Русские бренды
    'ВАЗ (LADA)': 'lada.svg',
    'LADA': 'lada.svg',
    'ГАЗ': 'gaz.svg',
    'УАЗ': 'uaz.svg',
    'Москвич': 'moskvich.svg',
    
    // Другие
    'SEAT': 'seat.svg',
    'Cupra': 'cupra.svg',
    'DS': 'ds.svg',
    'Dacia': 'dacia.svg',
    'Alpine': 'alpine.svg',
};

// Альтернативные названия брендов
const brandAliases: Record<string, string> = {
    'HAVAL': 'Haval',
    'OMODA': 'Chery', // OMODA использует логотип Chery
    'Bestune': 'Bestune',
    'Belgee': 'Belgee',
    'Changan': 'Changan',
    'Chery': 'Chery',
    'Geely': 'Geely',
    'Volvo': 'Volvo',
    'Skoda': 'Skoda',
    'Opel': 'Opel',
    'Peugeot': 'Peugeot',
    'Citroen': 'Citroen',
    'Renault': 'Renault',
    'Hyundai': 'Hyundai',
    'Kia': 'Kia',
    'Ford': 'Ford',
    'Chevrolet': 'Chevrolet',
    'Nissan': 'Nissan',
    'Honda': 'Honda',
    'Toyota': 'Toyota',
    'Mazda': 'Mazda',
    'Subaru': 'Subaru',
    'Mitsubishi': 'Mitsubishi',
    'Suzuki': 'Suzuki',
    'Lexus': 'Lexus',
    'BMW': 'BMW',
    'Audi': 'Audi',
    'Mercedes-Benz': 'Mercedes-Benz',
    'Porsche': 'Porsche',
    'Volkswagen': 'Volkswagen',
    'Land Rover': 'Land Rover',
    'Jaguar': 'Jaguar',
    'Tesla': 'Tesla',
    'Mini': 'Mini',
    'Smart': 'Smart',
    'Fiat': 'Fiat',
    'Alfa Romeo': 'Alfa Romeo',
    'Maserati': 'Maserati',
    'Lamborghini': 'Lamborghini',
    'Ferrari': 'Ferrari',
    'Bentley': 'Bentley',
    'Rolls-Royce': 'Rolls-Royce',
    'Aston Martin': 'Aston Martin',
    'Cadillac': 'Cadillac',
    'Jeep': 'Jeep',
    'Dodge': 'Dodge',
    'Chrysler': 'Chrysler',
    'Genesis': 'Genesis',
    'Infiniti': 'Infiniti',
    'BYD': 'BYD',
    'Great Wall': 'Great Wall',
    'GAC': 'GAC',
    'JAC': 'JAC',
    'Brilliance': 'Brilliance',
    'Dongfeng': 'Dongfeng',
    'Foton': 'Foton',
    'Lifan': 'Lifan',
    'Zotye': 'Zotye',
    'Baic': 'Baic',
    'SEAT': 'SEAT',
    'Cupra': 'Cupra',
    'DS': 'DS',
    'Dacia': 'Dacia',
    'Alpine': 'Alpine',
    'LADA': 'LADA',
    'ВАЗ (LADA)': 'LADA',
    'ГАЗ': 'GAZ',
    'УАЗ': 'UAZ',
    'Москвич': 'Moskvich',
};

export const useBrandIcon = (brandName: string) => {
    const [iconPath, setIconPath] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!brandName) {
            setLoading(false);
            return;
        }

        try {
            // Получаем нормализованное имя бренда
            const normalizedName = brandAliases[brandName] || brandName;
            const fileName = brandToFileName[normalizedName];
            
            if (fileName) {
                // Путь к файлу в папке public
                setIconPath(`/images/brands/${fileName}`);
            } else {
                console.warn(`Логотип для бренда "${brandName}" не найден`);
            }
            
            setLoading(false);
        } catch (err) {
            console.error(`Ошибка загрузки логотипа для ${brandName}:`, err);
            setError(err instanceof Error ? err : new Error('Unknown error'));
            setLoading(false);
        }
    }, [brandName]);

    return { iconPath, loading, error };
};