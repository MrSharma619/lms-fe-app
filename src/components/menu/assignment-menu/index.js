import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import StudentList from "../../assignment/student-list";
import SubmissionList from "../../assignment/submission-list";
import EditAssignment from "../../assignment/edit-assignment";
import DeleteAssignment from "../../assignment/delete-assignment";

export default function AssignmentMenu() {
  const [anchorEl, setAnchorEl] = useState(false);
  const [openStudentList, setOpenStudentList] = useState(false);
  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [openDeleteWindow, setOpenDeleteWindow] = useState(false);

  const isMenuOpen = anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const assignToUser = () => {

    handleClose();

    setOpenStudentList(true);
    
  };

  const closeStudentList = () => {
    setOpenStudentList(false);
  };

  const seeSubmissions = () => {

    handleClose();

    setOpenSubmissionList(true);

  };

  const closeSubmissionList = () => {
    setOpenSubmissionList(false);
  };

  const editAssignment = () => {
    
    handleClose();

    setOpenEditWindow(true);

  };

  const closeEditWindow = () => {
    setOpenEditWindow(false);
  };

  const deleteAssignment = () => {

    handleClose();

    setOpenDeleteWindow(true);

  };

  const closeDeleteWindow = () => {
    setOpenDeleteWindow(false);
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

      <SubmissionList
        open={openSubmissionList}
        handleClose={closeSubmissionList}
      />

      <EditAssignment open={openEditWindow} handleClose={closeEditWindow} />

      {/* pending */}
      <DeleteAssignment
        open={openDeleteWindow}
        handleClose={closeDeleteWindow}
      />
    </div>
  );
}
