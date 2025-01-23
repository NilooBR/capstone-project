import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

export default function TaskDetailPage({
  onDeleteTask,
  initiatives,
  onUpdateInitiatives,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: initiativeId, taskId } = router.query;
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowEditSuccess(true);
      const timeout = setTimeout(() => setShowEditSuccess(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  useEffect(() => {
    if (initiativeId && taskId) {
      const selectedInitiative = initiatives.find(
        (initiative) => initiative.id === initiativeId
      );

      if (selectedInitiative) {
        const selectedTask = selectedInitiative.tasks?.find(
          (item) => item.id == taskId
        );

        if (selectedTask) {
          setTask(selectedTask);
          setStatus(selectedTask.status);
        }
      }
    }
  }, [initiativeId, taskId, initiatives]);

  if (!task)
    return (
      <div>
        <h1>Task Not Found</h1>
        <p>We could not find a task with the provided ID.</p>
        <StyledLink href="/">Go Back to List</StyledLink>
      </div>
    );

  function handleStatusChange(event) {
    const newStatus = event.target.value;
    setStatus(newStatus);

    const updatedInitiatives = initiatives.map((initiative) => {
      if (initiative.id === initiativeId) {
        return {
          ...initiative,
          tasks: initiative.tasks.map((task) =>
            task.id == taskId ? { ...task, status: newStatus } : task
          ),
        };
      }
      return initiative;
    });

    onUpdateInitiatives(updatedInitiatives);
  }

  function handleDelete() {
    onDeleteTask(initiativeId, task.id);
    router.push(`/initiatives/${initiativeId}`);
  }

  return (
    <PageContainer>
      <Content>
        <Title>{task.title}</Title>
        <Description>{task.description}</Description>
        <Label>
          Status:
          <select value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </Label>
        {deleteButtonClicked && (
          <DialogOverlay>
            <ConfirmationDialog>
              <p>Are you sure you want to delete this task?</p>
              <ButtonGroup>
                <ConfirmationDialogButton
                  onClick={() => setDeleteButtonClicked(false)}
                >
                  Cancel
                </ConfirmationDialogButton>
                <ConfirmationDialogButton onClick={handleDelete}>
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
              <p>Your task has been updated successfully!</p>
            </ConfirmationDialog>
          </DialogOverlay>
        )}
      </Content>
      <Footer>
        <StyledLink href={`/initiatives/${initiativeId}`}>Back</StyledLink>
        <Button onClick={() => setDeleteButtonClicked(true)}>Delete</Button>
        <StyledLink
          href={`/initiatives/${initiativeId}/tasks/${taskId}/editTask`}
        >
          Edit
        </StyledLink>
      </Footer>
    </PageContainer>
  );
}

// Styled Components

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

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
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
`;

const Description = styled.article`
  margin: 10px 0;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: #ffffff;
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

const StyledLink = styled(Button).attrs({ as: Link })`
  text-decoration: none;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 20px;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
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


