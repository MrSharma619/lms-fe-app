import { useDispatch, useSelector } from "react-redux";
import FrontPage from "./components/front-page";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import { useEffect } from "react";
import { getUserProfile } from "./redux/slice/auth-slice";

function App() {

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const { auth } = useSelector(store => store);

  // console.log("token1", token);
  // console.log("auth1", auth);
  // dispatch(getUserProfile(auth.token || token));


  useEffect(() => {
    dispatch(getUserProfile(auth.token || token));

    //console.log(auth.user, token);

  }, [auth.token, token, dispatch]);

  return (
    <div>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <FrontPage />
      )}
    </div>
  );
}

export default App;
