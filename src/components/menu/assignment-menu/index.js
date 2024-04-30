import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import StudentList from "../../assignment/student-list";
import SubmissionList from "../../assignment/submission-list";

export default function AssignmentMenu() {
  const [anchorEl, setAnchorEl] = useState(false);
  const [openStudentList, setOpenStudentList] = useState(false);
  const [openSubmissionList, setOpenSubmissionList] = useState(false);

  const isMenuOpen = anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const goToProfile = () => {
    console.log("goToProfile");
  };

  const assignToUser = () => {
    setOpenStudentList(true);

    handleClose();

  };

  const closeStudentList = () => {
    setOpenStudentList(false);
  }

  const seeSubmissions = () => {
    setOpenSubmissionList(true);

    handleClose();

  };

  const closeSubmissionList = () => {
    setOpenSubmissionList(false);
  }

  const editAssignment = () => {
    console.log("editAssignment");
  };

  const deleteAssignment = () => {
    console.log("deleteAssignment");
  };

  const CURRENT_USER_ROLE = "ROLE_TEACHER";

  return (
    <div>

      <IconButton
        id="basic-button"
        aria-controls={isMenuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={goToProfile}>Profile</MenuItem>

        {CURRENT_USER_ROLE === "ROLE_TEACHER" ? (
          <>
            <MenuItem onClick={assignToUser}>Assign to user</MenuItem>
            <MenuItem onClick={seeSubmissions}>Submissions</MenuItem>
            <MenuItem onClick={editAssignment}>Edit</MenuItem>
            <MenuItem onClick={deleteAssignment}>Delete</MenuItem>
          </>
        ) : (
          <></>
        )}
      </Menu>

      <StudentList open={openStudentList} handleClose={closeStudentList} />

      <SubmissionList open={openSubmissionList} handleClose={closeSubmissionList} />

    </div>
  );
}
