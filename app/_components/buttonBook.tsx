"use client"

import { Button } from "./ui/button"

const ButtonBook = () => {
  return (
    <div className="mx-2 flex">
      <Button
        className="h-14 w-full rounded-sm border-black text-xl !text-gray-900 xl:hidden"
        variant="outline"
      >
        RESERVE JÁ
      </Button>
    </div>
  )
}

export default ButtonBook
