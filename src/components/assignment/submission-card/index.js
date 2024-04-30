import { Check, Close } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";

const SubmissionCard = () => {
  const [status, setStatus] = useState("");

  const handleSubmission = (s) => {
    setStatus(s);

    //console.log(status);    // prev state
  };

  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[white]">Submission 1: </span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <a
              href="https://github.com/MrSharma619/lms-fe-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OpenInNewIcon /> Go to link
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <p className="text-[white]">Submission time: </p>
          <p className="text-gray-400">2024-04-30 16:40:28</p>
        </div>
      </div>
      {true ? (
        <div className="flex gap-5">
          <div style={{ marginLeft: "80px" }}>
            <IconButton
              color="success"
              onClick={() => handleSubmission("ACCEPTED")}
            >
              <Check />
            </IconButton>
          </div>

          <div>
            <IconButton
              color="error"
              onClick={() => handleSubmission("REJECTED")}
            >
              <Close />
            </IconButton>
          </div>
        </div>
      ) : (
        <Button
          color={true ? "success" : "error"}
          size="small"
          variant="outlined"
          sx={{ marginLeft: "80px" }}
        >
          {status}
        </Button>
      )}

      <div></div>
    </div>
  );
};

export default SubmissionCard;
