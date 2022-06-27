import { useEffect } from "react";
import headerStore from "@/store/header";

export default function Home() {
  useEffect(() => {
    headerStore.setTitle("Home");
    return () => headerStore.reset();
  }, []);

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
