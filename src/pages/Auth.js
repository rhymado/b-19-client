import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export default function Auth({ onSubmitId }) {
  const idRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitId(idRef.current.value);
  };
  const handleCreateNewId = () => {
    // const id = uuidV4();
    onSubmitId(uuidV4());
  };
  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" required ref={idRef} />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button onClick={handleCreateNewId} variant="secondary">
          Create New User
        </Button>
      </Form>
    </Container>
  );
}
