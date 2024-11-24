"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Prisma, PropertyReservations } from "@prisma/client"
import UserReservationItem from "./_components/userReservationItem"
import { Button } from "../_components/ui/button"

const MyReservations = () => {
  const [reservations, setReservations] = useState<
    Prisma.PropertyReservationsGetPayload<{
      include: { property: true }
    }>[]
  >([])
  const { status, data } = useSession()
  const router = useRouter()

  const fetchReservations = async () => {
    const userId = (data?.user as any)?.id
    console.log("User ID:", userId) // Verifique se o userId está correto

    if (!userId) {
      console.error("User ID is missing!")
      return
    }

    const response = await fetch(
      `http://localhost:3000/api/user/${userId}/reservations`,
    )

    if (!response.ok) {
      console.error("Error fetching reservations:", response.statusText)
      return
    }

    const json = await response.json()
    setReservations(json)
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/")
    }

    fetchReservations()
  }, [status, data])

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primaryDarker">
        Minhas Reservas
      </h1>
      {reservations.length > 0 ? (
        reservations?.map((reservation) => (
          <UserReservationItem
            key={reservation.id}
            reservation={reservation}
            fetchReservations={fetchReservations}
          />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="mt-2 font-medium text-primaryDarker">
            Nenhuma reserva encontrada.
          </p>
          <Button className="mt-5 text-white" onClick={() => router.push("/")}>
            Fazer Reserva
          </Button>
        </div>
      )}
    </div>
  )
}

export default MyReservations
