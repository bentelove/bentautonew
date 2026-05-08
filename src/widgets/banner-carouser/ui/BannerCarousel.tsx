'use client';

import { useState, useEffect } from 'react';

export type BannerSlide = {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
  customContent?: React.ReactNode;
};

type BannerCarouselProps = {
  slides: BannerSlide[];
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
};

export const BannerCarousel = ({ 
  slides, 
  autoPlayInterval = 10000,
  showDots = true,
  showArrows = true
}: BannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Баннер с фоном и изображением */}
      <div 
        className={`relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center transition-all duration-500`}
        style={{ 
          backgroundColor: currentSlide.bgColor || '#1a1a2e',
          backgroundImage: `url(${currentSlide.imageUrl})`,
        }}
      >
        {/* Оверлей для читаемости текста */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Контент баннера */}
        <div className="relative z-10 container px-4 mx-auto h-full flex items-center">
          <div className={`max-w-2xl ${currentSlide.textColor || 'text-white'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {currentSlide.title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-4">
              {currentSlide.subtitle}
            </p>
            {currentSlide.description && (
              <p className="text-base md:text-lg mb-6 opacity-90">
                {currentSlide.description}
              </p>
            )}
            {currentSlide.customContent && (
              <div className="mb-6">
                {currentSlide.customContent}
              </div>
            )}
            {currentSlide.buttonText && (
              <a
                href={currentSlide.buttonLink || '#'}
                className={`inline-block px-6 py-3 rounded-lg font-semibold transition duration-300 hover:scale-105 ${
                  currentSlide.accentColor || 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {currentSlide.buttonText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Стрелки навигации */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300 z-20"
            aria-label="Предыдущий слайд"
          >
            ❮
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300 z-20"
            aria-label="Следующий слайд"
          >
            ❯
          </button>
        </>
      )}

      {/* Dots (индикаторы) */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-red-600'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};