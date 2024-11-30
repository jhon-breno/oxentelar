"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Property } from "@prisma/client"
import { BadgeDollarSignIcon, CalendarClock, MapPin } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card"

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
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal de reservas
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false) // Modal de sucesso (Reserva Criada)
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

  const contactUrl = `https://wa.me/${property.owner.phone}?text=${encodeURIComponent(
    `Olá, eu me chamo ${data?.user?.name}.
    Agendei uma visita para o imóvel ${property.name}, localizado em ${property.street}, ${property.number}, ${property.complement}, ${property.city} - ${property.state}, no dia ${formattedDate} às ${formattedTime}.`,
  )}`

  // Função para abrir a modal de sucesso
  const openSuccessModal = () => {
    setIsSuccessModalOpen(true)
  }

  // Função para fechar a modal de sucesso
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
  }

  // Função para abrir a modal de reserva
  const openModal = () => {
    setIsModalOpen(true)
  }

  // Função para fechar a modal de reserva
  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleBuyClick = async () => {
    try {
      const startDate = new Date(`${date}T${time}`).toISOString() // Converter para o formato ISO 8601
      const endDate = startDate // Usar a mesma data para endDate, caso seja necessário ajustar, altere aqui

      const response = await fetch(
        "http://localhost:3000/api/reservations/create",
        {
          method: "POST",
          body: JSON.stringify({
            propertyId: property.id,
            startDate: startDate, // Enviar data no formato correto
            endDate: endDate, // Enviar data no formato correto
            userId: (data?.user as any)?.id,
            totalRent: property.pricePerMonth,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Erro ao criar reserva: ${response.statusText}`)
      }

      openSuccessModal()
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error)
    }
  }

  // Função para redirecionar para a página de reservas
  const goToReservations = () => {
    router.push("/reservations") // Redirecionar para a página de reservas
    closeSuccessModal() // Fechar a modal de sucesso
  }

  // Função para enviar a mensagem via WhatsApp
  const sendToOwner = () => {
    window.open(contactUrl, "_blank") // Abre o WhatsApp com a mensagem
    goToReservations() // Redireciona para a página de Minhas Reservas após enviar a mensagem
  }

  return (
    <Card className="mt-5 p-4">
      <CardTitle className="mb-5 text-2xl font-semibold text-primaryDarker">
        Confirmação de Agendamento
      </CardTitle>
      <CardContent className="mb-5 flex flex-col gap-5 lg:flex-row">
        <div className="mb-5 mt-5 flex flex-col rounded-lg border border-solid border-grayLighter p-5 shadow-lg sm:w-[50%] lg:w-[50%]">
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

          <div className="mt-3 flex items-center justify-between">
            <p className="font-medium text-primaryDarker">Valor Mensal:</p>
            <p className="font-bold text-primaryDarker">
              <BadgeDollarSignIcon size={22} />
            </p>
            <p>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(property.pricePerMonth)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between lg:justify-center">
          <button
            onClick={handleBuyClick} // Chamar a função para criar a reserva
            className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Confirmar e enviar ao Proprietário
          </button>

          <button
            onClick={openModal} // Abrir a modal de reservas
            className="mt-2 w-full rounded bg-primary px-4 py-2 text-white hover:bg-primaryDarker"
          >
            Minhas Reservas
          </button>
        </div>

        {/* Modal de sucesso (Reserva Criada) */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-sm rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold">Reserva Criada</h2>
              <p className="mb-4">Sua reserva foi criada com sucesso!</p>
              <div className="flex justify-between">
                <button
                  onClick={goToReservations} // Redireciona para a página de Minhas Reservas
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  Fechar
                </button>
                <button
                  onClick={sendToOwner} // Envia mensagem via WhatsApp e redireciona
                  className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Enviar ao proprietário
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de reserva */}
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
      </CardContent>
    </Card>
  )
}

export default CheckoutReservation
