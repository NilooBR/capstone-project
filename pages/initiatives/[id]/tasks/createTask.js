import CreateTaskForm from "@/Components/CreateTaskForm";

export default function CreateTaskPage({
  initiatives,
  onCreateTask,
}) {
  return (
    <CreateTaskForm 
      onSubmitTask={onCreateTask}
      defaultData={initiatives}
    />
  );
}