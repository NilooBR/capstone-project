import styled, { css } from "styled-components";
import Link from "next/link";
import { useState } from "react";
import CompletedInitiative from "./CompletedInitiative";
import useSWR from "swr";
import truncateText from "@/utility/truncateText";
import { formatDateForDisplay } from "@/utility/dateUtils";
import PageActions from "./PageAction";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function InitiativeDetailPage({
  initiativeId,
  onDelete,
  onToggleCompleted,
}) {
  const {
    data: initiative,
    error,
    isLoading,
  } = useSWR(initiativeId ? `/api/initiatives/${initiativeId}` : null);

  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const router = useRouter();

  if (error) return <p>❌ Error loading: {error.message}</p>;
  if (isLoading) return <p>⏳ Fetching...</p>;

  const {
    title,
    description,
    tags,
    deadline,
    isCompleted,
    tasks = [],
  } = initiative;

  const formattedDeadline = deadline
    ? formatDateForDisplay(deadline)
    : "No deadline";

  const allUploadedImages = tasks
    .filter((task) => task.uploadedImages?.length > 0)
    .flatMap((task) =>
      task.uploadedImages.map((file) => ({
        url: file.url,
        name: file.displayName,
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

  return (
    <PageContainer>
      <Content>
        <TitleContainer>
          <Title>{title}</Title>
          <DeleteIcon onClick={() => setDeleteButtonClicked(true)}></DeleteIcon>
        </TitleContainer>
        <Description>{description}</Description>
        <Deadline>
          <strong>Deadline:</strong> {formattedDeadline}
        </Deadline>
        <TagList>
          {tags.length > 0 ? (
            tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
          ) : (
            <EmptyMessage>No tags available</EmptyMessage>
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
        <CompletedContainer>
          <button onClick={onToggleCompleted}>
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
          <StyledLinkTask
            $variant="addTaskCard"
            href={`/initiatives/${initiativeId}/tasks/createTask`}
          >
            <span>➕</span>
            <h2>Add task</h2>
          </StyledLinkTask>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <StyledLinkTask
                key={task._id}
                href={`/initiatives/${initiativeId}/tasks/${task._id}`}
              >
                <TaskCard>
                  <h2>{truncateText(task.title, 35)}</h2>
                  <span style={{ color: getStatusColor(task.status) }}>
                    {task.status}
                  </span>
                </TaskCard>
              </StyledLinkTask>
            ))
          ) : (
            <NoTasksMessage>
              No tasks available yet <br />
              Please add some!
            </NoTasksMessage>
          )}
        </TasksGrid>
        <ImagesTitle>Images:</ImagesTitle>
        <ImagePreviewContainer>
          {allUploadedImages.map((file) => (
            <ImageWrapper key={file.id}>
              <a href={file.url} target="_blank">
                <Image
                  src={file.url}
                  alt={file.displayName}
                  layout="fill"
                  objectFit="contain"
                />
              </a>
            </ImageWrapper>
          ))}
        </ImagePreviewContainer>
      </Content>
      <PageActions
        showBack
        showEdit
        onBack={() => router.push("/")}
        onEdit={() => router.push(`/initiatives/${initiativeId}/edit`)}
      />
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

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DeleteIcon = styled(FaRegTrashAlt)`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  color: var(--buttons);
  border: none;
  font-size: 1.6rem;
  margin-right: -5px;
  margin-top: 40px;
  outline: 0;

  &:hover {
    color: var(--accents);
    transform: scale(1.05);
  }
  &:focus {
    transform: scale(0.95);
  }
`;

const Title = styled.h1`
  margin-top: 60px;
  margin-left: 10px;
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
  transition: box-shadow 0.2s;

  ${(props) =>
    props.$variant === "addTaskCard" &&
    css`
      background-color: var(--highlightedcard);
      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    `};

  &:hover {
    background-color: var(--highlightedcard);
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
  background: rgba(0, 0, 0, 0.5);
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

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  background-color: transparent;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 0.5px solid grey;
  border-radius: 8px;
  overflow: hidden;
  background-color: transparent;
`;

const ImagesTitle = styled.h4`
  margin-top: 20px;
  margin-bottom: 20px;
`;
