'use client';

import { CarModel } from "@/entities/car-brand";
import { useCarModelCatalog } from "../../../widgets/car-model-catalog/model/useCarModelCatalog";
import Link from "next/link";

interface props{
    brandName:string,
    model:CarModel
}

export const CarModelView = ({brandName,model}:props) => {
  return (
    <div className="">
        <div className="py-15 rounded-lg bg-gray-100 text-center text-gray-400 text-xs">Изображение отсутствует</div>
        <div className="py-2">{brandName} {model.name}</div>
        <Link className="p-2 bg-red-600 block text-white text-center rounded-lg text-sm " href={`/model/${model.id}`}>Подробнее </Link>
    </div>
  );
};