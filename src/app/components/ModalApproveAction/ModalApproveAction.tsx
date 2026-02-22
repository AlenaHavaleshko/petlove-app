import css from "./ModalApproveAction.module.css";
import { useEffect } from "react";

interface ModalApproveActionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

function ModalApproveAction({
  isOpen,
  onClose,
  onConfirm,
  title = "Already leaving?",
  message = "Are you sure you want to log out?",
}: ModalApproveActionProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.modal_backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.modal_close} onClick={onClose} type="button">
          <svg className={css.modal_close_icon} width={24} height={24}>
            <use href="/sprite.svg#icon-cross" />
          </svg>
        </button>
        <div className={css.modal_image_wrapper}>
          <img src="/🐈.png" alt="cat" className={css.modal_image} />
        </div>
        <h2 className={css.modal_title}>{title}</h2>
        <p className={css.modal_message}>{message}</p>
        <div className={css.modal_buttons}>
          <button
            className={css.modal_btn_confirm}
            onClick={onConfirm}
            type="button"
          >
            Yes
          </button>
          <button
            className={css.modal_btn_cancel}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalApproveAction;
