import React, { useState } from "react";
import Select from "../components/Select";
import { Button, Modal, Form } from "react-bootstrap";

function EditTaskForm(props) {
  const [status, setStatus] = useState(props.data.status);

  const handleEdit = () => {
    if (status === props.data.status) {
      props.closeEdit();
    } else {
      props.edited(props.data._id, status);
    }
  };
  return (
    <>
      <Modal show={true} onHide={props.closeEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2 mb-3">
            <div className="form-group text-left">
              <h6>
                Name: <span>{props.data.name}</span>
              </h6>
              <Select
                title={"Status"}
                id={"status"}
                value={status}
                options={["To Do", "Review", "Completed"]}
                handleChange={(e) => setStatus(e.target.value)}
              />
              <Form.Label className="my-2 mr-4" htmlFor="date-picker">
                <h6>Due Date</h6>
              </Form.Label>
              {props.data.dueDate}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTaskForm;
