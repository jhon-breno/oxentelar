import { db } from "../_lib/prisma"
import PropertyItem from "./propertyItem"

const RecommendedProperty = async () => {
  const property = await db.property.findMany({ where: { recommended: true } })
  console.log(property)
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center gap-2">
        <div className="h-[1px] w-full bg-gray-300"></div>
        <h2 className="whitespace-nowrap px-5 text-gray-500">
          Imóveis Recomendados
        </h2>
        <div className="h-[1px] w-full bg-gray-300"></div>
      </div>
      {property.map((property) => (
        <div className="mt-5 flex flex-col items-center">
          <PropertyItem key={property.id} property={property} />
        </div>
      ))}
    </div>
  )
}

export default RecommendedProperty
