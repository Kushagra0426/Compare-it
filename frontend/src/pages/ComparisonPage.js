import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductComparisonTable from '../components/ProductComparisonTable';

const ComparisonPage = () => {
  const location = useLocation();
  const comparisonData = location.state?.comparisonData;

  return comparisonData ? (
    <ProductComparisonTable data={comparisonData} />
  ) : (
    <div>No comparison data available</div>
  );
};

export default ComparisonPage;