import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarGraph from './BarGraph';
import ScatterPlotWithPagination from './ScatterPlotWithPagination';
import HeatmapComponent from './Heatmap';

const FileProcessComponent = ({ filename }) => {
  const [outputData, setOutputData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const processFile = async () => {
      try {
        // Use the relative path since Vercel will proxy it
        const apiUrl = '/api/processFile';
        const response = await axios.post(apiUrl, { filename });
        setOutputData(response.data);
        setError('');
      } catch (err) {
        setError('Error processing file');
        setOutputData(null);
      }
    };

    // Call processFile when the component mounts or when 'filename' changes
    if (filename) {
      processFile();
    }

    // Cleanup function
    return () => {
      // Optionally clean up any resources here
    };
  }, [filename]);

  return (
    <div className="grid grid-cols-2 gap-4"> {/* Grid container with 2 columns and spacing */}
      <div className="col-span-1"> {/* Spans one column */}
        {error && <p>{error}</p>}
        {outputData && <BarGraph jsonData={outputData} itemsPerPage={10} />}
      </div>
      <div className="col-span-1"> {/* Spans one column */}
        {outputData && <ScatterPlotWithPagination data={outputData} itemsPerPage={10} />}
      </div>
      <div className="col-span-2"> {/* Spans two columns (full width) */}
        {outputData && <HeatmapComponent data={outputData} />}
      </div>
    </div>
  );
};

export default FileProcessComponent;
