import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../redux/slice/auth-slice";
import { assignTaskToUser } from "../../../redux/slice/assignment-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundImage:
    "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  boxShadow:
    "0px -25px 50px 10px rgba(0,0,0,0.45), 25px 0px 50px 10px rgba(0,0,0,0.45), 0px 25px 50px 10px rgba(0,0,0,0.45), -25px 0px 50px 10px rgba(0,0,0,0.45)",
  p: 2, //padding
  outline: "none",
};

export default function StudentList({ open, handleClose, item }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const userList = auth.users.filter((user) => user.role === "ROLE_STUDENT");

  useEffect(() => {
    dispatch(getUserList(localStorage.getItem("token")));
  }, [dispatch]);

  const handleAssignmentToUser = (userId) => {

    dispatch(assignTaskToUser({ assignmentId: item.id, userId: userId }));

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {userList?.map((user, index) => (
            <div key={index}>
              <div className="flex items-center justify-between w-full">
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        {user.fullName.substring(0, 1).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.fullName}
                      secondary={user.email}
                    />
                    {/*  name and email id */}
                  </ListItem>
                </div>

                <div>
                  <Button onClick={() => handleAssignmentToUser(user.id)} className="customBtn">Select</Button>
                </div>
              </div>
              {index !== userList.length - 1 && <Divider variant="inset" />}{" "}
              {/* no divider for last item */}
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
