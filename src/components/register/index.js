import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import './style.css';
import { useDispatch } from "react-redux";
import { register } from "../../redux/slice/auth-slice";

const RegisterSegment = ({togglePanel}) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(formData));

    //console.log("fd", formData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-8">Register</h1>

      <form className="space-y-5" onSubmit={handleSubmit}>

        <TextField
          fullWidth
          label="Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name..."
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address..."
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password..."
        />

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="role"
            value={formData.role}
            label="Role"
            onChange={handleChange}
            >
                <MenuItem value={"ROLE_TEACHER"}>Teacher</MenuItem>
                <MenuItem value={"ROLE_STUDENT"}>Student</MenuItem>
            </Select>
        </FormControl>

        <div>
          <Button
            fullWidth
            className="customBtn" //css provided in some other style.css so no issues
            sx={{ padding: "1rem" }}
            type="submit"
          >
            Register
          </Button>
        </div>

      </form>

      <div>

        <br></br>

        <h1 className="h1-line-text text-2xl">Already registered?</h1>         {/* css already there for these classes */}

        <div className="flex flex-col justify-center items-center mt-4">

        <button
        className="btn-route-login"
        onClick={togglePanel}>
            Sign in to an existing LearnUp account
        </button>
        </div>

      </div>

    </div>
  );
};

export default RegisterSegment;
