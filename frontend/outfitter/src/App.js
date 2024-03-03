import "./App.css";

import AboutWhole from "./components/About/WHoleABOUT";
import HomeTab from "./components/HomeTab";
import Navbar from "./components/HomeTab/navbar/navbar";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import OutfitGeneratorForm from "./components/Generator/outfitGeneratorForm";

import { AuthProvider } from "./ContextStore/authenticationStore";
import LoginChoice from "./components/login&SignUp/Choicelogin";
import MyProfile from "./components/Profile/profile";
import { ProfileProvider } from "./ContextStore/profileContext";
import InputNewPieceForm from "./components/Profile/InputNewPiece";
import { ClothesCtxProvider } from "./ContextStore/clothesContext";
import { WeahterProvider } from "./ContextStore/weatherContext";
import { MaterialProvider } from "./ContextStore/materialContext";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" /> },
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/home", element: <HomeTab /> },
        { path: "/about", element: <AboutWhole /> },
        {
          path: "/Myprofile",
          element: (
            <ProfileProvider>
              <MyProfile />
            </ProfileProvider>
          ),
        },
        {
          path: "/generator",
          element: (
            // <WeahterProvider>
            //   <MaterialProvider>
            //     <ClothesCtxProvider>
            <InputNewPieceForm />
            //     </ClothesCtxProvider>
            //   </MaterialProvider>
            // </WeahterProvider>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <AuthProvider>
          <LoginChoice />
        </AuthProvider>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
