import CreateTaskForm from "@/Components/CreateTaskForm";

export default function CreateTaskPage({
  initiatives,
  onEditInitiative,
}) {
  return (
    <CreateTaskForm 
      onSubmitTask={onEditInitiative}
      defaultData={initiatives}
    />
  );
}