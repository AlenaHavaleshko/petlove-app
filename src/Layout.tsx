import Header from "./app/components/Header/Header";
import Loader from "./app/components/Loader/Loader";
import { Outlet } from "react-router-dom";
import { useLoader } from "./context/useLoader";

function Layout() {
  const { isLoading } = useLoader();

  return (
    <div>
      <Header />
      {isLoading && <Loader/>}
       <Outlet />
    </div>
  );
}

export default Layout;
