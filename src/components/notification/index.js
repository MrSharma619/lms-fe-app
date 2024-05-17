import NotificationList from "../notification-list";
import Sidebar from "../sidebar/sidebar";

const Notification = () => {
  return (
    <div className="lg:flex px-5 lg:px-20 pt-[2.9vh]">
      <div className="hidden lg:block w-[25vw] relative">
        <Sidebar />
      </div>

      <div className="right-side-part w-full flex justify-center mb-10 ml-10">
        <NotificationList />
      </div>
    </div>
  );
};

export default Notification;
