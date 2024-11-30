import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth" // Se estiver usando next-auth
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(request: Request) {
  try {
    // Recuperar o usuário autenticado
    const session = await getServerSession(authOptions)
    if (!session || !(session?.user as any) || !(session?.user as any).id) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 },
      )
    }

    const userId = (session?.user as any).id // ID do usuário autenticado
    const data = await request.json()

    console.log("Dados recebidos no endpoint:", data)

    // Verificar campos obrigatórios
    if (
      !data.name ||
      !data.type ||
      !data.postalCod ||
      !data.street ||
      !data.city ||
      !data.state ||
      !data.pricePerMonth
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios estão faltando." },
        { status: 400 },
      )
    }

    // Determinar a imagem principal com base no tipo do imóvel
    const coverImageMap: Record<string, string> = {
      casa: "https://drive.google.com/uc?export=view&id=1FkYs-59EzZ9LaOc8mqInhtHEZPpGtksm",
      Apartamento:
        "https://drive.google.com/uc?export=view&id=1apjWEUMlvGHaHJoLo7lpcoWSmgKkwzqH",
      Kitnet:
        "https://drive.google.com/uc?export=view&id=1lW631J_aQol_kUAhzWKrEWtPjPAEBpRk",
      Comercial:
        "https://drive.google.com/uc?export=view&id=1eyebOqXCHy_nMKIOn1TuVQ0sUGNcqX4Q",
      casa_de_campo:
        "https://drive.google.com/uc?export=view&id=1aNVrvH_1QmpEdEmv97nKi8W3PregYjWm",
    }

    const defaultCoverImage =
      "https://drive.google.com/uc?export=view&id=1FkYs-59EzZ9LaOc8mqInhtHEZPpGtksm"
    const coverImage = coverImageMap[data.type] || defaultCoverImage

    // Lógica para definir se o imóvel é recomendado
    const recommended =
      ["Aldeota", "Meirele", "Beira Mar"].includes(data.neighborhood) ||
      parseFloat(data.pricePerMonth.replace(",", ".")) > 3000

    const complement = data.complement || "Sem Complemento"

    // Criar o imóvel com o owner sendo o usuário autenticado
    const newProperty = await prisma.property.create({
      data: {
        name: data.name,
        type: data.type,
        postalCod: data.postalCod,
        street: data.street,
        number: parseInt(data.number, 10),
        neighborhood: data.neighborhood || null,
        complement,
        city: data.city,
        state: data.state,
        pricePerMonth: parseFloat(data.pricePerMonth.replace(",", ".")),
        owner: {
          connect: { id: userId }, // Associar o imóvel ao usuário autenticado
        },
        description: data.description || null,
        coverImage: data.coverImage || coverImage, // Usar imagem do tipo ou a enviada
        imagesURL: data.imagesURL || [coverImage], // Usar a mesma lógica para outras imagens
        highlights: data.highlights || [],
        status: data.status || "disponível",
        maxGuests: parseInt(data.maxGuests) || 0,
        recommended, // Define o valor de "recommended" com base na lógica
        startDate: new Date(Date.now()),
        endDate: new Date(9999, 11, 31, 0, 0, 0, 0), // Data infinita
      },
    })

    console.log("Propriedade criada com sucesso:", newProperty)
    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    console.error("Erro no endpoint:", error)
    return NextResponse.json(
      { error: "Erro ao criar propriedade." },
      { status: 500 },
    )
  }
}
