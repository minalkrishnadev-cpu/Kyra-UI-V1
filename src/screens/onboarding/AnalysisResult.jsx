import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../../components/AppHeader.jsx";

/** Figma: Analysis / "Analysing" (2043:13245) */
export default function AnalysisResult() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract photo and analysis result from router state
  const { photo, result } = location.state || {};

  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content screen__content--analysing">
        <h1 >Result</h1>
        
        {/* Render the captured photo if available */}
        {photo && (
          <div className="photo-preview" style={{ marginBottom: "20px" }}>
            <img 
              src={photo} 
              alt="Scanned Body" 
              style={{ maxWidth: "200px", borderRadius: "8px" }} 
            />
          </div>
        )}

        {/* Print the analysis data on the screen */}
        <div className="screen__text">
          {result ? (
            <pre style={{ textAlign: "left", background: "#0000", padding: "15px", borderRadius: "5px" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <p>No analysis data found. Please try capturing again.</p>
          )}
        </div>
      </div>
    </div>
  );
}