import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js auto bundle
import GraphWithPagination from './GraphWithPagination';

const BarChart = ({ jsonData, itemsPerPage }) => {
  return (
    <div>
      <GraphWithPagination data={jsonData?.keyword_results} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default BarChart;
