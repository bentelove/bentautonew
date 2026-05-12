import Link from "next/link"

export interface NavigationProps{
    title?:string,
    links?:Link[],
    serviceName?:string
}
interface Link{
    href:string,
    title:string
}

export const CatalogNavigation = ({serviceName='обслуживания', title="автомобиля", links}:NavigationProps) => {
    return (
        <div className='py-4 md:py-8 flex flex-col gap-2'>
            <h2 className="text-2xl md:text-2xl font-bold text-center md:text-left">
                Узнай стоимость {serviceName} Вашего {title} в Череповце
            </h2>
            {serviceName !== 'обслуживания' && (
                <div className="text-sm text-gray-700">А также 85 других услуг</div>
            )}
            
            {links && links.length > 0 && (
                <>
                    {/* Для мобильных устройств - горизонтальная прокрутка */}
                    <div className="md:hidden overflow-x-auto overflow-y-hidden pb-2">
                        <div className="flex gap-2">
                            {links?.map((link, i) => (
                                <div key={i} className="py-1 px-2 bg-white rounded-full border border-gray-200 text-sm flex items-center shadow-xs hover:shadow-sm flex-shrink-0">
                                    <div className="p-2 whitespace-nowrap">{link.title}</div>
                                    <Link href={link.href} className="text-xs text-gray-500 py-2 px-3 rounded-full hover:bg-gray-100 cursor-pointer flex-shrink-0">
                                        ✕
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Для десктопа - обычное отображение */}
                    <div className="hidden md:flex gap-2 flex-wrap">
                        {links?.map((link, i) => (
                            <div key={i} className="py-1 px-2 bg-white rounded-full border border-gray-200 text-sm flex items-center shadow-xs hover:shadow-sm">
                                <div className="p-2 whitespace-nowrap">{link.title}</div>
                                <Link href={link.href} className="text-xs text-gray-500 py-2 px-3 rounded-full hover:bg-gray-100 cursor-pointer">
                                    ✕
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}