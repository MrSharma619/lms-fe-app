import { Avatar } from "@mui/material";
import './style.css';

const Navbar = () => {
    return ( 
        // using tailwind
        <div className="container z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center">

            <p className="font-bold text-lg">LearnUp</p>

            <div className="flex items-center gap-5">
                <p>Manthan</p>
                <Avatar>M</Avatar>

            </div>

        </div>
     );
}
 
export default Navbar;