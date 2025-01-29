import { useRouter } from "next/router";
import InitiativeForm from "@/Components/InitiativeForm";
import useSWR from "swr";

export default function EditInitiativePage() {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  const {
    data: initiativeToEdit,
    error,
    isLoading,
  } = useSWR(initiativeId ? `/api/initiatives/${initiativeId}` : null);

  if (error) return <p>❌ Error loading: {error.message}</p>;
  if (isLoading) return <p>⏳ Fetching...</p>;
  if (!initiativeToEdit) return <h2>initiative not found</h2>;

  async function handleEditInitiative(updatedInitiative) {
    const response = await fetch(`/api/initiatives/${initiativeId}`, {
      method: "PUT",
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
