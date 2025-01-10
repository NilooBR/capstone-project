import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

const TagList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: start;
  align-items: start;
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Content = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 1.8rem;
`;

const Description = styled.article`
  margin: 10px 0;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: #ffffff;
`;

const Deadline = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
`;

const EmptyMessage = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const ConfirmationDialog = styled.div`
  margin: 50px 0;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: lightgrey;
  text-align: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  border-radius: 5px;
  background-color: #6c757d;
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  background-color: #6c757d;
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function InitiativeDetail({
  id,
  title,
  description,
  tags,
  deadline,
  onDelete,
}) {
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  return (
    <PageContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Deadline>
          <strong>Deadline:</strong> {deadline}
        </Deadline>
        <TagList>
          {tags.length > 0 ? (
            tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
          ) : (
            <EmptyMessage>No tags available</EmptyMessage>
          )}
        </TagList>
        {deleteButtonClicked && (
          <ConfirmationDialog>
            <p>Are you sure you want to delete this initiative?</p>
            <Button onClick={() => setDeleteButtonClicked(false)}>
              Cancel
            </Button>
            <Button onClick={onDelete}>Yes, delete</Button>
          </ConfirmationDialog>
        )}
      </Content>
      <Footer>
        <StyledLink href="/">Back</StyledLink>
        <Button onClick={() => setDeleteButtonClicked(true)}>Delete</Button>
      </Footer>
    </PageContainer>
  );
}
