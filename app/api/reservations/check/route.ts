import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const req = await request.json()

  // Logando a data recebida no backend
  console.log("Data recebida do frontend:", req.startDate)

  // Parse da data recebida para garantir que está no formato correto
  const selectedDateTime = new Date(req.startDate)

  // Verifica se a data e hora são válidas
  if (isNaN(selectedDateTime.getTime())) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_DATE",
          message: "A data fornecida é inválida.",
        },
      }),
      { status: 400 },
    )
  }

  // Logando a data convertida no backend
  console.log("Data convertida no backend:", selectedDateTime)

  // Normaliza a data para comparar sem hora/minuto/segundos
  const startOfDay = new Date(selectedDateTime)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(selectedDateTime)
  endOfDay.setHours(23, 59, 59, 999)

  console.log("Início do dia:", startOfDay)
  console.log("Fim do dia:", endOfDay)

  // Consultando as reservas para a data específica (sem hora)
  const reservations = await prisma.propertyReservations.findMany({
    where: {
      propertyId: req.propertyId,
      startDate: {
        gte: startOfDay, // Data maior ou igual ao início do dia
        lte: endOfDay, // Data menor ou igual ao fim do dia
      },
    },
  })

  const property = await prisma.property.findMany({
    where: {
      id: req.propertyId,
    },
  })

  console.log("Reservas encontradas no banco:", reservations)

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "PROPERTY_ALREADY_RESERVED",
          message:
            "Este imóvel já está reservado para a data e hora selecionadas.",
        },
      }),
      { status: 409 }, // Código HTTP de conflito
    )
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      property,
    }),
  )
}
