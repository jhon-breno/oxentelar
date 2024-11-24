import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  {
    params: { userId },
  }: { params: { propertyId: string } } & { params: { userId: string } },
) {
  const { searchParams } = new URL(request.url)

  if (!userId) {
    return {
      status: 400,
      body: {
        message: "userId is required",
      },
    }
  }

  const reservations = await prisma.propertyReservations.findMany({
    where: {
      userId: userId,
    },
    include: {
      property: true,
    },
  })

  return new NextResponse(JSON.stringify(reservations), { status: 200 })
}
