import Link from "next/link";
import { useRouter } from "next/router";
import InitiativeDetail from "@/Components/InitiativeDetail/InitiativeDetail";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function InitiativeDetails({
  initiatives,
  onDeleteInitiative,
  onMarkAsCompleted,
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

  return (
    <InitiativeDetail
      id={selectedInitiative.id}
      title={selectedInitiative.title}
      description={selectedInitiative.description}
      deadline={selectedInitiative.deadline}
      isCompleted={selectedInitiative.isCompleted}
      tags={selectedInitiative.tags}
      onDelete={handleDelete}
      onMarkAsCompleted={onMarkAsCompleted}
    />
  );
}
