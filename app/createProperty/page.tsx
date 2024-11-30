"use client"
import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../_components/ui/dialog"
import { Button } from "../_components/ui/button"
import { SquarePlus } from "lucide-react"
import { Card } from "../_components/ui/card"

const MyProperties = () => {
  const [properties, setProperties] = useState([])
  const [property, setProperty] = useState({
    name: "",
    type: "",
    postalCod: "",
    street: "",
    number: 0,
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    pricePerMonth: 0,
    description: "",
    coverImage: "",
    imagesURL: [],
    highlights: [],
    status: "",
    maxGuests: 0,
    recommended: false,
  })

  const router = useRouter()

  useEffect(() => {
    // Fetch properties do usuário logado
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/myProperty")
        const data = await res.json()
        setProperties(data)
      } catch (error) {
        console.error("Erro ao buscar propriedades:", error)
      }
    }

    fetchProperties()
  }, [])

  const handlePriceChange = (value: number) => {
    const valueString = value.toString().replace(/\D/g, "") // Remove caracteres não numéricos
    const formatted = (Number(valueString) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    return formatted
  }

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target

    if (name === "postalCod") {
      // Formata o CEP no formato 00000-000
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{3})/, "$1-$2")
      setProperty((prev) => ({ ...prev, [name]: formatted }))

      if (formatted.length === 9) {
        // Faz a busca na API ViaCEP
        try {
          const res = await fetch(`/api/viaCep?cep=${formatted}`)
          const address = await res.json()

          if (!address.error) {
            setProperty((prev) => ({
              ...prev,
              street: address.logradouro || "",
              neighborhood: address.bairro || "",
              city: address.localidade || "",
              state: address.uf || "",
            }))
          }
        } catch (err) {
          console.error("Erro ao buscar o CEP:", err)
        }
      }
    } else {
      setProperty((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/createProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      })

      if (res.ok) {
        // Atualizar a página e fechar a modal
        router.push("/createProperty")
        router.refresh()
        alert("Imóvel adicionado com sucesso!")
      } else {
        alert("Erro ao adicionar imóvel.")
      }
    } catch (error) {
      console.error("Erro ao adicionar imóvel:", error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Meus Imóveis</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 w-full">Adicionar Imóvel</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Adicionar Imóvel
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProperty} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                name="name"
                value={property.name}
                onChange={handleChange}
                className="w-full rounded-sm border border-solid border-grayPrimary p-1"
                required
              />
            </div>
            <div className="flex gap-12">
              <div>
                <label className="block text-sm font-medium">Tipo</label>
                <select
                  name="type"
                  onChange={handleChange}
                  required
                  className="input-select rounded-sm border border-solid border-grayPrimary p-1"
                >
                  <option value="">Selecione</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Kitnet">Kitnet</option>
                  <option value="Casa de Campo">Casa de Campo</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  onChange={handleChange}
                  required
                  className="input-select rounded-sm border border-solid border-grayPrimary p-1"
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Locado">Locado</option>
                </select>
              </div>
            </div>

            {/* ENDEREÇO */}
            <div className="flex gap-2">
              {/* CEP */}
              <div>
                <label className="block text-sm font-medium">CEP</label>
                <input
                  type="text"
                  name="postalCod"
                  value={property.postalCod}
                  onChange={handleChange}
                  className="rounded-sm border border-solid border-grayPrimary p-1"
                  required
                />
              </div>
              {/* UF */}
              <div>
                <label className="block text-sm font-medium">UF</label>
                <input
                  type="text"
                  name="state"
                  value={property.state}
                  readOnly
                  className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {/* Rua */}
              <div>
                <label className="block text-sm font-medium">Rua</label>
                <input
                  type="text"
                  name="street"
                  value={property.street}
                  onChange={handleChange}
                  className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                />
              </div>
              {/* Número */}
              <div>
                <label className="block text-sm font-medium">Número</label>
                <input
                  type="number"
                  name="number"
                  onChange={handleChange}
                  value={property.number}
                  className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                  required
                  placeholder="123"
                />
              </div>
            </div>

            {/* Complemento */}
            <div>
              <label className="W block text-sm font-medium">Complemento</label>
              <input
                type="text"
                name="complement"
                value={property.complement}
                onChange={handleChange}
                className="input-text w-full rounded-sm border border-solid border-grayPrimary p-2"
                placeholder="Complemento (Apt 1, Casa B)"
              />
            </div>
            <div className="flex gap-2">
              {/* Bairro */}
              <div>
                <label className="block text-sm font-medium">Bairro</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={property.neighborhood}
                  onChange={handleChange}
                  className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                  placeholder="Bairro"
                  required
                />
              </div>
              {/* Cidade */}
              <div>
                <label className="block text-sm font-medium">Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={property.city}
                  onChange={handleChange}
                  className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                  placeholder="Cidade"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Preço Mensal</label>
              <input
                type="text"
                name="pricePerMonth"
                // formartar para moeda brasileira no input ao digitar

                onChange={handleChange}
                value={handlePriceChange(property.pricePerMonth)}
                // value={ property.pricePerMonth}
                className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                placeholder="R$ 0,00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Descrição</label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                className="input-text w-full rounded-sm border border-solid border-grayPrimary p-2"
                placeholder="Descrição"
                required
              />
            </div>

            <DialogClose asChild>
              <Button type="submit" className="w-full text-lg font-semibold">
                Salvar
                <SquarePlus />
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties?.map((prop: any) => (
          <Card key={prop.id} className="rounded-lg border p-4 shadow">
            <div className="relative h-[106px] w-[120px]">
              <Image
                src={prop.coverImage}
                alt={prop.name}
                className="rounded-md object-cover"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3 className="mt-2 text-lg font-bold">{prop.name}</h3>
            <p className="text-sm">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(prop.pricePerMonth)}
            </p>
            <p className="text-sm text-gray-500">Status: {prop.status}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyProperties
