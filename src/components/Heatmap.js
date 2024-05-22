import React, { useState, useEffect } from 'react';
import HeatmapGrid from 'react-heatmap-grid';
import { Button } from '@radix-ui/themes';

const ITEMS_PER_PAGE = 10;

const Heatmap = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data ? Math.ceil(data.keyword_results.length / ITEMS_PER_PAGE) : 0;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when data changes
  }, [data]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderHeatmap = () => {
    if (!data) return null;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const slicedData = data.keyword_results.slice(startIndex, endIndex);

    const xLabels = [];
    const yLabels = [];
    const heatmapData = [];

    slicedData.forEach(item => {
      yLabels.push(item.keyword);
      const rowData = [];
      xLabels.forEach(label => {
        rowData.push(0);
      });
      item.pos_tags.forEach(tag => {
        if (!xLabels.includes(tag)) {
          xLabels.push(tag);
          rowData.push(1);
        } else {
          const index = xLabels.indexOf(tag);
          rowData[index]++;
        }
      });
      heatmapData.push(rowData);
    });

    return (
      <div>
        <h2 className='text-xl font-serif'>POS Tags Heatmap</h2>
        <HeatmapGrid
         xLabels={xLabels.map((label, index) => (
          <span key={index} className="text-xs font-bold text-gray-700">{label}</span>
        ))}
        yLabels={yLabels.map((label, index) => (
          <span key={index} className=" flex text-xs font-bold text-gray-700">{label}</span>
        ))}
          data={heatmapData}
          background="#329fff"
          height={30}
          
        />
      </div>
    );
  };

  return (
    <div>
      {renderHeatmap()}
      {totalPages > 1 && (
        <div className='flex space-x-2' style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <Button color="orange" variant="soft">

            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
          </Button>
          <Button color="orange" variant="soft">

            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Heatmap;
