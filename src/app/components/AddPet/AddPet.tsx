import React from "react";
import css from "./AddPet.module.css";
import { useNavigate } from "react-router-dom";

export default function AddPet() {
  const navigate = useNavigate();
  return (
    <div className={css.addPet}>
      <h3 className={css.title}>My pets</h3>
      <button className={css.button} onClick={() => navigate("/add-pet")}>
        Add pet +
      </button>
    </div>
  );
}
