import { BannerCarousel, BannerSlide } from '@/widgets/banner-carouser/ui/BannerCarousel';
import { CarBrandCatalog } from '@/widgets/car-brand-catalog';

export default function HomePage() {
  const services = [
    {
      href: '/service/zamena-masla',
      title: 'Замена масла',
      description: 'Замена моторного масла и масляного фильтра с гарантией качества. Подберем масло по допускам вашего авто.',
      icon: '🛢️',
      time: '30 мин',
      price: 'от 1 400 ₽'
    },
    {
      href: '/service/diagnostika',
      title: 'Диагностика',
      description: 'Слесарная диагностика ходовой части, подвески, тормозной системы и рулевого управления.',
      icon: '🔧',
      time: '30 мин',
      price: 'от 1 050 ₽'
    },
    {
      href: '/service/shinomontazh',
      title: 'Шиномонтаж',
      description: 'Профессиональная смена резины, балансировка, ремонт проколов и сезонное хранение шин.',
      icon: '🚗',
      time: '40 мин',
      price: 'от 1 500 ₽'
    },
    {
      href: '/service/shod-razval',
      title: 'Сход-развал',
      description: 'Компьютерная регулировка углов установки колес на 3D-стенде с распечаткой параметров.',
      icon: '⚙️',
      time: '30 мин',
      price: 'от 2 000 ₽'
    }
  ];
  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      title: 'Профессиональный автосервис',
      subtitle: 'Ремонт и обслуживание любых марок автомобилей',
      description: 'Работаем с 2008 года. Гарантия на все виды работ. Бесплатная диагностика при ремонте.',
      buttonText: 'Записаться онлайн',
      buttonLink: '/services',
      imageUrl: 'https://www.timeout.ru/wp-content/uploads/places/4edfd3061b8a94d6790a1ff572ae501c.jpg',
      bgColor: '#0f172a',
      textColor: 'text-white',
      accentColor: 'bg-red-600/60 backdrop-blur-sm hover:bg-red-700 text-white',
      customContent: (
        <div className="flex gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold">15+</div>
            <div className="text-sm">лет опыта</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold">5000+</div>
            <div className="text-sm">клиентов</div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Замена масла за 30 минут',
      subtitle: 'Качественные масла и фильтры в наличии',
      description: 'Motul, Shell, Castrol, LIQUI MOLY и другие бренды.',
      buttonText: 'Узнать стоимость',
      buttonLink: '/service/zamena-masla',
      imageUrl: 'https://formulamotors.ru/upload/resize_cache/webp/images/pages/1.webp',
      bgColor: '#1a1a2e',
      textColor: 'text-white',
      accentColor: 'bg-red-600/60 backdrop-blur-sm  hover:bg-red-700 text-white',
      customContent: (
        <div className="flex gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold">30 мин</div>
            <div className="text-sm">время замены</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm">гарантия</div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Компьютерный сход-развал',
      subtitle: '3D-стенд с точностью до 0.01°',
      description: 'Правильная регулировка углов колес продлевает жизнь шин до 30%',
      buttonText: 'Записаться',
      buttonLink: '/service/shod-razval',
      imageUrl: 'https://formulamotors.ru/upload/resize_cache/webp/images/pages/1.webp',
      bgColor: '#0a0a0a',
      textColor: 'text-white',
      accentColor: 'bg-red-600/60 backdrop-blur-sm  hover:bg-red-700 text-white',
      customContent: (
        <div className="flex gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold">30 мин</div>
            <div className="text-sm">настройка</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
            <div className="text-2xl font-bold">+30%</div>
            <div className="text-sm">ресурс шин</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className='bg-gray-100 min-h-screen'>
      <BannerCarousel 
        slides={bannerSlides}
        autoPlayInterval={10000}
        showDots={true}
        showArrows={true}
      />

      {/* Каталог марок автомобилей */}
      <div className="container px-4 mx-auto mt-12">
        <CarBrandCatalog />
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Профессиональный ремонт и обслуживание автомобилей любых марок. 
            Работаем с 2008 года, гарантия на все виды работ.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <a
                key={service.href}
                href={service.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>⏱️</span>
                      <span>{service.time}</span>
                    </div>
                    <div className="text-red-600 font-bold">
                      {service.price}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Кнопка "Все услуги" */}
          <div className="text-center mt-10">
            <a 
              href="/services" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300"
            >
              Смотреть все услуги
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}