import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SubmissionCard from "../submission-card";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionByAssignmentId } from "../../../redux/slice/submission-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundImage:
    "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  border: "1px solid #000",
  boxShadow:
    "0px -25px 20px 50px rgba(0,0,0,0.45), 25px 0px 20px -20px rgba(0,0,0,0.45), 0px 25px 20px 50px rgba(0,0,0,0.45), -25px 0px 20px -20px rgba(0,0,0,0.45)",
  p: 4,
};


export default function SubmissionList({ open, handleClose, item }) {

  const dispatch = useDispatch();

  const submission = useSelector((state) => state.submission);
  const submissionList = submission.submissions.filter((s) => 
    s.taskId === item.id
  );

  //console.log("hi", submissionList);

  useEffect(() => {
    dispatch(fetchSubmissionByAssignmentId(item.id));

  }, [dispatch, item.id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="space-y-2">
            {submissionList.length === 0 && (
              <div className="text-center">No Submissions found!</div>
            )}

            {submissionList.map((item, i) => (
              <SubmissionCard item={item} key={i} cardKey={i+1} />
            ))}

          </div>
        </Box>
      </Modal>
    </div>
  );
}
