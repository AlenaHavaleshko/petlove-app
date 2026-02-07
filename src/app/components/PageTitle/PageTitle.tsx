import css from "./PageTitle.module.css";

interface PageTitleProps {
  children: React.ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
  return <h1 className={css.pageTitle}>{children}</h1>;
}

export default PageTitle;
