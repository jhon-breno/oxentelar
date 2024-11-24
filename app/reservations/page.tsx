"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PropertyReservations } from "@prisma/client"
import UserReservationItem from "./_components/userReservationItem"

const MyReservations = () => {
  const [reservations, setReservations] = useState<PropertyReservations[]>([])
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/")
    }

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

    fetchReservations()
  }, [status, data])

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-xl font-semibold text-primaryDarker">
        Minhas Reservas
      </h1>
      {reservations?.map((reservation) => (
        <UserReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </div>
  )
}

export default MyReservations
