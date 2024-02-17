"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop;
}

const BarbershopInfo = ({barbershop} : BarbershopInfoProps) => {
    const router = useRouter();
    
    const handleBackClick = () => {
        router.replace("/");
    }

    return ( 
    <div>
        <div className="h-[250px] w-full relative">
            <Button className="absolute z-50 top-4 left-4" size="icon" variant="outline" onClick={handleBackClick}>
                <ChevronLeftIcon />
            </Button>

            <Button className="absolute z-50 top-4 right-4" size="icon" variant="outline" >
                <MenuIcon />
            </Button>

            <Image 
                src={barbershop.imageUrl} 
                fill // fazer com q a IMG ocupe 100% da Largura e Altura da div Pai com position relative
                alt={barbershop.name}
                style={{objectFit: "cover",}} // Faz com que não distorça a IMG
                className="opacity-75"
                /> 
        </div>

        <div>
            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold ">{barbershop.name}</h1>
                
                <div className="flex items-center gap-1 mt-2">
                    <MapPinIcon className="text-primary" size={18}/>
                    <p className="text-sm">{barbershop.address}</p> 
                </div>

                <div className="flex items-center gap-1 mt-2">
                    <StarIcon className="text-primary" size={18}/>
                    <p className="text-sm">5,0 (889 avaliações)/</p> 
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default BarbershopInfo;

 