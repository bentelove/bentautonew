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

export const CatalogNavigation = ({serviceName='обслуживания',title="автомобиля",links}:NavigationProps) =>{
    return <div className='py-8 flex flex-col gap-2'>
        <h2 className="text-2xl font-bold">Узнай стоимость {serviceName} Вашего {title} за 60 секунд!</h2>
        {serviceName!=='обслуживания'&&<div className="text-sm text-gray-700">а также 85 других услуг</div>}
        {links&&<div className="flex gap-2">{links?.map((link,i)=>(
            <div key={i} className="py-1 px-2 bg-white rounded-full border border-gray-200 text-sm flex  items-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="p-2">{link.title}</div>
                <Link href={link.href} className="text-xs text-gray-500 py-2 px-3 rounded-full hover:bg-gray-100 cursor-pointer">x</Link>
            </div>
        ))}</div>}
    </div>
}