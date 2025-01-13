import { useRouter } from "next/router";
import InitiativeDetail from "@/Components/InitiativeDetail/InitiativeDetail";

export default function InitiativeDetails({ initiatives, onDeleteInitiative, onMarkAsCompleted }) {
  const router = useRouter();
  const { id } = router.query;

  const selectedInitiative = initiatives.find(
    (initiative) => initiative.id === parseInt(id)
  );

  if (!selectedInitiative) {
    return (
      <div>
        <h1>Initiative Not Found</h1>
        <p>We could not find an initiative with the provided ID.</p>
        <button onClick={() => router.push("/")}>Go Back to List</button>
      </div>
    );
  }

  function handleDelete() {
    onDeleteInitiative(parseInt(id));
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
