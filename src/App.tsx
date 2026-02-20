import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./app/pages/Main/Main";
import Home from "./app/pages/Home/Home";
import News from "./app/pages/News/News";
import Notices from "./app/pages/Notices/Notices";
import Friends from "./app/pages/Friends/Friends";
import Register from "./app/pages/Register/Register";
import Login from "./app/pages/Login/Login";
import NotFound from "./app/pages/NotFound/NotFound";
import AddPet from "./app/pages/AddPet/AddPet";
import PrivateRoute from "./app/components/PrivateRoute/PrivateRoute";
import Profile from "./app/pages/Profile/Profile";
import Layout from "./Layout";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="notices" element={<Notices />} />
            <Route path="friends" element={<Friends />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="add-pet"
              element={
                <PrivateRoute>
                  <AddPet />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </FavoritesProvider>
  );
}

export default App;
