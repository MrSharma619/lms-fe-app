import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch } from "react-redux";
import { createAssignment } from "../../../redux/slice/assignment-slice";

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

export default function CreateAssignment({ open, handleClose }) {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    tags: [],
    deadline: new Date(),
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const tags = ["Android", "Java", "React", "SBoot", "Maven", "Gradle"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (e, value) => {
    setSelectedTags(value);
  };

  const handleDeadlineChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.deadline = formatDate(formData.deadline);
    
    formData.tags = selectedTags;

    dispatch(createAssignment(formData));

    setFormData({
      title: "",
      imageUrl: "",
      description: "",
      tags: [],
      deadline: new Date(),
    });

    //console.log("fd", formData);

    handleClose();

  }

  const formatDate = (input) => {
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hour,
      $m: minute,
      $s: second
    } = input;

    const date = new Date(
      year,
      month,
      day,
      hour,
      minute,
      second
    );

    return date.toISOString();

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
                  label="Title"
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  fullWidth
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="multiple-tags"
                  options={tags}
                  onChange={handleTagChange}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField label="Technology" fullWidth {...params} />
                  )}
                />
              </Grid>

              <Grid item xs={12}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>

                  <DateTimePicker 
                  className="w-full"
                  label="Deadline" 
                  name="deadline" 
                  onChange={handleDeadlineChange}
                  renderInput={(params) => (
                    <TextField {...params} />
                  )}
                  />

                </LocalizationProvider>

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
