import React, { useState } from "react";
import * as actions from "../store/actions/index";
import { connect } from "react-redux";
import CreateTaskForm from "../components/CreateTaskForm";

function Home(props) {
  const [show, setShow] = useState(false);

  const handleCreateTask = (data) => {
    props.createTask(props.token, { ...data }, [...props.tasks]);
    setShow(false);
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
