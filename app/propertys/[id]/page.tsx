import { db } from "@/app/_lib/prisma"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import React from "react"
import PropertyDescription from "./_components/propertyDescription"
import ProperyReservation from "./_components/propertyReservation"
import PropertyHighligths from "./_components/propertyHighlights"

interface PropertyPageProps {
  params: {
    id: string
  }
}

const PropertyDetails = async ({ params }: PropertyPageProps) => {
  const property = await db.property.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!property) {
    return notFound()
  }

  return (
    <div className="mx-auto">
      <div className="relative h-[300px] w-full">
        <Image
          src={property.coverImage}
          fill
          alt={property.name}
          className="rounded-2xl p-2"
          // style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col p-4">
        <h1 className="text-xl font-semibold text-purple-700">
          {property.name}
        </h1>
        <div className="my-1 flex items-center gap-1">
          <MapPin size={22} />
          <p className="w-[250px] text-xs text-gray-500">
            {property.street}, {property.number} - {property.complement}
            <br />
            {property.city} / {property.state}
          </p>
        </div>
        <p className="text-xs text-gray-600">
          <span className="font-medium text-purple-600">
            R$ {property.pricePerMonth.toString()} {""} por mês
          </span>
        </p>
      </div>
      <ProperyReservation property={property} />
      <div className="flex flex-col items-center gap-2">
        {/* Passando o property como prop */}
        <PropertyDescription property={property} />
        <PropertyHighligths highligths={property.highlights} />
      </div>
    </div>
  )
}

export default PropertyDetails
