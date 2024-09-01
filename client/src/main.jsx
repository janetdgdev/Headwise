import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/index.css";
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from "./pages/NotFound";
import { Categories } from "./pages/Categories";
import { Editor } from "./pages/Editor";
import { Profile } from "./pages/Profile";
import { FormBuilderPage } from "./pages/FormBuilderPage";
import { Navbar } from "./components/Layout/Navbar.jsx";
import { Footer } from "./components/Layout/Footer.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound /> },
  { path: "/about", element: <About />, errorElement: <NotFound /> },
  { path: "/categories", element: <Categories />, errorElement: <NotFound /> },
  { path: "/editor", element: <Editor />, errorElement: <NotFound /> },
  { path: "/profile", element: <Profile />, errorElement: <NotFound /> },
  { path: "/builder", element: <FormBuilderPage />, errorElement: <NotFound /> }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>
);
