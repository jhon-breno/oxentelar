import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")
  const propertyType = searchParams.get("propertyType")
  const maxPrice = searchParams.get("maxPrice")

  try {
    const properties = await prisma.property.findMany({
      where: {
        OR: location
          ? [
              { name: { contains: location, mode: "insensitive" } },
              { neighborhood: { contains: location, mode: "insensitive" } },
              { city: { contains: location, mode: "insensitive" } },
              { state: { contains: location, mode: "insensitive" } },
            ]
          : undefined,
        ...(propertyType && {
          type: { contains: propertyType, mode: "insensitive" },
        }),
        ...(maxPrice && { pricePerMonth: { lte: parseFloat(maxPrice) } }),
        ...(location || propertyType || maxPrice ? {} : { recommended: true }), // Retorna apenas recomendados se não houver filtro
      },
    })

    return NextResponse.json(properties || []) // Sempre retorna um array
  } catch (error) {
    console.error("Erro ao buscar propriedades:", error)
    return NextResponse.json(
      { error: "Erro ao buscar propriedades" },
      { status: 500 },
    )
  }
}
