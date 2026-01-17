import { useLocation, useNavigate, useParams } from "react-router-dom";
import CareersPage from "./CareersPage";

export default function PreviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  return (
    <div className="min-h-screen">

      {/* Top Bar */}
      <div className="bg-black text-white px-6 py-3 flex justify-between items-center">
        <span className="text-sm">Preview Mode</span>

        <button
          onClick={() => navigate(`/${slug}/edit`)}
          className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
        >
          Back to Editor
        </button>
      </div>

      {/* Preview Content */}
      <CareersPage previewConfig={state?.config} />
    </div>
  );
}
