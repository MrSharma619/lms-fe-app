import { useDispatch, useSelector } from "react-redux";
import FrontPage from "./components/front-page";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import { useEffect, useState } from "react";
import { getUserProfile } from "./redux/slice/auth-slice";
import ReactLoading from "react-loading";
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  // console.log("token1", token);
  // console.log("auth1", auth);
  // dispatch(getUserProfile(auth.token || token));

  useEffect(() => {
    dispatch(getUserProfile(auth.token || token))
      .then(() => setLoading(false)) // Set loading to false once user profile is fetched
      .catch((error) => {
        console.log(
          "Some error occurred! Please reload."
        );

        setLoading(false);
      });

    //console.log(auth.user, token);
  }, [auth.token, token, dispatch]);

  if (loading) {
    return (
      <div className="d-flex">
        <div className="p-2 flex-fill">
          <ReactLoading
            type="spinningBubbles"
            color="black"
            height={125}
            width={75}
          />
        </div>
        <div className="p-2 flex-fill loading-text">Loading</div>
      </div>
    );
  }

  return (
    <div>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <FrontPage setLoading={setLoading} />
      )}
    </div>
  );
}

export default App;
