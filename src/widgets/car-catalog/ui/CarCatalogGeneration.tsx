import { CarGeneration, CarModel } from "@/entities/car-brand/model/carBrand.types"
import Image from "next/image";
import { useEffect } from "react"

interface CatCatalogGenerationProps{
    activeGeneration: CarGeneration | null;
    setActiveGeneration: (activeModel:CarGeneration)=>void;
    generation?:CarGeneration,
    model?:CarModel | null
}

export const CarCatalogGeneration = ({activeGeneration,setActiveGeneration,model}:CatCatalogGenerationProps) => {
    const modificationsCount = activeGeneration?.modifications?.length ?? 0;

    if(!activeGeneration){
        return <></>
    }
    return (
    <div className="border-1 border-gray-200 rounded-lg mb-4">
        <div className="p-4 bg-gray-100">
            <div className="text-lg font-bold">{model?.brand?.name} {model?.name} {activeGeneration?.name}</div>
            <div className="flex text-sm gap-4 text-gray-600">
                <div className="">Начало производства: <span className="font-bold">{activeGeneration?.startYear}</span></div>
                <div className="">Окончание производства: <span className="font-bold">{activeGeneration?.endYear}</span></div>
            </div>
        </div>
        <div className="flex">
            <div className="flex-1 bg-gray-100 border-r border-gray-200">
                {activeGeneration.image&&
                    <Image 
                        src={activeGeneration.image}
                        alt={`${model?.brand?.name} ${model?.name} ${activeGeneration.name}`}
                        className="object-cover"
                        width={300}
                        height={150}
                    />
                }
                {!activeGeneration.image&&
                    <div className="py-20">
                        <div className="text-xs text-center text-gray-400">Изображение отсутствует</div>
                    </div>
                }
            </div>
            <div className="flex-4 border-t-1 border-gray-200 text-sm text-gray-500 text-center p-30">
                {modificationsCount == 0&&<div>Загрузка модификаций {model?.brand?.name} {model?.name} {activeGeneration?.name}</div>}
            </div>
        </div>
    </div>
    )
}