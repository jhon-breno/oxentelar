"use client"

import {
  Building2Icon,
  CalendarClockIcon,
  Home,
  HotelIcon,
  HouseIcon,
  HousePlus,
  LogInIcon,
  LogOut,
  MenuIcon,
  Search,
  Settings2,
} from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const SheetMenu = () => {
  const { data } = useSession()
  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()

  return (
    <div className="flex flex-col sm:pl-14 xl:hidden xl:gap-4 xl:py-4">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-16 w-16 xl:hidden">
              <span className="sr-only">Abrir/Fechar</span>
              <MenuIcon className="!h-8 !w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-x">
            <nav className="flex h-full flex-col justify-between text-lg font-medium">
              <div className="grid gap-6">
                <SheetClose asChild>
                  <Link href="/" className="flex" prefetch={false}>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Image
                        src="/favicon.ico"
                        width={64}
                        height={32}
                        alt="logo"
                        className="rounded-3xl"
                      />
                      <span>Menu</span>
                    </div>
                    <span className="sr-only">Logo do projeto</span>
                  </Link>
                </SheetClose>
                <div className="flex items-center justify-between gap-3 border-b border-solid py-3">
                  {data?.user ? (
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={data?.user?.image ?? ""} />
                        <AvatarFallback>DV</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">Olá, {data.user.name}</p>
                        <p className="text-xs text-gray-400">
                          {data.user.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-lg font-bold">
                        Olá, faça seu login!
                      </h2>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="bg-slate-600 text-white"
                            size="icon"
                          >
                            <LogInIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[90%]">
                          <DialogHeader>
                            <DialogTitle>Faça seu login</DialogTitle>
                            <DialogDescription>
                              Conecte-se usando sua conta do Google.
                            </DialogDescription>
                          </DialogHeader>
                          <Button
                            variant="outline"
                            className="gap-2 text-lg font-semibold"
                            onClick={handleLoginWithGoogleClick}
                          >
                            <Image
                              src="/google-icon.svg"
                              width={20}
                              height={20}
                              alt="Fazer login com Google"
                            />
                            Google
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>

                <SheetClose asChild>
                  <Link
                    href="/"
                    className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <Home className="h-5 w-5 transition-all" />
                    Início
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/explorer"
                    className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <Search className="h-5 w-5 transition-all" />
                    Explore
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/propertys/?propertyType=casa"
                    className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <HouseIcon className="h-5 w-5 transition-all" />
                    Casas
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/propertys/?propertyType=apartamento"
                    className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <HotelIcon className="h-5 w-5 transition-all" />
                    Apartamento
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/propertys/?propertyType=comercial"
                    className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <Building2Icon className="h-5 w-5 transition-all" />
                    Comercial
                  </Link>
                </SheetClose>

                {data?.user ? (
                  <SheetClose asChild>
                    <Link
                      href="/reservations"
                      className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      <CalendarClockIcon className="h-5 w-5 transition-all" />
                      Minhas Reservas
                    </Link>
                  </SheetClose>
                ) : (
                  <></>
                )}

                <Link
                  href="/"
                  className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Settings2 className="h-5 w-5 transition-all" />
                  Preferências
                </Link>

                {data?.user ? (
                  <SheetClose asChild>
                    <Link
                      href="/createProperty"
                      className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      <HousePlus className="h-5 w-5 transition-all" />
                      Meus Imóveis
                    </Link>
                  </SheetClose>
                ) : (
                  <></>
                )}
              </div>

              {data?.user ? (
                <div className="text-gr flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Button
                    variant="ghost"
                    className="gap-2 text-lg"
                    onClick={handleLogoutClick}
                  >
                    <LogOut />
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center border-t border-solid py-2">
                  <p>Oxente Lar</p>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  )
}

export default SheetMenu
