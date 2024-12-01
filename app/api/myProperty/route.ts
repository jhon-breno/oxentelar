import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/prisma/prisma"

// Tipando o session.user corretamente
interface User {
  id: string
  email: string
  // Adicione outros campos que você precisar
}

export async function GET() {
  // Recuperar a sessão do usuário
  const session = await getServerSession(authOptions)

  // Verificar se o usuário está autenticado e tem um ID
  if (!session || !(session.user as User)?.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 },
    )
  }

  try {
    // Usar o ID do usuário de forma segura
    const properties = await prisma.property.findMany({
      where: {
        ownerId: (session.user as User).id, // Acessando id de forma segura
      },
    })

    // Retornar as propriedades encontradas
    return NextResponse.json(properties)
  } catch (error) {
    // Aqui você pode usar a variável error para logar ou manipular o erro
    console.error("Erro ao buscar propriedades:", error)
    return NextResponse.json(
      { error: "Erro ao buscar propriedades." },
      { status: 500 },
    )
  }
}
