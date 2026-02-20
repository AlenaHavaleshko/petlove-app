import css from "./PetsItem.module.css";
import type { Pet } from "../PetsList/PetsList";

interface PetsItemProps {
  pet: Pet;
  onDelete: (id: string) => void;
}

export default function PetsItem({ pet, onDelete }: PetsItemProps) {
  return (
    <div className={css.petsItem}>
      <img className={css.petImage} src={pet.imageUrl} alt={pet.title} />
      <div className={css.petInfo}>
        <div className={css.petTitle}>{pet.title}</div>
        <div className={css.petTable}>
          <div className={css.petTableCol}>
            <span>Name</span>
            <span>{pet.name}</span>
          </div>
          <div className={css.petTableCol}>
            <span>Birthday</span>
            <span>{pet.birthday}</span>
          </div>
          <div className={css.petTableCol}>
            <span>Sex</span>
            <span>{pet.sex}</span>
          </div>
          <div className={css.petTableCol}>
            <span>Species</span>
            <span>{pet.species}</span>
          </div>
        </div>
      </div>
      <button
        className={css.deleteBtn}
        onClick={() => onDelete(pet.id)}
        title="Delete pet"
      >
        <svg width="24" height="24" aria-hidden="true">
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </button>
    </div>
  );
}
