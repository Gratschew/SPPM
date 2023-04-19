import React from "react";
import { ListGroup, Form, Button, Row, Col } from "react-bootstrap";

const ListItem = ({ id, name, done, points, onUpdateItem, onDeleteItem }) => {
  const onCheckboxChange = (id) => {
    return (event) => {
      onUpdateItem(id, event.target.checked);
    };
  };
  const onDelete = (id) => {
    return (event) => {
      onDeleteItem(id);
    };
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <Form.Check inline checked={done} onChange={onCheckboxChange(id)} />
        </Col>
        <Col>{done ? <del>{name}</del> : name}</Col>
        <Col> Points: {points} </Col>
        <Col>
          <Button variant="danger" size="sm" onClick={onDelete(id)}>
            Delete
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default ListItem;
