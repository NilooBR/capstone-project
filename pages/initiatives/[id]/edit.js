import { useRouter } from "next/router";
import InitiativeForm from "@/Components/InitiativeForm";
import useSWR from "swr";

export default function EditInitiativePage() {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  const { data: initiatives, mutate } = useSWR("/api/initiatives");

  const initiativeToEdit = initiatives?.find(
    (initiative) => initiative._id === initiativeId
  );

  if (!initiativeToEdit) {
    return <h2>Initiative not found</h2>;
  }

  async function handleEditInitiative(updatedInitiative) {
    const response = await fetch(`/api/initiatives/${initiativeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInitiative),
    });

    if (!response.ok) {
      throw new Error(`Edit failed ${response.status}`);
    }

    await response.json();
    mutate();
    router.push(`/initiatives/${initiativeId}`);
  }

  return <InitiativeForm onSubmit={handleEditInitiative} isEditMode={true} />;
}
