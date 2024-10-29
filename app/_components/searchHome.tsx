import { Calendar } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { DatePicker } from "./dateLocacion"

const SearchHome = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex items-center justify-center gap-4">
        <Card className="flex flex-col items-center">
          <CardHeader>
            <CardTitle className="flex justify-between gap-4 text-xl">
              Data Início Prevista
              <Calendar />
            </CardTitle>
            <CardDescription>Início da Locação Prevista</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <p>Selecionar Data Início Prevista</p> */}
            <DatePicker />
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center">
          <CardHeader>
            <CardTitle className="flex justify-between gap-4 text-xl">
              Data Fim Prevista <Calendar />
            </CardTitle>
            <CardDescription>Fim da Locação</CardDescription>
          </CardHeader>
          <CardContent>
            <DatePicker />
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
