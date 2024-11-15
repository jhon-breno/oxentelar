import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { db } from "@/app/_lib/prisma"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import React from "react"

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
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-5">
          <Input type="date" />
          <Input type="time" />
        </div>
        <Button className="mb-4 bg-purple-800">Agendar Visita</Button>
      </div>
    </div>
  )
}

export default PropertyDetails
