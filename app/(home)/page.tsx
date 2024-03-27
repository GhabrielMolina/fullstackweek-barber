// npx shadcn-ui@latest init
// Mover pastas para app e renomear
// Alterar tambem em components.json
// "components": "@/app/_components",
// "utils": "@/app/_lib/utils"


//npm i date-fns
//https://date-fns.org/v3.3.1/docs/format
import { format } from 'date-fns'
import Header from "../_components/header";
import { ptBR } from 'date-fns/locale/pt-BR';
import Search from './_components/search';
import BookingItem from '../_components/booking-item';
import { db } from '../_lib/prisma';
import BarbershopItem from './_components/barbershop-item';

export default async function Home() {
  // Chamar prisma e pegar barbearias (Com '../_lib/prisma' configurado)
  const barbershops = await db.barbershop.findMany({});

  return (
    <div>
      <Header />

      <div className='px-5 pt-5'>
        <h2 className='text-xl font-bold'>Olá, Miguel</h2>
        <p className='capitalize text-sm'>
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className='px-5 mt-6'>
        <Search />
      </div>

      {/* <div className='px-5 mt-6'>
        <h2 className='text-xs mb-3 uppercase text-gray-400 font-bold'>Agendamentos</h2>
          <BookingItem />
      </div> */}

      <div className='mt-6'>
        <h2 className='text-xs mb-3 px-5 uppercase text-gray-400 font-bold'>Recomendados</h2>

        {/* [&::-webkit-scrollbar]:hidden == Esconder a scrollbar */}
        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className='mt-6 mb-[4.5rem]'>
        <h2 className='text-xs mb-3 px-5 uppercase text-gray-400 font-bold'>Populares</h2>

        {/* [&::-webkit-scrollbar]:hidden == Esconder a scrollbar */}
        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
