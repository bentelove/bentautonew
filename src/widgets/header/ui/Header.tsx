'use client';

import Link from 'next/link';
import { useHeader } from '../model/useHeader';
import { HeaderMenu } from './HeaderMenu';
import { Search } from './Search';
import { WorkMenu } from './WorkMenu';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const { show, setShow } = useHeader();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const bottomMenuRef = useRef<HTMLDivElement>(null);
  
  // Состояния для свайпа
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1038);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Проверяем, показывали ли подсказку
    const hintShown = localStorage.getItem('swipeHintShown');
    if (!hintShown && isMobile) {
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('swipeHintShown', 'true');
      }, 5000);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Глобальные обработчики свайпа
  useEffect(() => {
    if (!isMobile) return;

    const handleGlobalTouchStart = (e: TouchEvent) => {
      const touchX = e.targetTouches[0].clientX;
      const touchY = e.targetTouches[0].clientY;
      const windowWidth = window.innerWidth;
      
      // Проверяем, что свайп начался в правой части экрана (последние 50px)
      // и меню закрыто
      if (touchX > windowWidth - 50 && !isMobileMenuOpen) {
        setTouchStartX(touchX);
        setTouchStartY(touchY);
        setIsSwiping(true);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isSwiping || isMobileMenuOpen) return;
      
      const currentX = e.targetTouches[0].clientX;
      const currentY = e.targetTouches[0].clientY;
      const diffX = touchStartX - currentX;
      const diffY = Math.abs(touchStartY - currentY);
      
      // Проверяем, что свайп горизонтальный (вертикальное смещение меньше 50px)
      if (diffY < 50 && diffX > 30) {
        e.preventDefault();
        setIsMobileMenuOpen(true);
        setIsSwiping(false);
        setTouchStartX(0);
      }
    };

    const handleGlobalTouchEnd = () => {
      setIsSwiping(false);
      setTouchStartX(0);
    };

    // Добавляем обработчики на весь документ
    document.addEventListener('touchstart', handleGlobalTouchStart, { passive: false });
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleGlobalTouchStart);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isMobile, isMobileMenuOpen, isSwiping, touchStartX, touchStartY]);

  // Обработчики свайпа для закрытия меню
  const handleMenuTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleMenuTouchMove = (e: React.TouchEvent) => {
    if (!isMobileMenuOpen) return;
    
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStartX;
    
    // Если свайп вправо более чем на 50px, закрываем меню
    if (diff > 50) {
      setIsMobileMenuOpen(false);
      setTouchStartX(0);
    }
  };

  const handleMenuTouchEnd = () => {
    setTouchStartX(0);
  };

  // Анимация приветствия для нижнего меню
  useEffect(() => {
    if (isMobile && bottomMenuRef.current && !hasAnimated) {
      const menu = bottomMenuRef.current;
      const originalScrollLeft = menu.scrollLeft;
      
      menu.scrollTo({
        left: menu.scrollWidth - menu.clientWidth,
        behavior: 'smooth'
      });
      
      const timeout = setTimeout(() => {
        if (menu) {
          menu.scrollTo({
            left: originalScrollLeft,
            behavior: 'smooth'
          });
        }
        setHasAnimated(true);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [isMobile, hasAnimated]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Глобальный оверлей для обработки свайпов */}
      {isMobile && !isMobileMenuOpen && (
        <div 
          className="fixed right-0 top-0 w-12 h-full z-[100] pointer-events-auto"
          style={{ touchAction: 'pan-y' }}
        />
      )}

      {/* Оверлей для закрытия меню */}
      {isMobile && (
        <div 
          className={`fixed inset-0 backdrop-blur-md bg-black/40 transition-all duration-300 z-[101] ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Мобильный хедер */}
      {isMobile ? (
        <>
          {/* Верхний уровень - фиксированный */}
          <div 
            className={`fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md transition-all duration-300 z-50 ${
              isMobileMenuOpen ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <div className="px-4 py-3">
                <div className='flex gap-4 items-center'>
                    <div className="flex-1 py-4 text-lg font-bold shrink-0">
                    <Link href='/'>Автосервис</Link>
                    </div>
                    <div className='text-sm'>
                        +7 (8202) 60-23-22
                    </div>
                </div>
              <div className="flex items-center justify-between gap-2">
                {/* Поиск */}
                <Search show={show} />

                {/* Бургер-меню */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors relative z-[102] shrink-0"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Отступ для фиксированного верхнего меню */}
          <div className="pt-[140px]" />

          {/* Нижний уровень - скроллится со страницей */}
          <div 
            ref={bottomMenuRef}
            className={`bg-white/95 backdrop-blur-md border-b-10 border-gray-200 overflow-x-auto overflow-y-hidden hide-scrollbar transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-2 min-w-max">
              <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-sm">
                Услуги
              </div>
              <div className="flex items-center gap-2">
                <WorkMenu />
              </div>
            </div>
          </div>
        </>
      ) : (
        /* === ДЕСКТОПНАЯ ВЕРСИЯ === */
        <header className={`bg-white/80 backdrop-blur-md z-50 sticky top-0 shadow-sm`}>
          {show && (
            <div className='bg-black/10  py-2'>
              <div className='container mx-auto px-4'>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Череповец</span>
                  </div>
                  <HeaderMenu />
                  <div className='cursor-pointer hover:text-red-600 transition-colors'>Личный кабинет</div>
                </div>
              </div>
            </div>
          )}
          
          <div className='container mx-auto px-4'>
            <div className="flex justify-between items-center gap-4 py-4">
              <div className="text-xl font-bold shrink-0"><Link href='/'>Автосервис</Link></div>
              <div className={`bg-red-600 text-white ${show ? 'py-3.5' : 'py-2'} px-6 font-bold text-sm rounded-xl cursor-pointer shrink-0 hover:bg-red-700 transition-colors`}>
                Услуги
              </div>
                <Search show={show} />
              <div className="shrink-0">
                <WorkMenu />
              </div>
              {!show && (
                <div className='py-1.5 px-3 bg-red-600 text-white rounded-lg shrink-0 hover:bg-red-700 transition-colors cursor-pointer'>
                  Личный кабинет
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Мобильное бургер-меню с поддержкой свайпа */}
      {isMobile && (
        <div 
          className={`fixed right-0 top-0 h-full w-80 bg-white backdrop-blur-xs shadow-2xl z-[102] transition-all duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onTouchStart={handleMenuTouchStart}
          onTouchMove={handleMenuTouchMove}
          onTouchEnd={handleMenuTouchEnd}
        >
          {/* Декоративный верхний градиент */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500" />
          
          {/* Индикатор свайпа для закрытия */}
          {isMobileMenuOpen && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gray-300 rounded-r-full">
              <div className="w-full h-full bg-gray-400 rounded-r-full animate-pulse" />
            </div>
          )}
          
          <div className="p-4">
            <div className='flex items-center justify-between mb-4 pb-4 border-b border-gray-200'>
              <div className="flex items-center gap-3 text-gray-700 flex-1">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Ваш город</div>
                  <div className="font-semibold">Череповец</div>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-7 -m-4 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="py-4 border-b border-gray-200">
              <HeaderMenu />
            </div>

            {/* Личный кабинет */}
            <div className="py-4">
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] shadow-md">
                Войти в личный кабинет
              </button>
            </div>

            {/* Подсказка о свайпе */}
            {isMobileMenuOpen && (
              <div className="mt-8 pt-4 text-center text-xs text-gray-400 border-t border-gray-100">
                <div className="flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Свайпните вправо, чтобы закрыть</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Глобальная подсказка о свайпе */}
      {showHint && isMobile && !isMobileMenuOpen && (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[200] animate-slide-in">
          <div className="bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-l-xl text-sm flex items-center gap-3 shadow-xl">
            <div className="animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <div className="font-semibold">Свайпните влево</div>
              <div className="text-xs text-gray-300">чтобы открыть меню</div>
            </div>
            <button 
              className="ml-2 text-white/50 hover:text-white transition-colors"
              onClick={() => {
                setShowHint(false);
                localStorage.setItem('swipeHintShown', 'true');
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};