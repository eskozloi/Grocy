import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react";
import Store from "@/views/Store";
import Product from "@/views/Product";
import NotFound from "@/views/404";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import FaviconUrl from "@/assets/favicon.svg?url";
import HouseIcoUrl from "@/assets/icons/house.svg?url";
import GrocBagIcoUrl from "@/assets/icons/grocBag.svg?url";
import menuStore from "@/store/menu";

const tabs = [
  { title: "Home", href: "/", ico: HouseIcoUrl, order: 1 },
  { title: "Store", href: "/store", ico: GrocBagIcoUrl, order: 2 },
];

function App() {
  useEffect(() => {
    menuStore.set(tabs);
    return () => menuStore.reset();
  }, []);

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
      <Header />
      <div className={menuStore.isActive ? "" : "invisible"}>
        {/* Had trouble deciding whether to make "Menu" more standalone,
        where it could decide when to show itself, so "App" doesn't rerender everything else,
        or make "App" decide this, so it will be more logically correct.
        At the end I have decided to stick with the second variant,
        would like to hear your opinion about this. */}
        <Menu onEmptySpaceClick={() => menuStore.hide()} />
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
            <Route path="store" element={<Store />} />
            <Route path="store/:id" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default observer(App);
