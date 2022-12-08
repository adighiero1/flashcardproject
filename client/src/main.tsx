import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Deck from "./Deck";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Title } from "./Title";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/decks/:deckId",
    element: <Deck />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
      <Header />
      <Title />
      <RouterProvider router={router} />
      <Footer />
    </div>
  </React.StrictMode>
);
