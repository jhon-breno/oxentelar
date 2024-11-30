"use client"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Property } from "@prisma/client"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog"
import Image from "next/image"

interface PropertyReservationProps {
  property: Property
}

interface FormData {
  date: string
  time: string
  guests: number
}

const ProperyReservation = ({ property }: PropertyReservationProps) => {
  const { status } = useSession()
  const [isModalOpen, setModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>()

  const router = useRouter()
  const [loading] = useState(false)

  const validateDateTime = async (data: FormData) => {
    const selectedDateTime = new Date(`${data.date}T${data.time}`) // Converte data e hora para um objeto Date
    const now = new Date() // Data e hora atuais

    // Definindo a data e hora mínima permitida: 8 horas a partir do momento atual
    const minAllowedDateTime = new Date(now.getTime() + 8 * 60 * 60 * 1000) // 8 horas em milissegundos

    // Verifica se a data selecionada é no passado
    if (selectedDateTime < now) {
      setError("date", { message: "A data e hora não podem ser no passado." })
      return false
    }

    // Verifica se a hora selecionada é inferior a 8 horas a partir do momento atual
    if (selectedDateTime < minAllowedDateTime) {
      setError("date", {
        message:
          "A hora selecionada deve ser no mínimo 8 horas após a data e hora atual.",
      })
      return false
    }

    // Caso passe nas validações, retornamos true
    return true
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (await validateDateTime(data)) {
      const selectedDateTime = new Date(`${data.date}T${data.time}:00`)
      console.log(
        "Data e Hora selecionadas no frontend:",
        selectedDateTime.toISOString(),
      )
      console.log(status)

      // Envia a data como ISO para garantir a compatibilidade
      const response = await fetch("/api/reservations/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: selectedDateTime.toISOString(), // Converte para ISO com fuso horário UTC
          propertyId: property.id,
        }),
      })

      const res = await response.json()
      if (res.error) {
        // Exibe erro caso haja reserva
        console.error(res.error.message)
        alert(res.error.message) // Exibindo o erro para o usuário
      } else {
        if (status === "unauthenticated") {
          setModalOpen(true) // Abre a modal se o usuário não estiver autenticado
        } else {
          router.push(
            `/checkout?propertyId=${property.id}&date=${data.date}&time=${data.time}`,
          )
        }
        // Se não houver erro, o imóvel está disponível
        console.log("Reserva disponível")
      }
    }
  }

  const handleLogin = () => {
    signIn("google") // Substitua pelo caminho do seu login com Google
    setModalOpen(false) // Fecha a modal após redirecionamento
  }

  const handleCloseModal = () => {
    setModalOpen(false) // Fecha a modal
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
            valueAsNumber: true,
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
            disabled={loading}
            className="mt-3 w-full bg-primary font-semibold text-slate-50"
          >
            {loading ? "Verificando..." : "Agendar Visita"}
          </Button>
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogTitle>Usuário não logado</DialogTitle>
          <DialogDescription>Deseja realizar login?</DialogDescription>
          <Button
            variant="outline"
            className="gap-2 text-lg font-semibold"
            onClick={handleLogin}
          >
            <Image
              src="/google-icon.svg"
              width={20}
              height={20}
              alt="Fazer login com Google"
            />
            Google
          </Button>
          <Button variant="outline" onClick={handleCloseModal}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProperyReservation
