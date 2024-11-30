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
    id: "",
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
    highlights: [] as string[],
    status: "",
    maxGuests: 0,
    recommended: false,
  })

  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDialogAddPropertyOpen, setDialogAddPropertyOpen] = useState(false)
  const [isDialogOpen, setDialogOpen] = useState(false)

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

  // const handlePriceChange = (value: number) => {
  //   const valueString = value.toString().replace(/\D/g, "") // Remove caracteres não numéricos
  //   const formatted = (Number(valueString) / 100).toLocaleString("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   })
  //   return formatted
  // }

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
        setDialogAddPropertyOpen(false)
      } else {
        alert("Erro ao adicionar imóvel.")
      }
    } catch (error) {
      console.error("Erro ao adicionar imóvel:", error)
    }
  }

  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return

    try {
      const res = await fetch(`/api/deletePropertyWithValidation`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: propertyToDelete }),
      })

      const data = await res.json()

      if (res.ok) {
        setProperties((prev) =>
          prev.filter((prop) => prop.id !== propertyToDelete),
        )
        setDeleteDialogOpen(false)
        alert(data.message) // Mostra a mensagem de sucesso
      } else {
        alert(data.error) // Mostra o erro retornado pela API
      }
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error)
      alert("Erro ao excluir imóvel. Por favor, tente novamente.")
    }
  }

  const handleChangeHighlight = (
    e: React.ChangeEvent<HTMLInputElement>,
    feature: string,
  ) => {
    const value = e.target.value === "sim"

    // Corrigir para usar a função correta de atualização de estado
    setProperty((prev) => {
      let updatedHighlights = [...prev.highlights]
      if (value) {
        if (!updatedHighlights.includes(feature)) {
          updatedHighlights.push(feature)
        }
      } else {
        updatedHighlights = updatedHighlights.filter((item) => item !== feature)
      }
      return { ...prev, highlights: updatedHighlights }
    })
  }

  const handleSubmitHighlights = () => {
    // Verifique se `highlights` é uma string
    let formattedHighlights = property.highlights

    if (typeof formattedHighlights === "string") {
      // Se for uma string, converta para um array de strings
      formattedHighlights = formattedHighlights
        .split(",")
        .map((highlight) => highlight.trim())
    }

    // Agora, `formattedHighlights` é um array
    setProperty((prev) => ({
      ...prev,
      highlights: formattedHighlights, // Salve o array de highlights
    }))

    setDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Meus Imóveis</h1>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja Excluir esse imóvel?</DialogTitle>
          </DialogHeader>
          <p>Essa ação é irreversível.</p>
          <div className="mt-4 flex gap-4">
            <Button variant="destructive" onClick={handleDeleteProperty}>
              Excluir Imóvel
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Não, Voltar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogAddPropertyOpen}
        onOpenChange={setDialogAddPropertyOpen}
      >
        <DialogTrigger asChild>
          <Button className="mb-4 w-full" onClick={setDialogAddPropertyOpen}>
            Adicionar Imóvel
          </Button>
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
                  <option value="casa_de_campo">Casa de Campo</option>
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
                  onChange={handleChange}
                  className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                  required
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
                  required
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
                type="number"
                name="pricePerMonth"
                value={property.pricePerMonth}
                onChange={handleChange}
                className="input-text rounded-sm border border-solid border-grayPrimary p-1"
                placeholder="R$ 0,00"
                required
              />
              <p className="mt-2 text-sm font-medium">
                R$ {property.pricePerMonth}
              </p>
            </div>
            {/* Descrição */}
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

            {/* Destaques */}
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setDialogOpen(true)}>
                  Editar Destaques
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Destaques do Imóvel
                  </DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  {/* Formulário de Destaques */}
                  <div>
                    <label className="block text-sm font-medium">Sala</label>
                    <div className="flex gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="sala"
                          value="sim"
                          onChange={(e) => handleChangeHighlight(e, "Sala")}
                        />
                        Sim
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="sala"
                          value="nao"
                          onChange={(e) => handleChangeHighlight(e, "Sala")}
                        />
                        Não
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Cozinha</label>
                    <div className="flex gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="cozinha"
                          value="sim"
                          onChange={(e) => handleChangeHighlight(e, "Cozinha")}
                        />
                        Sim
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="cozinha"
                          value="nao"
                          onChange={(e) => handleChangeHighlight(e, "Cozinha")}
                        />
                        Não
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Varanda</label>
                    <div className="flex gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="varanda"
                          value="sim"
                          onChange={(e) => handleChangeHighlight(e, "Varanda")}
                        />
                        Sim
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="varanda"
                          value="nao"
                          onChange={(e) => handleChangeHighlight(e, "Varanda")}
                        />
                        Não
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Garagem</label>
                    <div className="flex gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="garagem"
                          value="sim"
                          onChange={(e) => handleChangeHighlight(e, "Garagem")}
                        />
                        Sim
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="garagem"
                          value="nao"
                          onChange={(e) => handleChangeHighlight(e, "Garagem")}
                        />
                        Não
                      </label>
                    </div>
                  </div>

                  {/* Continue com os outros campos */}
                  <div>
                    <label className="block text-sm font-medium">Quintal</label>
                    <div className="flex gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="quintal"
                          value="sim"
                          onChange={(e) => handleChangeHighlight(e, "Quintal")}
                        />
                        Sim
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="quintal"
                          value="nao"
                          onChange={(e) => handleChangeHighlight(e, "Quintal")}
                        />
                        Não
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Isento de IPTU
                    </label>
                    <div className="flex gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="isentoIPTU"
                          value="sim"
                          onChange={(e) =>
                            handleChangeHighlight(e, "Isento de IPTU")
                          }
                        />
                        Sim
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="isentoIPTU"
                          value="nao"
                          onChange={(e) =>
                            handleChangeHighlight(e, "Isento de IPTU")
                          }
                        />
                        Não
                      </label>
                    </div>
                  </div>

                  <Button type="button" onClick={handleSubmitHighlights}>
                    Salvar
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div>
              <div>
                <h3>Destaques Selecionados:</h3>
                <p>{property.highlights.join(", ")}</p>
              </div>
            </div>

            {/* Número de pessoas acomodam o imovel*/}
            <div>
              <label className="block text-sm font-medium">
                Número Aconselhado de Pessoas
              </label>
              <input
                type="number"
                name="maxGuests"
                value={property.maxGuests}
                onChange={handleChange}
                className="input-number rounded-sm border border-solid border-grayPrimary p-1"
                placeholder="Número máximo de hóspedes"
                required
              />
            </div>

            <Button type="submit" className="w-full text-lg font-semibold">
              Salvar
              <SquarePlus />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties?.map((prop: any) => (
          <Card
            key={prop.id}
            className="flex items-center justify-between rounded-lg border p-4 shadow"
          >
            <div>
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
            </div>
            <div>
              <Button
                variant="destructive"
                onClick={() => {
                  setPropertyToDelete(prop.id) // Passa o id do imóvel selecionado
                  setDeleteDialogOpen(true)
                }}
              >
                Excluir Imóvel
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyProperties
