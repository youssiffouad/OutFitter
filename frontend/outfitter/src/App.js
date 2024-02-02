import "./App.css";
import HomeTab from "./components/HomeTab";
import Navbar from "./components/HomeTab/navbar/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/home", element: <HomeTab /> },
        { path: "/about", element: <h1>about</h1> },
        { path: "/contact", element: <h1>contact</h1> },
        { path: "/services", element: <h1>services</h1> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
