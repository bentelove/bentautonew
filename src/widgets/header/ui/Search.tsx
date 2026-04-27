'use client';

import { useHeader } from "../model/useHeader";

interface SearchProps{
    show:boolean
}

export const Search = () => {
  const { show,setShow } = useHeader();

  return (
    <input type="text" className={`border-2 outline-none text-sm flex-1 ${show?'py-3':'py-1.5'} px-6 border-gray-300 text-gray-400 rounded-xl`} placeholder="Поиск"/>
  );
};