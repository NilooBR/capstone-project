import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import CompletedInitiative from "./CompletedInitiative";
import { useSearchParams } from "next/navigation";

export default function InitiativeDetailPage({
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
  const searchParams = useSearchParams();
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowEditSuccess(true);
      const timeout = setTimeout(() => setShowEditSuccess(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  const allUploadedImages = (tasks || [])
    .filter((task) => task.uploadedImages?.length > 0)
    .flatMap((task) =>
      task.uploadedImages.map((file) => ({
        url: file.url,
        name: file.original_filename,
      }))
    );

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

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
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
            <EmptyMessage></EmptyMessage>
          )}
        </TagList>
        {deleteButtonClicked && (
          <DialogOverlay>
            <ConfirmationDialog>
              <p>Are you sure you want to delete this initiative?</p>
              <ButtonGroup>
                <ConfirmationDialogButton
                  onClick={() => setDeleteButtonClicked(false)}
                >
                  Cancel
                </ConfirmationDialogButton>
                <ConfirmationDialogButton onClick={onDelete}>
                  Yes, delete
                </ConfirmationDialogButton>
              </ButtonGroup>
            </ConfirmationDialog>
          </DialogOverlay>
        )}
        {showEditSuccess && (
          <DialogOverlay>
            <ConfirmationDialog>
              <h2>✔️</h2>
              <p>Your Initiative has been updated successfully!</p>
            </ConfirmationDialog>
          </DialogOverlay>
        )}
        <CompletedContainer>
          <button onClick={() => onToggleCompleted(id)}>
            {isCompleted ? (
              <>
                Completed <CompletedInitiative isCompleted={isCompleted} />
              </>
            ) : (
              <>Mark as completed</>
            )}
          </button>
        </CompletedContainer>
        <TasksGrid>
          <StyledLinkTask href={`/initiatives/${id}/tasks/createTask`}>
            <AddTaskCard>
              <p>➕</p>
              <h2>Add task</h2>
            </AddTaskCard>
          </StyledLinkTask>
          {tasks?.length > 0 ? (
            tasks.map((task) => (
              <StyledLinkTask
                key={task.id}
                href={`/initiatives/${id}/tasks/${task.id}`}
              >
                <TaskCard>
                  <h2>{truncateText(task.title, 10)}</h2>
                  <span style={{ color: getStatusColor(task.status) }}>
                    {task.status}
                  </span>
                </TaskCard>
              </StyledLinkTask>
            ))
          ) : (
            <NoTasksMessage>
              No tasks available yet <br></br> Let's add some!
            </NoTasksMessage>
          )}
        </TasksGrid>
        <AttachmentSection>
          <h3>Images</h3>
          {allUploadedImages.length > 0 ? (
            <AttachmentList>
              {allUploadedImages.map((file) => (
                <li key={file.url}>
                  <a href={file.url} target="_blank">
                    {file.name}
                  </a>
                </li>
              ))}
            </AttachmentList>
          ) : (
            <NoImages>Add images to your tasks to view them here</NoImages>
          )}
        </AttachmentSection>
      </Content>
      <Footer>
        <StyledLink href="/">Back</StyledLink>
        <Button onClick={() => setDeleteButtonClicked(true)}>Delete</Button>
        <StyledLink href={`/initiatives/${id}/edit`}>Edit</StyledLink>
      </Footer>
    </PageContainer>
  );
}

// Styled Components

const TagList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: left;
  align-items: left;
  flex-wrap: wrap;
  gap: 3px;
  list-style: none;
`;

const Tag = styled.li`
  background: var(--tags);
  color: var(--contrasttext);
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 10px;
  border: none;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--mainbackground);
`;

const Content = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 1.8rem;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
  text-align: left;
  max-width: 100%;
  overflow: hidden;
  color: var(--title);
`;

const Description = styled.article`
  margin: 10px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--cardbackground);
  color: var(--text);
`;

const Deadline = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: var(--text);
`;

const EmptyMessage = styled.span`
  font-size: 0.9rem;
  color: var(--text);
`;

const CompletedContainer = styled.div`
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;

  button {
    cursor: pointer;
    background: var(--accents);
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    color: var(--contrasttext);

    &:hover {
      background-color: var(--accents);
    }
  }
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
  border: none;
  border-radius: 50px;
  background-color: var(--buttons);
  color: var(--contrasttext);
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: var(--accents);
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 50px;
  border: none;
  background-color: var(--buttons);
  color: var(--contrasttext);
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: var(--accents);
  }
`;

const StyledLinkTask = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 20px;
  border: 1px var(--cardborder);

  background-color: var(--cardbackground);
  color: var(--text);
  font-weight: bold;
  cursor: pointer;
  font-size: 7px;

  &:hover {
    background-color: var(--highlightedcard);
  }
`;

const AddTaskCard = styled.div`
  cursor: pointer;
  margin: 2px;
  background-color: var(--cardbackground);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TaskCard = styled.div`
  cursor: pointer;
  margin: 2px;
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--mainbackground);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ConfirmationDialog = styled.div`
  background: var(--highlightedcard);
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const ConfirmationDialogButton = styled(Button)`
  flex: 1;
`;

const NoTasksMessage = styled.span`
  font-size: 10px;
  color: var(--text);
  text-align: center;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoImages = styled.p`
  font-size: 10px;
  color: var(--text);
  text-align: center;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const AttachmentSection = styled.div`
  margin-top: 20px;
  color: var(--text);
`;

const AttachmentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: var(--text);
`;
