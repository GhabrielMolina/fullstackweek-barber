import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";



interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    };
}

const BarbershopDetailsPage = async ({params} :BarbershopDetailsPageProps) => {
    if (!params.id) {
        // TODO: redirecionar para homepage
        return null
    }
    
    // Server component (await db se conecta com o banco)
    // findUnique Busca por algo unico que no caso seria quem tiver esse unico ID
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include:{
            service: true
        }
    })
    
    if(!barbershop) {
        // TODO: redirecionar para homepage
        return null
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.service.map(service => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
}
 
export default BarbershopDetailsPage;