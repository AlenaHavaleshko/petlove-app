import css from "./Title.module.css";

interface TitleProps {
  name: string;
  birthday: string;
  text: string;
  src: string;
}

function Title({ name, birthday, text, src }: TitleProps) {
  return (
    <div className={css.title}>
      <div className={css.title_icon}>
        <img className={css.img_cat} src={src} alt="Cat" />
      </div>
      <div className={css.title_info}>
        <div className={css.title_info_top}>
          <p className={css.title_name}>{name}</p>
          <p className={css.title_birthday}>
            Birthday: <span className={css.title_span}>{birthday}</span>
          </p>
        </div>
        <div className={css.title_info_bottom}>
          <p className={css.title_text}>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Title;
