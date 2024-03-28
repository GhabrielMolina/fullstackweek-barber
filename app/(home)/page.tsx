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
import { db } from '../_lib/prisma';
import BarbershopItem from './_components/barbershop-item';
import { getServerSession } from 'next-auth';
import BookingItem from '../_components/booking-item';
import { authOptions } from '../_lib/auth';

export default async function Home() {
  // Recuperar a sessão do usuário (ver se ele esta logado ou não)
  const session = await getServerSession(authOptions)

  // Promise.all == executar as duas promessas ao mesmo tempo
  const [barbershops, confirmedBookings] = await Promise.all([
    // Chamar prisma e pegar barbearias (Com '../_lib/prisma' configurado)
    db.barbershop.findMany({}),

    session?.user ? db.booking.findMany({
      // Achar todos os agendamentos que tenham userId igual ao id do usuário logado
      where: {
        userId: (session.user as any).id,
        // Filtrar os agendamentos que são futuros e os que são futuros
        date: {
          // No banco de dados -> gte = Maior ou igual que
          gte: new Date()
        }
      },

      // Para poder colocar o nome do serviço do schema do prisma (service) no BookingItem
      include: {
        service: true,
        barbershop: true,
      },
    }) : Promise.resolve([])
  ])

  return (
    <div>
      <Header />

      <div className='px-5 pt-5'>
        <h2 className='text-xl font-bold'>{session?.user ? `Olá, ${session.user.name?.split(" ")[0]}` : 'Olá! Vamos agendar um corte hoje?'}</h2>
        <p className='capitalize text-sm'>
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className='px-5 mt-6'>
        <Search />
      </div>

      <div className='mt-6'>
        {confirmedBookings.length > 0 && (
          <>
            <h2 className='text-xs mb-3 pl-5 uppercase text-gray-400 font-bold'>Agendamentos</h2>

            <div className='px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
              {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
            </div>
          </>
        )}

      </div>

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
