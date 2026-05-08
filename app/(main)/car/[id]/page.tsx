import { CarCatalog } from "@/widgets/car-catalog/ui/CarCatalog";
import { CarServices } from "@/widgets/car-services/ui/CarServices";
import { Header } from "@/widgets/header";

interface CarPageProps {
  params: {
    id: string;
  };
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;
  
  return (
    <div className="bg-gray-100">
        <CarServices modificationId={parseInt(id)}></CarServices>
    </div>
  );
}