import CreateInitiativeForm from "@/Components/CreateInitiative/CreateInitiativeForm";

export default function CreateInitiativePage({
  initiatives,
  onCreateInitiative,
  isCompleted,
  onMarkAsCompleted,
}) {
  return (
    <ul>
      {initiatives.map((initiative) => (
        <li key={initiative.id}>
          <CreateInitiativeForm
            onSubmit={onCreateInitiative}
            defaultData={initiatives}
            isCompleted={isCompleted}
            onMarkAsCompleted={onMarkAsCompleted}
            id={initiative.id}
            isEditMode={false}
          />
        </li>
      ))}
    </ul>
  );
}
