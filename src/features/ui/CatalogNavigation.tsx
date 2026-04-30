import Link from "next/link"

export interface NavigationProps{
    links?:Link[]
}
interface Link{
    href:string,
    title:string
}

export const CatalogNavigation = ({links}:NavigationProps) =>{
    return <div className=''>
        <h2 className="text-xl font-bold mb-2">Узнай стоимость обслуживания Вашего автомобиля за 60 секунд!</h2>
        <div className="flex gap-2 mb-4">{links?.map((link,i)=>(
            <div key={i} className="py-1 px-2 bg-white rounded-full border border-gray-200 text-sm flex  items-center shadow-xs hover:shadow-sm transition-shadow">
                <div className="p-2">{link.title}</div>
                <Link href={link.href} className="text-xs text-gray-500 py-2 px-3 rounded-full hover:bg-gray-100 cursor-pointer">x</Link>
            </div>
        ))}</div>
    </div>
}