import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

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
  background: #bcc1c5;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  text-align: center;
`;

const DateText = styled.p`
  text-align: center;
  margin: 10px;
  font-size: 11px;
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
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3px;
  align-items: center;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  margin: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid black;
  font-weight: bold;
  font-size: 10px;
  background-color: #bcc1c5;
  color: black;
`;

const Button = styled.button`
  margin: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid black;
  font-weight: bold;
  font-size: 10px;

  &:nth-child(1),
  &:nth-child(2) {
    background-color: #bcc1c5;
    color: black;
  }

  &:nth-child(3) {
    background-color: #f4a896 ;
    color: black;
  }
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

export default function InitiativeCard({
  id,
  title,
  tags,
  deadline,
  onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card>
      <TopLeftButton onClick={() => setIsModalOpen(true)}>...</TopLeftButton>
      <StyledLink href={`/initiatives/${id}`}>
        <h3>{title}</h3>
        <TagList>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
        <DateText>{deadline}</DateText>
      </StyledLink>

      {isModalOpen && (
        <Modal>
          <LinkButton href={`/initiatives/${id}/edit`}>Edit</LinkButton>
          <Button onClick={() => onDelete(id)}>Delete</Button>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </Card>
  );
}
