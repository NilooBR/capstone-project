import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 150px;
  width: 100%;
`;

const TopLeftButton = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  padding: 16px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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
    background-color: #c8c8c8;
    color: black;
  }
`;

const Tag = styled.span`
  background: #a8a8a8;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 4px;
  font-size: 12px;
`;

export default function InitiativeCard({ title, tags, deadline }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card>
        <TopLeftButton onClick={() => setModalOpen(true)}>...</TopLeftButton>

        <h3>{title}</h3>
        <div>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
        <p>{deadline}</p>

        {isModalOpen && (
          <Modal>
            <Button>Update</Button>
            <Button>Delete</Button>
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </Modal>
        )}
      </Card>
    </>
  );
}
