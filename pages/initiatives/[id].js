import { useRouter } from "next/router";
import InitiativeDetail from "@/Components/InitiativeDetail/InitiativeDetail";

export default function InitiativeDetails({initiatives}) {
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
        <button onClick={() => router.push("/")}>Go Back to List</button>
      </div>
    );
  }

  return (
    <InitiativeDetail
      title={selectedInitiative.title}
      description={selectedInitiative.description}
      deadline={selectedInitiative.deadline}
      tags={selectedInitiative.tags}
    />
  );
}
