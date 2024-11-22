"use client"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Property } from "@prisma/client"
import { useForm } from "react-hook-form"

interface PropertyReservationProps {
  property: Property
}

const ProperyReservation = ({ property }: PropertyReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: unknown) => {
    console.log({ data })
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4 px-4">
        <div className="flex w-full gap-5">
          <Input
            type="date"
            {...register("date", { required: "Data é obrigatória" })}
          />
          {errors.date?.message && (
            <p className="text-sm text-red-500">
              {String(errors.date.message)}
            </p>
          )}

          <Input
            type="time"
            {...register("time", { required: "Horário é obrigatório" })}
          />
          {errors.time?.message && (
            <p className="text-sm text-red-500">
              {String(errors.time.message)}
            </p>
          )}
        </div>

        <Input
          type="text"
          placeholder={`Número de pessoas (Ideal: ${property.maxGuests})`}
          {...register("guests", {
            required: "Número de pessoas é obrigatório",
          })}
        />
        {errors.guests?.message && (
          <p className="text-sm text-red-500">
            {String(errors.guests.message)}
          </p>
        )}

        <div className="w-full border-b border-gray-400 pb-10">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="mt-3 w-full bg-primary font-semibold text-slate-50"
          >
            Agendar Visita
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProperyReservation
