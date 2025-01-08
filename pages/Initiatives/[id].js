import { useRouter } from "next/router";
import { initialData } from "@/lib/initialData";
import Link from "next/link";
import InitiativeDetail from "@/Components/InitiativeDetail/InitiativeDetail";

export default function InitiativeDetails() {
  const router = useRouter();
  const { id } = router.query;

  console.log("id:", id);
  const selectedInitiative = initialData.find(
    (initiative) => initiative.id === parseInt(id)
  );
  console.log("selectedInitiative: ", selectedInitiative);
  console.log("initialData: ", initialData);
  if (!selectedInitiative) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <InitiativeDetail 
        title={selectedInitiative.title}
        description={selectedInitiative.description}
        deadline={selectedInitiative.deadline}
        tags={selectedInitiative.tags}
      />
      <Link href="/Initiatives" />
    </>
  );
}
