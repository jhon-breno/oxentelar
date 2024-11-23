"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Property } from "@prisma/client"
import { BadgeDollarSignIcon, CalendarClock, MapPin } from "lucide-react"
import Image from "next/image"

interface CheckoutReservationProps {
  property: Property & { owner: { name: string; phone: string } } // Inclui os campos do proprietário
  date: string
  time: string
}

const CheckoutReservation = ({
  property,
  date,
  time,
}: CheckoutReservationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar a exibição da modal
  const router = useRouter()

  const formattedDate = new Date(`${date}T${time}`).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  const formattedTime = new Date(`${date}T${time}`).toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" },
  )
  const { data, status } = useSession()

  if (status === "unauthenticated") {
    router.push("/")
  }

  const contactUrl = `https://wa.me/5585999469423?text=${encodeURIComponent(
    `Olá, eu me chamo ${data?.user?.name}.
  Agendei uma visita para o imóvel ${property.name}, localizado em ${property.street}, ${property.number}, ${property.neighborhood}, ${property.city} - ${property.state}, no dia ${formattedDate} às ${formattedTime}.`,
  )}`

  // Função para abrir a modal
  const openModal = () => {
    setIsModalOpen(true)
  }

  // Função para fechar a modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Função para redirecionar para a página de reservas
  const goToReservations = () => {
    router.push("/reservations") // Redirecionar para a página de reservas
    closeModal() // Fechar a modal
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="mb-4 text-xl font-bold">Confirmação da Visita</h1>
      <div className="mb-5 mt-5 flex flex-col rounded-lg border border-solid border-grayLighter p-5 shadow-lg">
        <div className="flex items-center gap-3 border-b border-solid border-grayLighter pb-5">
          <div className="relative h-[106px] w-[124px]">
            <Image
              alt={property.name}
              src={property.coverImage}
              className="rounded-lg shadow-lg"
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-primaryDarker">
              {property.name}
            </h2>
            <div className="my-1 flex items-center gap-3">
              <MapPin size={18} />
              <p className="w-[250px] text-xs text-gray-500">
                {property.street}, {property.number} - {property.complement}
                <br />
                {property.city} / {property.state}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CalendarClock size={18} />
              <p className="w-[250px] text-xs text-gray-500">
                {formattedDate} às {formattedTime}
              </p>
            </div>
          </div>
        </div>
        {/* <h3 className="mt-3 text-lg font-semibold text-primaryDarker">
          Valor R$
        </h3> */}
        <div className="mt-3 flex items-center justify-between">
          <p className="font-medium text-primaryDarker">Valor Mensal:</p>
          <p className="font-bold text-primaryDarker">
            <BadgeDollarSignIcon size={22} />
          </p>
          <p>R$ {property.pricePerMonth.toString()},00</p>
        </div>
      </div>

      <button
        onClick={() => window.open(contactUrl, "_blank")}
        className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Confirmar e enviar ao Proprietário
      </button>

      <button
        onClick={openModal} // Abrir a modal ao clicar
        className="mt-2 w-full rounded bg-primary px-4 py-2 text-white hover:bg-primaryDarker"
      >
        Minhas Reservas
      </button>

      {/* Modal de confirmação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Ir para Minhas Reservas?
            </h2>
            <p className="mb-4">
              Você deseja ir para a página de Minhas Reservas?
            </p>
            <div className="flex justify-between">
              <button
                onClick={closeModal} // Fechar a modal
                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={goToReservations} // Confirmar e ir para a página de reservas
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutReservation
