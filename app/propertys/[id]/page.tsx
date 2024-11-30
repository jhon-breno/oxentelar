import { db } from "@/app/_lib/prisma"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import React from "react"
import PropertyDescription from "./_components/propertyDescription"
import ProperyReservation from "./_components/propertyReservation"
import PropertyHighligths from "./_components/propertyHighlights"
import Map from "./_components/maps"

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
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-2">
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl lg:h-[400px] lg:w-[500px]">
          <Image
            src={property.coverImage}
            fill
            alt={property.name}
            className="rounded-2xl p-2"
            // style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-semibold text-purple-700 sm:text-3xl">
            {property.name}
          </h1>
          <div className="flex items-center gap-2 sm:gap-3">
            <MapPin size={22} />
            <p className="w-[250px] truncate text-xs text-gray-500 sm:w-auto sm:text-sm">
              {property.street}, {property.number} - {property.complement}
              <br />
              {property.city} / {property.state}
            </p>
          </div>
          <p className="ml-2 text-xs text-gray-600 sm:text-sm">
            <span className="text-lg font-medium text-purple-600">
              {" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(property.pricePerMonth)}{" "}
              {""}
            </span>
          </p>
        </div>
      </div>
      <ProperyReservation property={property} />
      <div className="flex flex-col items-center gap-2">
        {/* Passando o property como prop */}
        <PropertyDescription property={property} />
        <PropertyHighligths highligths={property.highlights} />
      </div>
      <div>
        <Map property={property} />
      </div>
    </div>
  )
}

export default PropertyDetails
