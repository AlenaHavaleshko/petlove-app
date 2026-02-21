import { useEffect, useState } from "react";

export interface Pet {
  _id: string;
  imgURL: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  species: string;
}
import css from "./PetsList.module.css";
import PetsItem from "../PetsItem/PetsItem";
import { getUserPets, deleteUserPet } from "../../../services/api/users";

export default function PetsList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserPets()
      .then((data) => setPets(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (petId: string) => {
    await deleteUserPet(petId);
    setPets((prev) => prev.filter((pet) => pet._id !== petId));
  };

  if (loading) return <div>Loading...</div>;
  if (!pets.length) return <div>No pets found.</div>;

  return (
    <div className={css.petsList}>
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} onDelete={handleDelete} />
      ))}
    </div>
  );
}
