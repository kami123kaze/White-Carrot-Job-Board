import { useLocation, useParams } from "react-router-dom";
import CareersPage from "./CareersPage";

export default function PreviewPage() {
  const { state } = useLocation();
  const { slug } = useParams();

  // Pass overridden config into CareersPage
  return <CareersPage previewConfig={state?.config} slugOverride={slug} />;
}
