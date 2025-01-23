import styled from "styled-components";
import Link from "next/link";
import CompletedInitiative from "./CompletedInitiative";
import { useState, useRef, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  justify-content: center;
  border: 1px;
  border-radius: 10px;
  height: 150px;
  width: 100%;
  color: var(--text);
  background-color: ${({ isCompleted }) =>
    isCompleted ? "var(--highlightedcard)" : "var(--cardbackground)"};
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
  background-color: var(--tags);
  color: var(--contrasttext);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--text);
  width: 100%;
  text-align: center;
`;

const DateText = styled.p`
  text-align: right;
  margin: 10px;
  font-size: 11px;
  color: var(--text);
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
  background-color: var(--buttons);
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
  border: 1px;
  font-weight: bold;
  font-size: 10px;
  background-color: var(--buttons);
  color: var(--text);
`;

const Button = styled.button`
  margin: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  border: 1px;
  font-weight: bold;
  font-size: 10px;

  &:nth-child(1),
  &:nth-child(2) {
    background-color: var(--cardbackground);
    color: var(--text);
  }

  &:nth-child(3) {
    background-color: var(--buttons);
    color: var(--text);
  }
`;

const TopLeftButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  color: var(--text);
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
  isCompleted,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <Card isCompleted={isCompleted}>
      <TopLeftButton onClick={() => setIsModalOpen(true)}>...</TopLeftButton>
      <StyledLink href={`/initiatives/${id}`}>
        <h3>
          {title} <CompletedInitiative isCompleted={isCompleted} />{" "}
        </h3>
        <TagList>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
        <DateText>{deadline}</DateText>
      </StyledLink>

      {isModalOpen && (
        <Modal ref={modalRef}>
          <LinkButton href={`/initiatives/${id}/edit`}>Edit</LinkButton>
          <Button onClick={() => onDelete(id)}>Delete</Button>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </Card>
  );
}
