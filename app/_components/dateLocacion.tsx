"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/app/_components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "../_lib/utils"
import { ptBR } from "date-fns/locale"
import { Button } from "./ui/button"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-center text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2h-4 w-4" />
          {date ? (
            format(date, "dd/MM/yyy", { locale: ptBR })
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
