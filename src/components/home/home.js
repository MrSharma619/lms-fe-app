import AssignmentList from "../assignment-list";
import Sidebar from "../sidebar/sidebar";

const Home = () => {
  return (
    <div className="lg:flex px-5 lg:px-20 pt-[2.9vh]">
      <div className="hidden lg:block w-[25vw] relative">
        <Sidebar />
      </div>

      <div className="right-side-part w-full flex justify-center mb-10 ml-10">
        <AssignmentList />
      </div>
    </div>
  );
};

export default Home;
