import { useState } from "react";
import { useSelector } from "react-redux";
import SockJsClient from "react-stomp";
import "./style.css";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from '@mui/icons-material/Done';

//will not use gateway because of CORS issue
//so pending
const SOCKET_URL = "http://localhost:5004/ws-message";

const NotificationList = () => {
  const auth = useSelector((state) => state.auth);

  const [unreadNotifications, setUnreadNotifications] = useState(null); //array of objects

  let onConnected = () => {
    console.log("web socket connected");
  };

  let onDisconnected = () => {
    console.log("web socket disconnected");
  };

  let onMessageReceived = (msg) => {
    setUnreadNotifications(msg);
  };

  const messages = unreadNotifications?.filter(
    (notification) => notification.recipientId === auth.user.id
  );

  //console.log("msg", messages);

  if (messages === undefined || messages.length === 0) {
    return (
      <div className="notificationNotFound lg:flex justify-between">
        <SockJsClient
          url={SOCKET_URL}
          topics={["/topic/message"]}
          onConnect={onConnected}
          onDisconnect={onDisconnected}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
        />

        <div className="d-flex-notfound">
          <div className="p-2 flex-fill">
            <DoNotDisturbIcon sx={{ fontSize: "200px" }} />
          </div>
          <div className="p-2 flex-fill">
            <div className="text1-notfound">Nothing to see here - yet</div>

            <div className="text2-notfound">
              You dont have any notifications
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 w-[67vw]">
      {messages?.map((dto, i) => (
        <div className="notification lg:flex justify-between" key={i}>
          <SockJsClient
            url={SOCKET_URL}
            topics={["/topic/message"]}
            onConnect={onConnected}
            onDisconnect={onDisconnected}
            onMessage={(msg) => onMessageReceived(msg)}
            debug={false}
          />

          <div className="d-flex-notification">
            <div className="p-2 flex-fill">
              <InfoIcon sx={{fontSize: "80px", color: "blue"}} />
            </div>
            <div className="p-2 flex-fill">
              <span className="span-notification">{dto.message}</span>
            </div>
            <div className="p-2 flex-fill ms-auto">
              <DoneIcon className="done-icon" sx={{fontSize: "50px"}} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
