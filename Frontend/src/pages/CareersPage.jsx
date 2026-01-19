import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";


const API_BASE = "http://localhost:4000/api";
export default function CareersPage({ previewConfig, slugOverride }) {
  
  
  const params = useParams();
  const slug = slugOverride || params.slug;
  
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    search: ""
  });
  
  
  // Fetch company config
  useEffect(() => {
    fetch(`${API_BASE}/company/${slug}`)
      .then(res => res.json())
      .then(setCompany);
  }, [slug]);

  // Fetch jobs
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.location) params.append("location", filters.location);
    if (filters.type) params.append("type", filters.type);
    if (filters.search) params.append("search", filters.search);

    fetch(`${API_BASE}/company/${slug}/jobs?${params}`)
      .then(res => res.json())
      .then(setJobs);
  }, [slug, filters]);

  if (!company) return <div className="p-6">Loading...</div>;
  const pageTitle = `${company.name} Careers`;
  const pageDescription = `Explore open roles and learn more about life at ${company.name}.`;

  const finalConfig = previewConfig || company.config;

  const { theme, sections } = finalConfig;

  return (
  <div className="min-h-screen bg-white text-gray-900">
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
     </Helmet>  
    {/* Top Navigation */}
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Back to homepage */}
        <button
          onClick={() => window.location.href = "/"}
          className="text-sm font-medium text-gray-700 hover:text-black"
        >
          ← All Companies
        </button>

        {/* Recruiter link */}
        <button
          onClick={() => window.location.href = "/login"}
          className="text-sm text-gray-500 hover:text-black"
        >
          Recruiter Login
        </button>

      </div>
    </div>

{/* Header */}
<div
  className="h-56 flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: theme.bannerUrl
      ? `url(${theme.bannerUrl})`
      : "none",
    backgroundColor: theme.bannerUrl
      ? "transparent"
      : theme.primaryColor
  }}
>
  {/* Optional dark overlay for contrast */}
  <div className="bg-black/40 w-full h-full flex items-center justify-center">
    {theme.logoUrl ? (
      <img
        src={theme.logoUrl}
        className="h-20 w-20 rounded-full object-cover bg-white p-1"
      />
    ) : (
      <h1 className="text-white text-3xl font-bold">
        {company.name} Careers
      </h1>
    )}
  </div>
</div>


    {/* Sections */}
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {sections.filter(s => s.enabled).map(section => (
        <div key={section.id}>
          <h2 className="text-xl font-semibold mb-2">
            {section.title}
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {section.content}
          </p>
        </div>
      ))}
    </div>

    {/* Filters */}
    <div className="max-w-4xl mx-auto p-6 border-t space-y-4">
      <h2 className="text-xl font-semibold">Open Roles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Search job title"
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters({ ...filters, location: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Job type"
          value={filters.type}
          onChange={e => setFilters({ ...filters, type: e.target.value })}
        />
      </div>

      {/* Jobs List */}
      <div className="space-y-4 mt-4">
        {jobs.length === 0 && (
          <p className="text-gray-500">No jobs found.</p>
        )}

        {jobs.map(job => (
          <div
            key={job.id}
            className="border rounded p-4 hover:shadow transition"
          >
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {job.location} • {job.job_type}
            </p>
            <p className="text-gray-700 mt-2">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
);

}
