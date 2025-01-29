import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, isValid } from "date-fns";
import { de } from "date-fns/locale";
import ConfirmationDialog from "./ConfirmationDialog";

export default function InitiativeForm({
  isEditMode = false,
  initiative,
  onSubmit,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initiative?.title || "",
    description: initiative?.description || "",
    deadline: initiative?.deadline
      ? formatDateForDisplay(initiative.deadline)
      : "",
    tags: initiative?.tags?.join(", ") || "",
  });

  const [errors, setErrors] = useState({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  function formatDateForDisplay(date) {
    return isValid(new Date(date)) ? format(new Date(date), "dd.MM.yyyy") : "";
  }

  function formatDeadlineForDatabase(deadline) {
    const parsedDate = parse(deadline, "dd.MM.yyyy", new Date());
    return isValid(parsedDate) ? parsedDate.toISOString() : null;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    const newErrors = { ...errors };

    if (name === "tags") {
      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      if (tags.length > 5) {
        newErrors.tags = "Please add a maximum of 5 tags";
        setErrors(newErrors);
        return;
      } else {
        newErrors.tags = null;
      }
    } else {
      newErrors[name] = value.trim() ? null : `${name} is required`;
    }

    setErrors(newErrors);
    setFormData(updatedFormData);
  }

  function handleDateChange(date) {
    if (date) {
      const formattedDate = format(date, "dd.MM.yyyy");
      setFormData((prev) => ({ ...prev, deadline: formattedDate }));
      setErrors((prev) => ({ ...prev, deadline: null }));
    } else {
      setErrors((prev) => ({ ...prev, deadline: "Invalid date value" }));
    }
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();
    const { title, description, deadline, tags } = formData;

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    const newErrors = {
      title: title.trim() ? null : "Title is required",
      description: description.trim() ? null : "Description is required",
      deadline: deadline.trim() ? null : "Deadline is required",
      tags: tagList.length > 5 ? "Please add a maximum of 5 tags" : null,
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    const formattedDeadline = formatDeadlineForDatabase(deadline);
    if (!formattedDeadline) {
      setErrors((prev) => ({ ...prev, deadline: "Invalid deadline format" }));
      return;
    }

    const updatedInitiative = {
      ...formData,
      tags: tagList,
      deadline: formattedDeadline,
    };

    onSubmit(updatedInitiative);
    router.replace({
      pathname: `/initiatives/${updatedInitiative.id}`,
      query: { success: "true" },
    });
  }

  function handleCancel(event) {
    event.preventDefault();
    setIsDialogVisible(true);
  }

  function navigateAway() {
    setIsDialogVisible(false);
    router.push(isEditMode ? `/initiatives/${initiative?._id}` : "/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>{isEditMode ? "Edit Initiative" : "Create Initiative"}</Heading>
      <Label>
        Initiative Title
        <Input
          id="title"
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
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <Error>{errors.description}</Error>}
      </Label>

      <Label>
        Deadline
        <StyledDatePicker
          selected={
            formData.deadline
              ? (() => {
                  const parsedDate = parse(
                    formData.deadline,
                    "dd.MM.yyyy",
                    new Date()
                  );
                  return isValid(parsedDate) ? parsedDate : null;
                })()
              : null
          }
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
          locale={de}
          minDate={new Date()}
          placeholderText="dd.mm.yyyy"
        />
        {errors.deadline && <Error>{errors.deadline}</Error>}
      </Label>
      <Label>
        Tags (separated by a comma)
        <Input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
        />
        {errors.tags && <Error>{errors.tags}</Error>}
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

      <ButtonGroup>
        <StyledLink href="/" onClick={handleCancel}>
          Cancel
        </StyledLink>
        <StyledLink
          href="#"
          onClick={handleSubmit}
          disabled={Object.values(errors).some((error) => error)}
        >
          {isEditMode ? "Save" : "Create"}
        </StyledLink>
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  color: var(--text);
  border-radius: 10px;
  &:focus {
    outline: 2px solid var(--errortext);
  }
`;

const Error = styled.p`
  color: var(--errortext);
  font-size: 0.8rem;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  border-radius: 50px;
  background-color: var(--buttons);
  color: var(--contrasttext);
  text-decoration: none;
  text-align: center;
  font-size: 12px;
  &:hover {
    background-color: var(--accents);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
`;
