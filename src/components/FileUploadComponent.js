import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@radix-ui/themes';

const FileUploadComponent = ({ onUploadSuccess }) => {
  const [message, setMessage] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Use the relative path as the API URL is now proxied by Vercel
      const apiUrl = '/api/uploadFile';

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage(`File "${file.name}" uploaded successfully.`);
        onUploadSuccess(file.name); // Pass the file name to the callback function
      } else {
        setMessage('Upload failed. Please try again later.');
      }
    } catch (error) {
      setMessage('Upload failed. Please try again later.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <Button variant='classic' className="custom-file-upload" size="3" >
        <label htmlFor="file-upload">Upload</label>
      </Button>
      
      <input
        id="file-upload"
        type="file"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
      {message && <p className='font-bold font-sans'>{message}</p>}
    </div>
  );
};

export default FileUploadComponent;
