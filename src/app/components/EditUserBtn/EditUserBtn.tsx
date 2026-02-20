import { useState } from "react";
import css from "./EditUserBtn.module.css";
import ModalEditUser from "../ModalEditUser/ModalEditUser";

export default function EditUserBtn() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button className={css.editUserBtn} onClick={handleOpen}>
        <svg width="20" height="20" aria-hidden="true">
          <use href="/sprite.svg#icon-Vector" />
        </svg>
      </button>
      {open && <ModalEditUser onClose={handleClose} />}
    </>
  );
}
