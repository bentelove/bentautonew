import Link from "next/link";
import type { CarBrand } from "../model/carBrand.types";
import { BrandIcon } from './BrandIcon';

type BrandLinkVariant = 'catalog' | 'navigation' | 'compact';

interface BrandLinkProps {
  brand: CarBrand;
  href: string;
  variant?: BrandLinkVariant;
  showLogo?: boolean;
  showStatus?: boolean;
  countModels?: number | null;
}

export const BrandLink = ({ 
    brand, 
    href, 
    variant = 'catalog',
    showLogo = false,
    showStatus = false,
    countModels = null
}: BrandLinkProps) => {
    
    const getStyles = () => {
        switch (variant) {
            case 'catalog':
                return 'p-3 text-base font-medium';
            case 'navigation':
                return 'p-1 text-sm';
            case 'compact':
                return 'p-0.5 text-xs';
            default:
                return 'p-1';
        }
    };

    // Размер иконки в зависимости от варианта
    const getIconSize = () => {
        switch (variant) {
            case 'catalog':
                return 40;
            case 'navigation':
                return 24;
            case 'compact':
                return 20;
            default:
                return 24;
        }
    };

    return (
        <Link 
            className={`cursor-pointer rounded-4xl hover:bg-gray-100 flex gap-4 items-center text-gray-700 hover:text-gray-800 group ${getStyles()}`} 
            href={href}
        >
            {/* Логотип */}
            {showLogo && (
                <BrandIcon 
                    brand={brand} 
                    size={getIconSize()}
                    className="flex-shrink-0"
                />
            )}
            
            {/* Контент */}
            <div className={`flex-1 ${!showLogo && 'ml-4'}`}>
                <div>
                    {showStatus && brand.status === 2 && (
                        <>
                            <span className="font-bold">{brand.name}</span>
                            <span className="ml-1 text-xs text-yellow-600">★</span>
                        </>
                    )}
                    {(!showStatus || brand.status !== 2) && brand.name}
                </div>
                {countModels && (
                    <div className="text-xs text-gray-400 group-hover:text-gray-600">
                        {countModels} моделей
                    </div>
                )}
            </div>
        </Link>
    );
};