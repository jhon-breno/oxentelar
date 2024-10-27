import { Calendar } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"

const SearchHome = () => {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex items-center justify-center gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between gap-4">
              Data Início Prevista
              <Calendar />
            </CardTitle>
            <CardDescription>Início da Locação Prevista</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Selecionar Data Início</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              Data Fim Prevista <Calendar />
            </CardTitle>
            <CardDescription>Fim da Locação</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Selecionar Data Final Prevista</p>
          </CardContent>
        </Card>
      </div>
      <Button variant="default" className="mt-4 w-[320px] xl:w-[600px]">
        Pesquisar
      </Button>
    </div>
  )
}

export default SearchHome
