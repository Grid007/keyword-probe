import React, { useState } from 'react';
import FileUploadComponent from './components/FileUploadComponent';
import FileProcessComponent from './components/FileProcessComponent';

const App = () => {
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleUploadSuccess = (fileName) => {
    setUploadedFileName(fileName);
  };

  return (
    <div>
      
      <span className="text-5xl font-mono flex justify-center box-decoration-slice bg-gradient-to-r from-blue-600 to-teal-300 text-white px-2 ...">
        Keyword Extraction and Visualizer
      </span>
      <div className='mt-16 ml-3'>

      <p className='text-3xl italic text-purple-500'>Please Select a File to assess</p>
      <FileUploadComponent onUploadSuccess={handleUploadSuccess} />
      {uploadedFileName && <FileProcessComponent filename={uploadedFileName} />}

      </div>
    </div>
  );
};

export default App;
