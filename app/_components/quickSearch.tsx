import Image from "next/image"
import Link from "next/link"

const QuicSearch = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2">
        <div className="h-[1px] w-full bg-gray-300"></div>
        <h2 className="whitespace-nowrap px-5 text-gray-500">
          Tente pesquisar por
        </h2>
        <div className="h-[1px] w-full bg-gray-300"></div>
      </div>

      <div className="flex justify-between gap-2 p-2">
        <Link href="/propertys/?propertyType=apartamento">
          <div className="flex flex-col items-center gap-1">
            <Image width={35} height={35} src="/hotel-icon.png" alt="Hotel" />
            <p className="text-sm text-gray-400">Apartamento</p>
          </div>
        </Link>
        <Link href="propertys/?propertyType=casa">
          <div className="flex flex-col items-center gap-1">
            <Image width={35} height={35} src="/cottage-icon.png" alt="Casa" />
            <p className="text-sm text-gray-400">Casa</p>
          </div>
        </Link>
        <Link href="propertys/?propertyType=kitnet">
          <div className="flex flex-col items-center gap-1">
            <Image width={35} height={35} src="/home.png" alt="Kitnet" />
            <p className="text-sm text-gray-400">Kitnet</p>
          </div>
        </Link>
        <Link href="/propertys/?propertyType=comercial">
          <div className="flex flex-col items-center gap-1">
            <Image width={35} height={35} src="/loja.png" alt="Comercial" />
            <p className="text-sm text-gray-400">Comercial</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default QuicSearch
