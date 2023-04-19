import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  FormControl,
  InputGroup,
  Badge,
  ListGroup,
  Button,
} from "react-bootstrap";
import ListItem from "./ListItem";
import { nanoid } from "nanoid";

const TodoList = () => {
  const [listItems, setListItems] = useState([
    {
      id: nanoid(),
      name: "Wake up",
      done: false,
      points: 5,
    },
    {
      id: nanoid(),
      name: "Eat",
      done: false,
      points: 5,
    },
    {
      id: nanoid(),
      name: "Sleep",
      done: false,
      points: 5,
    },
  ]);

  const onInsertItem = (event) => {
    const { keyCode, target } = event;
    if (keyCode !== 13) return;
    const parts = target.value.split("|");
    const input_string = parts[0].trim();
    const input_points = parts[1].trim();

    if ("" === input_string) {
      target.value = "";
      alert("Blank Input Error");
      return;
    }

    if(isNaN(input_points)){

      alert("Given point value is not a number");
      return;
    }
    
    const new_item = {
      id: nanoid(),
      name: input_string,
      done: false,
      points: input_points,
    };

    setListItems([new_item, ...listItems]);
    target.value = "";
  };

  const onUpdateItem = (id, done) => {
    const new_items = listItems.map((item) => {
      if (id === item.id) return { ...item, done: done };
      else return item;
    });
    setListItems(new_items);
  };

  const onDeleteItem = (id) => {
    const new_items = listItems.filter((item) => {
      if (id !== item.id){
        return item;
      }
    });
    setListItems(new_items);
  };

  const onCheckboxChange = (event) => {
    const flag = event.target.checked;
    const new_items = listItems.map((item) => {
      return { ...item, done: flag };
    });
    setListItems(new_items);
  };

  const onClearAllItems = (event) => {
    const new_items = listItems.filter((item) => {
      if (!item.done) return item;
    });
    setListItems(new_items);
  };

  const total_count = listItems.length;
  const done_count = listItems.reduce((prev, current) => {
    return current.done ? prev + 1 : prev;
  }, 0);

  const daily_goal = 30;
  const current_points = Number(listItems.reduce((prev, current) => {
    return current.done ? Number(Number(prev) + Number(current.points)) : Number(prev);
  }, 0));

  return (
    <div className="todolist">
      <Card style={{ width: "600px", color: "#000" }} className="mb-3 mx-auto">
        <Card.Img src="https://picsum.photos/600/100" />
        <Card.Body>
          <Card.Title>
            <Badge pill variant="dark">
              {"Todo list"}
            </Badge>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {"What would you like to get done?"}
          </Card.Subtitle>
          <Card.Subtitle>
            Todays Points: {current_points}/{daily_goal}
          </Card.Subtitle>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Input New Todo Item"
              aria-label="input text"
              aria-aria-describedby="basic-addon1"
              onKeyUp={onInsertItem}
            />
          </InputGroup>

          <ListGroup variant="flush">
            {listItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  done={item.done}
                  points={item.points}
                  onUpdateItem={onUpdateItem}
                  onDeleteItem={onDeleteItem}
                />
              );
            })}
          </ListGroup>

          <Row className="justify-content-md-center">
            <Col xs={2}>
              <Form.Check
                inline
                checked={
                  done_count === total_count && total_count > 0 ? "checked" : ""
                }
                onChange={onCheckboxChange}
              />
            </Col>
            <Col xs={6}>
              {done_count} / {total_count}
            </Col>
            <Col>
              <Button variant="warning" size="sm" onClick={onClearAllItems}>
                Delete selected
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
export default TodoList;
