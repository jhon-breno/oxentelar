import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  const { searchParams } = new URL(request.url)

  if (!userId) {
    return {
      status: 400,
      body: {
        message: "Missing userId",
      },
    }
  }

  const reservations = await prisma.propertyReservations.findMany({
    where: {
      OR: [
        { userId: userId }, // Busca as reservas onde o usuário é o inquilino
        { property: { ownerId: userId } }, // Ou onde o usuário é o proprietário
      ],
    },
    include: {
      property: true, // Inclui os dados da propriedade
    },
  })

  return new NextResponse(JSON.stringify(reservations), { status: 200 })
}
