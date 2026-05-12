import Link from "next/link"


export const Footer = () => {
    return <div className="bg-gray-800">
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-white/70">Популярные услуги</h4>
                    <div className="flex flex-col text-white text-sm">
                        <Link href="/service/zamena-masla">Замена масла</Link>
                        <Link href="/service/shod-razval">Сход-развал</Link>
                        <Link href="/service/shinomontazh">Шиномонтаж</Link>
                        <Link href="/service/diagnostika">Диагностика</Link>
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-white/70">Популярные автомобили</h4>
                    <div className="flex flex-col text-white text-sm">
                        <Link href="/service/all/audi">Audi</Link>
                        <Link href="/service/all/bmw">BMW</Link>
                        <Link href="/service/all/chevrolet">Chevrolet</Link>
                        <Link href="/service/all/hyundai">Hyundai</Link>
                        <Link href="/service/all/kia">KIA</Link>
                        <Link href="/service/all/mercedes-benz">Mercedes-Benz</Link>
                        <Link href="/service/all/nissan">Nissan</Link>
                        <Link href="/service/all/renault">Renault</Link>
                        <Link href="/service/all/skoda">Skoda</Link>
                        <Link href="/service/all/volkswagen">Volkswagen</Link>
                    </div>
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-white/70">Информация</h4>
                    <div className="flex flex-col text-white text-sm">
                        <Link href="/sale">Акции</Link>
                        <Link href="/fran">Франшиза</Link>
                        <Link href="/about">О компании</Link>
                        <Link href="/business">Юридическим лицам</Link>
                        <Link href="/work">Работа</Link>
                        <Link href="/contact">Контакты СТО</Link>
                        <br/>
                        <Link href="/cabinet">Личный кабинет</Link>
                    </div>
                </div>
                <div className="flex-1">
                </div>
            </div>
        </div>
    </div>
}