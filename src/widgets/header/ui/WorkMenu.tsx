'use client'
import { workMenuItems } from '../lib/headerNavigation';

export const WorkMenu = () => {

  return (
    <nav>
        {workMenuItems.map((item) => (
        <a key={item.href} href={'/service/'+item.href} className="mr-6">
            {item.label}
        </a>
        ))}
    </nav>
  );
};
