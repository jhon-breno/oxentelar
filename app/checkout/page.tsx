import { prisma } from "@/prisma/prisma"
import CheckoutReservation from "./_components/checkout"

async function getPropertyById(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: { owner: true }, // Inclui os dados do proprietário
  })
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { propertyId: string; date: string; time: string }
}) {
  const { propertyId, date, time } = searchParams

  const property = await getPropertyById(propertyId)

  if (!property) {
    return <div>Imóvel não encontrado</div>
  }

  // Garantir que 'owner.name' e 'owner.phone' sejam sempre strings, mesmo que sejam null
  const propertyWithOwner = {
    ...property,
    owner: {
      ...property.owner,
      name: property.owner?.name ?? "Nome não disponível", // Substitui null por um valor padrão
      phone: property.owner?.phone ?? "Telefone não disponível", // Substitui null por um valor padrão
    },
  }

  return (
    <CheckoutReservation property={propertyWithOwner} date={date} time={time} />
  )
}
