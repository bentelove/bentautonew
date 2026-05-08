import { CarBrandCatalog } from "@/widgets/car-brand-catalog";
import { CarCatalog } from "@/widgets/car-catalog/ui/CarCatalog";
import { CarModelCatalog } from "@/widgets/car-model-catalog/ui/CarModelCatalog";
import { Header } from "@/widgets/header";

interface BrandPageProps {
  params: {
    id: string;
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { id } = await params;
  
  return (
    <div className="bg-gray-100">
        <CarCatalog modelId={parseInt(id)}></CarCatalog>
    </div>
  );
}