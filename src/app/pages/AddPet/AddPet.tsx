import css from "./AddPet.module.css";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import PetBlock from "../../components/PetBlock/PetBlock";

function AddPet() {
  return (
    <div className={css.add_pet}>
      <div className="container">
        <div className={css.pet_form}>
          <PetBlock
            desktopSet="/add.pet/add.pet.desktop.jpg"
            laptopSet="/add.pet/add.pet.tablet.jpg"
            mobileSrc="/add.pet/add.pet.mobile.jpg"
          />
          <AddPetForm />
        </div>
      </div>
    </div>
  );
}

export default AddPet;
