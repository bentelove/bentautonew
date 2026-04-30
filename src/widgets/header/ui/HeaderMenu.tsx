'use client'
import { topMenuItem } from '../lib/headerNavigation';

export const HeaderMenu = () => {

  return (
    <nav>
        {topMenuItem.map((item) => (
        <a key={item.href} href={item.href} className="mr-4 inline-block">
            {item.label}
        </a>
        ))}
    </nav>
  );
};
