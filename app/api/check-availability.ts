import { prisma } from "@/prisma/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { propertyId, date, time } = req.body

    if (!propertyId || !date || !time) {
      return res
        .status(400)
        .json({ available: false, message: "Dados incompletos" })
    }

    const startDate = new Date(`${date}T${time}`)
    const endDate = new Date(startDate)
    endDate.setHours(startDate.getHours() + 1) // Considerando 1h por reserva

    try {
      const existingReservation = await prisma.propertyReservations.findFirst({
        where: {
          propertyId,
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
      })

      if (existingReservation) {
        return res.status(200).json({ available: false })
      }

      return res.status(200).json({ available: true })
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error)
      return res
        .status(500)
        .json({ available: false, message: "Erro no servidor" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
