import { updateImageCarGeneration } from "@/entities/car-brand/api/carBrandApi";
import { CarGeneration, CarModel } from "@/entities/car-brand/model/carBrand.types"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CatCatalogGenerationProps{
    activeGeneration: CarGeneration | null;
    setActiveGeneration: (activeModel:CarGeneration)=>void;
    generation?:CarGeneration,
    model?:CarModel | null,
    serviceUrl:string
}

export const CarCatalogGeneration = ({activeGeneration,setActiveGeneration,model,serviceUrl='all'}:CatCatalogGenerationProps) => {
    const [textImage,setTextImage] = useState<string>('')

    useEffect(()=>{
        setTextImage(activeGeneration?.image || '');
    },[activeGeneration])

    const hadleUpdateImage = ()=>{
        if(!activeGeneration)return <></>
        const update = updateImageCarGeneration(activeGeneration?.id || 0, textImage);
        setActiveGeneration({...activeGeneration,image:textImage})
    }

    if(!activeGeneration){
        return <></>
    }
    return (
    <div className="border-1 bg-white border-gray-200 rounded-lg mb-4">
        <div className="p-4 border-b-1 border-gray-200">
            <div className="text-lg font-bold">{model?.brand?.name} {model?.name} {activeGeneration?.name}</div>
            <div className="flex text-sm gap-4 text-gray-600">
                <div className="">Начало производства: <span className="font-bold">{activeGeneration?.startYear}</span></div>
                <div className="">Окончание производства: <span className="font-bold">{activeGeneration?.endYear}</span></div>
            </div>
        </div>
        <div className="flex lg:flex-row flex-col">
            <div className="flex-1 border-r border-gray-200 ">
                {activeGeneration.image&&
                    <Image 
                        src={activeGeneration.image}
                        alt={`${model?.brand?.name} ${model?.name} ${activeGeneration.name}`}
                        className="object-cover w-full"
                        width={300}
                        height={150}
                    />
                }

                        
                
                {!activeGeneration.image&&
                    <Image 
                        src={'https://cdn.lemanapro.ru/lmru/image/upload/c_pad/q_auto/f_auto/w_1000/h_1000/v1652787845/lmcode/DLZGMi6I6U-l-DH6pf0JnQ/90384094.jpg'}
                        alt={`${model?.brand?.name} ${model?.name} ${activeGeneration.name}`}
                        className="object-cover"
                        width={300}
                        height={150}
                    />
                }
            </div>
            <div className="flex-4">
                <div className="">{activeGeneration?.modifications.map(mod=>(
                    <Link key={mod.id} href={`/service/${serviceUrl}/${model?.brand?.url}/${model?.url}/${activeGeneration.url}/${mod.id}`} className="flex items-center gap-2 even:bg-gray-50 hover:bg-gray-100 cursor-pointer lg:p-2 p-4">
                        <div className="flex-3">
                            <div className="text-lg">{mod.name}</div>
                            <div className="text-sm">{mod.fuelType} / {mod.kppType} / {mod.driveType} привод</div>
                        </div>
                        <div className="flex-2 flex gap-2 flex-col lg:flex-row">
                            <div className="flex-1 text-lg">{mod.bodyType} {mod.door} дв.</div>
                            <div className="flex-1 text-lg">{mod.enginePower} л.с. </div>
                        </div>
                    </Link>
                ))}</div>
            </div>
        </div>
    </div>
    )
}