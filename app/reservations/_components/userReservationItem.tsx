"use client"

import { Button } from "@/app/_components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import { toast } from "@/app/_hooks/use-toast"
import { Prisma, Property } from "@prisma/client"
import { CalendarClock, MapPin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/app/_components/ui/card"
import { useSession } from "next-auth/react"

interface UserReservationItemProps {
  reservation: Prisma.PropertyReservationsGetPayload<{
    include: { property: true }
  }>
  fetchReservations: () => void
}

const UserReservationItem = ({
  reservation,
  fetchReservations,
}: UserReservationItemProps) => {
  const [open, setOpen] = useState(false) // Controla a abertura do Alert Dialog

  const startDateTime = new Date(reservation.startDate)

  const formattedDate = startDateTime.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const formattedTime = startDateTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleDeleteReservation = async () => {
    try {
      const res = await fetch(`/api/reservations/${reservation.id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Erro ao cancelar reserva")
      }

      setOpen(false)
      toast({
        title: "Sucesso!",
        description: "Reserva cancelada com sucesso.",
        variant: "success",
      })
      fetchReservations()
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error)
    }
    {
      toast({
        title: "Erro",
        description: "Não foi possível cancelar a reserva.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="p-4 shadow-lg">
      <CardContent className="flex flex-col items-center gap-5 sm:flex-col sm:items-start">
        {/* Imagem da propriedade */}
        <div className="relative h-28 w-32 flex-shrink-0 sm:h-36 sm:w-40">
          <Image
            alt={reservation.property.name}
            src={reservation.property.coverImage}
            className="rounded-lg shadow-md"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>

        {/* Detalhes da reserva */}
        <div className="flex w-full flex-col sm:w-auto">
          <h2 className="text-center text-base font-semibold text-primaryDarker sm:text-left">
            {reservation.property.name}
          </h2>

          {/* Localização */}
          <div className="my-2 flex items-center gap-2 sm:gap-3">
            <MapPin size={18} />
            <p className="text-xs text-gray-500 sm:text-sm">
              {reservation.property.street}, {reservation.property.number} -{" "}
              {reservation.property.complement}
              <br />
              {reservation.property.city} / {reservation.property.state}
            </p>
          </div>

          {/* Data e hora */}
          <div className="flex items-center gap-2 sm:gap-3">
            <CalendarClock size={18} />
            <p className="text-xs text-gray-500 sm:text-sm">
              {formattedDate} às {formattedTime}
            </p>
          </div>

          {/* Botão de cancelamento */}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-4 w-full sm:w-auto">
                Cancelar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza de que deseja cancelar esta reserva?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Não, voltar
                </Button>
                <Button variant="destructive" onClick={handleDeleteReservation}>
                  Sim, cancelar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserReservationItem
