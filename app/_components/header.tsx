import Link from "next/link"
import { Button } from "./ui/button"
import SheetMenu from "./sheetMenu"
import Image from "next/image"

const Header = () => {
  return (
    <header className="m-0 flex items-center justify-between overflow-ellipsis p-4 xl:justify-center">
      <Link href="#">
        <h2 className="m-0 flex items-center gap-2 !text-4xl font-extrabold text-gray-900 hover:text-gray-600">
          <Image
            src="/favicon.ico"
            width={86}
            height={64}
            alt="tese"
            className="rounded-3xl"
          />
          |Oxente <br /> |Lar
        </h2>
      </Link>

      {/* DESKTOP */}
      <div className="flex items-center">
        <nav className="mx-32 hidden gap-6 text-xl xl:flex">
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="#"
          >
            Início
          </Link>
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="#"
          >
            Explore
          </Link>
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="#"
          >
            Casas/Apartamentos
          </Link>
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="#"
          >
            Comercial
          </Link>
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="#"
          >
            Preferências
          </Link>
        </nav>

        <Button
          className="mx-4 hidden rounded-sm border-black text-sm xl:flex"
          variant="outline"
        >
          RESERVE JÁ
        </Button>
      </div>
      {/* MOBILE */}
      <SheetMenu />
    </header>
  )
}

export default Header
