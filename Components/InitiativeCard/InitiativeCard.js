import { useState } from "react";
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

  &:nth-child(1),
  &:nth-child(2) {
    background-color: #6c757d;
    color: white;
  }

  &:nth-child(3) {
    background-color: #c8c8c8;
    color: black;
  }
`;

const TagList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  list-style: none;
`;

const Tag = styled.li`
  background: #a8a8a8;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
`;

export default function InitiativeCard({ title, tags, deadline }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card>
        <TopLeftButton onClick={() => setModalOpen(true)}>...</TopLeftButton>

        <h3>{title}</h3>
        <TagList>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
        <p>{deadline}</p>

        {isModalOpen && (
          <Modal>
            {/* <Button>Edit</Button>
            <Button>Delete</Button> */}
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </Modal>
        )}
      </Card>
    </>
  );
}
