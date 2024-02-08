import "./App.css";

import AboutWhole from "./components/About/WHoleABOUT";
import HomeTab from "./components/HomeTab";
import Navbar from "./components/HomeTab/navbar/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InputNewPieceForm from "./components/Services/InputNewPiece";
import OutfitGeneratorForm from "./components/Generator/outfitGeneratorForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/home", element: <HomeTab /> },
        { path: "/about", element: <AboutWhole /> },
        { path: "/myclothes", element: <InputNewPieceForm /> },
        { path: "/generator", element: <OutfitGeneratorForm /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
