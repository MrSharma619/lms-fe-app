import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { markNotificationAsRead } from "../../redux/slice/notification-slice";

const NotificationList = () => {
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const allNotifications = [...notification.notifications];

  const handleReadNotification = (e, notificationId) => {
    e.preventDefault();

    dispatch(markNotificationAsRead({ notificationId: notificationId }));

  };

  if (allNotifications === undefined || allNotifications.length === 0) {
    return (
      <div className="notificationNotFound lg:flex justify-between">
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
      {allNotifications
        ?.sort((a, b) => b.read - a.read)
        .reverse()
        .map((dto, i) => (
          <div className="notification lg:flex justify-between" key={i}>
            <div className="d-flex-notification">
              <div className="p-2 flex-fill">
                {dto.read && (
                  <ChecklistIcon sx={{ fontSize: "80px", color: "blue" }} />
                )}
                {!dto.read && (
                  <InfoIcon sx={{ fontSize: "80px", color: "blue" }} />
                )}
              </div>
              <div className="p-2 flex-fill">
                <span className="span-notification">{dto.message}</span>
              </div>
              {!dto.read && (
                <div
                  className="p-2 flex-fill ms-auto"
                  onClick={(e) => handleReadNotification(e, dto.id)}
                >
                  <DoneIcon className="done-icon" sx={{ fontSize: "50px" }} />
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default NotificationList;
