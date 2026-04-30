'use client';

import { useEffect, useState, useRef } from 'react';
import { useHeader } from "../model/useHeader";

interface SearchProps {
    show: boolean
}

interface TypewriterConfig {
    texts: string[];
    typingSpeed?: number;    // скорость печати (мс)
    deletingSpeed?: number;  // скорость удаления (мс)
    pauseTime?: number;      // пауза между текстами (мс)
}

const DEFAULT_CONFIG: TypewriterConfig = {
    texts: [
        'Замена масла в BMW X5',
        'Масляный фильтр для Volkswagen Touareg',
        'Регламент ТО для Toyota Land Cruiser 300'
    ],
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseTime: 2000
};

export const Search = ({show}:SearchProps) => {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const config = DEFAULT_CONFIG;
    
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentText = config.texts[textIndex];
        
        const animate = () => {
            if (!isDeleting && displayText === currentText) {
                // Пауза перед удалением
                timeout = setTimeout(() => setIsDeleting(true), config.pauseTime);
                return;
            }
            
            if (isDeleting && displayText === '') {
                // Переход к следующему тексту
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % config.texts.length);
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
    
    return (
        <input 
            type="text" 
            className={`border-2 outline-none text-sm flex-1 ${show ? 'py-3' : 'py-1.5'} px-6 border-black/15 text-black bg-white/50 rounded-xl transition-all duration-300`}
            placeholder={displayText}
            onFocus={() => {
                // Очищаем плейсхолдер при фокусе для лучшего UX
                setDisplayText('');
            }}
        />
    );
};