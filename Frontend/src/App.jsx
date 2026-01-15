import { Routes, Route } from "react-router-dom";
import CareersPage from "./pages/CareersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/:slug/careers" element={<CareersPage />} />
    </Routes>
  );
}
