import css from "./Home.module.css";

function Home() {
  return (
    <div className={css.home}>
      <div className="container">
        <div className={css.home_top}>
          <div className="container"></div>
          <div className={css.home_box_title}>
            <h1 className={css.home_title}>
              Take good <span className={css.home_span}>care</span> of your
              small pets
            </h1>
          </div>
          <div className={css.home_box_text}>
            <p className={css.home_text}>
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </p>
          </div>
        </div>
        <div className={css.home_bottom}></div>
      </div>
    </div>
  );
}

export default Home;
