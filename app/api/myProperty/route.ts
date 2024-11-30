import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/prisma/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !(session?.user as any).id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 },
    )
  }

  try {
    const properties = await prisma.property.findMany({
      where: {
        ownerId: (session?.user as any)?.id,
      },
    })

    console.log("Propriedades encontradas:", session.user.id)

    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar propriedades." },
      { status: 500 },
    )
  }
}
