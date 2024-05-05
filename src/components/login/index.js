import { Button, TextField } from "@mui/material";
import { useState } from "react";
import './style.css';
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/auth-slice";

const LoginSegment = ({togglePanel}) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    dispatch(login(formData));

    //console.log("fd", formData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-8">Login</h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
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

        <div>
          <Button
            fullWidth
            className="customBtn" //css provided in some other style.css so no issues
            sx={{ padding: "1rem" }}
            type="submit"
          >
            Login
          </Button>
        </div>

      </form>

      <div>

        <br></br>
        <br></br>

        <h1 className="h1-line-text text-2xl">New to LearnUp?</h1>

        <div className="flex flex-col justify-center items-center mt-4">

        <button
        className="btn-route-register"
        onClick={togglePanel}>
            Create a new Account
        </button>
        </div>

      </div>

    </div>
  );
};

export default LoginSegment;
