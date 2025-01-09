import { useRouter } from "next/router";
import { initialData } from "@/lib/initialData";
import InitiativeDetail from "@/Components/InitiativeDetail/InitiativeDetail";

export default function InitiativeDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  const selectedInitiative = initialData.find(
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

  return (
    <InitiativeDetail
      title={selectedInitiative.title}
      description={selectedInitiative.description}
      deadline={selectedInitiative.deadline}
      tags={selectedInitiative.tags}
    />
  );
}