import { Avatar } from "@mui/material";
import './style.css';
import { useSelector } from "react-redux";

const Navbar = () => {

    const { auth } = useSelector(store => store);
    const user = auth.user;

    return ( 
        // using tailwind
        <div className="container z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center">

            <p className="font-bold text-lg">LearnUp</p>

            <div className="flex items-center gap-5">
                <p>{user.fullName}</p>
                <Avatar>{user.fullName.substring(0, 1).toUpperCase()}</Avatar>

            </div>

        </div>
     );
}
 
export default Navbar;