import React, { useState } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import CreateTaskForm from "../components/CreateTaskForm";
import EditTaskForm from "../components/EditTaskForm";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Home(props) {
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleCreateTask = (data) => {
    props.createTask(props.token, { ...data }, [...props.tasks]);
    setShow(false);
  };
  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleEdited = (id, status) => {
    props.changeStatus(props.token, { id, status }, [...props.tasks]);
    setEditItem(null);
  };
  return (
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
      <div className="d-flex justify-content-between">
        <button
          className="my-btn create-btn"
          onClick={() => {
            setShow(true);
          }}
        >
          Create
        </button>
        <button
          className="my-btn logout-btn"
          onClick={() => props.logout(props.token)}
        >
          Logout
        </button>
      </div>
      {show ? (
        <CreateTaskForm
          show={show}
          changeShow={() => setShow(false)}
          handleCreate={handleCreateTask}
          handleError={(error) => props.changeError(error)}
        />
      ) : null}
      {editItem ? (
        <EditTaskForm
          data={editItem}
          closeEdit={() => setEditItem(null)}
          edited={handleEdited}
        />
      ) : null}
      <ul>
        {props.tasks.map((item) => {
          let priorityClass = `priority-${item.priority}`;
          return (
            <li key={item._id} className={priorityClass}>
              <h4>{item.name}</h4>
              <p>priority: {item.priority}</p>
              <p className="task-status">status: {item.status}</p>
              <p className="task-due_date">
                due date:{" "}
                {item.dueDate.substr(0, 10).split("-").reverse().join("-")}
              </p>
              <div className="edit-icon" onClick={() => handleEdit(item)}>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="tooltip-right">Edit</Tooltip>}
                >
                  <span className="d-inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                      />
                    </svg>
                  </span>
                </OverlayTrigger>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.auth.tasks,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(actions.logout(token)),
    changeError: (error) => dispatch(actions.changeError(error)),
    createTask: (token, data, tasks) =>
      dispatch(actions.createTask(token, data, tasks)),
    changeStatus: (token, data, tasks) =>
      dispatch(actions.changeStatus(token, data, tasks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
