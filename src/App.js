import './App.css';
import React, { useState } from 'react';

function App() {
  const [metadata, setMetadata] = useState(null);

  const fetchMetadata = async (chosenPath, imageNumber) => {
    try {
      const requestTime = new Date();
      const response = await fetch(`https://storage.googleapis.com/storage/v1/b/mouzam_bucket_253/o/${chosenPath}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API response:', data);
      const metadataWithTime = {
        ...data,
        request_time: requestTime.toISOString(),
        img_num: imageNumber
      };
  
      setMetadata(metadataWithTime);
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  return (
    <div className='container'>
      <button onClick={() => fetchMetadata('cat.jpeg', 1)}>Fetch Metadata for Image 1</button>
      <button onClick={() => fetchMetadata('dog.jpeg', 2)}>Fetch Metadata for Image 2</button>
      <button onClick={() => fetchMetadata('sparrow.jpeg', 3)}>Fetch Metadata for Image 3</button>
      {metadata && (
        <div className='metadata'>
          <h2>Metadata Image:{metadata.img_num}</h2>
          <p>File Name: {metadata.name}</p>
          <p>Content Type: {metadata.contentType}</p>
          <p>File Size: {metadata.size}</p>
          <p>Creation Time: {metadata.timeCreated}</p>
          <p>Student ID:s2250944</p>
          <p>Request Time: {metadata.request_time}</p>
        </div>
      )}
    </div>
  );
}

export default App;
