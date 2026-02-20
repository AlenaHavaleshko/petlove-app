import css from "./AddPet.module.css";
import AddPetForm from "../../components/AddPetForm/AddPetForm";
import PetBlock from "../../components/PetBlock/PetBlock";

function AddPet() {
  return (
    <div className={css.add_pet}>
      <div className="container">
        <div className={css.add_pet_box}>
          <div className={css.add_pet_image}>
            <PetBlock
              desktopSet="/add.pet/desktop.jpg"
              laptopSet="/add.pet/tablet.jpg"
              mobileSrc="/add.pet/mobile.jpg"
            />
          </div>
          <div className={css.add_pet_form}>
            <AddPetForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPet;
