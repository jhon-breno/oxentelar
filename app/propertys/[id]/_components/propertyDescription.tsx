import { Property } from "@prisma/client"
import { notFound } from "next/navigation"

interface PropertyDescriptionProps {
  property: Property
}

const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
  // Caso a propriedade não exista, exibe um erro
  if (!property) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-2 p-6">
      <h3 className="font-bold text-primaryDarker">Sobre o Imóvel</h3>
      <p className="mt-1 text-xs leading-5 text-primaryDarker">
        {property.description}
      </p>
    </div>
  )
}

export default PropertyDescription
