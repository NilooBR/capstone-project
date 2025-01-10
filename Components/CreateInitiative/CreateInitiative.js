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
  background-color: #6c757d;
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function CreateInitiative({ onSubmit, defaultData, formName }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: defaultData?.title || "",
    description: defaultData?.description || "",
    deadline: defaultData?.deadline || "",
    tags: defaultData?.tags || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "tags") {
      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      if (tags.length > 5) {
        setErrors((prev) => ({
          ...prev,
          tags: "You can add a maximum of 5 tags.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, tags: null }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, deadline, tags } = formData;
    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    const newErrors = {};

    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!deadline) newErrors.deadline = "Deadline is required.";
    if (tagList.length > 5) newErrors.tags = "You can add a maximum of 5 tags.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ ...formData, tags: tagList });
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <Form aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="title">
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

      <Label htmlFor="description">
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

      <Label htmlFor="deadline">
        Select Deadline
        <Input
          id="deadline"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
        />
        {errors.deadline && <Error>{errors.deadline}</Error>}
      </Label>

      <Label htmlFor="tags">
        Tags (comma-separated)
        <Input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
        />
        {errors.tags && <Error>{errors.tags}</Error>}
      </Label>

      <ButtonGroup>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!!errors.tags}>
          Create
        </Button>
      </ButtonGroup>
    </Form>
  );
}
