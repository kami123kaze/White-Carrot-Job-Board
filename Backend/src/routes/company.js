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

export default router;
