export type CarBrandStatus = 0 | 1 | 2; // 0 - не показывать, 1 - показывать, 2 - популярен

export interface CarBrand {
  id: number;
  name: string;
  status: CarBrandStatus;
  createdAt: string;
  updatedAt: string;
  tecdocBrandId: number | null;
  model:CarModel[];  //Потом по хорошему поменять на models

  //В перспективе
  logo?:string | null;
  countModel?:number | null;
}
export interface CarModel {
    id:number,
    brandId:number,
    name: string,
    createdAt:string,
    updatedAt:string,
    generations: CarGeneration[],
    brand: CarBrand | null
}
export interface CarGeneration{
    id:number,
    modelId:number,
    name:string,
    startYear:number,
    endYear:number,
    image:string,
    createdAt:string,
    updatedAt:string,
    modifications:CarModification[]
}
export interface CarModification{
  id:number,
  generationId: number,
  name: string,
  fuelType: string,
  engineCode: string,
  engineSize: string,
  enginePower: number,
  oilVolume: null,
  kppType: string,
  driveType: string,
  bodyType: string,
  door: number,
  createdAt:string,
  updatedAt: string,
  tecdocId: null
}

export interface CarBrandsResponse extends Array<CarBrand> {}