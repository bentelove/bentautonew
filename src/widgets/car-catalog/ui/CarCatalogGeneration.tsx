import { CarGeneration, CarModel } from "@/entities/car-brand/model/carBrand.types"
import Image from "next/image";
import Link from "next/link";

interface CatCatalogGenerationProps{
    activeGeneration: CarGeneration | null;
    setActiveGeneration: (activeModel:CarGeneration)=>void;
    generation?:CarGeneration,
    model?:CarModel | null
}

export const CarCatalogGeneration = ({activeGeneration,setActiveGeneration,model}:CatCatalogGenerationProps) => {


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
        <div className="flex">
            <div className="flex-1 border-r border-gray-200 p-4">
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
                    <div className="py-20 bg-gray-100">
                        <div className="text-xs text-center text-gray-400">Изображение отсутствует</div>
                    </div>
                }
            </div>
            <div className="flex-4">
                <div className="">{activeGeneration?.modifications.map(mod=>(
                    <Link key={mod.id} href={`/car/${mod.id}`} className="flex items-center gap-2 even:bg-gray-50 hover:bg-gray-100 cursor-pointer p-2">
                        <div className="flex-2">
                            <div className="text-lg">{mod.name}</div>
                            <div className="text-sm">{mod.fuelType} / {mod.kppType} / {mod.driveType} привод</div>
                        </div>
                        <div className="flex-1 text-lg">{mod.bodyType} {mod.door} дв.</div>
                        <div className="flex-1 text-lg">{mod.enginePower} л.с. </div>
                    </Link>
                ))}</div>
            </div>
        </div>
    </div>
    )
}