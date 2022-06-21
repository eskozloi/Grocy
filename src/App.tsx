import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderStore from "./store/header";
import Home from "./views/Home";
import Store from "@/views/Store";
import Product from "@/views/Product";
import NotFound from "@/views/404";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import FaviconUrl from "@/assets/favicon.svg?url";
import type { ButtonInterface, HeaderInterface } from "@/composables/interfaces";

// const headerStore = new HeaderStore();

export default function App() {
  const [MenuIsActive, setMenuIsActive] = useState(false);

  const showMenu = () => {
    setMenuIsActive(!MenuIsActive);
  };

  return (
    <div className="App screenPadding">
      <HelmetProvider>
        <Helmet>
          <html lang="en" />
          <title>Grocy</title>
          <meta name="description" content="Evaluation task for 'ADNGames'" />
          <link rel="icon" type="svg" href={FaviconUrl} sizes="32x32" />
        </Helmet>
      </HelmetProvider>
      <Header menuIsActive={MenuIsActive} onMenuButtonClick={showMenu} />
      <div className={MenuIsActive ? "" : "invisible"}>
        <Menu onExitClick={showMenu} />
      </div>
      <div className="appBody">
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <NotFound
                  msg="// TODO: make a home page"
                  body='P.S. You can find a list of products by clicking "Store" in the menu'
                />
              }
            />
            <Route path="store" element={<Store />}>
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
