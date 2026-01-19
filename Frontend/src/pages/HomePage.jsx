import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = "http://localhost:4000/api";

export default function HomePage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/company`)
      .then(res => res.json())
      .then(data => {
        setCompanies(data);
        setLoading(false);
      });
  }, []);

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading companies...</p>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-linear-to-br from-gray-800 via-gray-100 to-gray-200">


      {/* Header */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Careers Portal</h1>
          <p className="text-xs text-gray-300">
            Explore companies and open roles
          </p>
        </div>

        <Link
          to="/login"
          className="text-sm border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
        >
          Recruiter Login
        </Link>
      </div>

      {/* Company Cards */}
      <div className="max-w-5xl mx-auto p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {companies.map(company => {
          const config = company.config;
          const theme = config.theme;
          const firstSection = config.sections.find(s => s.enabled);

          return (
            <div
              key={company.slug}
              onClick={() => navigate(`/${company.slug}/careers`)}
              className="cursor-pointer rounded p-5 hover:shadow-lg transition text-white flex gap-4 items-start border border-white/40"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {/* Round Logo */}
              <div className="shrink-0">
                {theme.logoUrl ? (
                  <img
                    src={theme.logoUrl}
                    className="h-14 w-14 rounded-full object-cover bg-white p-1"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl">
                    {company.name[0]}
                  </div>
                )}
              </div>

              {/* Name + About */}
              <div>
                <h2 className="font-semibold text-lg leading-tight">
                  {company.name}
                </h2>

                <p className="text-sm text-white/90 mt-1 line-clamp-3">
                  {firstSection ? firstSection.content : "View open roles"}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
