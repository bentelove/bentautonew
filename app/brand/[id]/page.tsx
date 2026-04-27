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
    <div>
        <CarModelCatalog brandId={parseInt(id)}></CarModelCatalog>
    </div>
  );
}