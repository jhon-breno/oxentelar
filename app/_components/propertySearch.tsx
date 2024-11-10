"use client"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const PropertySearch = () => {
  const { data } = useSession()
  return (
    <div className="bg-map-bg flex flex-col items-center bg-cover bg-center bg-no-repeat">
      <h1 className="text-2xl font-semibold">
        {data?.user ? (
          <p>
            Olá {data.user.name?.split(" ")[0]}, encontre seu
            <span className="text-purple-600"> aconchego!</span>
          </p>
        ) : (
          <p>
            Olá, encontre seu
            <span className="text-purple-600"> aconchego!</span>
          </p>
        )}
      </h1>
      <div className="flex w-[500px!] flex-col items-center gap-4 p-4 xl:flex-row">
        <Input type="text" placeholder="Onde prefere se aconchegar?" />
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="min-w-[150px!] max-w-[150px!]">
              <SelectValue placeholder="Tipo de imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="casa-no-campo">Casa no Campo</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="kitnet">Kitnet</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="w-[500px!]"
            type="number"
            placeholder="R$ Valor Máximo"
          />
        </div>
        <Button className="w-[100%] bg-purple-600 text-white hover:bg-purple-500 xl:w-[50%]">
          Buscar
        </Button>
      </div>
    </div>
  )
}

export default PropertySearch

// "use client"

// import { Button } from "./ui/button"

// const ButtonBook = () => {
//   return (
//     <div className="mx-2 flex">
//       <Button
//         className="h-14 w-full rounded-sm border-black text-xl !text-gray-900 xl:hidden"
//         variant="outline"
//       >
//         RESERVE J
//       </Button>
//     </div>
//   )
// }

// export default ButtonBook
