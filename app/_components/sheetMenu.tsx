import {
  Building2Icon,
  Home,
  HousePlus,
  LogOut,
  MenuIcon,
  Search,
  Settings2,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

const SheetMenu = () => {
  return (
    <div className="flex flex-col sm:pl-14 xl:hidden xl:gap-4 xl:py-4">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="xl:hidden">
              <span className="sr-only">Abrir/Fechar</span>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-x">
            <nav className="flex h-full flex-col justify-between text-lg font-medium">
              <div className="grid gap-6">
                <Link href="#" className="flex" prefetch={false}>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Image
                      src="/favicon.ico"
                      width={64}
                      height={32}
                      alt="tese"
                      className="rounded-3xl"
                    />
                    <span>Menu</span>
                  </div>
                  <span className="sr-only">Logo do projeto</span>
                </Link>
                <div className="border-b"></div>

                <Link
                  href="#"
                  className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Home className="h-5 w-5 transition-all" />
                  Início
                </Link>

                <Link
                  href="#"
                  className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Search className="h-5 w-5 transition-all" />
                  Explore
                </Link>

                <Link
                  href="#"
                  className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <HousePlus className="h-5 w-5 transition-all" />
                  Casas / Apartamentos
                </Link>

                <Link
                  href="#"
                  className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Building2Icon className="h-5 w-5 transition-all" />
                  Comercial
                </Link>

                <Link
                  href="#"
                  className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Settings2 className="h-5 w-5 transition-all" />
                  Preferências
                </Link>
              </div>
              <Link
                href="#"
                className="text-gr flex items-center gap-4 border-t px-2.5 pt-4 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <LogOut className="h-5 w-5 transition-all" />
                Sair
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  )
}

export default SheetMenu
