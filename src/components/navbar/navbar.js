import { Avatar } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import InboxIcon from '@mui/icons-material/Inbox';
import { fetchUserNotifications } from "../../redux/slice/notification-slice";
import { useEffect } from "react";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchUserNotifications());

    //console.log("hi");
  }, [dispatch])

  const totalUnreadNotifications = notification.notifications.filter((notification) => notification.read === false);

  //console.log(notification.notifications);

  return (
    // using tailwind
    <div className="container z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center">
      <p className="font-bold text-lg">LearnUp</p>

      

      <div className="flex items-center gap-5">

      <div>
        <a href="/notifications" className="notification-a">
          <span><InboxIcon /></span>
          <span className="badge">{totalUnreadNotifications?.length}</span>
        </a>
      </div>

        <p>{user.fullName}</p>
        <Avatar>{user.fullName.substring(0, 1).toUpperCase()}</Avatar>
      </div>
    </div>
  );
};

export default Navbar;
