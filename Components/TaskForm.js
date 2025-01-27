import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const DEFAULT_VALUES = {
  title: "",
  description: "",
  status: "Pending",
};

export default function TaskForm({
  onSubmit,
  initiatives,
  taskToEdit = null,
  isEditMode = false,
}) {
  const router = useRouter();
  const { id: initiativeId } = router.query;

  const selectedInitiative = initiatives.find(
    (initiative) => initiative.id === initiativeId
  );

  const selectedTasksArray = selectedInitiative?.tasks ?? [];
  const [formData, setFormData] = useState({
    ...DEFAULT_VALUES,
    ...taskToEdit,
  });

  const [errors, setErrors] = useState({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  function validateForm() {
    const { title, description } = formData;
    return {
      title: title.trim() ? null : "Title is required",
      description: description.trim() ? null : "Description is required",
    };
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setErrors({});
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    if (isEditMode) {
      setIsDialogVisible(true);
    } else {
      saveChanges();
    }
  }

  function saveChanges() {
    const updatedTask = {
      id: taskToEdit?._id || null,
      ...formData,
    };

    const updatedTasks = isEditMode
      ? selectedTasksArray.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      : [updatedTask, ...selectedTasksArray];

    const updatedInitiative = {
      ...selectedInitiative,
      tasks: updatedTasks,
    };

    onSubmit(updatedInitiative);

    router.push({
      pathname: `/initiatives/${initiativeId}/tasks/${updatedTask.id}`,
      query: { success: "true" },
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>{isEditMode ? "Edit Task" : "Add task"}</Heading>
      <Label>
        Task Title
        <Input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <Error>{errors.title}</Error>}
      </Label>
      <Label>
        Description
        <Textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <Error>{errors.description}</Error>}
      </Label>
      <Label>
        Status
        <StyledSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </StyledSelect>
      </Label>
      {isDialogVisible && (
        <DialogOverlay>
          <ConfirmationDialog>
            <p>You have unsaved changes. Would you like to save your edits?</p>
            <DialogButton onClick={saveChanges}>Save</DialogButton>
            <DialogButton
              onClick={() => router.push(`/initiatives/${initiativeId}`)}
            >
              Cancel
            </DialogButton>
          </ConfirmationDialog>
        </DialogOverlay>
      )}
      <ButtonGroup>
        <Button
          type="button"
          onClick={() => router.push(`/initiatives/${initiativeId}`)}
        >
          Cancel
        </Button>
        <Button type="submit">{isEditMode ? "Save" : "Create"}</Button>
      </ButtonGroup>
    </Form>
  );
}

// Styled Components

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
  color: var(--title);
  text-align: left;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  font-size: 1rem;
  color: var(--title);
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  color: var(--text);
  border-radius: 10px;

  &:focus {
    outline: 2px solid var(--errortext);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  border-radius: 10px;
  color: var(--text);

  &:focus {
    outline: 2px solid var(--errortext);
  }
`;

const StyledSelect = styled.select`
  padding: 7px;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  border-radius: 10px;
  color: var(--text);
  font-size: 0.8rem;

  &:focus {
    outline: 2px solid var(--errortext);
  }
`;

const Error = styled.p`
  color: var(--errortext);
  font-size: 0.8rem;
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
  border-radius: 50px;
  background-color: var(--buttons);
  color: var(--contrasttext);
  cursor: pointer;
  border: none;
  font-size: 10px;

  &:hover {
    background-color: var(--accents);
  }
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--highlightedcard);
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmationDialog = styled.div`
  background: var(--highlightedcard);
  color: var(--text);
  padding: 20px;
  border-radius: 8px;
  border: none;
  text-align: center;
`;

const DialogButton = styled(Button)`
  margin: 5px;
`;
