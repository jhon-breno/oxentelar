import { db } from "@/app/_lib/prisma"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Dados recebidos para criar reserva:", body) // Log para debugar

    const { propertyId, startDate, endDate, userId, totalRent } = body

    // Verificação de campos obrigatórios
    if (
      !propertyId ||
      !startDate ||
      !endDate ||
      !userId ||
      totalRent === undefined
    ) {
      return NextResponse.json({ message: "Dados inválidos" }, { status: 400 })
    }

    const parsedStartDate = new Date(startDate)
    const parsedEndDate = new Date(endDate)

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return NextResponse.json({ message: "Datas inválidas" }, { status: 400 })
    }

    // Verificação do valor do aluguel
    if (isNaN(totalRent) || totalRent <= 0) {
      return NextResponse.json(
        { message: "Valor do aluguel inválido" },
        { status: 400 },
      )
    }

    // Criação da reserva no banco de dados
    const reservation = await db.propertyReservations.create({
      data: {
        propertyId,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        userId,
        totalRent: new Prisma.Decimal(totalRent.toString()), // Convertendo totalRent para Prisma.Decimal
      },
    })

    return NextResponse.json(reservation, { status: 200 })
  } catch (error) {
    console.error("Erro ao criar reserva:", error)
    return NextResponse.json(
      { message: "Erro ao criar reserva" },
      { status: 500 },
    )
  }
}
