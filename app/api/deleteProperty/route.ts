import { prisma } from "@/prisma/prisma"

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
