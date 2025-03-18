import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { Spinner, Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import '../../assets/developer/css/UploadModal.css'
import LocalFilesDeploy from "./LocalFilesDeploy";
import { useLocation } from "react-router-dom";
import UserContext from "../../global/Context";

const ProjectUpload = () => {
  const location = useLocation();
  const status = location.state?.status || false;
  const { user } = useContext(UserContext);

  const [token, setToken] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, []);

  const getFileType = (file) => {
    const type = file.type?.split("/")[0] || "";
    const extension = file.name.split(".").pop().toLowerCase();
    return { type, extension };
  };

  const readFileContent = async (file) => {
    try {
      if (file.type.startsWith("text/") || 
          file.type === "application/javascript") {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) => reject(e);
          reader.readAsText(file);
        });
      }
      return null;
    } catch (error) {
      console.error("Error reading file:", error);
      return "Could not preview file content";
    }
  };

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    const previews = await Promise.all(
      selectedFiles.map(async (file) => {
        const { type, extension } = getFileType(file);
        try {
          let content = null;
          
          if (type === "image") {
            content = URL.createObjectURL(file);
          } else if (["html", "css", "js"].includes(extension)) {
            content = await readFileContent(file);
          }

          return {
            name: file.name,
            type: type,
            extension,
            content,
            size: file.size,
            error: null
          };
        } catch (error) {
          return {
            name: file.name,
            type: type,
            extension,
            content: null,
            size: file.size,
            error: "Failed to load preview"
          };
        }
      })
    );

    setFilePreviews(previews);
  };

  const getFileIcon = (extension) => {
    const icons = {
      html: <i className="bi bi-filetype-html"></i>,
      css: <i className="bi bi-filetype-css"></i>,
      js: <i className="bi bi-filetype-js"></i>,
      jpg: <i className="bi bi-filetype-jpg"></i>,
      png: <i className="bi bi-filetype-png"></i>,
      gif: <i className="bi bi-filetype-gif"></i>,
    };    
    return icons[extension] || "📁";
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token || !projectName || !projectDescription || files.length === 0) {
      alert("Please fill all fields and upload files.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("token", token);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("project_name", projectName);
    formData.append("project_description", projectDescription);
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://0.0.0.0:8001/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Project uploaded successfully!");
      setProjectName("");
      setProjectDescription("");
      setFiles([]);
      setFilePreviews([]);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <br />
      <h2>Upload Project</h2>
      <br />
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
          rows={7}
        />
        
        {status ? (
        <LocalFilesDeploy handleFileChange={handleFileChange} />
        ) : (
          <input
            type="file"
            multiple
            accept=".html,.css,.js,image/*"
            onChange={handleFileChange}
            className="upload_file_input"
            ref={fileInputRef}
            required
          />
        )}


        {filePreviews.length > 0 && (
          <div className="file-previews">
            <h4>Selected Files:</h4>
            <div className="preview-grid">
              {filePreviews.map((preview, index) => (
                <Card key={index} className="file-card card">
                  <Card.Body>
                    <div className="file-header">
                      <span className="file-icon">
                        {getFileIcon(preview.extension)}
                      </span>
                      <span className="file-name">{preview.name}</span>
                    </div>

                    {preview.error && (
                      <div className="preview-error">{preview.error}</div>
                    )}

                    {preview.type === "image" && preview.content && (
                      <div className="code-preview">
                      <img 
                        src={preview.content} 
                        alt="Preview" 
                        className="image-preview"
                      />
                      </div>
                    )}

                    {["html", "css", "js"].includes(preview.extension) && (
                      <div className="code-preview">
                        <pre>
                          {preview.content?.slice(0, 200) || "No content available"}
                          {preview.content?.length > 200 && "..."}
                        </pre>
                      </div>
                    )}

                    <div className="file-meta">
                      <span>{preview.extension.toUpperCase()}</span>
                      <span>{(preview.size / 1024).toFixed(1)}KB</span>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Upload Project"}
        </Button>
      </form>
    </div>
  );
};

export default ProjectUpload;