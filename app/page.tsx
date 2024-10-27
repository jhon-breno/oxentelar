import Banner from "./_components/banner"
import SearchHome from "./_components/searchHome"
import { Button } from "./_components/ui/button"

export default function Home() {
  return (
    <div className="mx-4 my-0 w-full">
      <Button
        className="h-14 w-full rounded-sm border-black text-xl !text-gray-900 xl:hidden"
        variant="outline"
      >
        RESERVE JÁ
      </Button>
      <Banner />
      <SearchHome />
    </div>
  )
}
