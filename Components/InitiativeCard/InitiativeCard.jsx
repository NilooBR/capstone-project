import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
`;

const Modal = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  padding: 16px;
  border-radius: 10px;
`;

const Button = styled.button`
  margin: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:nth-child(1) {
    background-color: #6c757d;
    color: white;
  }

  &:nth-child(2) {
    background-color: #6c757d;
    color: white;
  }

  &:nth-child(3) {
    background-color: transparent;
    color: white;
  }
`;

export default function InitiativeCard({ title, tags, deadline }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card>
        <h3>Initiative {title}</h3>
        <div>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <p>Deadline: {deadline}</p>
        <button onClick={() => setModalOpen(true)}>...</button>

        {isModalOpen && (
          <Modal>
            <Button>Update</Button>
            <Button>Delete</Button>
            <Button onClick={() => setModalOpen(false)}>❌</Button>
          </Modal>
        )}
      </Card>
    </>
  );
}
