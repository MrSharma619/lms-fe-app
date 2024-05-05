import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "../../../redux/slice/assignment-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  backgroundImage:
    "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  border: "1px solid #000",
  boxShadow:
    "0px -25px 20px 50px rgba(0,0,0,0.45), 25px 0px 20px -20px rgba(0,0,0,0.45), 0px 25px 20px 50px rgba(0,0,0,0.45), -25px 0px 20px -20px rgba(0,0,0,0.45)",
  p: 4,
};

export default function DeleteAssignment({ open, handleClose, item }) {

  const dispatch = useDispatch();

  const handleDeleteAssignment = () => {
    
    dispatch(deleteAssignment(item.id));

    handleClose();

  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="rounded-md bg-black p-5 flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[white]">
                  Are you sure you want to delete this assignment?{" "}
                </span>
              </div>
            </div>

            <div className="flex gap-5">
              <div style={{ marginLeft: "80px" }}>
                <IconButton color="success" onClick={() => handleDeleteAssignment()}>
                  <Check />
                </IconButton>
              </div>

              <div>
                <IconButton color="error" onClick={() => handleClose()}>
                  <Close />
                </IconButton>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
