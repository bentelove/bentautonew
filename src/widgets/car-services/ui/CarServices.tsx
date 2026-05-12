'use client';

import { CarModel } from "@/entities/car-brand";
import Link from "next/link";
import { CarModelView } from "../../../entities/car-brand/ui/CarModelView";
import { useEffect, useMemo, useState, useRef } from "react";
import { SelectorPopular, typeSelectorPopular } from "../../../entities/car-brand/ui/SelectorPopular";
import { CatalogNavigation } from "@/features/ui/CatalogNavigation";
import { useCarServicesCatalog } from "../model/useCarServices";
import Image from "next/image";

interface CarModelCatalogProps {
    modificationId: number;
    serviceUrl?:string;
}

enum TypeLink {
    'phone',
    'telegram',
    'max'
}

interface ServiceType {
    base: Service[];
    transmission: Service[];
    brake: Service[];
    suspension: Service[],
    tire: Service[]
}

interface Service {
    name: string;
    price?: number;
    active: boolean;
}

// Маппинг serviceUrl на название услуги
const serviceUrlToServiceName: Record<string, string> = {
    'shinomontazh': 'Комплекс шиномонтажа',
    'diagnostika': 'Комплексная диагностика автомобиля',
    'zamena-masla': 'Замена моторного масла и масляного фильтра',
    'shod-razval': 'Развал-схождение (компьютерная регулировка)'
};

// Маппинг serviceUrl на секцию
const serviceUrlToSection: Record<string, string> = {
    'shinomontazh': 'tire',
    'diagnostika': 'base',
    'zamena-masla': 'base',
    'shod-razval': 'suspension'
};

export const CarServices = ({ modificationId, serviceUrl = 'all' }: CarModelCatalogProps) => {
    const { modification, loading, error } = useCarServicesCatalog(modificationId);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [typeLink, setTypeLink] = useState<TypeLink>(TypeLink.phone);
    const [services, setServices] = useState<ServiceType | null>(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [activeSection, setActiveSection] = useState('base');
    const [activeSectionTitle, setActiveSectionTitle] = useState('Базовое ТО');
    const imageRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [autoSelectDone, setAutoSelectDone] = useState(false); // Флаг для автоматического выбора услуги

    // Состояния для свайпа
    const [touchStart, setTouchStart] = useState(0);
    const [modalTranslateY, setModalTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const sectionTitles = {
        base: 'Базовое ТО',
        transmission: 'Обслуживание трансмиссии',
        brake: 'Обслуживание тормозной системы',
        suspension: 'Обслуживание подвески',
        tire: 'Шиномонтаж'
    };

    useEffect(() => {
        const getServices = () => {
            let service: ServiceType = {
                base: [],
                transmission: [],
                brake: [],
                suspension: [],
                tire: []
            };
            service.base.push({ name: 'Комплексная диагностика автомобиля', price: 1400, active: false });
            service.base.push({ name: 'Замена моторного масла и масляного фильтра', price: 1400, active: false });
            service.base.push({ name: 'Замена воздушного фильтра', price: 350, active: false });
            service.base.push({ name: 'Замена салонного фильтра', price: 350, active: false });
            
            if (modification?.fuelType == 'Бензин') {
                service.base.push({ name: 'Замена топливного фильтра', price: 700, active: false });
                service.base.push({ name: 'Замена свечей зажигания', price: 1400, active: false });
            }
            if (modification?.fuelType == 'Дизель') {
                service.base.push({ name: 'Замена топливного фильтра (дизельный двигатель)', price: 700, active: false });
            }
            
            service.base.push({ name: 'Замена ремня вспомогательных агрегатов', price: 700, active: false });
            service.base.push({ name: 'Замена цепи ГРМ', price: 10500, active: false });
            service.base.push({ name: 'Замена ремня ГРМ', price: 7000, active: false });
            
            if (modification?.kppType == "Автомат") {
                service.transmission.push({ name: "Замена масла в АКПП", price: 2100, active: false });
            }
            if (modification?.kppType == "Механика") {
                service.transmission.push({ name: "Замена масла в МКПП", price: 1400, active: false });
            }
            if (modification?.kppType == "Механика") {
                service.transmission.push({ name: "Замена сцепления", price: 7000, active: false });
            }
            if (modification?.kppType == "Вариатор") {
                service.transmission.push({ name: "Замена масла в вариаторе", price: 3500, active: false });
            }
            if (modification?.kppType == "Робот") {
                service.transmission.push({ name: "Замена масла в роботизированной коробке передач", price: 2100, active: false });
            }
            
            if (modification?.driveType == "Полный") {
                service.transmission.push({ name: "Замена масла в раздаточной коробке", price: 1400, active: false });
            }
            if (modification?.driveType == "Полный" || modification?.driveType == "Задний") {
                service.transmission.push({ name: "Замена масла в заднем дифференциале", price: 1400, active: false });
            }
            
            service.brake.push({ name: "Замена передних тормозных дисков и колодок", price: 2100, active: false });
            service.brake.push({ name: "Замена передних тормозных колодок", price: 1400, active: false });
            service.brake.push({ name: "Замена задних тормозных дисков и колодок", price: 2100, active: false });
            service.brake.push({ name: "Замена задних тормозных колодок", price: 1400, active: false });
            service.brake.push({ name: "Замена переднего суппорта", price: 2100, active: false });
            service.brake.push({ name: "Замена тормозной жидкости", price: 2100, active: false });

            service.suspension.push({ name: 'Замена передних амортизаторов', price: 3500, active: false });
            service.suspension.push({ name: 'Замена задних амортизаторов', price: 2800, active: false });
            service.suspension.push({ name: 'Замена передних пружин', price: 3500, active: false });
            service.suspension.push({ name: 'Замена задних пружин', price: 1400, active: false });
            service.suspension.push({ name: 'Замена передних рычагов', price: 3500, active: false });
            service.suspension.push({ name: 'Замена задних рычагов', price: 3200, active: false });
            service.suspension.push({ name: 'Замена сайлентблоков', price: 2000, active: false });
            service.suspension.push({ name: 'Замена шаровых опор', price: 1800, active: false });
            service.suspension.push({ name: 'Замена рулевых наконечников', price: 1500, active: false });
            service.suspension.push({ name: 'Замена рулевых тяг', price: 1800, active: false });
            service.suspension.push({ name: 'Замена стабилизатора поперечной устойчивости', price: 1200, active: false });
            service.suspension.push({ name: 'Замена втулок стабилизатора', price: 800, active: false });
            service.suspension.push({ name: 'Замена ступичных подшипников', price: 2200, active: false });
            service.suspension.push({ name: 'Развал-схождение (компьютерная регулировка)', price: 1500, active: false });

            service.tire.push({ name: 'Комплекс шиномонтажа', price: 2000, active: false });
            service.tire.push({ name: 'Устранение прокола покрышки', price: 1000, active: false });
            service.tire.push({ name: 'Балансировка колес', price: 1000, active: false });
            
            return service;
        };
        
        if (modification) {
            setServices(getServices());
        }
    }, [modification]);

    // Автоматический выбор услуги в зависимости от serviceUrl
    useEffect(() => {
        if (services && serviceUrl && serviceUrl !== 'all' && !autoSelectDone) {
            const targetServiceName = serviceUrlToServiceName[serviceUrl];
            const targetSection = serviceUrlToSection[serviceUrl];
            
            if (targetServiceName && targetSection) {
                // Небольшая задержка для полной загрузки UI
                setTimeout(() => {
                    // Находим нужную услугу в соответствующей секции
                    const targetService = services[targetSection as keyof ServiceType]?.find(
                        s => s.name === targetServiceName
                    );
                    
                    if (targetService) {
                        // Активируем услугу
                        setActive(targetServiceName, true);
                        
                        // Скроллим к секции с паузой
                        setTimeout(() => {
                            scrollToSection(targetSection);
                            setAutoSelectDone(true);
                        }, 100);
                    }
                }, 500);
            }
        }
    }, [services, serviceUrl]);

    const setActive = (name: string, active: boolean) => {
        if (services) {
            setServices({
                base: services.base.map((service) =>
                    service.name === name ? { ...service, active: active } : service
                ),
                transmission: services.transmission.map((service) =>
                    service.name === name ? { ...service, active: active } : service
                ),
                brake: services.brake.map((service) =>
                    service.name === name ? { ...service, active: active } : service
                ),
                suspension: services.suspension.map((service) =>
                    service.name === name ? { ...service, active: active } : service
                ),
                tire: services.tire.map((service) =>
                    service.name === name ? { ...service, active: active } : service
                ),
            });
        }
    };
    
    const getSelectedServices = () => {
        if (!services) return [];
        const allServices = [
            ...services.base,
            ...services.transmission,
            ...services.brake,
            ...services.suspension,
            ...services.tire
        ];
        return allServices.filter(service => service.active);
    };

    useEffect(() => {
        if (showContactForm) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;
            
            return () => {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                document.body.style.top = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [showContactForm]);

    // Отслеживание видимости изображения
    useEffect(() => {
        const handleScroll = () => {
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                setIsImageVisible(rect.bottom > 100);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Отслеживание активной секции
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['base', 'transmission', 'brake', 'suspension', 'tire'];
            const scrollPosition = window.scrollY + 150;
            
            for (const section of sections) {
                const element = sectionRefs.current[section];
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        if (activeSection !== section) {
                            setActiveSection(section);
                            setActiveSectionTitle(sectionTitles[section as keyof typeof sectionTitles]);
                        }
                        break;
                    }
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [services, activeSection]);

    // Добавьте новый ref для контейнера с кнопками
    const navContainerRef = useRef<HTMLDivElement>(null);
    const activeButtonRef = useRef<HTMLButtonElement | null>(null);

    // Функция для прокрутки активной кнопки в видимую область
    const scrollActiveButtonIntoView = () => {
        if (activeButtonRef.current && navContainerRef.current) {
            const container = navContainerRef.current;
            const activeButton = activeButtonRef.current;
            
            const buttonLeft = activeButton.offsetLeft;
            const buttonRight = buttonLeft + activeButton.offsetWidth;
            const containerLeft = container.scrollLeft;
            const containerRight = containerLeft + container.offsetWidth;
            
            // Если кнопка не полностью видна
            if (buttonLeft < containerLeft || buttonRight > containerRight) {
                activeButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    };

    // Добавьте useEffect для прокрутки при изменении активной секции
    useEffect(() => {
        scrollActiveButtonIntoView();
    }, [activeSection]);

    const scrollToSection = (section: string) => {
        const element = sectionRefs.current[section];
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Обработчики свайпа
    const handleTouchStart = (e: React.TouchEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('button, input, [role="button"], .no-swipe-close');
        
        if (!isInteractive) {
            setTouchStart(e.targetTouches[0].clientY);
            setIsDragging(true);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentY = e.targetTouches[0].clientY;
        const diff = currentY - touchStart;
        if (diff > 0) { // Только при свайпе вниз
            setModalTranslateY(diff);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (modalTranslateY > 100) {
            // Анимация закрытия
            setModalTranslateY(1000);
            setTimeout(() => {
                setShowContactForm(false);
                setModalTranslateY(0);
            }, 300);
        } else {
            setModalTranslateY(0);
        }
        setTouchStart(0);
    };

    const renderServices = (servicesList: Service[] | undefined) => {
        if (!servicesList) return null;
        return servicesList.map((service, i) => (
            <CarService 
                key={service.name} 
                name={service.name} 
                price={service.price} 
                active={service.active} 
                setActive={setActive} 
            />
        ));
    };

    const selectedServices = getSelectedServices();
    const selectedCount = selectedServices.length;

    if (loading) {
        return <div className="text-center py-80 bg-gray-100 border-b-15 border-gray-200">Загрузка моделей...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
    }

    if (!services) {
        return <div className="text-center py-80 bg-gray-100 border-b-15 border-gray-200">Загрузка услуг...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Sticky панель для мобильных - появляется когда изображение скрыто */}
            <div className={`fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md shadow-lg z-50 transition-all duration-300 ${
                !isImageVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
                <div className="flex items-center gap-3 px-2 py-2">
                    {/* Левая часть - миниатюра изображения */}
                    <div className="w-20 h-15 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {modification?.generation?.image && (
                            <Image 
                                className="w-full h-full object-cover" 
                                width={60} 
                                height={48} 
                                alt={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`} 
                                src={modification.generation.image}
                            />
                        )}
                        {!modification?.generation?.image && (
                            <Image 
                                className="w-full h-full object-cover" 
                                width={60} 
                                height={48} 
                                alt="Car" 
                                src={'https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1652787845/lmcode/DLZGMi6I6U-l-DH6pf0JnQ/90384094.jpg'}
                            />
                        )}
                    </div>
                    
                    {/* Правая часть - текущий заголовок */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                            {activeSectionTitle}
                        </h3>
                        <h5 className="text-xs font-semibold text-gray-600 line-clamp-1">
                             для {modification?.generation?.model?.brand?.name} {modification?.generation?.model?.name} {modification?.generation?.name} {modification?.name}
                        </h5>
                    </div>
                </div>
                
                {/* Мини-навигация по секциям */}
                <div className="overflow-x-auto" ref={navContainerRef}>
                <div className="flex px-2 py-1.5 gap-1 min-w-max">
                    {[
                        { id: 'base', title: 'Базовое ТО' },
                        { id: 'transmission', title: 'Трансмиссия' },
                        { id: 'brake', title: 'Тормоза' },
                        { id: 'suspension', title: 'Подвеска' },
                        { id: 'tire', title: 'Шиномонтаж' }
                    ].map(section => (
                        <button
                            key={section.id}
                            ref={el => {
                                if (activeSection === section.id) {
                                    activeButtonRef.current = el;
                                }
                            }}
                            onClick={() => scrollToSection(section.id)}
                            className={`px-5 py-3 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
                                activeSection === section.id
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>
            </div>

            {/* Отступ для фиксированной панели на мобильных */}

            <div className="container px-4 mx-auto pb-24 md:pb-8">
                <CatalogNavigation
                    title={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`}
                    links={[
                        { href: `/service/${serviceUrl}/`, title: modification?.generation?.model?.brand?.name || '' },
                        { href: `/service/${serviceUrl}/${modification?.generation?.model?.brand?.url}`, title: modification?.generation?.model?.name || '' },
                        { href: `/service/${serviceUrl}/${modification?.generation?.model?.brand?.url}/${modification?.generation?.model?.url}`, title: modification?.generation?.name || '' },
                        { href: `/service/${serviceUrl}/${modification?.generation?.model?.brand?.url}/${modification?.generation?.model?.url}/${modification?.generation?.url}`, title: modification?.name || '' }
                    ]}
                />

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Левая колонка - картинка и контакты */}
                    <div className="md:flex-1">
                        <div ref={imageRef} className="md:sticky md:top-32">
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                                {modification?.generation?.image && (
                                    <Image 
                                        className="rounded-lg w-full" 
                                        width={400} 
                                        height={300} 
                                        alt={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`} 
                                        src={modification.generation.image}
                                    />
                                )}
                                {!modification?.generation?.image && (
                                    <Image 
                                        className="rounded-lg w-full" 
                                        width={400} 
                                        height={300} 
                                        alt={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`} 
                                        src={'https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1652787845/lmcode/DLZGMi6I6U-l-DH6pf0JnQ/90384094.jpg'}
                                    />
                                )}
                            </div>

                            {/* Блок выбранных услуг для десктопа */}
                            <div className="hidden md:block mt-4">
                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                    <h4 className="text-lg font-bold mb-3">Выбранные услуги:</h4>
                                    <div className="max-h-64 overflow-y-auto">
                                        {selectedCount > 0 ? (
                                            <ul className="space-y-2">
                                                {selectedServices.map((service, index) => (
                                                    <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0"></span>
                                                        <span className="flex-1">{service.name}</span>
                                                        {service.price && (
                                                            <span className="text-gray-500 text-xs flex-shrink-0">
                                                                от {service.price} ₽
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500 text-center py-4">
                                                Ни одна услуга не выбрана
                                            </p>
                                        )}
                                    </div>
                                    
                                    {selectedCount > 0 && (
                                        <div className="mt-4 pt-3 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-700">Итого:</span>
                                                <span className="font-bold text-red-600 text-lg">
                                                    от {selectedServices.reduce((sum, service) => sum + (service.price || 0), 0)} ₽
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Форма контактов для десктопа */}
                            <div className="hidden md:block mt-4">
                                <ContactForm 
                                    phone={phone}
                                    name={name}
                                    setPhone={setPhone}
                                    setName={setName}
                                    typeLink={typeLink}
                                    setTypeLink={setTypeLink}
                                    selectedCount={selectedCount}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка - услуги */}
                    <div className="md:flex-3">
                        <div className="bg-white px-4 py-4 border border-gray-200 rounded-lg">
                            {/* Базовое ТО */}
                            <div ref={el => {sectionRefs.current['base'] = el}}>
                                <h3 className='text-xl font-bold p-2'>Базовое ТО для {modification?.generation?.model?.brand?.name} {modification?.generation?.model?.name}</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    {renderServices(services.base)}
                                </div>
                            </div>
                            
                            {/* Обслуживание трансмиссии */}
                            <div ref={el => {sectionRefs.current['transmission'] = el}}>
                                <h3 className='text-xl font-bold p-2 mt-4'>Обслуживание трансмиссии для {modification?.generation?.model?.brand?.name} {modification?.generation?.model?.name}</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    {renderServices(services.transmission)}
                                </div>
                            </div>
                            
                            {/* Обслуживание тормозной системы */}
                            <div ref={el => {sectionRefs.current['brake'] = el}}>
                                <h3 className='text-xl font-bold p-2 mt-4'>Обслуживание тормозной системы для {modification?.generation?.model?.brand?.name} {modification?.generation?.model?.name}</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    {renderServices(services.brake)}
                                </div>
                            </div>

                            {/* Обслуживание подвески */}
                            <div ref={el => {sectionRefs.current['suspension'] = el}}>
                                <h3 className='text-xl font-bold p-2 mt-4'>Обслуживание подвески для {modification?.generation?.model?.brand?.name} {modification?.generation?.model?.name}</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    {renderServices(services.suspension)}
                                </div>
                            </div>

                            {/* Шиномонтаж */}
                            <div ref={el => {sectionRefs.current['tire'] = el}}>
                                <h3 className='text-xl font-bold p-2 mt-4'>Шиномонтаж для {modification?.generation?.model?.brand?.name} {modification?.generation?.model?.name}</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    {renderServices(services.tire)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Мобильная плавающая кнопка */}
            {selectedCount > 0 && !showContactForm && (
                <div className="fixed bottom-0 left-0 right-0 shadow-lg p-4 z-40 md:hidden animate-slide-up">
                    <button 
                        onClick={() => setShowContactForm(true)}
                        className="w-full bg-red-600/90  backdrop-blur-md hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                    >
                        Продолжить с {selectedCount} {getServiceWord(selectedCount)}
                    </button>
                </div>
            )}

            {/* Мобильная форма контактов (оверлей) с анимацией свайпа */}
            {showContactForm && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden animate-fade-in" 
                    onClick={() => {
                        setModalTranslateY(1000);
                        setTimeout(() => {
                            setShowContactForm(false);
                            setModalTranslateY(0);
                        }, 300);
                    }}
                >
                    <div 
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto transition-transform duration-300 ease-out"
                        style={{ 
                            transform: `translateY(${modalTranslateY}px)`,
                            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Индикатор свайпа */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pt-0 pb-2">
                            <div className="text-xl font-bold">
                                <div>Заявка на обслуживание</div>
                                <div className="text-sm text-gray-700 font-normal">Вашего {modification?.generation?.model?.brand?.name} {modification?.generation?.model?.name}</div>
                            </div>
                            <button 
                                onClick={() => {
                                    setModalTranslateY(1000);
                                    setTimeout(() => {
                                        setShowContactForm(false);
                                        setModalTranslateY(0);
                                    }, 300);
                                }}
                                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Список выбранных услуг */}
                        <div className="mb-4 max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-3">
                            <ul className="space-y-1">
                                {selectedServices.map((service, index) => (
                                    <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                                        <div className="flex-1">{service.name}</div>
                                        <div className="">от {service.price} ₽</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {selectedCount > 0 && (
                            <div className="mb-4 pt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">Итого:</span>
                                    <span className="font-bold text-red-600 text-lg">
                                        от {selectedServices.reduce((sum, service) => sum + (service.price || 0), 0)} ₽
                                    </span>
                                </div>
                            </div>
                        )}
                        <ContactForm 
                            phone={phone}
                            name={name}
                            setPhone={setPhone}
                            setName={setName}
                            typeLink={typeLink}
                            setTypeLink={setTypeLink}
                            selectedCount={selectedCount}
                            isMobile={true}
                            onClose={() => {
                                setModalTranslateY(1000);
                                setTimeout(() => {
                                    setShowContactForm(false);
                                    setModalTranslateY(0);
                                }, 300);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Компонент формы контактов
interface ContactFormProps {
    phone: string;
    name:string;
    setPhone: (phone: string) => void;
    setName: (name: string) => void;
    typeLink: TypeLink;
    setTypeLink: (type: TypeLink) => void;
    selectedCount: number;
    isMobile?: boolean;
    onClose?: () => void;
}

const ContactForm = ({ phone, name, setPhone, setName, typeLink, setTypeLink, selectedCount, isMobile, onClose }: ContactFormProps) => {
    const handleSubmit = () => {
        console.log('Отправка:', { phone, name, typeLink, selectedCount });
        if (onClose) onClose();
    };

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h4 className="text-sm font-semibold mb-2">Как с вами связаться?</h4>
                <div className="flex items-center gap-3 flex-wrap">
                    <div 
                        className={`flex gap-2 p-2 items-center hover:cursor-pointer rounded-lg transition-all ${typeLink == TypeLink.phone && 'bg-red-50 border border-red-200'}`} 
                        onClick={() => setTypeLink(TypeLink.phone)}
                    >
                        <Image width={20} height={20} alt="Телефон" src={'/icon/phone.svg'} />
                        <div className="text-sm">Телефон</div>
                    </div>
                    <div 
                        className={`flex gap-2 p-2 items-center hover:cursor-pointer rounded-lg transition-all ${typeLink == TypeLink.max && 'bg-red-50 border border-red-200'}`} 
                        onClick={() => setTypeLink(TypeLink.max)}
                    >
                        <Image width={20} height={20} alt="WhatsApp" src={'/icon/whatsapp.svg'} />
                        <div className="text-sm">MAX</div>
                    </div>
                    <div 
                        className={`flex gap-2 p-2 items-center hover:cursor-pointer rounded-lg transition-all ${typeLink == TypeLink.telegram && 'bg-red-50 border border-red-200'}`} 
                        onClick={() => setTypeLink(TypeLink.telegram)}
                    >
                        <Image width={20} height={20} alt="Telegram" src={'/icon/telegram.svg'} />
                        <div className="text-sm">Telegram</div>
                    </div>
                </div>
            </div>
            
            <div>
                <input 
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 no-swipe-close" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Ваше имя"
                    type="text"
                />
            </div>
            <div>
                <input 
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 no-swipe-close" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Ваш номер телефона"
                    type="tel"
                />
            </div>
            
            <div>
                <button 
                    onClick={handleSubmit}
                    className={`w-full py-3 hover:cursor-pointer transition-all text-white rounded-lg font-semibold ${phone == '' ? 'bg-gray-300' : 'bg-red-600 hover:bg-red-700'} no-swipe-close`}
                    disabled={phone == ''}
                >
                    {typeLink == TypeLink.phone ? 'Позвонить' : 'Написать'} мне
                </button>
            </div>
            
            <div className="text-xs text-gray-500 text-center mt-2">
                Мы свяжемся с вами и рассчитаем итоговую стоимость
            </div>
        </div>
    );
};

interface CarServiceProps {
    name: string;
    price?: number;
    active: boolean;
    setActive: (name: string, active: boolean) => void;
}

const CarService = ({ name, price, active, setActive }: CarServiceProps) => {
    return (
        <div className={`flex p-2 items-center gap-2 ${active?'bg-red-100':'bg-white even:bg-gray-50 hover:bg-gray-100'} cursor-pointer transition-colors`} onClick={() => { setActive(name, !active) }}>
            <div className="">
                {!active && (
                    <div className="h-8 w-8 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full transition-all"></div>
                )}
                {active && (
                    <div className="h-8 w-8 bg-red-600 hover:bg-red-700 cursor-pointer rounded-full transition-all">
                        <div className="font-bold h-8 w-8 text-white text-center pt-1.5">✓</div>
                    </div>
                )}
            </div>
            <div className="flex-3 p-2 text-sm md:text-base">{name}</div>
            {price && <div className="text-right text-sm md:text-base">от {price} ₽</div>}
        </div>
    );
};

// Вспомогательная функция для склонения слова "услуга"
function getServiceWord(count: number): string {
    if (count % 10 === 1 && count % 100 !== 11) return 'услугой';
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'услугами';
    return 'услугами';
}