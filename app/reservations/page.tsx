"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PropertyReservations } from "@prisma/client"

const MyReservations = () => {
  const [reservations, setReservations] = useState<PropertyReservations[]>([])
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/")
    }
    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any).id}/reservations`,
      )
      const json = await response.json()

      setReservations(json)
    }

    fetchReservations()
  }, [status])

  return (
    <div>
      <h1>Minhas Reservas</h1>
    </div>
  )
}

export default MyReservations
