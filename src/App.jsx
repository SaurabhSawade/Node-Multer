// filepath: /Users/saurabhsawade/task36/Client/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://node-multer-backend.onrender.com';

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    await axios.post(`${API}/upload`, formData);
    setUploading(false);
    setFile(null);
    fetchFiles();
  };

  const fetchFiles = async () => {
    const res = await axios.get(`${API}/files`);
    setFiles(res.data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center">
      <div className="bg-white/80 shadow-xl rounded-xl p-8 w-full max-w-md animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-700 flex items-center justify-center gap-2">
          <span className="animate-bounce">📁</span> File Uploader
        </h1>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
          />
          <button
            type="submit"
            disabled={uploading}
            className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform duration-200 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Uploading...
              </span>
            ) : 'Upload'}
          </button>
        </form>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-purple-600">Uploaded Files</h2>
        <ul className="space-y-2 max-h-48 overflow-y-auto">
          {files.map(f => (
            <li key={f._id} className="bg-purple-50 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-purple-100 transition-colors">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <a
                href={`${API}/${f.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:underline break-all"
              >
                {f.filename}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API = 'http://localhost:4000';

// function App() {
//   const [file, setFile] = useState(null);
//   const [files, setFiles] = useState([]);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please select a file");
//     const formData = new FormData();
//     formData.append('file', file);
//     await axios.post(`${API}/upload`, formData);
//     fetchFiles();
//   };

//   const fetchFiles = async () => {
//     const res = await axios.get(`${API}/files`);
//     setFiles(res.data);
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>📁 File Uploader</h1>
//       <form onSubmit={handleUpload}>
//         <input type="file" onChange={e => setFile(e.target.files[0])} />
//         <button type="submit">Upload</button>
//       </form>

//       <h2>Uploaded Files</h2>
//       <ul>
//         {files.map(f => (
//           <li key={f._id}>
//             <a href={`${API}/${f.path}`} target="_blank" rel="noopener noreferrer">{f.filename}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;