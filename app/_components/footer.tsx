import { Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bottom-0 w-full items-start bg-gray-900 p-8 text-gray-300">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* Informações de Contato */}
        <div className="mb-6 flex flex-col items-center md:mb-0">
          <h2 className="mb-3 text-xl font-semibold text-white">Contato</h2>
          <div className="mb-2 flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            <span>(85) 99946-9423</span>
          </div>
          <div className="mb-2 flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            <span>Fortaleza, CE</span>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="mb-6 flex flex-col items-center md:mb-0">
          <h2 className="mb-3 text-xl font-semibold text-white">
            Redes Sociais
          </h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com/jhonbrenocosta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <Twitter />
            </a>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {currentYear} OxenteLar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
