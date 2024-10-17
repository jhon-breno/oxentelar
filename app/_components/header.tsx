import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";

const Header = () => {
    return ( <header className="flex justify-between p-4">
        <Link href="#">
          <h2 className="ml-2 font-extrabold !text-4xl">
            | Oxente <br />| Lar
          </h2>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Sidebar />
          </SheetTrigger>
          <SheetContent>
            <SheetDescription className="font-bold">Menu</SheetDescription>
            <Link href="#" className="decoration-destructive">
              Início
            </Link>
          </SheetContent>
        </Sheet>
      </header> );
}
 
export default Header;