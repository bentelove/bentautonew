
interface ServicePageProps {
  params: {
    service: string;
  };
}

export default async function Service ({params}:ServicePageProps){
    const {service} = await params; 
    return <div>Service {service}</div>
}