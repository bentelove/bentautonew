import { CarCatalog } from "@/widgets/car-catalog/ui/CarCatalog";
import { Header } from "@/widgets/header";

interface ModelPageProps {
  params: {
    id: string;
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { id } = await params;
  
  return (
    <div className="bg-gray-100">
        <CarCatalog modelId={parseInt(id)}></CarCatalog>
    </div>
  );
}