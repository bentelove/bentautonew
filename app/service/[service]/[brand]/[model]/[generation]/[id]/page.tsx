import { CarCatalog } from "@/widgets/car-catalog/ui/CarCatalog";
import { CarServices } from "@/widgets/car-services/ui/CarServices";
import { Header } from "@/widgets/header";

interface ModelPageProps {
  params: {
    id: string;
    service: string;
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { id,service } = await params;
  
  return (
    <div className="bg-gray-100">
        <CarServices serviceUrl={service} modificationId={parseInt(id)}></CarServices>
    </div>
  );
}