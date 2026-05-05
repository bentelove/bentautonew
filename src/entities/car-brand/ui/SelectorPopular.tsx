'use client';

import { config } from "process";
import { useEffect, useState } from "react";

export interface selectorPopularProps {
    type: typeSelectorPopular;
    search: string;
    setSearch: (search: string) => void;
    popular: number;
    setPopular: (popular: number) => void;
    searchList?: string[]
}

export enum typeSelectorPopular {
    BRAND,
    MODEL
}

interface TypewriterConfig {
    typingSpeed?: number;    // скорость печати (мс)
    deletingSpeed?: number;  // скорость удаления (мс)
    pauseTime?: number;      // пауза между текстами (мс)
}
const DEFAULT_CONFIG: TypewriterConfig = {
    typingSpeed: 100,
    deletingSpeed: 40,
    pauseTime: 5000
};
export const SelectorPopular = ({ type, search, setSearch, popular, setPopular ,searchList = []}: selectorPopularProps) => {
    const filterButtonClass = (isActive: boolean) => `
        p-3 text-sm cursor-pointer transition-colors
        ${isActive 
            ? 'bg-red-500 text-white hover:bg-red-700' 
            : 'bg-gray-100 hover:bg-gray-200'
        }
    `;
    const [displayText, setDisplayText] = useState('');
    const [textIndex,setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const config = DEFAULT_CONFIG;

    useEffect(()=>{
        if(searchList.length==0)return ;
        let timeout: NodeJS.Timeout;
        const currentText = searchList[textIndex];
        
        const animate = () => {
            if (!isDeleting && displayText === currentText) {
                // Пауза перед удалением
                timeout = setTimeout(() => setIsDeleting(true), config.pauseTime);
                return;
            }
            
            if (isDeleting && displayText === '') {
                // Переход к следующему тексту
                setIsDeleting(false);
                setTextIndex(Math.floor(searchList.length*Math.random()));
                return;
            }
            
            // Анимация печати/удаления
            const speed = isDeleting ? config.deletingSpeed : config.typingSpeed;
            const delta = isDeleting ? -1 : 1;
            
            timeout = setTimeout(() => {
                setDisplayText(currentText.slice(0, displayText.length + delta));
            }, speed);
        };
        
        animate();
        
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, config]);

    useEffect(()=>{
        setTextIndex(Math.floor(searchList.length*Math.random()));
    },[searchList])

    return (
        <div className="mb-4">
            {/* Мобильная версия */}
            <div className="block md:hidden">
                <div className="flex gap-2 mb-3">
                    <button
                        className={`${filterButtonClass(popular == 2)} ${popular==2?'flex-2':'flex-1'} rounded-lg`}
                        onClick={() => setPopular(2)}
                        aria-pressed={popular == 2}
                    >
                        Популярные
                    </button>
                    <button
                        className={`${filterButtonClass(popular == 1)} ${popular==1?'flex-2':'flex-1'}  rounded-lg`}
                        onClick={() => setPopular(1)}
                        aria-pressed={popular == 1}
                    >
                        {type === typeSelectorPopular.BRAND && 'Все марки'}
                        {type === typeSelectorPopular.MODEL && 'Все модели'}
                    </button>
                </div>

                <div className="relative">
                    <input 
                        className="w-full border-2 border-gray-200 text-sm p-3 outline-none focus:border-red-500 hover:border-gray-400 rounded-lg pr-9" 
                        type="text" 
                        placeholder={searchList.length==0?`Поиск ${typeSelectorPopular.BRAND?"марки":"модели"}`:displayText}
                        aria-label={`Поиск ${type === typeSelectorPopular.BRAND ? 'марки автомобиля' : 'модели'}`}
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Десктопная версия */}
            <div className="hidden md:flex">
                <button
                    className={`${filterButtonClass(popular == 2)} rounded-l-lg`}
                    onClick={() => setPopular(2)}
                    aria-pressed={popular == 2}
                >
                    Только популярные
                </button>
                <button
                    className={`${filterButtonClass(popular == 1)} rounded-r-lg`}
                    onClick={() => setPopular(1)}
                    aria-pressed={popular == 1}
                >
                    {type === typeSelectorPopular.BRAND && 'Все марки'}
                    {type === typeSelectorPopular.MODEL && 'Все модели'}
                </button>
                <div className="relative flex-1 pr-4">
                    <input 
                        className="border-2 border-gray-200 ml-4 text-sm p-3 outline-none focus:border-red-500 hover:border-gray-400 w-full rounded-lg pr-4" 
                        type="text" 
                        placeholder={searchList.length==0?`Поиск ${typeSelectorPopular.BRAND?"марки":"модели"}`:displayText}
                        aria-label={`Поиск ${type === typeSelectorPopular.BRAND ? 'марки автомобиля' : 'модели'}`}
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};