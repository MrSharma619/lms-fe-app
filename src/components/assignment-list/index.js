import AssignmentCard from "../assignment/assignment-card";

const AssignmentList = () => {
  return (
    <div className="space-y-5 w-[67vw]">
      {[1, 2, 3, 4, 5].map((item, i) => (
        <AssignmentCard key={i}/>
      ))}
    </div>
  );
};

export default AssignmentList;
