import { CarBrandCatalog } from "@/widgets/car-brand-catalog";

export default async function Diagnostika() {
  return (
    <div className="bg-gray-100">

      {/* Блок 1: Текст сверху, картинка снизу на мобильных */}
      <div className="relative">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center">
            {/* Левая часть с контентом - на мобильных полная ширина */}
            <div className="w-full lg:w-1/2 py-12 lg:py-16 lg:pr-12">
              <h2 className="text-3xl font-bold mb-4">Диагностика ходовой части и подвески</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Стуки, скрипы, вибрации и увод автомобиля в сторону — первые признаки проблем с ходовой частью. 
                Наши механики проведут тщательную проверку всех узлов и агрегатов на подъемнике.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Мы диагностируем состояние амортизаторов, сайлентблоков, шаровых опор, рулевых наконечников, 
                ШРУСов и других элементов подвески. Своевременное обнаружение неисправностей предотвратит 
                аварийную поломку в пути и сэкономит ваш бюджет.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Проверка всех элементов подвески и рулевого управления</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Поиск причин вибраций и шумов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Осмотр тормозной системы и ступичных подшипников</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Рекомендации по ремонту с приоритетом безопасности</span>
                </li>
              </ul>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
                Записаться на диагностику
              </button>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе справа */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://lavina-service.ru/wp-content/uploads/2020/05/1_666.jpg"
            alt="Диагностика подвески автомобиля"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
          <img
            src="https://lavina-service.ru/wp-content/uploads/2020/05/1_666.jpg"
            alt="Диагностика подвески автомобиля"
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
              <h2 className="text-3xl font-bold mb-4">Что мы проверяем при слесарной диагностике</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Наши мастера-слесари с опытом от 10 лет проведут полное механическое обследование автомобиля. 
                Мы работаем "руками" — проверяем люфты, стуки, визуальный износ деталей.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                При необходимости подключаем компьютерную диагностику для проверки электронных систем (ABS, ESP, 
                подушки безопасности). Но основной упор делаем на механику — то, что действительно влияет 
                на управляемость и безопасность.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">30 мин</div>
                  <div className="text-sm text-gray-600">полная проверка ходовой</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                  <div className="text-2xl font-bold text-red-600">100%</div>
                  <div className="text-sm text-gray-600">честный диагноз без завышения</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Картинка - на мобильных снизу, на десктопе слева */}
        <div className="block lg:hidden w-full h-64 mb-12">
          <img
            src="https://images.satu.kz/108081636_w640_h640_motornoe-maslo-motul.jpg"
            alt="Слесарная диагностика автомобиля"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="hidden lg:block absolute top-0 left-0 w-1/2 h-full">
          <img
            src="https://images.satu.kz/108081636_w640_h640_motornoe-maslo-motul.jpg"
            alt="Слесарная диагностика автомобиля"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="py-12">
            <CarBrandCatalog />
        </div>
      </div>

    </div>
  );
}