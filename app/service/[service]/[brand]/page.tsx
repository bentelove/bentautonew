import { CarModelCatalog } from "@/widgets/car-model-catalog/ui/CarModelCatalog";
import { Header } from "@/widgets/header";

interface BrandPageProps {
  params: {
    brand: string;
    service:string;
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand,service } = await params;
  
  return (
    <div className="">
        <CarModelCatalog serviceUrl={service} brandUrl={brand}></CarModelCatalog>
    </div>
  );
}