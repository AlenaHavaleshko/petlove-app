import css from "./LogOutBtn.module.css";
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

interface LogOutBtnProps {
  isHome?: boolean;
}

function LogOutBtn({ isHome = false }: LogOutBtnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={isHome ? css.logout_btn_home : css.logout_btn}
        type="button"
        onClick={handleLogoutClick}
      >
        Log out
      </button>
      <ModalApproveAction
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}

export default LogOutBtn;
