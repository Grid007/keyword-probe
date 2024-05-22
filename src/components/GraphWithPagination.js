import React, { useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Bar } from 'react-chartjs-2';

const GraphWithPagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    // Calculate the start and end index of the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data array to get the current page's data
    const currentPageData = data.slice(startIndex, endIndex);

    // Extract labels and frequencies from the current page's data
    const labels = currentPageData.map((item) => item.keyword);
    const frequencies = currentPageData.map((item) => item.frequency);

    // Set the chart data for the current page
    setCurrentPageData({
      labels,
      datasets: [
        {
          label: 'Frequency',
          data: frequencies,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [data, currentPage, itemsPerPage]);

  // Handle pagination
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h2 className='text-xl font-serif'>Keyword BarGraph</h2>
      {currentPageData.labels && (
        <div>
          <Bar data={currentPageData} />
          <div className='flex space-x-2'>
            <Button color="orange" variant="soft">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous 
              </button>
            </Button>
            <Button color="orange" variant="soft">
              <button onClick={nextPage} disabled={currentPage * itemsPerPage >= data.length}>
                Next 
              </button>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphWithPagination;
