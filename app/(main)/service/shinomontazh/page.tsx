import { CarBrandCatalog } from "@/widgets/car-brand-catalog";

export default async function Shinomontazh() {
  return (
    <div className="bg-gray-100">

      {/* Блок 1: Текст сверху, картинка снизу на мобильных */}
      <div className="relative">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center">
            {/* Левая часть с контентом - на мобильных полная ширина */}
            <div className="w-full lg:w-1/2 py-12 lg:py-16 lg:pr-12">
              <h2 className="text-3xl font-bold mb-4">Профессиональный шиномонтаж на современном оборудовании</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Качественный шиномонтаж — это не только сезонная смена резины, но и ваша безопасность на дороге. 
                Мы используем профессиональные шиномонтажные станки и балансировочные стенды последнего поколения.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Аккуратно демонтируем и устанавливаем шины любых размеров — от легковых до внедорожников. 
                Работаем с низкопрофильной резиной, RunFlat и шинами повышенной проходимости.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Бесконтактная демонтаж/монтаж — без повреждения дисков</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Компьютерная балансировка с грузиками нового поколения</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Ремонт проколов и боковых порезов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Восстановление вентилей и обработка герметиком</span>
                </li>
              </ul>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
                Записаться на шиномонтаж
              </button>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе справа */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://file.euroauto.ru/v2/file/content-admin/meduza-pages/7902.jpg"
            alt="Профессиональный шиномонтаж"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://file.euroauto.ru/v2/file/content-admin/meduza-pages/7902.jpg"
            alt="Профессиональный шиномонтаж"
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
              <h2 className="text-3xl font-bold mb-4">Балансировка колес и сезонное хранение</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Правильная балансировка — залог равномерного износа шин и комфортной езды без вибраций. 
                Мы используем высокоточные балансировочные станки с лазерным прицелом.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Предлагаем удобное сезонное хранение шин в сухом отапливаемом помещении. Маркируем каждое 
                колесо, храним в вертикальном положении — резина не деформируется и сохраняет свои свойства.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">до 60 мин</div>
                  <div className="text-sm text-gray-600">полный цикл на 4 колеса</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">100%</div>
                  <div className="text-sm text-gray-600">точность балансировки</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе слева */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://avatars.mds.yandex.net/get-altay/4614377/2a0000017a1a38579fced8772f97b7191d4d/XXL_height"
            alt="Балансировка колес и хранение шин"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 left-0 w-1/2 h-full">
          <img
            src="https://avatars.mds.yandex.net/get-altay/4614377/2a0000017a1a38579fced8772f97b7191d4d/XXL_height"
            alt="Балансировка колес и хранение шин"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="py-12">
            <CarBrandCatalog serviceUrl="shinomontazh" serviceName="шиномонтажа для" />
        </div>
      </div>

    </div>
  );
}