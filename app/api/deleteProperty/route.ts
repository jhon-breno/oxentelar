// app/api/deletePropertyWithValidation/route.ts
import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

async function deletePropertyWithValidation(propertyId: string) {
  try {
    // Verifica se existem registros relacionados
    const relatedReservations = await prisma.propertyReservations.findMany({
      where: {
        propertyId,
      },
    })

    if (relatedReservations.length > 0) {
      throw new Error(
        "O imóvel não pode ser excluído pois há reservas associadas.",
      )
    }

    // Exclui o imóvel
    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    })

    console.log("Imóvel excluído com sucesso!")
  } catch (error) {
    console.error("Erro ao excluir imóvel:", error)
    throw error
  }
}

export async function DELETE(request: Request) {
  try {
    const { propertyId } = await request.json()

    if (!propertyId) {
      return NextResponse.json(
        { error: "O ID do imóvel é obrigatório." },
        { status: 400 },
      )
    }

    // Chama a função de validação e exclusão
    await deletePropertyWithValidation(propertyId)

    return NextResponse.json(
      { message: "Imóvel excluído com sucesso!" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Erro ao processar a requisição:", error)
    return NextResponse.json(
      { error: "Erro ao excluir imóvel. Por favor, tente novamente." },
      { status: 500 },
    )
  }
}
