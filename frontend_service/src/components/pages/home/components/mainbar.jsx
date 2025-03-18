import React, { useEffect, useState } from "react";
import axios from "axios";

import '../../../../assets/discover/css/discover.css'
import ShowCase from '../../profile/components/ShowCase'

function MainRightBar() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get("http://0.0.0.0:8001/api/projects/")
      .then(response => setProjects(response.data.projects));
  }, []);
    return (
        <>
            <br />
            <div class="grid-wrapper">
                {projects.map((project, index) => (
                    <ShowCase key={project.id || index} project={project} />
                ))}
            </div>
        </>
    )
}

export default MainRightBar