import { Check, Close } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, IconButton } from "@mui/material";
//import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewSubmission } from "../../../redux/slice/submission-slice";

const SubmissionCard = ({ item, cardKey }) => {
  //const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const handleSubmission = (s) => {
    //setStatus(s);

    //console.log(status);    // prev state

    dispatch(reviewSubmission({ submissionId: item.id, status: s }));
  };

  //console.log("key", key);

  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[white]">Submission {cardKey}: </span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <a
              href={item.submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OpenInNewIcon /> Go to link
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <p className="text-[white]">Submission time: </p>
          <p className="text-gray-400">
            {new Date(item.submissionTime).toLocaleString()}
          </p>
        </div>
      </div>

      {auth.user?.role === "ROLE_TEACHER" && item.status === "PENDING" ? (
        <div className="flex gap-5">
          <div style={{ marginLeft: "80px" }}>
            <IconButton
              color="success"
              onClick={() => handleSubmission("ACCEPT")} //this string is hardcoded in BE to complete assignment based on it
            >
              <Check />
            </IconButton>
          </div>

          <div>
            <IconButton
              color="error"
              onClick={() => handleSubmission("REJECT")}
            >
              <Close />
            </IconButton>
          </div>
        </div>
      ) : (
        <Button
          color={item.status === "ACCEPT" ? "success" : "error"}
          size="small"
          variant="outlined"
          sx={{ marginLeft: "80px" }}
        >
          {item.status === "PENDING" ? item.status : item.status + "ED"}
          {/* accepted rejected PENDING*/}
        </Button>
      )}
    </div>
  );
};

export default SubmissionCard;
