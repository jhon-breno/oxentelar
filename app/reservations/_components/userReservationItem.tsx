import { Button } from "@/app/_components/ui/button"
import { Prisma } from "@prisma/client"
import { CalendarClock, MapPin } from "lucide-react"
import Image from "next/image"

interface UserReservationItemProps {
  reservation: Prisma.PropertyReservationsGetPayload<{
    include: { property: true }
  }>
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  // Extração de data e hora de startDate
  const startDateTime = new Date(reservation.startDate)

  // Formatação de data e hora
  const formattedDate = startDateTime.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  const formattedTime = startDateTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="mt-5 flex items-center gap-3 rounded-lg border border-solid border-grayLighter p-5 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Imagem da propriedade */}
        <div className="relative h-[106px] w-[124px]">
          <Image
            alt={reservation.property.name}
            src={reservation.property.coverImage}
            className="rounded-lg shadow-lg"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        {/* Detalhes da reserva */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-primaryDarker">
            {reservation.property.name}
          </h2>
          {/* Localização */}
          <div className="my-1 flex items-center gap-3">
            <MapPin size={18} />
            <p className="w-[250px] text-xs text-gray-500">
              {reservation.property.street}, {reservation.property.number} -{" "}
              {reservation.property.complement}
              <br />
              {reservation.property.city} / {reservation.property.state}
            </p>
          </div>
          {/* Data e hora */}
          <div className="flex items-center gap-3">
            <CalendarClock size={18} />
            <p className="w-[250px] text-xs text-gray-500">
              {formattedDate} às {formattedTime}
            </p>
          </div>
          <Button variant="destructive" className="mt-5">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserReservationItem
