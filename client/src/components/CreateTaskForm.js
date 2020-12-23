import React, { useState, useEffect } from "react";
import Select from "../components/Select";
import DatePicker from "react-datepicker";
import { Button, Modal, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

function CreateTaskForm(props) {
  const [dueDate, setDueDate] = useState(new Date());
  const [show, setShow] = useState(props.show);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleCreate = () => {
    if (name && priority && dueDate) {
      props.handleCreate({ name, status: "To Do", priority, dueDate });
    } else {
      props.handleError("fill in all the form elements");
    }
  };
  return (
    <>
      <Modal show={show} onHide={props.changeShow}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2 mb-3">
            <div className="form-group text-left">
              <textarea
                type="text"
                className="form-control mb-2"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></textarea>
              <Select
                title={"Priority"}
                id={"priority"}
                value={priority}
                options={["Low", "Medium", "High"]}
                handleChange={(e) => setPriority(e.target.value)}
              />
              <Form.Label className="my-2 mr-4" htmlFor="date-picker">
                <h6>Due Date</h6>
              </Form.Label>

              <DatePicker
                id="date-picker"
                className="my-2"
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.changeShow}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTaskForm;
