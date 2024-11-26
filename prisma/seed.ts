import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const propriedades: Prisma.PropertyCreateInput[] = [
    {
      name: "Casa Aldeota",
      street: "Rua da Praia",
      number: 150,
      complement: "Próximo ao mar",
      neighborhood: "Beira Mar",
      city: "Fortaleza",
      state: "CE",
      postalCod: "60000000",
      type: "Casa",
      status: "Disponível",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      pricePerMonth: new Prisma.Decimal(8000.0),
      description:
        "Uma casa de praia luxuosa com vista para o mar e quartos amplos.",
      coverImage:
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=6938A",
      imagesURL: [
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=6938A",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=6938B",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=6938C",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=6938O",
      ],
      highlights: [
        "Vista para o mar",
        "Piscina privativa",
        "5 minutos da praia",
      ],
      maxGuests: 10,
      recommended: true,
      owner: {
        connect: { id: "cm3yqkrv90000xajhihduokez" },
      },
    },
    {
      name: "Apartamento Moderno",
      street: "Avenida Central",
      number: 500,
      complement: "Bloco B, Apt 1203",
      neighborhood: "Centro",
      city: "Sobral",
      state: "CE",
      postalCod: "60000000",
      type: "Apartamento",
      status: "Disponível",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-12-31"),
      pricePerMonth: new Prisma.Decimal(5000.0),
      description:
        "Apartamento moderno e bem localizado, ideal para quem gosta da vida urbana.",
      coverImage: "https://www.sj.com.br/pictures/predio/2739_01.jpg",
      imagesURL: [
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=49390A",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=49390C",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=49390D",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=49390E",
      ],
      highlights: [
        "Vista para a cidade",
        "Academia no prédio",
        "Próximo ao metrô",
      ],
      maxGuests: 4,
      recommended: true,
      owner: {
        connect: { id: "cm3yqkrv90000xajhihduokez" },
      },
    },
    {
      name: "Kitnet Cearense",
      street: "Rua Coronel Jaime Rolemberg",
      number: 277,
      complement: "Ap 102",
      neighborhood: "Jardim Cearense",
      city: "Fortaleza",
      state: "CE",
      postalCod: "60000000",
      type: "Casa",
      status: "Disponível",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-12-31"),
      pricePerMonth: new Prisma.Decimal(770.0),
      description: "Casa grande, aconchegante.",
      coverImage:
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=48314A",
      imagesURL: [
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=48314F",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=48314E",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=48314D",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=48314C",
      ],
      highlights: [
        "1 Quarto",
        "1 Cozinha",
        "1 Sala",
        "1 banheiro",
        "Área de serviço",
      ],
      maxGuests: 4,
      recommended: true,
      owner: {
        connect: { id: "cm3yqkrv90000xajhihduokez" },
      },
    },
    {
      name: "Casa Grande",
      street: "Rua Cajamar",
      number: 47,
      complement: "Altos",
      neighborhood: "Novo Mondubim",
      city: "Fortaleza",
      state: "CE",
      postalCod: "60764325",
      type: "Casa",
      status: "Locada",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-12-31"),
      pricePerMonth: new Prisma.Decimal(770.0),
      description: "Casa grande, aconchegante.",

      coverImage:
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=54466A",
      imagesURL: [
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=54466B",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=54466C",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=54466D",
        "https://www.sj.com.br/appsgi/imagens_anuncios.aspx?foto=54466E",
      ],
      highlights: ["4 suítes", "2 Vagas de garagem", "6 banheiros", "Duplex"],
      maxGuests: 4,
      recommended: true,
      owner: {
        connect: { id: "cm3yqkrv90000xajhihduokez" },
      },
    },
    // Adicione mais propriedades conforme necessário
  ]

  for (const propriedade of propriedades) {
    await prisma.property.create({ data: propriedade })
  }

  console.log("Dados de seed inseridos com sucesso")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
