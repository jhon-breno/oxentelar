import {  MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

const Sidebar = () => {
    return (
    <Button variant="ghost">
        <MenuIcon className="!h-10 !w-10"/>
    </Button> );
}
 
export default Sidebar;