import { CarBrandCatalog } from "@/widgets/car-brand-catalog";

export default async function ShodRazval() {
  return (
    <div className="bg-gray-100">

      {/* Блок 1: Текст сверху, картинка снизу на мобильных */}
      <div className="relative">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center">
            {/* Левая часть с контентом - на мобильных полная ширина */}
            <div className="w-full lg:w-1/2 py-12 lg:py-16 lg:pr-12">
              <h2 className="text-3xl font-bold mb-4">Компьютерный сход-развал — точность до миллиметра</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Правильные углы установки колес — это не только комфорт, но и безопасность, и экономия. 
                Неправильный сход-развал приводит к неравномерному износу шин, уводу автомобиля в сторону 
                и повышенному расходу топлива.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Мы работаем на современном 3D-стенде, который измеряет углы с точностью до 0.01 градуса. 
                Подходит для любых типов подвески: МакФерсон, многорычажная, торсионная балка.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Регулировка развала, схождения, кастора</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Проверка геометрии кузова при подозрении на деформацию</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Настройка после замены рулевых наконечников, сайлентблоков, рычагов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Распечатка параметров до и после регулировки</span>
                </li>
              </ul>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
                Записаться на сход-развал
              </button>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе справа */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://lh7-us.googleusercontent.com/Te6wuSoTtE5w-O5ihcQdqqUk2Kh52SgtQd4pLwmJj5f_7ceZGOM4WTrnZReR3vxFkppwud9SA7AGRfz8x-WutR3Rz_rESoiqH6jfQXUzgsimh35IZrIREwCQgctEhhj0s1wS2_It9xMrOa4mIRHYHfI"
            alt="Компьютерный сход-развал 3D стенд"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://lh7-us.googleusercontent.com/Te6wuSoTtE5w-O5ihcQdqqUk2Kh52SgtQd4pLwmJj5f_7ceZGOM4WTrnZReR3vxFkppwud9SA7AGRfz8x-WutR3Rz_rESoiqH6jfQXUzgsimh35IZrIREwCQgctEhhj0s1wS2_It9xMrOa4mIRHYHfI"
            alt="Компьютерный сход-развал 3D стенд"
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
              <h2 className="text-3xl font-bold mb-4">Когда нужно делать сход-развал?</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Рекомендуем проверять углы установки колес каждые 15 000 км пробега или сразу после появления 
                тревожных признаков. Не ждите, пока шины сотрутся "в ноль" — своевременная регулировка продлевает 
                их жизнь до 30%.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Также регулировка обязательна после любого ремонта ходовой части: замены рулевых тяг, 
                наконечников, шаровых опор, рычагов или сайлентблоков. Приезжайте к нам после замены 
                этих деталей — подтянем углы в ноль.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">30 мин</div>
                  <div className="text-sm text-gray-600">стандартная регулировка</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">+30%</div>
                  <div className="text-sm text-gray-600">ресурс шин после настройки</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе слева */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://ir.ozone.ru/s3/multimedia-1-o/7211519988.jpg"
            alt="Регулировка развала и схождения"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 left-0 w-1/2 h-full">
          <img
            src="https://ir.ozone.ru/s3/multimedia-1-o/7211519988.jpg"
            alt="Регулировка развала и схождения"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="py-12">
            <CarBrandCatalog serviceName="сход-развала для" />
        </div>
      </div>

    </div>
  );
}