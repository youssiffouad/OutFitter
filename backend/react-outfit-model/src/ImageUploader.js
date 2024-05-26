import React, { useState } from 'react';

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [features, setFeatures] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload the file to the backend
  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('File upload failed');
      }
      const data = await response.json();
      setFeatures(data.features);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Fetch recommendations from the backend
  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/recommend/');
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div>
      <h1>Upload and Recommend</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
      {features && (
        <div>
          <h2>Extracted Features</h2>
          <p>{features.join(', ')}</p>
        </div>
      )}
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      {recommendations.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <ul>
            {recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
