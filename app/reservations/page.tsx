"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Prisma } from "@prisma/client"
import UserReservationItem from "./_components/userReservationItem"
import { Button } from "../_components/ui/button"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id: string
    } & DefaultSession["user"]
  }
}

const MyReservations = () => {
  const [reservations, setReservations] = useState<
    Prisma.PropertyReservationsGetPayload<{
      include: { property: true }
    }>[]
  >([])
  const { status, data } = useSession()
  const router = useRouter()

  const fetchReservations = async () => {
    const userId = data?.user?.id
    console.log("User ID:", userId) // Verifique se o userId está correto

    if (!userId) {
      console.error("User ID is missing!")
      return
    }

    const response = await fetch(`/api/user/${userId}/reservations`)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data])

  return (
    <div className="container mx-auto p-5 sm:w-[50%] lg:w-[50%]">
      <h1 className="text-xl font-semibold text-primaryDarker">
        Minhas Reservas
      </h1>
      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
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
            <Button
              className="mt-5 text-white"
              onClick={() => router.push("/")}
            >
              Fazer Reserva
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyReservations
