import { useEffect } from "react";
import headerStore from "@/store/header";
import SortBy from "@/components/SortBy";
import SearchBar from "@/components/SearchBar";

export default function Store() {
  useEffect(() => {
    headerStore.set({ title: "Store" });
    return () => headerStore.reset();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <SortBy />
        <SearchBar />
      </div>
      {}
    </div>
  );
}
