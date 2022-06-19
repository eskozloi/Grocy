import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Store from "@/views/Store";
import Product from "@/views/Product";
import NotFound from "@/views/404";
import Header from "@/components/Header";

export default function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <HelmetProvider>
        <Helmet>
          <html lang="en" />
          <title>Grocy</title>
          <meta name="description" content="Evaluation task for 'ADNGames'" />
        </Helmet>
      </HelmetProvider>
      <Header />
      <div className="pt-12em pb-3em px-4em h-full w-full">
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/store" replace />} />
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
