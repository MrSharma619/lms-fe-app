import * as React from "react";
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

const userList = [1, 2, 3];

export default function StudentList({ open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {userList.map((item, index) => (
            <>
              <div className="flex items-center justify-between w-full">
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>M</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Manthan"} secondary={"@manthan"} />
                    {/*  name and email id */}
                  </ListItem>
                </div>

                <div>
                  <Button className="customBtn">Select</Button>
                </div>
              </div>

              {index !== userList.length - 1 && <Divider variant="inset" />} {/* no divider for last item */}

            </>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
