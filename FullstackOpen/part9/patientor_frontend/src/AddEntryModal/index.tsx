import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  onClose: () => void;
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
