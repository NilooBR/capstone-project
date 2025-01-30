import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ConfirmationDialog from "./ConfirmationDialog";
import PageActions from "./PageAction";

export default function TaskForm({
  isEditMode = false,
  task,
  initiativeId,
  onSubmit,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Pending",
  });

  const [errors, setErrors] = useState({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setErrors({});
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    const { title, description } = formData;
    return {
      title: title.trim() ? undefined : "Title is required",
      description: description.trim() ? undefined : "Description is required",
    };
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    onSubmit(formData);
  }

  function handleCancel(event) {
    event.preventDefault();
    setIsDialogVisible(true);
  }

  function navigateAway() {
    setIsDialogVisible(false);
    router.push(
      isEditMode ? `/initiatives/${initiativeId}/tasks/${task._id}` : "/"
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>{isEditMode ? "Edit Task" : "Add Task"}</Heading>
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

      <ConfirmationDialog
        isVisible={isDialogVisible}
        message="You have unsaved changes. Would you like to save your edits?"
        onSaveAndContinue={() => {
          setIsDialogVisible(false);
          handleSubmit();
        }}
        onDiscardChanges={() => {
          setIsDialogVisible(false);
          navigateAway();
        }}
        onCancel={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDialogVisible(false);
        }}
      />
      <PageActions
        showCancel
        showCreateOrSave
        onCancel={handleCancel}
        onCreateOrSave={handleSubmit}
        createOrSaveLabel={isEditMode ? "Save" : "Create"}
      />
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
  margin-top: 60px;
  margin-left: 10px;
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

