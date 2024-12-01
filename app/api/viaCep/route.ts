import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cep = searchParams.get("cep")

  if (!cep) {
    return NextResponse.json({ error: "CEP não fornecido." }, { status: 400 })
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()

    if (data.erro) {
      return NextResponse.json({ error: "CEP inválido." }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao buscar CEP:", error)
    return NextResponse.json(
      { error: "Erro ao buscar o CEP." },
      { status: 500 },
    )
  }
}
