import { Suspense } from "react";
import SearchClient from "./components/SearchClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}
