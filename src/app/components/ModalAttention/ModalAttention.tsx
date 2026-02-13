import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ModalAttention.module.css";

interface ModalAttentionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAttention({
  isOpen,
  onClose,
}: ModalAttentionProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    // Block body scroll
    document.body.style.overflow = "hidden";

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  const handleRegistration = () => {
    navigate("/register");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href="/sprite.svg#icon-cross"></use>
          </svg>
        </button>

        <div className={css.iconWrapper}>
          <img src="/🐶.png" alt="Dog" className={css.dogIcon} />
        </div>

        <h2 className={css.title}>Attention</h2>

        <p className={css.message}>
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>

        <div className={css.actions}>
          <button className={css.loginBtn} onClick={handleLogin}>
            Log In
          </button>
          <button className={css.registrationBtn} onClick={handleRegistration}>
            Registration
          </button>
        </div>
      </div>
    </div>
  );
}
