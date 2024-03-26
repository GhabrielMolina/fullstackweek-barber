"use server"
// Para poder ocultar os horários que já estão reservados, precisamos buscar as reservas do dia
import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const getDayBookings = async (date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date), // Maior que o final do dia
        gte: startOfDay(date), // Menor que o início do dia
      }
    }
  })

  return bookings;
}