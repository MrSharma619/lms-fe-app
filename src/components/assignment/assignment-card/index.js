import "./style.css";
import AssignmentMenu from "../../menu/assignment-menu";


const AssignmentCard = () => {
  return (
    <div>
      <div className="cardTask lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          
          <div className="">
            <img
              className="lg: w-[7rem] lg:h-[7rem] object-cover"
              src="https://lh3.googleusercontent.com/9v_pYj1CXETeu4G_id_-dP7b_q8Ys_Ga05S01yvU0aKxRWkzkxJGa2qWXrkWXtYzVsFV4Tuj1aQE6d-KsJGD8fTFJQFrGTLofjL_IknxGreQXGelhAg4"
              alt="assignment"
            />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">Android app</h1>
              <p className="text-gray-700 text-sm">
                Use android sdk 15 to make this mobile app.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {[1, 2, 3].map((item, i) => (
                <span key={i} className="py-1 px-5 rounded-full techstack">
                    Android
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <AssignmentMenu />
        </div>

      </div>
    </div>
  );
};

export default AssignmentCard;
