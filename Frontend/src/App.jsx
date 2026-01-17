import { Routes, Route } from "react-router-dom";
import CareersPage from "./pages/CareersPage";
import LoginPage from "./pages/LoginPage";
import EditorPage from "./pages/EditorPage";
import PreviewPage from "./pages/PreviewPage";
import HomePage from "./pages/HomePage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:slug/careers" element={<CareersPage />} />
      <Route path="/:slug/edit" element={<EditorPage />} />
      <Route path="/:slug/preview" element={<PreviewPage />} />
    </Routes>
  );
}
