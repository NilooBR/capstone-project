import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import CompletedInitiative from "../CompletedInitiative/CompletedInitiative";

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
  background: #bcc1c5;
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
  font-weight: bold;
  font-size: 10px;
  border: 1px solid black;
`;

const CompletedContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  background: #a8a8a8;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 10px 0;
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
  background-color: #bcc1c5;
  color: black;
  cursor: pointer;
  border: 1px solid black;
  font-weight: bold;
  font-size: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const ConfirmationDialogButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  border-radius: 5px;
  background-color: #bcc1c5;
  color: black;
  font-weight: bold;
  border: 1px solid black;
  cursor: pointer;
  margin: 5px;

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
  background-color: #bcc1c5;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
  font-size: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const StyledLinkTask = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  background-color: #ebebeb;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border: 0.5px solid black;
  font-size: 7px;

  &:hover {
    background-color: #bcc1c5;
  }
`;

const TaskCard = styled.div`
  padding: 2px;
  cursor: pointer;
  margin: 2px;
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export default function InitiativeDetail({
  id,
  title,
  description,
  tags,
  deadline,
  onDelete,
  onToggleCompleted,
  isCompleted,
  tasks,
}) {
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  function getStatusColor(status) {
    switch (status) {
      case "Pending":
        return "gray";
      case "In Progress":
        return "blue";
      case "Completed":
        return "green";
      default:
        return "gray";
    }
  }

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
            <ConfirmationDialogButton
              onClick={() => setDeleteButtonClicked(false)}
            >
              Cancel
            </ConfirmationDialogButton>
            <ConfirmationDialogButton onClick={onDelete}>
              Yes, delete
            </ConfirmationDialogButton>
          </ConfirmationDialog>
        )}
        <CompletedContainer onClick={() => onToggleCompleted(id)}>
          {isCompleted ? (
            <span>
              Completed <CompletedInitiative isCompleted={isCompleted} />
            </span>
          ) : (
            <span>Mark as completed</span>
          )}
        </CompletedContainer>
        <TasksGrid>
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <StyledLinkTask
                key={task.taskNumber}
                href={`/initiatives/${id}/tasks/${task.taskNumber}`}
              >
                <TaskCard>
                  <h2>{task.title}</h2>
                  <span style={{ color: getStatusColor(task.status) }}>
                    {task.status}
                  </span>
                </TaskCard>
              </StyledLinkTask>
            ))
          ) : (
            <p>No tasks available for this initiative.</p>
          )}
        </TasksGrid>
      </Content>
      <Footer>
        <StyledLink href="/">Back</StyledLink>
        <Button onClick={() => setDeleteButtonClicked(true)}>Delete</Button>
        <StyledLink href={`/initiatives/${id}/edit`}>Edit</StyledLink>
      </Footer>
    </PageContainer>
  );
}
