import React from "react";
import { Form } from "react-bootstrap";

const Select = (props) => {
  return (
    <div>
      <Form inline>
        <Form.Label className="my-1 mr-4" htmlFor={props.title}>
          <h6>{props.title}</h6>
        </Form.Label>
        <Form.Control
          as="select"
          className="my-1 mr-sm-2 shadow-none"
          id={props.id}
          custom
          value={props.value}
          onChange={props.handleChange}
        >
          {props.options
            ? props.options.map((item, index) => (
                <option key={item} value={props.options[index]}>
                  {item}
                </option>
              ))
            : null}
        </Form.Control>
      </Form>
    </div>
  );
};

export default Select;
