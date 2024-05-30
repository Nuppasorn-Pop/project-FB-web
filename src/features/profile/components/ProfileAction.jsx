import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditProfileForm from "./EditProfileForm";
export default function ProfileAction() {
  const [open, setOpen] = useState();
  return (
    <div>
      <Button bg="gray" onClick={() => setOpen(true)}>
        Edit Profile
      </Button>
      <Modal
        onOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Profile"
        width={44}
      >
        <EditProfileForm />
      </Modal>
    </div>
  );
}
