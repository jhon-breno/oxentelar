import { prisma } from "@/prisma/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log("Dados recebidos no endpoint:", data) // Log dos dados recebidos

    if (
      !data.name ||
      !data.type ||
      !data.postalCod ||
      !data.street ||
      !data.city ||
      !data.state ||
      !data.pricePerMonth
    ) {
      console.error("Erro: Campos obrigatórios estão faltando.")
      return NextResponse.json(
        { error: "Por favor, preencha todos os campos obrigatórios." },
        { status: 400 },
      )
    }

    const newProperty = await prisma.property.create({
      data: {
        // Campos conforme o modelo
      },
    })

    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    console.error("Erro no endpoint:", error)
    return NextResponse.json(
      { error: "Erro ao criar propriedade." },
      { status: 500 },
    )
  }
}
