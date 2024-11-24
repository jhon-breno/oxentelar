"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"
import { BadgeDollarSignIcon, HousePlusIcon, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../_components/ui/button"

interface Property {
  id: number
  name: string
  neighborhood: string
  city: string
  state: string
  pricePerMonth: number
  type: string
  recommended: boolean
  coverImage: string
}

const PropertyList = () => {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)

      const location = searchParams.get("location")
      const propertyType = searchParams.get("propertyType")
      const maxPrice = searchParams.get("maxPrice")

      try {
        const query = new URLSearchParams()
        if (location) query.append("location", location)
        if (propertyType) query.append("propertyType", propertyType)
        if (maxPrice) query.append("maxPrice", maxPrice)

        const response = await fetch(`/api/propertys?${query.toString()}`)
        const data = await response.json()

        setProperties(data)
      } catch (error) {
        console.error("Erro ao buscar propriedades:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams])

  if (loading) return <p className="text-center">Carregando...</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-semibold">Propriedades Disponíveis</h1>
      {properties.length === 0 ? (
        <div>
          <p className="mt-4">Nenhuma propriedade encontrada.</p>
          <Button
            className="mt-5 w-full text-white"
            onClick={() => router.back()} // Usando router.back() para voltar à página anterior
          >
            Voltar
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="w-full bg-map-bg bg-cover bg-center bg-no-repeat shadow-lg"
            >
              <Link href={`/propertys/${property.id}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-2xl font-semibold">
                    {property.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <div className="flex flex-col items-start gap-1">
                        <p className="text-xs text-gray-600">
                          {property.neighborhood}
                        </p>
                        <p className="text-xs text-gray-600">
                          {property.city}, {property.state}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeDollarSignIcon size={18} />
                      <p className="text-xs text-gray-600">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(property.pricePerMonth)}{" "}
                        / mês
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <HousePlusIcon size={18} />
                      <p className="text-xs text-gray-600">
                        Tipo: {property.type}
                      </p>
                    </div>
                  </div>
                  <div className="relative h-[120px] w-[220px] sm:h-[150px] sm:w-[250px] lg:h-[200px] lg:w-[350px]">
                    <Image
                      alt={property.name}
                      src={property.coverImage}
                      className="rounded-lg shadow-lg"
                      style={{ objectFit: "cover" }}
                      fill
                    />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default PropertyList
