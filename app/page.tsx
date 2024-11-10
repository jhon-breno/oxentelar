import Banner from "./_components/banner"
import PropertySearch from "./_components/propertySearch"
import Header from "./_components/header"
// import SearchHome from "./_components/searchHome"
import SheetMenu from "./_components/sheetMenu"

export default function Home() {
  return (
    <div className="my-0 w-full">
      <div className="flex items-center justify-between xl:justify-center">
        <Header />
        <SheetMenu />
      </div>
      <PropertySearch />
      <Banner />
      {/* <SearchHome /> */}
    </div>
  )
}
