import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import { Scatter } from 'react-chartjs-2';

const ScatterPlotWithPagination = ({ data }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.keyword_results.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (direction) => {
    if (direction === 'next') {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    } else if (direction === 'prev') {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.keyword_results.slice(indexOfFirstItem, indexOfLastItem);

  // Map data to appropriate format for scatter plot
  const scatterData = {
    labels: currentData.map(item => {
      if (item.pos_tags.length > 0) {
        return `${item.keyword} (${item.pos_tags.join(', ')})`;
      } else if (item.ner_tags.length > 0) {
        return `${item.keyword} (${item.ner_tags.join(', ')})`;
      } else {
        return `${item.keyword} (TFIDF: ${item.tfidf_score})`;
      }
    }),
    datasets: [
      {
        label: 'Scatter Plot',
        data: currentData.map(item => ({ x: item.frequency, y: item.synonyms.length })),
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  return (
    <div>
      <h2 className='text-xl font-serif'>Synonyms vs Freq Scattermap</h2>
      <Scatter data={scatterData} />
      <div className="pagination flex space-x-2">
        <Button color="orange" variant="soft">

          <button onClick={() => paginate('prev')} disabled={currentPage === 1}>
            Prev
          </button>
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button color="orange" variant="soft">

          <button onClick={() => paginate('next')} disabled={currentPage === totalPages}>
            Next
          </button>
        </Button>
      </div>
    </div>
  );
};

export default ScatterPlotWithPagination;
