"use client";
// Transformar server em client component por causa da interatividade do onClick no Button

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {Barbershop } from '@prisma/client'
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopItemPorps {
    barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop } : BarberShopItemPorps) => {
    const router = useRouter ();
    
    // função para jogar usuario para determinado link
    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`);
    }
    return ( 
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
            <CardContent className="px-1 py-0">
                <div className="w-full h-[159px] relative">
                    <div className="absolute top-2 left-2 z-50"> {/* z-50 == Para o position absolut ficar acima da IMG (x,y,z) */}
                        <Badge variant="secondary" className="opacity-90 flex gap-1 items-center top-3 left-3">
                            <StarIcon size={12} className="fill-primary text-primary" /> {/* text-primary == preenche traçado do SVG com a cor primary / fill-primary = preenche a SVG com a cor */}
                            <span className="text-xs">5,0</span>
                        </Badge>
                    </div>

                    <Image
                        src={barbershop.imageUrl} // Para aparecer IMG com essa src, configurar o next.config.mjs
                        alt={barbershop.name} 
                        style= {{objectFit: "cover",}} // Faz com que não distorça img (ultilizar fill e w-full h-[159px] relative)
                        fill
                        sizes="100vw" 
                        className="rounded-2xl" 
                    />
                </div>

                <div className="px-2 pb-3">
                    <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
                    <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                    <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BarbershopItem;