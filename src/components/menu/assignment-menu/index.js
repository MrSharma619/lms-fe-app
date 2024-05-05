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
import { useLocation, useNavigate } from "react-router-dom";

export default function AssignmentMenu({ item }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openStudentList, setOpenStudentList] = useState(false);
  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [openDeleteWindow, setOpenDeleteWindow] = useState(false);

  //not init to false, we get warning(error) in console of invalid object pass
  const isMenuOpen = Boolean(anchorEl);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const assignToUser = () => {
    handleClose();

    queryParams.set("assignmentId", item.id);
    navigate(`${location.pathname}?${queryParams.toString()}`);

    setOpenStudentList(true);
  };

  const closeStudentList = () => {
    handleClose();

    setOpenStudentList(false);

    removeAssignmentIdFromParam();
    
  };

  const seeSubmissions = () => {
    handleClose();

    setOpenSubmissionList(true);
  };

  const closeSubmissionList = () => {
    setOpenSubmissionList(false);
  };

  const editAssignment = () => {
    setOpenEditWindow(true);

    queryParams.set("assignmentId", item.id);
    navigate(`${location.pathname}?${queryParams.toString()}`);

    handleClose();
  };

  const removeAssignmentIdFromParam = () => {
    //console.log("Before deletion:", queryParams.toString());

    queryParams.delete("assignmentId");

    //navigate after deleting otherwise no updates in browser
    navigate(`${location.pathname}?${queryParams.toString()}`);

    //console.log("after deletion:", queryParams.toString());
  };

  const closeEditWindow = () => {
    handleClose();

    setOpenEditWindow(false);

    //console.log("here1");

    removeAssignmentIdFromParam();
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

      {CURRENT_USER_ROLE === "ROLE_TEACHER" ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={assignToUser}>Assign to user</MenuItem>
          <MenuItem onClick={seeSubmissions}>Submissions</MenuItem>
          <MenuItem onClick={editAssignment}>Edit</MenuItem>
          <MenuItem onClick={deleteAssignment}>Delete</MenuItem>
        </Menu>
      ) : (
        <></>
      )}

      <StudentList
        open={openStudentList}
        handleClose={closeStudentList}
        item={item}
      />

      <SubmissionList
        open={openSubmissionList}
        handleClose={closeSubmissionList}
      />

      <EditAssignment
        open={openEditWindow}
        handleClose={closeEditWindow}
        item={item}
      />

      <DeleteAssignment
        open={openDeleteWindow}
        handleClose={closeDeleteWindow}
        item={item}
      />
    </div>
  );
}
