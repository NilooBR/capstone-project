import { useRouter } from "next/router";
import { initialData } from "@/lib/initialData";
import Link from "next/link";
import styled from "styled-components";
import TaskDetailPage from "@/Components/TaskDetailPage";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function TaskDetails() {
  const router = useRouter();
  const { id, taskNumber } = router.query;

  const selectedInitiative = initialData.find(
    (initiative) => initiative.id === id
  );

  if (!selectedInitiative) {
    return (
      <div>
        <h1>Task Not Found</h1>
        <p>We could not find an task with the provided ID.</p>
        <StyledLink href="/">Go Back to List</StyledLink>
      </div>
    );
  }

  return (
    <TaskDetailPage
      id={id}
      taskNumber={taskNumber}
      tasks={selectedInitiative.tasks}
    />
  );
}
