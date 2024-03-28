import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

const BookingsPage = async () => {
  // Recuperar a sessão do usuário (ver se ele esta logado ou não)
  // É um server component, por isso adicionar o async e await
  const session = await getServerSession(authOptions)

  // Se o usuário não estiver logado, redirecionar para a página de inicio
  if (!session?.user) {
    return redirect('/')
  }

  // Promise.all == executar as duas promessas ao mesmo tempo
  const [confirmedBookings, finishedBooking] = await Promise.all([
    db.booking.findMany({
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
    }),

    db.booking.findMany({
      // Achar todos os agendamentos que tenham userId igual ao id do usuário logado
      where: {
        userId: (session.user as any).id,
        // Filtrar os agendamentos que são futuros e os que são passados
        date: {
          // No banco de dados -> lt = menor que
          lt: new Date()
        }
      },

      // Para poder colocar o nome do serviço do schema do prisma (service) no BookingItem
      include: {
        service: true,
        barbershop: true,
      },
    })

  ])
  return (
    <>
      <Header />

      <div className="px-4 py-6">
        <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 font-bold uppercase text-sm mb-3">Confirmados</h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBooking.length > 0 && (
          <>
            <h2 className="text-gray-400 font-bold uppercase text-sm mt-6 mb-3">Finalizados</h2>

            <div className="flex flex-col gap-3">
              {finishedBooking.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default BookingsPage;