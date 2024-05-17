import "./style.css";
import AssignmentMenu from "../../menu/assignment-menu";


const AssignmentCard = ({ item }) => {

  return (
    <div>
      <div className="cardTask lg:flex justify-between">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
          
          <div>
            <img
              className="lg: w-[7rem] lg:h-[7rem] object-cover"
              src={item.imageUrl}
              alt="assignment"
            />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="font-bold text-lg">{item.title}</h1>
              <p className="text-gray-700 text-sm">
                {item.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {item.tags?.map((item, i) => (
                <span key={i} className="py-1 px-5 rounded-full techstack">
                    {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <AssignmentMenu item={item}/>
        </div>

      </div>
    </div>
  );
};

export default AssignmentCard;
