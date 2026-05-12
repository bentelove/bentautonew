import { CarBrandCatalog } from "@/widgets/car-brand-catalog";

export default async function ZamenaMasla() {
  return (
    <div className="bg-gray-100">

      {/* Блок 1: Текст сверху, картинка снизу на мобильных */}
      <div className="relative">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center">
            {/* Левая часть с контентом - на мобильных полная ширина */}
            <div className="w-full lg:w-1/2 py-12 lg:py-16 lg:pr-12">
              <h2 className="text-3xl font-bold mb-4">Почему важна своевременная замена масла?</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Моторное масло — это кровь вашего двигателя. Со временем оно теряет свои свойства: 
                загрязняется продуктами износа, окисляется и перестает эффективно смазывать детали.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Регулярная замена масла и фильтра продлевает срок службы двигателя, снижает расход топлива 
                и защищает от дорогостоящего ремонта. Рекомендуем проводить замену каждые 10 000 км пробега.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Увеличивает ресурс двигателя до 30%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Снижает расход топлива</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Обеспечивает легкий пуск в мороз</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Удаляет загрязнения и отложения</span>
                </li>
              </ul>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
                Записаться на замену
              </button>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе справа */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://www.zr.ru/d/story/fe/844542/1455709084_2279_4_8_02_kopirovat.jpg"
            alt="Замена масла в автосервисе"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://www.zr.ru/d/story/fe/844542/1455709084_2279_4_8_02_kopirovat.jpg"
            alt="Замена масла в автосервисе"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Блок 2: Текст сверху, картинка снизу на мобильных */}
      <div className="relative mt-12 lg:mt-0">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-end">
            {/* Правая часть с контентом - на мобильных полная ширина */}
            <div className="w-full lg:w-1/2 py-12 lg:py-16 lg:pl-12">
              <h2 className="text-3xl font-bold mb-4">Только качественные масла и фильтры</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Мы работаем с проверенными поставщиками и используем масла ведущих мировых брендов: 
                ZIC, Teboil, Shell, Castrol, LIQUI MOLY, Лукойл и другие. Каждое масло подбирается строго 
                по рекомендациям производителя вашего автомобиля.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Масляный фильтр заменяется в обязательном порядке — это гарантирует чистоту масла 
                и защиту двигателя от абразивных частиц.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">30 мин</div>
                  <div className="text-sm text-gray-600">среднее время замены</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">100%</div>
                  <div className="text-sm text-gray-600">гарантия качества</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе слева */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://images.satu.kz/108081636_w640_h640_motornoe-maslo-motul.jpg"
            alt="Моторное масло и фильтр"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 left-0 w-1/2 h-full">
          <img
            src="https://images.satu.kz/108081636_w640_h640_motornoe-maslo-motul.jpg"
            alt="Моторное масло и фильтр"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="py-12">
            <CarBrandCatalog serviceUrl="zamena-masla" serviceName="замены масла для" />
        </div>
      </div>

    </div>
  );
}