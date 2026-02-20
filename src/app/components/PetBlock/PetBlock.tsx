import css from "./PetBlock.module.css";

interface PetBlockProps {
  desktopSet: string;
  laptopSet: string;
  mobileSrc: string;
  imageUrl?: string | null;
}

function PetBlock({ desktopSet, laptopSet, mobileSrc }: PetBlockProps) {
  return (
    <div className={css.pet_block}>
      <picture>
        <source srcSet={desktopSet} media="(min-width: 1280px)" />
        <source srcSet={laptopSet} media="(min-width: 768px)" />
        <img src={mobileSrc} alt="Dog mobile" />
      </picture>
    </div>
  );
}

export default PetBlock;
