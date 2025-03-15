import { useState, useRef } from "react";
import axios from "axios";

const ProjectUpload = () => {
  const [token, setToken] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
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
    formData.append("project_name", projectName);  // FIXED: Matching backend field
    formData.append("project_description", projectDescription); // FIXED: Matching backend field

    files.forEach((file) => formData.append("files", file));

    try {
        const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Project uploaded successfully!");
        console.log("Response Data:", response.data);
        
    } catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);
        alert("Upload failed. Check console for details.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          multiple
          accept=".html, .css, .js"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="w-full p-2 border rounded"
          required
        />

        {files.length > 0 && (
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-700">{file.name}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className={`w-full text-white py-2 rounded transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectUpload;
