import { useDispatch, useSelector } from "react-redux";
import AssignmentCard from "../assignment/assignment-card";
import { useEffect } from "react";
import {
  fetchAssignments,
  fetchUserAssignments,
} from "../../redux/slice/assignment-slice";
import { useLocation } from "react-router-dom";

const AssignmentList = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get("filter");

  const auth = useSelector((state) => state.auth);
  const assignment = useSelector((state) => state.assignment);

  useEffect(() => {
    if (auth.user?.role === "ROLE_TEACHER") {
      dispatch(fetchAssignments({ status: filterValue?.toUpperCase() }));
    } else {
      dispatch(fetchUserAssignments({ status: filterValue?.toUpperCase() }));
    }

    //console.log(assignment.tasks);
  }, [dispatch, filterValue, auth.user?.role]);

  return (
    <div className="space-y-5 w-[67vw]">
      {auth.user?.role === "ROLE_TEACHER"
        ? assignment.tasks?.map((item, i) => (
            <AssignmentCard item={item} key={i} />
          ))
        : assignment.currentUserTasks?.map((item, i) => (
            <AssignmentCard item={item} key={i} />
          ))}
    </div>
  );
};

export default AssignmentList;
