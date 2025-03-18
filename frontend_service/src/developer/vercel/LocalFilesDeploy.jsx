import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const LocalFilesDeploy = ({ handleFileChange }) => {
  const location = useLocation();
  const fileInputRef = useRef(null);
  
  const status = location.state?.status || false;

  useEffect(() => {
    if (status && fileInputRef.current) {
      const htmlContent = localStorage.getItem("html") || "";
      const cssContent = localStorage.getItem("css") || "";
      const jsContent = localStorage.getItem("js") || "";

      if (!htmlContent && !cssContent && !jsContent) return;

      const htmlFile = new File([htmlContent], "index.html", { type: "text/html" });
      const cssFile = new File([cssContent], "style.css", { type: "text/css" });
      const jsFile = new File([jsContent], "script.js", { type: "application/javascript" });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(htmlFile);
      dataTransfer.items.add(cssFile);
      dataTransfer.items.add(jsFile);

      fileInputRef.current.files = dataTransfer.files;

      // Call handleFileChange manually to update state in ProjectUpload
      if (handleFileChange) {
        handleFileChange({ target: { files: dataTransfer.files } });
      }
    }
  }, [status, handleFileChange]);

  return (
    <input
      type="file"
      multiple
      accept=".html,.css,.js,image/*"
      className="upload_file_input"
      ref={fileInputRef}
      required
    />
  );
};

export default LocalFilesDeploy;
