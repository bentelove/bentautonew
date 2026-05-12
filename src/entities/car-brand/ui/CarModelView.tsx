'use client';

import { CarBrand, CarModel } from "@/entities/car-brand";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface props {
    brand: CarBrand;
    model: CarModel;
    serviceUrl:string;
}

export const CarModelView = ({ brand, model,serviceUrl='all' }: props) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [progress, setProgress] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const animationRef = useRef<NodeJS.Timeout | null>(null);
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
    
    // Фильтруем пустые изображения
    const validImages = model.images.filter(img => img && img.trim() !== '').reverse();
    
    // Минимальное расстояние для свайпа
    const minSwipeDistance = 50;
    
    // Проверка на мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);
    
    // Если нет изображений, показываем заглушку
    if (validImages.length === 0) {
        return (
            <Link href={`/service/${serviceUrl}/${brand?.url}/${model.url}`} className="block border border-white hover:border-gray-200 hover:bg-gray-100 p-2 cursor-pointer rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                    <Image 
                        src={'https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1652787845/lmcode/DLZGMi6I6U-l-DH6pf0JnQ/90384094.jpg'} 
                        alt={`${brand?.name} ${model.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        className="object-cover transition-opacity duration-200"
                    />
                </div>
                <div className="py-2 truncate">{brand?.name} {model.name}</div>
            </Link>
        );
    }

    // Переключение на следующее изображение
    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % validImages.length);
        resetProgress();
    };

    // Переключение на предыдущее изображение
    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
        resetProgress();
    };

    // Остановка анимации прогресса
    const stopProgressAnimation = () => {
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }
        if (animationRef.current) {
            clearTimeout(animationRef.current);
            animationRef.current = null;
        }
        setProgress(0);
    };

    // Остановка автопрокрутки
    const stopAutoScroll = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
            autoScrollRef.current = null;
        }
    };

    // Запуск автопрокрутки для мобильных
    const startAutoScroll = () => {
        if (!isMobile) return;
        if (validImages.length <= 1) return;
        
        stopAutoScroll();
        autoScrollRef.current = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % validImages.length);
        }, 3000);
    };

    // Сброс прогресса
    const resetProgress = () => {
        stopProgressAnimation();
        if (isHovering && !isMobile) {
            startProgressAnimation(3000);
        }
        if (isMobile) {
            stopAutoScroll();
            startAutoScroll();
        }
    };

    // Запуск анимации прогресса (только для десктопа)
    const startProgressAnimation = (duration: number) => {
        if (!isHovering || isMobile) return;
        stopProgressAnimation();
        startTimeRef.current = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);
            
            if (newProgress < 100) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                nextImage();
                startProgressAnimation(duration);
            }
        };
        
        frameRef.current = requestAnimationFrame(animate);
    };

    // Обработчики свайпов
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
        if (isMobile) {
            stopAutoScroll();
        }
        if (isHovering && !isMobile) {
            stopProgressAnimation();
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            if (isMobile && validImages.length > 1) {
                startAutoScroll();
            }
            return;
        }
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
        
        if (isMobile && validImages.length > 1) {
            startAutoScroll();
        }
        
        if (isHovering && !isMobile) {
            startProgressAnimation(3000);
        }
        
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleZoneHover = (index: number) => {
        if (!isHovering || isMobile) return;
        setActiveImageIndex(index);
        resetProgress();
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (!isMobile) {
            startProgressAnimation(3000);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (!isMobile) {
            stopProgressAnimation();
        }
    };

    useEffect(() => {
        if (isMobile && validImages.length > 1) {
            startAutoScroll();
        }
        
        return () => {
            stopProgressAnimation();
            stopAutoScroll();
        };
    }, [isMobile, validImages.length]);

    return (
        <Link href={`/service/${serviceUrl}/${brand?.url}/${model.url}`} className="block group border border-white hover:border-gray-200 hover:bg-gray-100 cursor-pointer rounded-lg overflow-hidden">
            <div 
                className="relative rounded-lg overflow-hidden bg-gray-100"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="relative aspect-[4/3] w-full">
                    <Image 
                        src={validImages[activeImageIndex]} 
                        alt={`${brand?.name} ${model.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                        className="object-cover transition-opacity duration-200"
                        priority={activeImageIndex === 0}
                        draggable={false}
                    />
                </div>

                {isHovering && validImages.length > 1 && !isMobile && (
                    <div className="absolute inset-0 hidden md:flex">
                        {validImages.map((_, index) => (
                            <div
                                key={index}
                                className="flex-1 h-full cursor-pointer"
                                onMouseEnter={() => handleZoneHover(index)}
                            />
                        ))}
                    </div>
                )}

                {validImages.length > 1 && isMobile && (
                    <>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-all z-10"
                            aria-label="Предыдущее фото"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-all z-10"
                            aria-label="Следующее фото"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {isHovering && validImages.length > 1 && !isMobile && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hidden md:flex gap-1.5 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm">
                        {validImages.map((_, index) => (
                            <div key={index} className="relative w-4 h-1">
                                <div
                                    className={`h-full rounded-full transition-all duration-200 ${
                                        activeImageIndex === index 
                                            ? 'bg-white' 
                                            : 'bg-white/50'
                                    }`}
                                />
                                {activeImageIndex === index && (
                                    <div 
                                        className="absolute top-0 left-0 h-full rounded-full bg-yellow-400"
                                        style={{
                                            width: `${progress}%`,
                                            transition: progress === 0 ? 'none' : 'width linear'
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {validImages.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 rounded-full px-2 py-0.5 backdrop-blur-sm z-10">
                        <span className="text-white text-xs">
                            {activeImageIndex + 1} / {validImages.length}
                        </span>
                    </div>
                )}

                {validImages.length > 1 && isMobile && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                        {validImages.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-200 ${
                                    activeImageIndex === index 
                                        ? 'w-4 bg-white' 
                                        : 'w-1.5 bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="p-2 font-medium truncate">{brand?.name} {model.name}</div>
        </Link>
    );
};