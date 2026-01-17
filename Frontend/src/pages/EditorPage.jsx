import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000/api";

export default function EditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [config, setConfig] = useState(null);

  // Load company config
  useEffect(() => {
    fetch(`${API_BASE}/company/${slug}`)
      .then(res => res.json())
      .then(data => {
        setCompany(data);
        setConfig(data.config);
      });
  }, [slug]);

  if (!company || !config) {
    return <div className="p-6">Loading...</div>;
  }

  // ---------------- Theme ----------------

  function updateTheme(field, value) {
    setConfig({
      ...config,
      theme: { ...config.theme, [field]: value }
    });
  }

  // ---------------- Sections ----------------

  function updateSection(id, field, value) {
    setConfig({
      ...config,
      sections: config.sections.map(s =>
        s.id === id ? { ...s, [field]: value } : s
      )
    });
  }

  function addSection() {
    const newSection = {
      id: crypto.randomUUID(),
      title: "New Section",
      content: "Section content",
      enabled: true
    };
    setConfig({ ...config, sections: [...config.sections, newSection] });
  }

  function removeSection(id) {
    setConfig({
      ...config,
      sections: config.sections.filter(s => s.id !== id)
    });
  }

  function moveSectionUp(index) {
    if (index === 0) return;
    const newSections = [...config.sections];
    [newSections[index - 1], newSections[index]] =
      [newSections[index], newSections[index - 1]];
    setConfig({ ...config, sections: newSections });
  }

  function moveSectionDown(index) {
    if (index === config.sections.length - 1) return;
    const newSections = [...config.sections];
    [newSections[index + 1], newSections[index]] =
      [newSections[index], newSections[index + 1]];
    setConfig({ ...config, sections: newSections });
  }

  // ---------------- Save ----------------

  async function saveConfig() {
  await fetch(`${API_BASE}/company/${slug}/config`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ config })
  });

  // Redirect to published careers page after save
  navigate(`/${slug}/careers`);
}


  // ---------------- Render ----------------

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Editing: {company.name}
          </h1>

          <div className="flex gap-3">
            <button
              onClick={saveConfig}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              onClick={() => navigate(`/${slug}/preview`, { state: { config } })}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Preview
            </button>
          </div>
        </div>

        {/* Theme Controls */}
        <div className="border p-4 rounded bg-white space-y-4">
          <h2 className="font-semibold">Theme</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Primary Color (#hex)"
              value={config.theme.primaryColor}
              onChange={e => updateTheme("primaryColor", e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Logo URL"
              value={config.theme.logoUrl}
              onChange={e => updateTheme("logoUrl", e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Banner URL"
              value={config.theme.bannerUrl}
              onChange={e => updateTheme("bannerUrl", e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Culture Video URL"
              value={config.theme.cultureVideoUrl}
              onChange={e => updateTheme("cultureVideoUrl", e.target.value)}
            />
          </div>
        </div>

        {/* Sections Editor */}
        <div className="border p-4 rounded bg-white space-y-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Sections</h2>
            <button
              onClick={addSection}
              className="border px-3 py-1 rounded"
            >
              + Add Section
            </button>
          </div>

          {config.sections.map((section, index) => (
            <div key={section.id} className="border p-3 rounded space-y-2">

              <div className="flex justify-between items-center">
                <input
                  className="font-semibold border-b w-full"
                  value={section.title}
                  onChange={e =>
                    updateSection(section.id, "title", e.target.value)
                  }
                />

                <div className="flex gap-2 ml-2">
                  <button onClick={() => moveSectionUp(index)}>↑</button>
                  <button onClick={() => moveSectionDown(index)}>↓</button>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <textarea
                className="border p-2 rounded w-full"
                rows="3"
                value={section.content}
                onChange={e =>
                  updateSection(section.id, "content", e.target.value)
                }
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={section.enabled}
                  onChange={e =>
                    updateSection(section.id, "enabled", e.target.checked)
                  }
                />
                Enabled
              </label>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
