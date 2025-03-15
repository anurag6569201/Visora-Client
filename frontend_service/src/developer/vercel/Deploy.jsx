export default async (req, res) => {
    const { html, css, js } = req.body;
    
    try {
      const vercelRes = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`
        },
        body: JSON.stringify({
          name: 'codepen-clone',
          files: [
            { file: 'index.html', data: html },
            { file: 'style.css', data: css },
            { file: 'script.js', data: js }
          ],
          projectSettings: {
            framework: 'static',
            installCommand: '',
            buildCommand: '',
            outputDirectory: ''
          }
        })
      });
  
      const data = await vercelRes.json();
      res.status(200).json({ url: data.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };