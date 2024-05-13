import { Avatar, Button } from "@mui/material";
import "./style.css";
import { useState } from "react";
import CreateAssignment from "../assignment/create-assignment";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/auth-slice";

const menuItems = [
  {
    id: 1,
    name: "Home",
    value: "Home",
    role: ["ROLE_TEACHER", "ROLE_STUDENT"],
  },
  {
    id: 2,
    name: "Finished Tasks",
    value: "Done",
    role: ["ROLE_TEACHER", "ROLE_STUDENT"],
  },
  {
    id: 3,
    name: "Assigned Tasks",
    value: "Assigned",
    role: ["ROLE_TEACHER"],
  },
  {
    id: 4,
    name: "Unassigned Tasks",
    value: "Pending",
    role: ["ROLE_TEACHER"],
  },
  {
    id: 5,
    name: "Create New Task",
    value: "",
    role: ["ROLE_TEACHER"],
  },
  {
    id: 6,
    name: "Notifications",
    value: "Notifications",
    role: ["ROLE_STUDENT"],
  },
];

const Sidebar = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Home"); //by default on Home

  const [openCreateAssignmentWindow, setOpenCreateAssignmentWindow] = useState(false);

  const auth = useSelector((state) => state.auth);
  const CURRENT_USER_ROLE = auth.user?.role;

  const openNewAssignmentWindow = () => {
    setOpenCreateAssignmentWindow(true);
  };

  const closeNewAssignmentWindow = () => {
    
    setOpenCreateAssignmentWindow(false);

    setActiveMenu("Home");

  };

  const handleMenuChange = (item) => {

    const updatedParams = new URLSearchParams(location.search);

    if (item.value === "") {
      openNewAssignmentWindow();
    }
    // /login?filter=hi&sort=asc
    else if(item.value === "Home"){
      updatedParams.delete("filter");

      // /login?sort=asc
      const queryString = updatedParams.toString();
      const updatedPath = queryString ? `${location.pathname}?${queryString}` : location.pathname

      navigate(updatedPath);
    }
    else{
      updatedParams.set("filter", item.value.toLowerCase());
      navigate(`${location.pathname}?${updatedParams.toString()}`)
    }

    setActiveMenu(item.value);
  };

  const handleLogout = () => {
    //console.log("log out");

    removeParamsFromUrl();

    dispatch(logout());

  };

  const removeParamsFromUrl = () => {
    const queryParams = new URLSearchParams(location.search);
    
    // loop through all params and delete them
    queryParams.forEach((value, key) => {
      queryParams.delete(key);
    });

    //navigate after logout otherwise no updates in browser
    navigate(`${location.pathname}?${queryParams.toString()}`);

  }

  return (
    <>
      <div className=" card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">              {/*  margin top and bottom */}
          <div className="flex justify-center">
            <Avatar
              sx={{ width: "8rem", height: "8rem" }}
              className="border-2 border-[black]" //border color of image
              src="titleIcon.ico"
            />
          </div>
          {menuItems
            .filter((item) => item.role.includes(CURRENT_USER_ROLE))
            .map((item) => (
              <p
                key={item.id}
                className={`py-3 px-5 rounded-full text-center cursor-pointer 
                            ${
                              activeMenu === item.value
                                ? "activeMenuItem"
                                : "menuItem"
                            }`}
                onClick={() => handleMenuChange(item)}
              >
                {/* change css class based on active item*/}
                {item.name}
              </p>
            ))}
          <Button onClick={handleLogout} fullWidth className="logoutBtn">
            Logout
          </Button>
        </div>
      </div>

      <CreateAssignment open={openCreateAssignmentWindow} handleClose={closeNewAssignmentWindow}/>
    </>
  );
};

export default Sidebar;
