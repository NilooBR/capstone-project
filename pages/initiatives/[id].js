import { useRouter } from "next/router";
import { initialData } from "@/lib/initialData";
import InitiativeDetail from "@/Components/InitiativeDetail/InitiativeDetail";

export default function InitiativeDetails() {
  const router = useRouter();
  const { id } = router.query;

  
  const selectedInitiative = initialData.find(
    (initiative) => initiative.id === parseInt(id)
  );
 
  
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

      
    </>
  );
}

