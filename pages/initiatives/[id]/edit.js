import { useRouter } from "next/router";
import InitiativeForm from "@/Components/InitiativeForm";

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
    <InitiativeForm
      onSubmit={onEditInitiative}
      defaultData={initiativeToEdit}
      isEditMode={true}
    />
  );
}
