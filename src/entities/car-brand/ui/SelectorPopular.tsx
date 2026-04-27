export interface selectorPopularProps{
    type:typeSelectorPopular
    search:string,
    setSearch:(search:string) => void,
    popular:number,
    setPopular:(popular:number)=>void
}
export enum typeSelectorPopular{
    BRAND,
    MODEL
}
export const SelectorPopular = ({type,search,setSearch,popular,setPopular}:selectorPopularProps) => {

    const filterButtonClass = (isActive: boolean) => `
        p-3 text-sm cursor-pointer transition-colors
        ${isActive 
        ? 'bg-red-500 text-white hover:bg-red-700' 
        : 'bg-gray-100 hover:bg-gray-200'
        }
    `;

    return (
        <div className="flex mb-4 ">
            <button
                className={`${filterButtonClass(popular==2)} rounded-l-lg`}
                onClick={() => setPopular(2)}
                aria-pressed={popular==2}
            >
            Только популярные
            </button>
            <button
                className={`${filterButtonClass(popular==1)} rounded-r-lg`}
                onClick={() => setPopular(1)}
                aria-pressed={popular==1}
            >
            {(type===typeSelectorPopular.BRAND&&'Все марки')}
            {(type===typeSelectorPopular.MODEL&&'Все модели')}
            </button>
            <input 
                className="border-1 border-gray-200 ml-4 text-sm p-3 outline-none focus:border-gray-600 hover:border-gray-400 flex-1 rounded-lg " 
                type="text" 
                placeholder={`Поиск ${type===typeSelectorPopular.BRAND?'марки автомобиля':'модели'}`}
                aria-label={`Поиск ${type===typeSelectorPopular.BRAND?'марки автомобиля':'модели'}`}
                value={search} 
                onChange={(e)=>{setSearch(e.target.value)}}
            />
        </div>
    );
}