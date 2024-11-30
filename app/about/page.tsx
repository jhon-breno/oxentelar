import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"
import {
  InstagramIcon,
  Mail,
  MessageCircleMoreIcon,
  UniversityIcon,
} from "lucide-react"
import Link from "next/link"

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Sobre</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Card do Jhon Breno */}
        <Card className="p-4">
          <CardHeader className="flex flex-col items-center text-center">
            {/* Foto */}
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
              <Image
                src="/jhon.png" // Substituir pelo caminho real da imagem
                alt="Foto de Jhon Breno"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <CardTitle className="text-2xl font-semibold">
              Jhon Breno Marreiro Costa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              Acadêmico em análise e desenvolvimento de sistemas no centro
              universitário Unifametro. Desde 2020 atua na área da tecnologia
              pela empresa Espanhola Ayesa, a serviço da Enel Latam com a
              plataforma Salesforce.
            </p>
            <p className="mt-2">
              Até meados de 2023, trabalhou como consultor de negócios, ajudando
              a associar a regra de negócio à lógica do sistema. Atualmente,
              divide seu tempo como gestor e técnico, desenvolvendo soluções na
              plataforma.
            </p>
            <p className="mt-2">
              De origem humilde, sempre estudou em escolas públicas e trabalhou
              desde cedo para ajudar sua mãe, que criou dois filhos sozinha.
            </p>

            {/* Div com redes socias e contato */}
            <div className="mt-4 flex flex-col items-center justify-center gap-4">
              <div className="mx-4 mt-8 flex items-center justify-between gap-4 text-primaryDarker">
                <Link
                  href="https://Instagram.com/jhonbrenocosta"
                  className="flex items-center gap-2 text-primaryDarker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  Instagram
                </Link>
                <Link
                  href="http://wa.me/5585999469423?text=Olá!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primaryDarker"
                >
                  <MessageCircleMoreIcon />
                  WhatsApp
                </Link>
              </div>
              <div>
                <Link
                  // Enviar email
                  href="mailto:jhonbreno@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primaryDarker"
                >
                  <Mail />
                  E-Mail
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card do Willams Torres */}
        <Card className="p-4">
          <CardHeader className="flex flex-col items-center text-center">
            {/* Foto */}
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
              <Image
                src="/willams.png" // Substituir pelo caminho real da imagem
                alt="Foto de Willams Torres"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <CardTitle className="text-2xl font-semibold">
              Willams Torres Basos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              Acadêmico em análise e desenvolvimento de sistemas no centro
              universitário Unifametro. Desde 2023 atua na área da tecnologia
              pela empresa Francesa Capgemini, a serviço da Enel Latam com a
              plataforma Salesforce.
            </p>
            <p className="mt-2">
              Trabalhou por 7 anos com o sistema TOTVS, auxiliando
              colaboradores. Natural de Fortaleza, começou a trabalhar como
              estagiário aos 16 anos. Sempre foi um excelente aluno e filho,
              ajudando os pais em casa.
            </p>
            <br />

            <br />
            {/* Div com redes socias e contato */}
            <div className="mt-4 flex flex-col items-center justify-center gap-4">
              <div className="mx-4 mt-8 flex items-center justify-between gap-4 text-primaryDarker">
                <Link
                  href="https://Instagram.com/willams_torres_bastos"
                  className="flex items-center gap-2 text-primaryDarker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  Instagram
                </Link>
                <Link
                  href="http://wa.me/558581164520?text=Olá!"
                  className="flex items-center gap-2 text-primaryDarker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircleMoreIcon />
                  WhatsApp
                </Link>
              </div>
              <div>
                <Link
                  // Enviar email
                  href="mailto:jhonbreno@gmail.com"
                  className="flex items-center gap-2 text-primaryDarker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail />
                  E-Mail
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessão sobre o Projeto */}
      <div className="mt-12">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold">
              Sobre o Projeto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p>
              Este projeto foi desenvolvido como parte do trabalho acadêmico
              para o curso de Análise e Desenvolvimento de Sistemas no centro
              universitário Unifametro.
            </p>
            <p className="mt-2">
              O objetivo é aplicar as habilidades adquiridas no curso, criando
              uma aplicação funcional e relevante para solucionar problemas
              reais.
            </p>
            <p className="mt-4 flex items-center justify-center gap-4">
              <UniversityIcon className="text-green-500" />
              Saiba mais sobre Unifametro em
              <a
                href="https://unifametro.edu.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primaryDarker hover:text-primary"
              >
                Unifametro.edu
              </a>
              <UniversityIcon className="text-green-500" />
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default About
