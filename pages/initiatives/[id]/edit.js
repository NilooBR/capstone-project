import { useRouter } from "next/router";
import CreateInitiativeForm from "@/Components/CreateInitiative/CreateInitiativeForm";

export default function EditInitiativePage({ initiatives, onEditInitiative, isCompleted, onMarkAsCompleted }) {
  const router = useRouter();
  const { id } = router.query;

  const initiativeToEdit = initiatives.find(
    (initiative) => initiative.id === id
  );

  if (!initiativeToEdit) {
    return <h2>Initiative not found</h2>;
  }

  return (
        <ul>
          {initiatives.map((initiative) => (
            <li key={initiative.id}>
              <CreateInitiativeForm
                onSubmit={onEditInitiative}
                defaultData={initiativeToEdit}
                isCompleted={isCompleted}
                onMarkAsCompleted={onMarkAsCompleted}
                id={initiative.id}
                isEditMode={true}
              />
            </li>
          ))}
        </ul>

  );
}
