"use client"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Property } from "@prisma/client"

interface PropertyReservationProps {
  property: Property
}

const ProperyReservation = ({ property }: PropertyReservationProps) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 px-4">
        <div className="flex w-full gap-5">
          <Input type="date" />
          <Input type="time" />
        </div>
        <Input
          type="text"
          placeholder={`Número de pessoas (Ideal: ${property.maxGuests})`}
        />
        <div className="w-full border-b border-gray-400 pb-10">
          <Button className="mt-3 w-full bg-primary font-semibold text-slate-50">
            Agendar Visita
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProperyReservation
