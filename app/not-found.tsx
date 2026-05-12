import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-60 flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
          Эта страница еще в разработке
        </h2>
        <p className="text-gray-600 mb-8">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}