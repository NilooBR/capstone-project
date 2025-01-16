import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import { initialData } from "@/lib/initialData";
import styled from "styled-components";

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
`;

const Description = styled.article`
  margin: 10px 0;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: #ffffff;
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

const ConfirmationDialogButton = styled(Button)`
  margin: 5px;
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

export default function TaskDetailPage() {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (initiativeId && taskId) {
      const selectedInitiative = initialData.find(
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
  }, [initiativeId, taskId]);

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

    const initiativeIndex = initialData.findIndex(
      (initiative) => initiative.id === initiativeId
    );

    if (initiativeIndex !== -1) {
      const taskIndex = initialData[initiativeIndex].tasks.findIndex(
        (item) => item.id == taskId
      );

      if (taskIndex !== -1) {
        initialData[initiativeIndex].tasks[taskIndex].status = newStatus;
      }
    }
  }

  function handleDelete() {
    const initiativeIndex = initialData.findIndex(
      (initiative) => initiative.id === initiativeId
    );

    if (initiativeIndex !== -1) {
      const updatedTasks = initialData[initiativeIndex].tasks.filter(
        (item) => item.id !== taskId
      );

      initialData[initiativeIndex].tasks = updatedTasks;

      router.push(`/initiatives/${initiativeId}`);
    }
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
          <ConfirmationDialog>
            <p>Are you sure you want to delete this task?</p>
            <ConfirmationDialogButton
              onClick={() => setDeleteButtonClicked(false)}
            >
              Cancel
            </ConfirmationDialogButton>
            <ConfirmationDialogButton onClick={handleDelete}>
              Yes, delete
            </ConfirmationDialogButton>
          </ConfirmationDialog>
        )}
      </Content>
      <Footer>
        <StyledLink href={`/initiatives/${initiativeId}`}>Back</StyledLink>
        <Button onClick={() => setDeleteButtonClicked(true)}>Delete</Button>
      </Footer>
    </PageContainer>
  );
}
