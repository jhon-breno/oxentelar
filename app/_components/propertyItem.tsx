import { Property } from "@prisma/client"
import { MapPin } from "lucide-react"
import Image from "next/image"

interface PropertyItemProps {
  property: Property
}

const PropertyItem = ({ property }: PropertyItemProps) => {
  return (
    <div>
      <div className="relative h-[280px] w-[280px]">
        <Image
          alt={property.name}
          src={property.coverImage}
          className="rounded-lg shadow-lg"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <h3 className="mt-2 text-sm font-medium text-purple-600">
        {property.name}
      </h3>
      <div className="my-1 flex items-center gap-1">
        <MapPin size={18} />
        <p className="w-[250px] text-xs text-gray-500">
          {/* {property.street}, {property.number} - {property.complement}
            <br /> */}
          {property.city} / {property.state}
        </p>
      </div>
      <p className="text-xs text-gray-600">
        <span className="font-semibold text-purple-600">
          R$ {property.pricePerMonth.toString()}
        </span>{" "}
        /mês
      </p>
    </div>
  )
}

export default PropertyItem
