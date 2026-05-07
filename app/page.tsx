import { CarBrandCatalog } from '@/widgets/car-brand-catalog';
import { Header } from '@/widgets/header';

export default function HomePage() {
  return (
    <div className='bg-gray-100 '>
      <div className="container px-4 mx-auto">
        <CarBrandCatalog />
      </div>
    </div>
  );
}