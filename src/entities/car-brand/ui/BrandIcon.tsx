'use client';

import { useBrandIcon } from '@/shared/lib';
import type { CarBrand } from '../model/carBrand.types';

interface BrandIconProps {
    brand: CarBrand;
    size?: number;
    className?: string;
    fallback?: React.ReactNode;
    hideOnError?: boolean; // если true — не показывать ничего при ошибке
}

export const BrandIcon = ({ 
    brand, 
    size = 24, 
    className = '',
    fallback,
    hideOnError = true  // ← по умолчанию скрываем при ошибке
}: BrandIconProps) => {
    const { iconPath, loading, error } = useBrandIcon(brand.name);

    // Загрузка — показываем пульсирующий блок
    if (loading) {
        return fallback ? <>{fallback}</> : (
            <div 
                style={{ width: size, height: size }} 
                className={`bg-gray-200 rounded-full animate-pulse ${className}`}
            />
        );
    }

    // Ошибка или нет иконки — ничего не показываем
    if (error || !iconPath) {
        if (hideOnError) {
            return null; // ← ничего не показываем
        }
        
        return fallback ? <>{fallback}</> : null;
    }

    return (
        <img 
            src={iconPath} 
            alt={brand.name}
            width={size}
            height={size}
            className={`object-contain ${className}`}
            onError={(e) => {
                // Если картинка не загрузилась — скрываем
                e.currentTarget.style.display = 'none';
            }}
        />
    );
};