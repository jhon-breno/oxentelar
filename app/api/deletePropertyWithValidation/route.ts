import { NextResponse } from "next/server"
import { prisma } from "@/prisma/prisma"

export async function DELETE(req: Request) {
  try {
    const { propertyId } = await req.json()

    if (!propertyId) {
      return NextResponse.json(
        { error: "O ID do imóvel é obrigatório." },
        { status: 400 },
      )
    }

    // Verifica se há reservas relacionadas ao imóvel
    const relatedReservations = await prisma.propertyReservations.findMany({
      where: { propertyId },
    })

    if (relatedReservations.length > 0) {
      return NextResponse.json(
        {
          error: "O imóvel não pode ser excluído pois há reservas associadas.",
        },
        { status: 400 },
      )
    }

    // Exclui o imóvel
    await prisma.property.delete({
      where: { id: propertyId },
    })

    return NextResponse.json(
      { message: "Imóvel excluído com sucesso!" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro ao excluir imóvel:", error)
    return NextResponse.json(
      { error: "Erro ao excluir imóvel." },
      { status: 500 },
    )
  }
}
