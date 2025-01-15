import CreateInitiativeForm from "@/Components/CreateInitiative/CreateInitiativeForm";

export default function CreateInitiativePage({
  initiatives,
  onCreateInitiative,
}) {
  return (
    <CreateInitiativeForm
      onSubmit={onCreateInitiative}
      defaultData={initiatives}
    />
  );
}
