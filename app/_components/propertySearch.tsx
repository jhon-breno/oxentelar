"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
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
  const router = useRouter()

  // Estados para armazenar os filtros
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  // Função para realizar a busca
  const handleSearch = () => {
    const queryParams = new URLSearchParams()

    if (location) queryParams.append("location", location)
    if (propertyType) queryParams.append("propertyType", propertyType)
    if (maxPrice) queryParams.append("maxPrice", maxPrice)

    // Redirecionar para a página de propriedades com os parâmetros
    router.push(`/propertys?${queryParams.toString()}`)
  }

  return (
    <div className="flex flex-col items-center bg-map-bg bg-cover bg-center bg-no-repeat">
      <h1 className="ml-4 py-2 text-2xl font-semibold">
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
        <Input
          type="text"
          placeholder="Onde prefere se aconchegar?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="flex gap-2">
          <Select onValueChange={(value) => setPropertyType(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipo de imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="casa_de_campo">Casa no Campo</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="kitnet">Kitnet</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="xl:w-[200px]"
            type="number"
            placeholder="R$ Valor Máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <Button
          className="w-[100%] bg-purple-600 text-white hover:bg-purple-500 xl:w-[250px]"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>
    </div>
  )
}

export default PropertySearch
