"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const cancelBooking = async (bookingId: string) => {
    await db.booking.delete({
    where: {
      id: bookingId
    }
  })
  // Remove o cash da página de agendamentos e atualiza a página
  revalidatePath("/");
  revalidatePath("/bookings");
}