import Link from "next/link";
import { Button } from "./ui/button";
import SheetMenu from "./sheetMenu";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center sm:justify-center justify-between p-4 m-0 overflow-ellipsis">
      <Link href="#">
        <h2 className="flex items-center m-0 font-extrabold !text-4xl">
          <Image
            src="/favicon.ico"
            width={86}
            height={64}
            alt="tese"
            className="rounded-3xl"
          />
          | Oxente <br />| Lar
        </h2>
      </Link>

      {/* DESKTOP */}
      <div className="flex items-center">
        <nav className="hidden sm:flex gap-6 mx-32 text-xl">
          <Link className="hover:text-gray-400" href="#">
            Início
          </Link>
          <Link className="hover:text-gray-400" href="#">
            Explore
          </Link>
          <Link className="hover:text-gray-400" href="#">
            Casas/Apartamentos
          </Link>
          <Link className="hover:text-gray-400" href="#">
            Comercial
          </Link>
          <Link className="hover:text-gray-400" href="#">
            Comprar
          </Link>
        </nav>

        <Button
          className="hidden sm:flex mx-4 border-black rounded-sm text-sm"
          variant="outline"
        >
          RESERVE JÁ
        </Button>
      </div>
      {/* MOBILE */}
      <SheetMenu />
    </header>
  );
};

export default Header;
