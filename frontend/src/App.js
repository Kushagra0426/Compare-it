import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductComparisonTable from './components/ProductComparisonTable';
import ComparisonPage from './pages/ComparisonPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comparison" element={<ComparisonPage />} />
      </Routes>
    </Router>
  )
}

export default App;