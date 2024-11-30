import { db } from "../_lib/prisma"
import PropertyItem from "./propertyItem"

const RecommendedProperty = async () => {
  const properties = await db.property.findMany({
    where: { recommended: true },
  })
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center gap-2">
        <div className="h-[1px] w-full bg-gray-300"></div>
        <h2 className="whitespace-nowrap px-5 text-gray-500">
          Imóveis Recomendados
        </h2>
        <div className="h-[1px] w-full bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div key={property.id} className="mt-5 flex flex-col items-center">
            <PropertyItem property={property} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendedProperty
