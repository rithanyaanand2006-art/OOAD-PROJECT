import React, { useState } from 'react';

/**
 * Digital Document Management System (React)
 * Features: File Upload, PDF Manipulation Simulations, File Storage View (Drive-like)
 */

const App = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Project_Proposal.pdf', size: '1.2 MB', type: 'application/pdf', date: '2026-11-15' },
    { id: 2, name: 'Financial_Report_Q3.xlsx', size: '450 KB', type: 'spreadsheet', date: '2026-11-16' },
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files || e.dataTransfer.files);
    const newFiles = uploadedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      date: new Date().toISOString().split('T')[0],
    }));
    setFiles([...files, ...newFiles]);
  };

  const deleteFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const styles = `
    :root {
      --primary: #2563eb;
      --bg: #f8fafc;
      --card: #ffffff;
      --text: #1e293b;
      --border: #e2e8f0;
    }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 15px;
      margin-bottom: 40px;
    }
    .tool-card {
      background: var(--card);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid var(--border);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .tool-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
    }
    .tool-icon {
      font-size: 24px;
      margin-bottom: 8px;
      display: block;
    }
    .drop-zone {
      border: 2px dashed var(--border);
      border-radius: 12px;
      padding: 40px;
      text-align: center;
      background: var(--card);
      margin-bottom: 30px;
      transition: border-color 0.2s;
    }
    .drop-zone.active {
      border-color: var(--primary);
      background: #eff6ff;
    }
    .file-list {
      background: var(--card);
      border-radius: 12px;
      border: 1px solid var(--border);
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      text-align: left;
      padding: 12px 16px;
      background: #f1f5f9;
      font-size: 14px;
      font-weight: 600;
    }
    td {
      padding: 12px 16px;
      border-top: 1px solid var(--border);
      font-size: 14px;
    }
    .btn-delete {
      color: #ef4444;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }
    @media (max-width: 600px) {
      .tools-grid { grid-template-columns: 1fr 1fr; }
      .hide-mobile { display: none; }
    }
  `;

  return (
    <div className="container">
      <style>{styles}</style>
      
      <header>
        <h1>DocStack</h1>
        <div style={{ fontSize: '14px', color: '#64748b' }}>v1.0.4</div>
      </header>

      {/* PDF Tools Section (iLovePDF Style) */}
      <section>
        <h3 style={{ marginBottom: '15px' }}>Quick PDF Tools</h3>
        <div className="tools-grid">
          <div className="tool-card"><span className="tool-icon">➕</span>Merge</div>
          <div className="tool-card"><span className="tool-icon">✂️</span>Split</div>
          <div className="tool-card"><span className="tool-icon">📉</span>Compress</div>
          <div className="tool-card"><span className="tool-icon">🔄</span>Convert</div>
          <div className="tool-card"><span className="tool-icon">✍️</span>eSign</div>
        </div>
      </section>

      {/* Upload Zone */}
      <div 
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); handleUpload(e); }}
      >
        <p>Drag & drop files here or</p>
        <input 
          type="file" 
          multiple 
          onChange={handleUpload} 
          style={{ display: 'none' }} 
          id="fileInput" 
        />
        <label htmlFor="fileInput" style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>
          Browse Files
        </label>
      </div>

      {/* Drive View Section */}
      <section>
        <h3 style={{ marginBottom: '15px' }}>My Cloud Storage</h3>
        <div className="file-list">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-mobile">Date</th>
                  <th className="hide-mobile">Size</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map(file => (
                  <tr key={file.id}>
                    <td>
                      <span style={{ marginRight: '8px' }}>
                        {file.type.includes('pdf') ? '📄' : '📁'}
                      </span>
                      {file.name}
                    </td>
                    <td className="hide-mobile">{file.date}</td>
                    <td className="hide-mobile">{file.size}</td>
                    <td>
                      <button className="btn-delete" onClick={() => deleteFile(file.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
                {files.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      No files stored yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
