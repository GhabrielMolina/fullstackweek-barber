"use client";

import { Button } from "@/app/_components/ui/button";
// https://ui.shadcn.com/docs/components/calendar
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../_halpers/hours";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/save-booking";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/get-day-booking";


// https://ui.shadcn.com/docs/components/calendar

interface ServiceItemProps {
  barbershop: Barbershop
  service: Service
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, barbershop, isAuthenticated }: ServiceItemProps) => {
  const router = useRouter()
  const { data } = useSession()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()

  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  // Sempre que mudar a data vai gerar uma nova lista de horários
  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);

      setDayBookings(_dayBookings);
    };

    // Sempre que a Date mudar, vai executar a função
    refreshAvailableHours();
  }, [date, barbershop.id]);

  // Quado seleciona outra data, reseta os horários selecionados
  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => {
    setHour(time)
  }

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn('google');
    }
  }

  const handleBookinglSubmit = async () => {
    setSubmitIsLoading(true)
    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      // split para separar a string em um array
      // hour: "09:45"
      // Então [09][45]
      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      })

      setSheetIsOpen(false)
      setHour(undefined)
      setDate(undefined)
      toast('Reserva realizada com sucesso', {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.", {locale: ptBR}),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitIsLoading(false)
    }
  }

  // Apartir do modelo de código em hours.ts
  // Vai gerar a lista de hórarios com useMemo que so vai executar o return quando o [date] mudar
  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter(time => {
      // time: "09:00"
      // Se houver alguma reserva para o horário em "dayBookings", não vai mostrar
      const timeHour = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])


      // Verificar se existe alguma reserva para o horário
      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })
      if (!booking) {
        return true;
      }
      return false;
    });
  }, [date, dayBookings])


  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image className="rounded-lg" src={service.imageUrl} fill style={{ objectFit: 'contain' }} alt={service.name} />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">{Intl.NumberFormat( //Metodo para formatar preço com JS
                "pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    {/* https://ui.shadcn.com/docs/components/calendar */}
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      // Data minima, a de hoje
                      fromDate={addDays(new Date(), 1)}
                      // https://react-day-picker.js.org/basics/customization
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize'
                        },
                        cell: {
                          width: '100%'
                        },
                        button: {
                          width: '100%'
                        },
                        nav_button_previous: {
                          // ou colocar fit-cointent e Ocupar apenas espaço que precisa
                          width: '32px',
                          height: '32px'
                        },
                        nav_button_next: {
                          width: '32px',
                          height: '32px'
                        },
                        caption: {
                          textTransform: 'capitalize'
                        }
                      }}
                    />
                  </div>

                  {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
                  {date && (
                    <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                      {/* Para cada time executa a função (Loop) */}
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? 'default' : 'outline'}
                          className="rounded-full"
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="flex flex-col p-3 gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">
                            {' '}
                            {/* Metodo para formatar preço com JS */}
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        {/* Quando data estiver selecionada */}
                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Data</h3>
                            {/* Formatar data com date.fns */}
                            <h4 className="text-sm">{format(date, "dd 'de' MMMM", {
                              locale: ptBR,
                            })}
                            </h4>
                          </div>
                        )}

                        {/* Quando hora estiver selecionada */}
                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">Horário</h3>
                            <h4 className="text-sm">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">Barbearia</h3>
                          <h4 className="text-sm">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button onClick={handleBookinglSubmit} disabled={(!hour || !date) || submitIsLoading}>
                      {submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirmar Reserva
                    </Button>
                  </SheetFooter>

                </SheetContent>
              </Sheet>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceItem;