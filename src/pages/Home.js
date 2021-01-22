import React, { useEffect, useState, useRef, useCallback } from "react";
import { Container, Card, Modal, Button, Form } from "react-bootstrap";

import { useSocket } from "../contexts/SocketProvider";

import useLocalStorage from "../hooks/useLocalStorage";

export default function Home({ id }) {
  const datumRef = useRef();
  const socket = useSocket();
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useLocalStorage("data", []);

  const addNewData = useCallback(
    (newDatum) => {
      setData((prevData) => {
        return [...prevData, newDatum];
      });
    },
    [setData]
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("connect", () => {
      console.log("connect");
      socket.on("refreshing-data", (newDatum) => {
        console.log(newDatum);
        addNewData(newDatum);
      });
    });
    return () => socket.off("connect");
  }, [socket, addNewData]);

  const handleSubmitDatum = (e) => {
    e.preventDefault();
    const newDatum = datumRef.current.value;

    socket.emit("new-data", { datum: newDatum });
    addNewData(newDatum);
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container
      className="d-flex align-item-center flex-column"
      style={{ height: "100vh" }}
    >
      <h1>Home</h1>
      <p>{id}</p>
      <Button onClick={() => setModalOpen(true)}>Add Data</Button>
      <div>
        {data.length > 0 &&
          data.map((datum, index) => {
            return (
              <Card className="m-2" key={index}>
                <Card.Body>
                  <Card.Text>{datum}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
      </div>

      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>Add Datum</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitDatum}>
            <Form.Group>
              <Form.Label>Datum</Form.Label>
              <Form.Control type="text" required ref={datumRef} />
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
