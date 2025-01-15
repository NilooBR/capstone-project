import InitiativeDetail from "@/Components/InitiativeDetail/InitiativeDetail";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TaskCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  cursor: pointer;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export default function InitiativeDetails({
  initiatives,
  onDeleteInitiative,
  onToggleCompleted,
}) {
  const router = useRouter();
  const { id } = router.query;

  const selectedInitiative = initiatives.find(
    (initiative) => initiative.id === id
  );

  if (!selectedInitiative) {
    return (
      <div>
        <h1>Initiative Not Found</h1>
        <p>We could not find an initiative with the provided ID.</p>
        <StyledLink href="/">Go Back to List</StyledLink>
      </div>
    );
  }

  function handleDelete() {
    onDeleteInitiative(id);
    router.push("/");
  }

  const getStatusColor = (status) => {
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
  };

  return (
    <>
      <InitiativeDetail
        id={selectedInitiative.id}
        title={selectedInitiative.title}
        description={selectedInitiative.description}
        deadline={selectedInitiative.deadline}
        isCompleted={selectedInitiative.isCompleted}
        tags={selectedInitiative.tags}
        onDelete={handleDelete}
        onToggleCompleted={onToggleCompleted}
      />

      <TasksGrid>
        {selectedInitiative.tasks?.length > 0 ? (
          selectedInitiative.tasks.map((task) => (
            <Link
              key={task.taskNumber}
              href={`/initiatives/${selectedInitiative.id}/tasks/${task.taskNumber}`}
            >
              <TaskCard>
                <h2>{task.title}</h2>
                <span style={{ color: getStatusColor(task.status) }}>
                  {task.status}
                </span>
              </TaskCard>
            </Link>
          ))
        ) : (
          <p>No tasks available for this initiative.</p>
        )}
      </TasksGrid>
    </>
  );
}
