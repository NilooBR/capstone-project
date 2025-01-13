import { useRouter } from "next/router";
import CreateInitiativeForm from "@/Components/CreateInitiative/CreateInitiativeForm";

export default function EditInitiative({ initiatives, onEditInitiative }) {
  const router = useRouter();
  const { id } = router.query;

  const initiativeToEdit = initiatives.find(
    (initiative) => initiative.id === id
  );

  if (!initiativeToEdit) {
    return <h2>Initiative not found</h2>;
  }

  const handleEditSubmit = (updatedInitiative) => {
    onEditInitiative(updatedInitiative);
    router.push(`/initiatives/${id}`);
  };

  return (
    <CreateInitiativeForm
      onSubmit={handleEditSubmit}
      defaultData={initiativeToEdit}
      isEditMode={true}
    />
  );
}
