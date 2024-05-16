import { useDispatch, useSelector } from "react-redux";
import AssignmentCard from "../assignment/assignment-card";
import { useEffect } from "react";
import {
  fetchAssignments,
  fetchUserAssignments,
} from "../../redux/slice/assignment-slice";
import { useLocation } from "react-router-dom";
import "./style.css";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

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

  if (assignment.tasks.length === 0) {
    return (
      <div className="notFoundTask lg:flex justify-between">
        <div className="d-flex-notfound">
          <div className="p-2 flex-fill">
            <DoNotDisturbIcon sx={{fontSize: "200px"}} />

          </div>
          <div className="p-2 flex-fill">
            <div className="text1-notfound">
              Nothing to see here - yet
            </div>

            <div className="text2-notfound">
              When you add assignments, they will show up here
            </div>

          </div>
        </div>
      </div>
    );
  }

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
