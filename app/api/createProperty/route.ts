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

    // Criar o imóvel com o owner sendo o usuário autenticado
    const newProperty = await prisma.property.create({
      data: {
        name: data.name,
        type: data.type,
        postalCod: data.postalCod,
        street: data.street,
        number: parseInt(data.number, 10),
        neighborhood: data.neighborhood || null,
        complement: data.complement || null,
        city: data.city,
        state: data.state,
        pricePerMonth: parseFloat(data.pricePerMonth.replace(/[^\d.-]/g, "")),
        owner: {
          connect: { id: userId }, // Associar o imóvel ao usuário autenticado
        },
        description: data.description || null,
        coverImage:
          data.coverImage ||
          "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=44256A",
        imagesURL: data.imagesURL || [
          "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=44256A",
        ],
        highlights: data.highlights || [],
        status: data.status || "disponível",
        maxGuests: data.maxGuests || 0,
        recommended: data.recommended || false,
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        // end date será data infinita 31/12/1999 no formato 9999-12-31T00:00:00.000Z
        endDate: new Date(9999, 11, 31, 0, 0, 0, 0),
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
