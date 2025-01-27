import InitiativeDetailPage from "@/Components/InitiativeDetailPage";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function InitiativeDetailsPage({
  initiatives,
  onDeleteInitiative,
  onToggleCompleted,
}) {
  const router = useRouter();
  const { id } = router.query;

  const selectedInitiative = initiatives.find(
    (initiative) => initiative._id === id
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

  return (
    <InitiativeDetailPage
      id={selectedInitiative._id}
      title={selectedInitiative.title}
      description={selectedInitiative.description}
      deadline={selectedInitiative.deadline}
      isCompleted={selectedInitiative.isCompleted}
      tags={selectedInitiative.tags}
      onDelete={handleDelete}
      onToggleCompleted={onToggleCompleted}
      tasks={selectedInitiative.tasks}
    />
  );
}
