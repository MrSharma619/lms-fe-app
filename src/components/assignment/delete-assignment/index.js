import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundImage: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  border: "1px solid #000",
  boxShadow: "0px -25px 20px 50px rgba(0,0,0,0.45), 25px 0px 20px -20px rgba(0,0,0,0.45), 0px 25px 20px 50px rgba(0,0,0,0.45), -25px 0px 20px -20px rgba(0,0,0,0.45)",
  p: 4,
};

export default function DeleteAssignment({open, handleClose}) {
  

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            delete
          </Typography>
          
        </Box>
      </Modal>
    </div>
  );
}
