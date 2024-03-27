import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {
  // Recuperar a sessão do usuário (ver se ele esta logado ou não)
  // É um server component, por isso adicionar o async e await
  const session = await getServerSession(authOptions)

  // Se o usuário não estiver logado, redirecionar para a página de inicio
  if (!session?.user) {
    return redirect('/')
  }

  const bookings = await db.booking.findMany({
    // Achar todos os agendamentos que tenham userId igual ao id do usuário logado
    where: {
      userId: (session.user as any).id
    },

    // Para poder colocar o nome do serviço do schema do prisma (service) no BookingItem
    include: {
      service: true,
      barbershop: true,
    },
  })

  // Filtrar os agendamentos que são futuros e os que são passados
  const confimedBookings = bookings.filter(booking => isFuture(booking.date))
  const finishedBooking = bookings.filter(booking => isPast(booking.date))

  return (
    <>
      <Header />

      <div className="px-4 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 font-bold uppercase text-sm mt-6 mb-3">Confirmados</h2>

        <div className="flex flex-col gap-3">
          {confimedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="text-gray-400 font-bold uppercase text-sm mt-6 mb-3">Finalizados</h2>

        <div className="flex flex-col gap-3">
          {finishedBooking.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BookingsPage;