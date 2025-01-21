import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  font-size: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const ConfirmationDialog = styled.div`
  margin: 50px 0;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: lightgrey;
  text-align: center;
  font-weight: bold;
  font-size: 10px;
  border: 1px solid black;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #bcc1c5;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
  font-size: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const ConfirmationDialogButton = styled(Button)`
  margin: 5px;
`;

const DEFAULT_VALUES = {
  title: "",
  description: "",
  status: "Pending",
}

export default function CreateTaskForm({
    onEditInitiative,
    initiatives,
    taskToEdit,
    isEditMode = false
}) {
    const router = useRouter();
    const { id: initiativeId } = router.query;


    const selectedInitiative =  initiatives.find(
      (initiative) => initiative.id === initiativeId
    );

    const selectedTasksArray =  selectedInitiative?.tasks ?? [];
    const [formData, setFormData] = useState({ 
      ...DEFAULT_VALUES,
      ...taskToEdit
    })

   const [errors, setErrors] = useState({});
   const [isDialogVisible, setIsDialogVisible] = useState(false);

  function handleCancelTask() {
  /*  isEditMode 
    ?  router.push(`/initiatives/${initiativeId}/tasks/${taskToEdit.id}`)
    : */ router.push(`/initiatives/${initiativeId}`);
  }

  function handleChangeTask(event) {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value};

    setErrors({});
    setFormData(updatedFormData);
  }

  function handleSubmitTask(event) {
    event.preventDefault();

    const { title, description } = formData;

    const newErrors = {
      title: title.trim() ? null : "Title is required.",
      description: description.trim() ? null : "Description is required.",
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    if (isEditMode) {
      setIsDialogVisible(true);
    } else {
      saveChanges();
     // router.push(`/initiatives/${initiativeId}/tasks`)
    }
  }

  function saveChanges() {
    const status = formData.status;
    const newTask = {
      id: taskToEdit?.id || crypto.randomUUID(),
      status,
      ...formData,
    }
    
    const updatedTaskArray = isEditMode
      ? selectedTasksArray.map((task) =>
          task.id === newTask.id ? newTask : task
        )
      :   [newTask, ...selectedTasksArray];

    const updatedInitiative = {
      ...selectedInitiative,
      tasks: updatedTaskArray,
    }

    onEditInitiative(updatedInitiative); 
    router.push(`/initiatives/${initiativeId}/tasks/${newTask.id}`)

  }

  function handleSaveAndContinue() {
    saveChanges();
   // router.push(`/initiatives/${initiativeId}/tasks/${taskToEdit.id}`);
  }

  function handleContinueWithoutSaving() {
    router.push(`/initiatives/${initiativeId}`);
  }

  function handleCancel() {
    setIsDialogVisible(false);
  }

    return (
     <Form onSubmit={handleSubmitTask}>
        <Heading>{isEditMode ? "Edit Task" : "Create Task"}</Heading>
        <Label>
            Task Title
          <Input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChangeTask}
          />
          {errors.title && <Error>{errors.title}</Error>}
          </Label>

        <Label>
            Description
          <Textarea
            id="description"
            name="description"
            type="text"
            rows="4"
            value={formData.description}
            onChange={handleChangeTask}
          /> 
          {errors.description && <Error>{errors.description}</Error> }
        </Label>

        {isDialogVisible && (
          <ConfirmationDialog>
            <p>You have unsaved changes. Would you like to save your edits before moving to the next task?</p>
            <ConfirmationDialogButton onClick={handleSaveAndContinue}>
              Save & Continue
            </ConfirmationDialogButton>
            <ConfirmationDialogButton onClick={handleContinueWithoutSaving}>
              Continue without saving
            </ConfirmationDialogButton>
            <ConfirmationDialogButton
              onClick={handleCancel}
            >
              Cancel
            </ConfirmationDialogButton>

          </ConfirmationDialog>
        )}

        <Label for="status">
            Status
        <select 
          name="status" 
          id="status"
          value={formData.status}
          onChange={handleChangeTask}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In progress</option>
            <option value="Completed">Completed</option>
        </select>
        </Label>

        <ButtonGroup>
        <Button type="button" onClick={handleCancelTask}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={Object.values(errors).some((error) => error)}     
        >
          {isEditMode ? "Save" :  "Create"}
        </Button>
      </ButtonGroup>
     </Form>

    )
}