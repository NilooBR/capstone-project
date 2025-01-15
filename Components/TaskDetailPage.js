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

export default function TaskDetailPage() {
  const router = useRouter();
  const { id, taskNumber } = router.query;

  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (id && taskNumber) {
      const selectedInitiative = initialData.find(
        (initiative) => initiative.id === id
      );

      if (selectedInitiative) {
        const selectedTask = selectedInitiative.tasks?.[taskNumber - 1] || null;

        if (selectedTask) {
          setTask(selectedTask);
          setStatus(selectedTask.status);
        }
      }
    }
  }, [id, taskNumber]);

  if (!task)
    return (
      <div>
        <h1>Task Not Found</h1>
        <p>We could not find an task with the provided ID.</p>
        <StyledLink href="/">Go Back to List</StyledLink>
      </div>
    );

  function handleStatusChange(event) {
    setStatus(event.target.value);
  }

  return (
    <PageContainer>
      <Content>
        <Title>{task.title}</Title>
        <Description>{task.description}</Description>
        <label>
          Status:
          <select value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </Content>
      <Footer>
        <StyledLink href={`/initiatives/${id}`}>Back</StyledLink>
      </Footer>
    </PageContainer>
  );
}
