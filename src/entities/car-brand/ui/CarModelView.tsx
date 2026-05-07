'use client';

import { CarModel } from "@/entities/car-brand";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface props {
    brandName: string;
    model: CarModel;
}

export const CarModelView = ({ brandName, model }: props) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    
    // Фильтруем пустые изображения
    const validImages = model.images.filter(img => img && img.trim() !== '').reverse();
    
    // Автоматическое переключение изображений
    useEffect(() => {
        // Запускаем автопереключение только если есть изображения и мы не наводим на компонент
        if (validImages.length > 1 && !isHovering) {
            intervalRef.current = setInterval(() => {
                setActiveImageIndex((prevIndex) => (prevIndex + 1) % validImages.length);
            }, 8000); 
        }
        
        // Очищаем интервал при размонтировании или когда наводим курсор
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [validImages.length, isHovering]);
    
    // Если нет изображений, показываем заглушку
    if (validImages.length === 0) {
        return (
            <Link href={`/model/${model.id}`} className="border border-white hover:border-gray-200 hover:bg-gray-100 p-2 cursor-pointer rounded-lg">
                <div className="relative h-35 w-full">
                    <Image 
                        src={'https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1652787845/lmcode/DLZGMi6I6U-l-DH6pf0JnQ/90384094.jpg'} 
                        alt={`${brandName} ${model.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        className="object-cover transition-opacity duration-200"
                    />
                </div>
                <div className="py-2">{brandName} {model.name}</div>
            </Link>
        );
    }

    // Обработчики наведения на зоны
    const handleZoneHover = (index: number) => {
        setIsHovering(true);
        setActiveImageIndex(index);
    };

    const handleReset = () => {
        setIsHovering(false);
        setActiveImageIndex(0);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setActiveImageIndex(0);
    };

    return (
        <Link href={`/model/${model.id}`} className="group border border-white hover:border-gray-200 hover:bg-gray-100 p-2 cursor-pointer rounded-lg">
            {/* Контейнер с изображением и зонами */}
            <div 
                className="relative rounded-lg overflow-hidden bg-gray-100"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Изображение */}
                <div className="relative h-35 w-full">
                    <Image 
                        src={validImages[activeImageIndex]} 
                        alt={`${brandName} ${model.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        className="object-cover transition-opacity duration-200"
                        priority={activeImageIndex === 0}
                    />
                </div>

                {/* Зоны наведения */}
                <div className="absolute inset-0 flex">
                    {validImages.map((_, index) => (
                        <div
                            key={index}
                            className="flex-1 h-full cursor-pointer"
                            onMouseEnter={() => handleZoneHover(index)}
                        />
                    ))}
                </div>

                {/* Индикатор активной зоны с прогрессом */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm">
                    {validImages.map((_, index) => (
                        <div
                            key={index}
                            className="relative"
                        >
                            <div
                                className={`h-1 rounded-full transition-all duration-200 ${
                                    activeImageIndex === index 
                                        ? 'w-4 bg-white' 
                                        : 'w-1.5 bg-white/50'
                                }`}
                            />
                            {/* Анимация прогресса для активного индикатора */}
                            {activeImageIndex === index && !isHovering && validImages.length > 1 && (
                                <div 
                                    className="absolute top-0 left-0 h-1 rounded-full bg-white/80"
                                    style={{
                                        width: '100%',
                                        animation: `progress ${3000}ms linear infinite`
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-2 font-medium">{brandName} {model.name}</div>

            {/* Добавляем CSS анимацию */}
            <style jsx>{`
                @keyframes progress {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
            `}</style>
        </Link>
    );
};