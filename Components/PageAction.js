import styled from "styled-components";

export default function PageActions({
  showBack = false,
  showCancel = false,
  showDelete = false,
  showEdit = false,
  showCreateOrSave = false,
  onBack,
  onCancel,
  onDelete,
  onCreateOrSave,
  onEdit,
  createOrSaveLabel = {},
}) {
  return (
    <ActionContainer>
      {showBack && <Button onClick={onBack}>Back</Button>}
      {showCancel && <Button onClick={onCancel}>Cancel</Button>}
      {showDelete && <Button onClick={onDelete}>Delete</Button>}
      {showCreateOrSave && (
        <Button onClick={onCreateOrSave}>{createOrSaveLabel}</Button>
      )}
      {showEdit && <Button onClick={onEdit}>Edit</Button>}
    </ActionContainer>
  );
}

// Styled Components

const ActionContainer = styled.footer`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: var(--mainbackground);
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
`;

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  border: none;
  border-radius: 50px;
  background-color: var(--actionButtons);
  color: var(--actionButtonText);
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: var(--accents);
  }
`;
