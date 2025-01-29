import { useRouter } from "next/router";
import InitiativeForm from "@/Components/InitiativeForm";
import useSWR from "swr";

export default function EditInitiativePage() {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  const { data: initiativeToEdit } = useSWR(`/api/initiatives/${initiativeId}`);

  async function handleEditInitiative(updatedInitiative) {
    const response = await fetch(`/api/initiatives/${initiativeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInitiative),
    });

    if (!response.ok) {
      throw new Error(`Edit failed ${response.status}`);
    }

    router.push(`/initiatives/${initiativeId}`);
  }

  return (
    <InitiativeForm
      onSubmit={handleEditInitiative}
      isEditMode={true}
      initiative={initiativeToEdit}
    />
  );
}
