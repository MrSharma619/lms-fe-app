import { useDispatch, useSelector } from "react-redux";
import FrontPage from "./components/front-page";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import { useEffect, useState } from "react";
import { getUserProfile } from "./redux/slice/auth-slice";
import ReactLoading from "react-loading";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Notification from "./components/notification";
import { Slide, ToastContainer, toast } from "react-toastify";
import SockJsClient from "react-stomp";

function App() {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  //cors issue so not using gateway(idk)
  const SOCKET_URL = "http://localhost:5004/ws-message";

  let onConnected = () => {
    console.log("Connected to web socket...");
    setLoading(false);
  };

  let onDisconnect = () => {
    console.log("Disconnected from web socket...");
    setLoading(true);
  };

  let onMessageReceived = (msg) => {
    //console.log(msg);

    if (auth.user.id === msg.recipientId) {
      toast.info(msg.message);
    }
  };

  // console.log("token1", token);
  // console.log("auth1", auth);
  // dispatch(getUserProfile(auth.token || token));

  useEffect(() => {
    dispatch(getUserProfile(auth.token || token))
      .then(() => setLoading(false)) // Set loading to false once user profile is fetched
      .catch((error) => {
        console.log("Some error occurred! Please reload.");

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
          <SockJsClient
            url={SOCKET_URL}
            topics={["/topic/message"]}
            onConnect={onConnected}
            onDisconnect={onDisconnect}
            onMessage={(msg) => onMessageReceived(msg)}
            debug={false}
          />

          <ToastContainer
            autoClose={10000}
            position="top-right"
            closeOnClick
            pauseOnHover
            transition={Slide}
            hideProgressBar={false}
          />

          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/notifications" element={<Notification />} />
          </Routes>
        </div>
      ) : (
        <FrontPage setLoading={setLoading} />
      )}
    </div>
  );
}

export default App;
