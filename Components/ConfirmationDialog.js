import React from "react";
import styled from "styled-components";

export default function ConfirmationDialog({
  isVisible,
  message,
  onSaveAndContinue,
  onDiscardChanges,
  onCancel,
}) {
  if (!isVisible) return null;

  return (
    <DialogOverlay onClick={(e) => e.stopPropagation()}>
      <DialogBox onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <ButtonGroup>
          <DialogButton onClick={onCancel}>Cancel</DialogButton>
          <DialogButton onClick={onDiscardChanges}>
            Continue without Saving
          </DialogButton>
          <DialogButton onClick={onSaveAndContinue}>
            Save & Continue
          </DialogButton>
        </ButtonGroup>
      </DialogBox>
    </DialogOverlay>
  );
}

// Styled Components

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.div`
  background: var(--highlightedcard);
  color: var(--text);
  padding: 20px;
  border-radius: 8px;
  border: none;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const DialogButton = styled.button`
  margin: 5px;
  padding: 10px 20px;
  background: var(--buttons);
  color: var(--contrasttext);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: var(--accents);
  }
`;
