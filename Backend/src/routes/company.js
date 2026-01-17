import express from "express";
import { supabase } from "../supabase.js";

const router = express.Router();

/*GET company by slug*/
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const { data, error } = await supabase
    .from("companies")
    .select("slug, name, config")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return res.status(404).json({ error: "Company not found" });
    }
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

/**Get job by slug */
router.get("/:slug/jobs", async (req, res) => {
  const { slug } = req.params;
  const { location, type, search } = req.query;

  let query = supabase
    .from("jobs")
    .select("*")
    .eq("company_slug", slug);

  if (location) {
    query = query.eq("location", location);
  }

  if (type) {
    query = query.eq("job_type", type);
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

/* Edit Job */
router.put("/:slug/config", async (req, res) => {
  const { slug } = req.params;
  const { config } = req.body;

  if (!config) {
    return res.status(400).json({ error: "Config required" });
  }

  const { data, error } = await supabase
    .from("companies")
    .update({ config })
    .eq("slug", slug)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Get all companies (for homepage)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("companies")
    .select("slug, name, config");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});


export default router;
