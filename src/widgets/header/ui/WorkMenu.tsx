'use client'
import { usePathname } from 'next/navigation';
import { workMenuItems } from '../lib/headerNavigation';
import Link from 'next/link';

export const WorkMenu = () => {
  const pathname = usePathname();

  return (
    <nav>
        {workMenuItems.map((item) => {
          const href = '/service' + item.href;
          const isActive = pathname === href;
          console.log(pathname, href);
          
          return (
            <Link 
              key={item.href} 
              href={href} 
              className={`mr-6 ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-500'}`}
            >
              {item.label}
            </Link>
          );
        })}
    </nav>
  );
};