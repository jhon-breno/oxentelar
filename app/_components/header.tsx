"use client"

import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogInIcon, LogOutIcon } from "lucide-react"

const Header = () => {
  const { data } = useSession()
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => {
    signOut()
    setIsLogoutDialogOpen(false)
  }

  return (
    <header className="flex items-center p-4">
      <Link href="/#">
        <h2 className="flex items-center gap-2 !text-4xl font-extrabold text-gray-900 hover:text-gray-600">
          <Image
            src="/favicon.ico"
            width={86}
            height={64}
            alt="Oxente Lar"
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
            href="/"
          >
            Início
          </Link>
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="/explorer"
          >
            Explore
          </Link>
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="propertys/?propertyType=casa"
          >
            Casas
          </Link>
          <Link
            className="font-bold text-gray-900 hover:text-gray-400"
            href="/propertys/?propertyType=comercial"
          >
            Comercial
          </Link>
          <Link
            href="/reservations"
            className="font-bold text-gray-900 hover:text-gray-400"
            prefetch={false}
          >
            Minhas Reservas
          </Link>
        </nav>

        <Link href="/explorer">
          <Button
            className="mx-4 hidden rounded-sm border-black text-sm xl:flex"
            variant="outline"
          >
            RESERVE JÁ
          </Button>
        </Link>

        {/* Login/Profile */}
        <div className="relative">
          {data?.user ? (
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Avatar className="hidden lg:hidden xl:flex">
                <AvatarImage src={data?.user?.image ?? ""} />
                <AvatarFallback>{data?.user?.name?.[0] ?? "?"}</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={handleLoginWithGoogleClick}
              className="hidden xl:flex"
            >
              <LogInIcon />
            </Button>
          )}

          {/* Profile Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 text-gray-900">
                <p className="text-sm font-medium">{data?.user?.name}</p>
                <p className="text-xs text-gray-500">{data?.user?.email}</p>
              </div>
              <div className="mb-2 border-t border-gray-200"></div>
              <Link href="/createProperty" className="mt-2 px-4 py-2">
                {" "}
                Meus Imóveis
              </Link>
              <div className="px-4 py-2">
                <Button
                  variant="ghost"
                  className="flex w-full items-center gap-2 text-left"
                  onClick={() => setIsLogoutDialogOpen(true)}
                >
                  <LogOutIcon className="h-5 w-5" />
                  Sair
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Logout Confirmation Dialog */}
        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deseja realmente desconectar?</DialogTitle>
              <DialogDescription>
                Ao sair, você precisará fazer login novamente para acessar sua
                conta.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsLogoutDialogOpen(false)}
              >
                Não
              </Button>
              <Button variant="destructive" onClick={handleLogoutClick}>
                Sim
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

export default Header
