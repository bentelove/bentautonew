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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Анимация приветствия для нижнего меню
  useEffect(() => {
    if (isMobile && bottomMenuRef.current && !hasAnimated) {
      const menu = bottomMenuRef.current;
      
      // Сохраняем оригинальный scrollLeft
      const originalScrollLeft = menu.scrollLeft;
      
      // Плавно скроллим вправо
      menu.scrollTo({
        left: menu.scrollWidth - menu.clientWidth,
        behavior: 'smooth'
      });
      
      // Через 1 секунду возвращаемся обратно
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
      {/* Оверлей поверх всего контента, включая хедер */}
      {isMobile && (
        <div 
          className={`fixed inset-0 backdrop-blur-md bg-black/40 transition-all duration-300 z-[100] ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Мобильный хедер */}
      {isMobile ? (
        <>
          {/* Верхний уровень - фиксированный */}
          <div className={`fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md transition-all duration-300 z-50 ${
            isMobileMenuOpen ? 'opacity-50 pointer-events-none' : ''
          }`}>
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
                {/* Логотип */}

                {/* Поиск */}
                <Search show={show} />

                {/* Бургер-меню */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors relative z-[101] shrink-0"
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
        <header className={`${show && 'border-b-5 border-gray-200'} bg-white/95 backdrop-blur-md z-50 sticky top-0 shadow-sm`}>
          {show && (
            <div className='bg-gray-100/90 backdrop-blur-sm py-2 border-b border-gray-200'>
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

      {/* Мобильное бургер-меню */}
      {isMobile && (
        <div 
          className={`fixed right-0 top-0 h-full w-80 bg-white backdrop-blur-xs shadow-2xl z-[102] transition-all duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Декоративный верхний градиент */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500" />
          
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
      `}</style>
    </>
  );
};