import { Slide, ToastContainer, toast } from "react-toastify";
import AssignmentList from "../assignment-list";
import Sidebar from "../sidebar/sidebar";
import SockJsClient from "react-stomp";
import "react-toastify/dist/ReactToastify.css"; // Import toastify css file
import { useSelector } from "react-redux";

//cors issue so not using gateway(idk)
const SOCKET_URL = "http://localhost:5004/ws-message";

const Home = () => {

  const auth = useSelector((state) => state.auth);

  let onConnected = () => {
    console.log("Connected to web socket...");
  };

  let onDisconnect = () => {
    console.log("Disconnected from web socket...");
  };

  let onMessageReceived = (msg) => {

    //console.log(msg);

    if(auth.user.id === msg.recipientId){
      toast.info(msg.message);
    }
    
  };

  return (
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

      <div className="lg:flex px-5 lg:px-20 pt-[2.9vh]">
        <div className="hidden lg:block w-[25vw] relative">
          <Sidebar />
        </div>

        <div className="right-side-part w-full flex justify-center mb-10 ml-10">
          <AssignmentList />
        </div>
      </div>
    </div>
  );
};

export default Home;
