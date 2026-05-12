
import { CarCatalog } from "@/widgets/car-catalog/ui/CarCatalog";
import { SiComsol } from "react-icons/si";
interface ServicePageProps {
  params: {
    service: string;
    brand:string;
    model:string;
    generation:string;
  };
}

export default async function ModelPage ({params}:ServicePageProps){
    const {service,brand,model,generation} = await params; 
  return (
    <div className="bg-gray-100">
        <CarCatalog serviceUrl={service} generationUrl={generation} brandUrl={brand} modelUrl={model}></CarCatalog>
    </div>
  );
}