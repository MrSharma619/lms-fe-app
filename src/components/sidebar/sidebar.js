import { Avatar, Button } from "@mui/material";
import "./style.css";
import { useState } from "react";
import CreateAssignment from "../assignment/create-assignment";

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
    value: "Completed",
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

const CURRENT_USER_ROLE = "ROLE_TEACHER";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Home"); //by default on Home

  const [openCreateAssignmentWindow, setOpenCreateAssignmentWindow] = useState(false);

  const openNewAssignmentWindow = () => {
    setOpenCreateAssignmentWindow(true);
  };

  const closeNewAssignmentWindow = () => {
    
    setOpenCreateAssignmentWindow(false);

    setActiveMenu("Home");

  };

  const handleMenuChange = (item) => {
    if (item.value === "") {
      openNewAssignmentWindow();
    }

    setActiveMenu(item.value);
  };

  const handleLogout = () => {
    console.log("log out");
  };

  return (
    <>
      <div className=" card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
        <div className="space-y-5 h-full">
          {" "}
          {/*  margin top and bottom */}
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
