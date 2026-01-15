import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (!slug) return;
    navigate(`/${slug}/edit`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-6 rounded space-y-4 w-80">
        <h1 className="text-xl font-semibold">Recruiter Login</h1>
        <input
          className="border p-2 w-full rounded"
          placeholder="Enter company slug"
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2 rounded"
        >
          Enter Editor
        </button>
      </div>
    </div>
  );
}
