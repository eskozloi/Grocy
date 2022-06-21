import { useEffect } from "react";
import headerStore from "@/store/header";

export default function Home() {
  useEffect(() => {
    headerStore.set({ title: "Home" });
    return () => headerStore.reset();
  }, []);

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
