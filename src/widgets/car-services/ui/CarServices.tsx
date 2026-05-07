'use client';

import { CarModel } from "@/entities/car-brand";
import Link from "next/link";
import { CarModelView } from "../../../entities/car-brand/ui/CarModelView";
import { useMemo, useState } from "react";
import { SelectorPopular, typeSelectorPopular } from "../../../entities/car-brand/ui/SelectorPopular";
import { CatalogNavigation } from "@/features/ui/CatalogNavigation";
import { useCarServicesCatalog } from "../model/useCarServices";
import Image from "next/image";

interface CarModelCatalogProps{
  modificationId:number
}

export const CarServices = ({modificationId}:CarModelCatalogProps) => {
    const {modification,loading,error} = useCarServicesCatalog(modificationId);

  if (loading) {
    return <div className="text-center py-80 bg-gray-100 border-b-15 border-gray-200">Загрузка моделей...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="bg-gray-100 ">
      <div className="container px-4 mx-auto py-8">

        <CatalogNavigation 
            title={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`} 
            links={
                [
                    {href:'/',title:modification?.generation?.model?.brand?.name || ''},
                    {href:'/brand/'+modification?.generation?.model?.brand?.id,title:modification?.generation?.model?.name || ''},
                    {href:'/model/'+modification?.generation?.model?.id,title:modification?.generation?.name || ''},
                    {href:'/model/'+modification?.generation?.model?.id,title:modification?.name || ''}
                ]}
        >
         </CatalogNavigation>
        <div className="flex gap-4">
            <div className="flex-1">
                {modification?.generation?.image&&<Image className="rounded-lg" width={400} height={300} alt={`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name}`}  src={modification.generation.image} ></Image>}
            </div>
            <div className="flex-3">
                <h2 className="text-lg">Услуги для {`${modification?.generation?.model?.brand?.name} ${modification?.generation?.model?.name} ${modification?.generation?.name} ${modification?.name}`}</h2>
                <div className="mt-4 border border-gray-200">
                    <CarService name={"Замена моторного масла и масляного фильтра"} price={1400}></CarService>
                    <CarService name={"Замена воздушного фильтра"} price={350}></CarService>
                    <CarService name={"Замена салонного фильтра"} price={350}></CarService>
                    {modification?.fuelType=='Бензин'&&<CarService name={"Замена свечей зажигания"} price={1400}></CarService>}

                    {modification?.fuelType=='Бензин'&&<CarService name={"Замена топливного фильтра"} price={700}></CarService>}
                    {modification?.fuelType=='Дизель'&&<CarService name={"Замена топливного фильтра (дизельный двигатель)"} price={1050}></CarService>}

                    {modification?.kppType=="Автомат"&&<CarService name={"Замена масла в АКПП"} price={2100}></CarService>}
                    {modification?.kppType=="Механика"&&<CarService name={"Замена масла в МКПП"} price={1400}></CarService>}
                    {modification?.kppType=="Вариатор"&&<CarService name={"Замена масла в вариаторе"} price={3500}></CarService>}
                    {modification?.kppType=="Робот"&&<CarService name={"Замена масла в роботизированной коробке передач"} price={2100}></CarService>}

                    {modification?.driveType=="Полный"&&<CarService name={"Замена масла в раздаточной коробке"} price={1400}></CarService>}
                    {(modification?.driveType=="Полный"||modification?.driveType=="Задний")&&<>
                        <CarService name={"Замена масла в заднем дифференциале"} price={1400}></CarService>
                    </>}

                    <CarService name={"Замена передних тормозных дисков и колодок"} price={2100}></CarService>
                    <CarService name={"Замена передних тормозных колодок"} price={1400}></CarService>
                    <CarService name={"Замена задних тормозных дисков и колодок"} price={2100}></CarService>
                    <CarService name={"Замена задних тормозных колодок"} price={1400}></CarService>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

interface CarServiceProps{
    name:string,
    price?:number
}
const CarService =({name,price}:CarServiceProps) =>{
    const [check,setCheck] = useState(false)
    return <div className="flex items-center gap-2 bg-white even:bg-gray-50">
        <div className="flex-3 p-2">{name}</div>
        {price&&<div className="flex-1 p-2">от {price} ₽</div>}
        <div className="p-2">
            {!check&&<div onClick={()=>{setCheck(true)}}><div className="h-8 w-8 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg"></div></div>}
            {check&&<div onClick={()=>{setCheck(false)}}><div className="h-8 w-8 bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg"><div className="font-bold h-8 w-8 text-white text-center pt-1">+</div></div></div>}
        </div>
    </div>
}