import { useRouter } from "next/router";
import CreateInitiativeForm from "@/Components/CreateInitiativeForm";

export default function EditInitiativePage({ initiatives, onEditInitiative }) {
  const router = useRouter();
  const { id } = router.query;

  const initiativeToEdit = initiatives.find(
    (initiative) => initiative.id === id
  );

  if (!initiativeToEdit) {
    return <h2>Initiative not found</h2>;
  }

  return (
    <CreateInitiativeForm
      onSubmit={onEditInitiative}
      defaultData={initiativeToEdit}
      isEditMode={true}
    />
  );
}
