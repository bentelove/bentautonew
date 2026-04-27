'use client'; // если в шапке есть интерактивность (бургер-меню, кнопка логина)

import { useHeader } from '../model/useHeader';
import { HeaderMenu } from './HeaderMenu';
import { Search } from './Search';
import { WorkMenu } from './WorkMenu';

export const Header = () => {
  const { show,setShow } = useHeader();

  return (
    <>
    <header className={`${show&&'border-b-5 border-gray-200'}`}>
        {show&&
        <div className='bg-gray-100 py-2'>
            <div className='container mx-auto'>
                <div className="flex justify-between items-center text-sm">
                    <div>Локация</div>
                    <HeaderMenu />
                    <div className=''>Личный кабинет</div>
                </div>
            </div>
        </div>
        }
        <div className='container mx-auto'>
            <div className="flex justify-between items-center gap-4 py-4">
                <div className="text-xl font-bold">Автосервис</div>
                <div className={`bg-red-600 text-white ${show?'py-3.5':'py-2'} px-6 border-gray-300 font-bold text-sm rounded-xl`}>Услуги</div>
                <Search/>
                <WorkMenu />
                {!show&&<div className='py-1.5 px-3 bg-red-600 text-white rounded-lg'>Личный кабинет</div>}
            </div>
        </div>
    </header>
    </>
  );
};