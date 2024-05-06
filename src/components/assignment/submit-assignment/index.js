import { Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitAssignment } from "../../../redux/slice/submission-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundImage:
    "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  outline: "none",
  boxShadow:
    "0px -25px 20px 50px rgba(0,0,0,0.45), 25px 0px 20px -20px rgba(0,0,0,0.45), 0px 25px 20px 50px rgba(0,0,0,0.45), -25px 0px 20px -20px rgba(0,0,0,0.45)",
  p: 4,
};

export default function SubmitAssignment({ open, handleClose, item }) {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    submissionUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(submitAssignment({ assignmentId: item.id, submissionUrl: formData.submissionUrl }));

    setFormData({
        submissionUrl: ""
    });

    //console.log("fd", formData);

    handleClose();

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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">

              <Grid item xs={12}>
                <TextField
                  label="URL"
                  fullWidth
                  name="submissionUrl"
                  value={formData.submissionUrl}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                fullWidth
                className="customBtn"         //css provided in some other style.css so no issues 
                sx={{padding: "1rem"}}
                type="submit"
                >
                  Submit
                </Button>

              </Grid>

            </Grid>

          </form>

        </Box>

      </Modal>

    </div>

  );
}
